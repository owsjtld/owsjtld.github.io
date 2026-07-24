/**
 * 여러 파일(탭)을 다루는 "고급" 코드 에디터. editor.js의 단일 파일 플레이그라운드와
 * 별개로, 시니어급 미션 중 파일을 나눠서 import/export로 연결하는 걸 가르치는
 * 미션에서만 쓰인다(mission.advancedEditor === true). editor.js보다 먼저
 * <script>로 로드되어 있어야 한다 — 문법 강조(highlightHtml/highlightCss/highlightJs)와
 * 에디터 동작(maybeAutoCloseTag, handleEnterKey, maybeOutdentClosingBracket,
 * handleTabKey)을 editor.js의 전역 함수 그대로 재사용한다(둘 다 특정 파일 하나에
 * 종속되지 않은 범용 함수라 그대로 가져다 쓸 수 있음).
 *
 * 번들러 없이 브라우저에서 진짜 cross-file import를 실행시키는 핵심 트릭:
 * 각 파일을 Blob으로 만들어 blob: URL을 발급하고, 소스 안의 "./파일명" import 경로를
 * 그 blob: URL로 치환한 뒤 진입점을 동적 import()한다. **이 Blob 생성은 반드시
 * iframe 내부에서 일어나야 한다** — 부모 페이지에서 만든 blob: URL은 부모 origin에
 * 묶여있어서, allow-same-origin 없는 sandbox iframe(매번 새로운 opaque origin)
 * 안에서는 "남의 origin 것"이라 못 불러온다(모듈이라서가 아니라, 이 사이트가
 * 지금까지 JS를 항상 인라인으로만 넣어봤지 src=로 외부 리소스를 fetch해본 적이
 * 없어서 여태 안 드러났던 함정). 그래서 여기서는 srcdoc 안에 "부트스트랩 스크립트"를
 * 심어서, 그 스크립트가 iframe 내부 컨텍스트에서 Blob을 만들고 import를 치환하고
 * 실행하게 한다. 실제 스파이크로 sandbox="allow-scripts"(allow-same-origin 없음)
 * 안에서 이 방식이 동작하는 것까지 확인했다.
 */

/**
 * 파일 이름 문자열을 정규식 안에서 리터럴로 쓰기 위해 특수문자를 이스케이프한다.
 */
function escapeRegExpLiteral(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * import 경로 치환/실행 로직 자체는 iframe 안에서 실행돼야 하므로, 그 로직을
 * "문자열로 된 함수 소스"로 갖고 있다가 부트스트랩 스크립트 텍스트 안에 그대로
 * 박아넣는다. 일부러 아주 좁게 잡은 정규식만 지원한다 — import ... from "./파일명"
 * 형태로, files에 실제로 존재하는 파일명과 정확히 일치하는 것만 치환한다. 진짜 ESM
 * 파서를 만들 필요는 없고, 초보자가 쓸 범위(상대 경로 리터럴 import)면 충분하다.
 */
var BOOTSTRAP_RUNNER_SRC = [
  "function escapeRegExpLiteral(str) {",
  "  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');",
  "}",
  "function findImportedFiles(src, fileNames) {",
  "  var found = [];",
  "  fileNames.forEach(function (name) {",
  "    var re = new RegExp(\"from\\\\s*['\\\"]\\\\./\" + escapeRegExpLiteral(name) + \"['\\\"]\");",
  "    if (re.test(src)) found.push(name);",
  "  });",
  "  return found;",
  "}",
  "function rewriteImports(src, urls) {",
  "  var out = src;",
  "  Object.keys(urls).forEach(function (name) {",
  "    var re = new RegExp(\"(['\\\"])\\\\./\" + escapeRegExpLiteral(name) + \"\\\\1\", 'g');",
  "    out = out.replace(re, \"'\" + urls[name] + \"'\");",
  "  });",
  "  return out;",
  "}",
  "function buildBlobUrls(files) {",
  "  var fileNames = Object.keys(files);",
  "  var urls = {};",
  "  var remaining = fileNames.slice();",
  "  var maxPasses = fileNames.length + 1;",
  "  while (remaining.length && maxPasses-- > 0) {",
  "    var next = [];",
  "    remaining.forEach(function (name) {",
  "      var deps = findImportedFiles(files[name], fileNames);",
  "      var ready = deps.every(function (d) { return urls[d]; });",
  "      if (ready) {",
  "        var rewritten = rewriteImports(files[name], urls);",
  "        urls[name] = URL.createObjectURL(new Blob([rewritten], { type: 'text/javascript' }));",
  "      } else {",
  "        next.push(name);",
  "      }",
  "    });",
  "    remaining = next;",
  "  }",
  "  return urls;",
  "}"
].join("\n");

/**
 * 학습자가 입력한 파일 내용 안에 진짜 "</script" 같은 문자열이 들어있으면(드물지만
 * 가능), 이걸 그대로 <script> 태그 안에 박아넣을 때 브라우저가 그 자리에서 스크립트를
 * 조기 종료시켜버린다. 여기선 실제 JS 소스 문자열(HTML 속성이 아니라) 안이라
 * 백슬래시 이스케이프가 유효하다 — "<\/script"로 바꿔두면 브라우저는 태그로 인식
 * 안 하고, JS가 그 문자열을 파싱할 땐 백슬래시+슬래시가 그냥 슬래시로 풀려서 원래
 * 의도한 문자열 그대로 복원된다.
 */
function escapeScriptClose(str) {
  return str.replace(/<\/(script)/gi, "<\\/$1");
}

function buildAdvancedSrcdoc(files, entry, bodyHtml) {
  var filesJson = escapeScriptClose(JSON.stringify(files));
  var bootstrap =
    BOOTSTRAP_RUNNER_SRC +
    "\nvar __files = " + filesJson + ";" +
    "\nvar __entry = " + JSON.stringify(entry) + ";" +
    "\nvar __urls = buildBlobUrls(__files);" +
    "\nif (__urls[__entry]) {" +
    "\n  import(__urls[__entry]).catch(function (e) {" +
    "\n    document.body.textContent = '실행 중 오류: ' + e.message;" +
    "\n  }).then(function () {" +
    "\n    Object.keys(__urls).forEach(function (n) { URL.revokeObjectURL(__urls[n]); });" +
    "\n  });" +
    "\n} else {" +
    "\n  document.body.textContent = '진입점 파일(' + __entry + ')을 실행할 수 없어요 — import 경로를 확인해보세요.';" +
    "\n}";

  return (
    "<!doctype html><html><head><meta charset=\"utf-8\">" +
    buildPreviewErrorBridgeScript() +
    "</head><body>" +
    (bodyHtml || "") +
    "<script>" + bootstrap + "<" + "/script>" +
    "</body></html>"
  );
}

function copyObject(obj) {
  var out = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) out[key] = obj[key];
  }
  return out;
}

function fileExtension(name) {
  var idx = name.lastIndexOf(".");
  return idx === -1 ? "" : name.slice(idx + 1).toLowerCase();
}

function createAdvancedPlayground(root, options) {
  options = options || {};
  var fileOrder = options.fileOrder || Object.keys(options.files || {});
  var filesState = {};
  fileOrder.forEach(function (name) {
    filesState[name] = (options.files && options.files[name]) || "";
  });
  var entry = options.entry;
  var bodyHtml = options.bodyHtml || "";

  var uid = "adv-" + Math.random().toString(36).slice(2, 9);
  var activeFile = fileOrder[0];

  var tabsHtml = fileOrder
    .map(function (name) {
      return (
        '<button type="button" class="advanced-editor-tab" data-file="' + name + '">' +
        name +
        "</button>"
      );
    })
    .join("");

  root.innerHTML =
    '<div class="advanced-editor" id="' + uid + '">' +
      '<div class="advanced-editor-toolbar">' +
        '<div class="advanced-editor-tabs">' + tabsHtml + "</div>" +
        '<button type="button" class="btn advanced-fullscreen-btn">⤢ 전체화면</button>' +
      "</div>" +
      '<div class="code-editor">' +
        '<div class="code-gutter" id="' + uid + '-gutter" aria-hidden="true"></div>' +
        '<div class="code-surface">' +
          '<pre class="code-highlight"><code id="' + uid + '-hl"></code></pre>' +
          '<textarea id="' + uid + '-input" class="code-input" spellcheck="false"></textarea>' +
        "</div>" +
      "</div>" +
      '<button type="button" class="advanced-run-btn">실행 ▶</button>' +
      '<div class="advanced-preview-overlay">' +
        '<div class="advanced-preview-toolbar">' +
          "<span>미리보기</span>" +
          '<button type="button" class="btn advanced-preview-close">닫기 ✕</button>' +
        "</div>" +
        '<iframe class="preview-frame" title="미리보기" sandbox="allow-scripts allow-modals"></iframe>' +
        '<pre class="preview-console" aria-live="polite"></pre>' +
      "</div>" +
    "</div>";

  var editorRoot = root.querySelector("#" + uid);
  var tabEls = Array.prototype.slice.call(root.querySelectorAll(".advanced-editor-tab"));
  var input = root.querySelector("#" + uid + "-input");
  var highlightEl = root.querySelector("#" + uid + "-hl");
  var gutterEl = root.querySelector("#" + uid + "-gutter");
  var fullscreenBtn = root.querySelector(".advanced-fullscreen-btn");
  var runBtn = root.querySelector(".advanced-run-btn");
  var previewOverlay = root.querySelector(".advanced-preview-overlay");
  var previewCloseBtn = root.querySelector(".advanced-preview-close");
  var iframe = root.querySelector(".preview-frame");
  var previewConsole = createPreviewConsole(iframe, root.querySelector(".preview-console"));

  // 지금 활성 탭의 textarea 내용을 메모리상 filesState에 반영한다. 탭을 바꾸거나
  // run()/getCode()를 부르기 "직전"에 반드시 호출해야 한다 — 안 하면 방금 타이핑한
  // 내용이 탭 전환 시 사라진 것처럼 보이는 버그가 생긴다(editor.js의 currentValue()가
  // 이미 피해온 것과 같은 종류의 문제).
  function flushActiveFile() {
    if (activeFile) filesState[activeFile] = input.value;
  }

  function updateVisual() {
    var value = input.value;
    var ext = fileExtension(activeFile);
    var highlighter = HIGHLIGHTERS[ext] || HIGHLIGHTERS.js;
    var html = highlighter ? highlighter(value) : escapeHtml(value);
    if (html.charAt(html.length - 1) === "\n") html += " ";
    highlightEl.innerHTML = html;

    var lineCount = value.split("\n").length;
    var numbers = [];
    for (var i = 1; i <= lineCount; i++) numbers.push(i);
    gutterEl.textContent = numbers.join("\n");
  }

  function syncScroll() {
    var pre = highlightEl.parentElement;
    pre.scrollTop = input.scrollTop;
    pre.scrollLeft = input.scrollLeft;
    gutterEl.scrollTop = input.scrollTop;
  }

  function setActiveTabUi() {
    tabEls.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.file === activeFile);
    });
  }

  function switchToFile(name) {
    if (name === activeFile) return;
    flushActiveFile();
    activeFile = name;
    input.value = filesState[activeFile];
    setActiveTabUi();
    updateVisual();
  }

  function notifyChange() {
    if (options.onChange) {
      flushActiveFile();
      options.onChange({ files: copyObject(filesState) });
    }
  }

  var timer = null;
  function scheduleSave() {
    clearTimeout(timer);
    timer = setTimeout(notifyChange, 500);
  }

  function run() {
    flushActiveFile();
    previewConsole.clear();
    var srcdoc = buildAdvancedSrcdoc(filesState, entry, bodyHtml);
    iframe.setAttribute("srcdoc", srcdoc);
    previewOverlay.classList.add("show");
  }

  tabEls.forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchToFile(btn.dataset.file);
    });
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabKey(input, e.shiftKey);
      updateVisual();
      scheduleSave();
      return;
    }
    if (e.key !== "Enter" || e.isComposing) return;
    e.preventDefault();
    handleEnterKey(input);
    updateVisual();
    scheduleSave();
  });
  input.addEventListener("input", function (e) {
    if (!maybeTypeOverClosing(input, e)) {
      maybeAutoCloseBracket(input, e);
      maybeOutdentClosingBracket(input, e);
    }
    updateVisual();
    scheduleSave();
  });
  input.addEventListener("scroll", syncScroll);

  fullscreenBtn.addEventListener("click", function () {
    editorRoot.classList.toggle("fullscreen");
    fullscreenBtn.textContent = editorRoot.classList.contains("fullscreen") ? "⤡ 전체화면 닫기" : "⤢ 전체화면";
  });

  runBtn.addEventListener("click", run);
  previewCloseBtn.addEventListener("click", function () {
    previewOverlay.classList.remove("show");
  });

  // 최초 렌더링
  input.value = filesState[activeFile];
  setActiveTabUi();
  updateVisual();

  return {
    getCode: function () {
      flushActiveFile();
      return { files: copyObject(filesState) };
    },
    setCode: function (code) {
      code = code || {};
      if (code.files) {
        fileOrder.forEach(function (name) {
          if (code.files[name] !== undefined) filesState[name] = code.files[name];
        });
      }
      input.value = filesState[activeFile];
      updateVisual();
    },
    run: run
  };
}
