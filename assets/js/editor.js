/**
 * 재사용 가능한 HTML/CSS/JS 플레이그라운드 컴포넌트.
 * sandbox.html과 mission.html이 공통으로 사용한다.
 *
 * options.panels로 화면에 보여줄 입력 칸을 고를 수 있다 (예: ["html"], ["html","css"]).
 * 지정하지 않으면 기본값은 ["html", "css", "js"] (자유 연습용).
 * panels에 없는 종류는 입력 칸 자체가 생기지 않고, options.html/css/js로 넘긴 값이
 * "화면엔 없지만 미리보기에는 고정으로 적용되는 값"으로 쓰인다.
 *
 * 에디터 칸은 문법 강조 + 줄 번호가 있는 코드 에디터 느낌을 낸다. CodeMirror 같은 외부
 * 라이브러리 없이 직접 구현했다(이 프로젝트의 "외부 의존성 0개" 원칙 유지) — 투명한
 * <textarea> 밑에 문법 강조된 <pre>를 겹쳐두고, 커서만 <textarea>에서 보이게 하는 방식
 * (color: transparent + caret-color). 자동완성/괄호매칭 같은 고급 기능은 없고 정규식
 * 기반의 근사치 강조라는 한계가 있지만, 연습용 사이트 목적엔 충분하다.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * tokenRe가 찾은 매치만 classify(m)이 돌려준 클래스명으로 <span> 감싸고,
 * 나머지(매치 안 된 부분)는 전부 escapeHtml만 거쳐서 그대로 출력한다. 이렇게 해야
 * 정규식이 못 잡아낸 문자(예: 태그로 인식 안 되는 "<")까지 전부 이스케이프되어,
 * 방문자가 타이핑한 내용이 이 페이지 자체에 실제 HTML/스크립트로 끼어드는 일이 없다
 * (이 강조 결과는 미리보기 iframe이 아니라 부모 페이지에 직접 innerHTML로 들어간다).
 */
function tokenize(text, tokenRe, classify) {
  var out = "";
  var lastIndex = 0;
  tokenRe.lastIndex = 0;
  var m;
  while ((m = tokenRe.exec(text))) {
    if (m.index > lastIndex) {
      out += escapeHtml(text.slice(lastIndex, m.index));
    }
    var cls = classify(m);
    out += cls
      ? '<span class="tok-' + cls + '">' + escapeHtml(m[0]) + "</span>"
      : escapeHtml(m[0]);
    lastIndex = tokenRe.lastIndex;
    if (m.index === tokenRe.lastIndex) tokenRe.lastIndex++;
  }
  out += escapeHtml(text.slice(lastIndex));
  return out;
}

var HTML_TOKEN_RE =
  /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][\w-]*)|(\/?>)|("[^"]*"|'[^']*')|([a-zA-Z-:]+(?=\s*=))/g;

function highlightHtml(text) {
  return tokenize(text, HTML_TOKEN_RE, function (m) {
    if (m[1]) return "comment";
    if (m[2]) return "tag";
    if (m[3]) return "tag";
    if (m[4]) return "string";
    if (m[5]) return "attr";
    return null;
  });
}

var CSS_TOKEN_RE =
  /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(#[0-9a-fA-F]{3,8}\b)|(\b\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms|deg)?\b)|([.#]?[a-zA-Z_-][\w-]*)(?=\s*[:{,])|([{}:;])/g;

function highlightCss(text) {
  return tokenize(text, CSS_TOKEN_RE, function (m) {
    if (m[1]) return "comment";
    if (m[2]) return "string";
    if (m[3]) return "color";
    if (m[4]) return "number";
    if (m[5]) return "ident";
    if (m[6]) return "punct";
    return null;
  });
}

var JS_KEYWORDS =
  "var|let|const|function|return|if|else|for|while|true|false|null|undefined|new|typeof|this";
var JS_BUILTINS =
  "document|window|console|querySelector|querySelectorAll|getElementById|addEventListener|alert";
var JS_TOKEN_RE = new RegExp(
  "(//[^\\n]*)" +
    "|(/\\*[\\s\\S]*?\\*/)" +
    "|(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)" +
    "|(\\b\\d+\\.?\\d*\\b)" +
    "|(\\b(?:" + JS_KEYWORDS + ")\\b)" +
    "|(\\b(?:" + JS_BUILTINS + ")\\b)",
  "g"
);

function highlightJs(text) {
  return tokenize(text, JS_TOKEN_RE, function (m) {
    if (m[1]) return "comment";
    if (m[2]) return "comment";
    if (m[3]) return "string";
    if (m[4]) return "number";
    if (m[5]) return "keyword";
    if (m[6]) return "builtin";
    return null;
  });
}

var HIGHLIGHTERS = { html: highlightHtml, css: highlightCss, js: highlightJs };

// 닫는 태그가 없는(=자기 자신으로 끝나는) HTML 요소들 — 이런 태그는 자동으로
// 닫는 태그를 만들어주면 안 된다.
var VOID_ELEMENTS = [
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"
];

// 실제로 존재하는 HTML 표준 태그 목록. 이 목록에 없는 이름(오타나 방문자가 지어낸
// 태그)은 자동 닫기 대상에서 뺀다 — "존재하지도 않는 틀린 태그"까지 그럴듯하게
// 닫아주면 방문자가 틀린 걸 맞다고 착각할 수 있다(사용자가 명시적으로 지적한 문제).
// 이 사이트가 지금 가르치는 태그보다 넓게(표준 태그 전체) 잡아둔다 — 아직 안
// 가르친 태그라도 실제로 존재하는 태그라면 자동 닫기는 되어야 자연스럽다.
var KNOWN_HTML_TAGS = [
  "a", "abbr", "address", "area", "article", "aside", "audio",
  "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button",
  "canvas", "caption", "cite", "code", "col", "colgroup",
  "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt",
  "em", "embed",
  "fieldset", "figcaption", "figure", "footer", "form",
  "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html",
  "i", "iframe", "img", "input", "ins",
  "kbd",
  "label", "legend", "li", "link",
  "main", "map", "mark", "menu", "meta", "meter",
  "nav", "noscript",
  "object", "ol", "optgroup", "option", "output",
  "p", "param", "picture", "pre", "progress",
  "q",
  "rp", "rt", "ruby",
  "s", "samp", "script", "section", "select", "slot", "small", "source", "span",
  "strong", "style", "sub", "summary", "sup",
  "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time",
  "title", "tr", "track",
  "u", "ul",
  "var", "video",
  "wbr"
];

var OPEN_TAG_RE = /^<([a-zA-Z][a-zA-Z0-9-]*)(\s[^<>]*)?>$/;

/**
 * 방문자가 여는 태그를 다 쳐서 ">"를 입력한 직후, 바로 뒤에 닫는 태그를
 * 자동으로 만들어준다(예: <h1> 입력 → <h1>|</h1>, 커서는 그 사이). HTML 칸에서만
 * 쓰인다. 닫는 태그(</h1>)나 자기닫힘 태그(<br />), void 요소(<br>, <img> 등)는
 * 대상에서 뺀다.
 *
 * inputEvent.inputType으로 "진짜로 방금 '>'를 타이핑했는지"를 반드시 확인해야 한다 —
 * 커서 앞 글자만 보고 판단하면, 예를 들어 <h1> 뒤에 줄바꿈했다가 백스페이스로 그
 * 줄바꿈만 지워서 커서가 다시 "<h1>" 바로 뒤로 돌아왔을 때도 "방금 '>'를 쳤다"고
 * 착각해서 닫는 태그를 또 만들어버린다(지울 때마다 반복되면 닫는 태그가 무한
 * 복사되는 버그였음 — 실제로 겪었던 버그).
 */
function maybeAutoCloseTag(textarea, inputEvent) {
  if (!inputEvent || inputEvent.inputType !== "insertText" || inputEvent.data !== ">") return;
  var pos = textarea.selectionStart;
  if (pos !== textarea.selectionEnd) return; // 선택 영역이 있으면 건드리지 않음
  var value = textarea.value;
  if (value.charAt(pos - 1) !== ">") return;

  var searchStart = Math.max(0, pos - 300);
  var before = value.slice(searchStart, pos);
  var ltIndex = before.lastIndexOf("<");
  if (ltIndex === -1) return;

  var tagText = before.slice(ltIndex);
  if (/\/>$/.test(tagText)) return; // <br />처럼 이미 자기 자신을 닫은 태그

  var m = OPEN_TAG_RE.exec(tagText);
  if (!m) return;

  var tagName = m[1].toLowerCase();
  if (VOID_ELEMENTS.indexOf(tagName) !== -1) return;
  if (KNOWN_HTML_TAGS.indexOf(tagName) === -1) return; // 존재하지 않는(오타 등) 태그는 안 닫아줌

  var closeTag = "</" + m[1] + ">";
  // 바로 뒤에 내용 없이 이 닫는 태그가 이미 붙어있으면(예: <h1>|</h1> 상태에서 ">"를
  // 지웠다 다시 친 경우) 또 만들지 않는다. 태그 사이에 이미 내용이 있는 경우
  // (<h1>hello</h1>)까지 잡으려면 여는/닫는 태그를 스택으로 추적하는 진짜 파서가
  // 필요한데, 이 정도로 정교하게 만들 가치가 없다고 판단해 의도적으로 넘겼다
  // (VS Code도 이 경우 똑같이 중복 생성하는 걸 확인함).
  if (value.slice(pos, pos + closeTag.length) === closeTag) return;

  textarea.value = value.slice(0, pos) + closeTag + value.slice(pos);
  textarea.selectionStart = textarea.selectionEnd = pos;
}

// 여는 문자를 치면 닫는 짝을 바로 뒤에 자동으로 만들어준다(예: { 입력 → {|}, 커서는
// 그 사이) — maybeAutoCloseTag(HTML 태그)와 똑같은 이유·같은 패턴: 닫는 짝을
// 깜빡하는 걸 애초에 막는다("{"는 사용자가 명시적으로 요청, 2026-07-18). 모든 칸에
// 적용된다 — 따옴표(" ')는 HTML 속성값에서도 흔히 쓰인다.
// "("/"\""/"'"는 처음엔 일부러 뺐었다 — 자동 삽입만 하고 닫는 문자를 직접 타이핑해서
// 넘어가는(type-over) 처리가 없으면 오히려 중복 괄호/따옴표가 쌓이기 쉬웠기 때문
// (특히 "("는 함수 호출에서 워낙 자주 씀). 이번에 maybeTypeOverClosing을 같이
// 만들면서 그 문제가 해결되어 범위를 넓혔다(사용자 요청, 2026-07-24). "["는 아직
// 요청받지 않아 그대로 뺐다 — 필요해지면 여기와 TYPE_OVER_CHARS 양쪽에 추가할 것.
var AUTO_CLOSE_BRACKETS = { "{": "}", "(": ")", "\"": "\"", "'": "'" };

function maybeAutoCloseBracket(textarea, inputEvent) {
  if (!inputEvent || inputEvent.inputType !== "insertText") return;
  var closeChar = AUTO_CLOSE_BRACKETS[inputEvent.data];
  if (!closeChar) return;
  var pos = textarea.selectionStart;
  if (pos !== textarea.selectionEnd) return;
  var value = textarea.value;
  if (value.charAt(pos - 1) !== inputEvent.data) return;
  // 바로 뒤에 이미 닫는 짝이 있으면(예: 지웠다 다시 친 경우) 또 만들지 않는다 —
  // maybeAutoCloseTag와 같은 이유의 같은 방어. (참고: 따옴표처럼 여는/닫는 문자가
  // 같은 경우, 이 상황은 실제로는 대부분 maybeTypeOverClosing이 먼저 가로채서 여기까지
  // 오지 않는다 — 그래도 이중 방어로 남겨둔다.)
  if (value.charAt(pos) === closeChar) return;

  textarea.value = value.slice(0, pos) + closeChar + value.slice(pos);
  textarea.selectionStart = textarea.selectionEnd = pos;
}

// 닫는 문자(}/)/"/')를 직접 타이핑했을 때, 바로 뒤에 이미 같은 문자가 있으면(자동
// 닫기로 생겼든 원래 있던 것이든) 또 삽입하지 않고 그 문자 뒤로 커서만 넘긴다 —
// 이른바 "type-over". 이게 없으면 자동으로 닫아준 짝을 직접 타이핑해서 넘어가려 할
// 때마다 괄호/따옴표가 중복으로 쌓인다(사용자가 지적한 문제, 2026-07-24 추가).
// "{"/"}"도 포함시켰다 — 기존에 "{"만 자동 닫기가 있었는데 type-over가 없어서 똑같이
// 중복 문제가 있었기 때문. 매칭 실패(바로 뒤에 같은 문자가 없음)면 아무 것도 안 하고
// false를 돌려줘서, 호출하는 쪽이 평소대로(자동 닫기/내어쓰기) 처리를 계속하게 한다 —
// 특히 따옴표는 여는 문자와 닫는 문자가 같아서, "새로 여는 것"과 "이미 있는 걸 닫고
// 넘어가는 것"을 구분하는 유일한 방법이 "바로 뒤에 같은 문자가 있는지"이다.
var TYPE_OVER_CHARS = ["}", ")", "\"", "'"];

function maybeTypeOverClosing(textarea, inputEvent) {
  if (!inputEvent || inputEvent.inputType !== "insertText") return false;
  var typedChar = inputEvent.data;
  if (TYPE_OVER_CHARS.indexOf(typedChar) === -1) return false;
  var pos = textarea.selectionStart;
  if (pos !== textarea.selectionEnd) return false;
  var value = textarea.value;
  if (value.charAt(pos - 1) !== typedChar) return false;
  if (value.charAt(pos) !== typedChar) return false;

  textarea.value = value.slice(0, pos - 1) + value.slice(pos);
  textarea.selectionStart = textarea.selectionEnd = pos;
  return true;
}

var INDENT_UNIT = "  "; // 들여쓰기 한 칸 = 스페이스 2개

function currentLineIndent(value, pos) {
  var lineStart = value.lastIndexOf("\n", pos - 1) + 1;
  var m = /^[ \t]*/.exec(value.slice(lineStart, pos));
  return m ? m[0] : "";
}

var BRACKET_PAIRS = { "{": "}", "[": "]", "(": ")" };

/**
 * Enter를 눌렀을 때 그냥 줄바꿈만 하지 않고: 1) 현재 줄의 들여쓰기를 새 줄에도
 * 그대로 유지하고, 2) 커서가 여는/닫는 짝(중괄호 {} 나, maybeAutoCloseTag가 만들어준
 * <h1>|</h1> 같은 빈 태그 사이) 한가운데 있으면 한 단계 더 들여써서 안쪽 줄에
 * 커서를 두고 닫는 짝은 그 아래 원래 들여쓰기로 내려보낸다(예: ".box {|}" 에서 Enter
 * 치면 ".box {\n  |\n}" 가 됨). textarea.value를 직접 바꾸므로 input 이벤트가
 * 자동으로 안 나가서, 호출하는 쪽에서 updateVisual/scheduleRun을 직접 불러줘야 한다.
 */
function handleEnterKey(textarea) {
  var pos = textarea.selectionStart;
  var end = textarea.selectionEnd;
  var value = textarea.value;
  var before = value.slice(0, pos);
  var after = value.slice(end);
  var indent = currentLineIndent(value, pos);

  var openChar = before.charAt(before.length - 1);
  var expectedClose = BRACKET_PAIRS[openChar];
  var opensBracket = !!expectedClose;
  var bracketImmediatelyClosed = opensBracket && after.charAt(0) === expectedClose;

  // 여는 태그(<div> 등) 뒤인지도 본다 — 짝이 되는 닫는 태그가 바로 뒤에 있는지는
  // 별개로 확인한다(자동 닫기로 생긴 <div>|</div> 상태면 있고, 방문자가 아직 안 닫은
  // <div> 뒤라면 없다). void 요소(<img> 등)나 이미 자기 자신을 닫은 태그(<br />)
  // 뒤는 대상에서 뺀다.
  var opensTag = false;
  var tagImmediatelyClosed = false;
  if (!opensBracket && openChar === ">") {
    var searchStart = Math.max(0, before.length - 300);
    var segment = before.slice(searchStart);
    var ltIndex = segment.lastIndexOf("<");
    if (ltIndex !== -1) {
      var tagText = segment.slice(ltIndex);
      if (!/\/>$/.test(tagText)) {
        var m = OPEN_TAG_RE.exec(tagText);
        if (m && VOID_ELEMENTS.indexOf(m[1].toLowerCase()) === -1) {
          opensTag = true;
          tagImmediatelyClosed = after.indexOf("</" + m[1] + ">") === 0;
        }
      }
    }
  }

  var opensBlock = opensBracket || opensTag;
  var immediatelyClosed = bracketImmediatelyClosed || tagImmediatelyClosed;

  var insertion, cursorOffset;
  if (opensBlock && immediatelyClosed) {
    // 여는 것과 닫는 것이 바로 붙어있던 경우(예: ".box {}"나 자동 닫기로 생긴
    // <div></div>) — 안쪽 줄은 한 단계 더 들여쓰고, 닫는 짝은 원래 들여쓰기로 내려보낸다.
    var inner = "\n" + indent + INDENT_UNIT;
    insertion = inner + "\n" + indent;
    cursorOffset = inner.length;
  } else if (opensBlock) {
    // 닫는 짝이 아직 없는 경우(예: "{"만 치고 "}"는 나중에 칠 예정) — 새 줄만
    // 한 단계 들여쓴다.
    insertion = "\n" + indent + INDENT_UNIT;
    cursorOffset = insertion.length;
  } else {
    insertion = "\n" + indent;
    cursorOffset = insertion.length;
  }

  textarea.value = before + insertion + after;
  textarea.selectionStart = textarea.selectionEnd = pos + cursorOffset;
}

var CLOSING_BRACKETS = ["}", "]", ")"];

/**
 * "{"만 치고 Enter를 눌렀을 때(닫는 짝이 아직 없는 경우) handleEnterKey는 새 줄을
 * 한 단계 들여쓴다. 그 상태에서 방문자가 직접 "}"를 치면, 그 줄은 원래 한 단계
 * 더 들여써진 채로 남아 있어서 여는 줄과 안 맞는다(예: ".box {\n  }" — 닫는
 * 중괄호가 2칸 들여써진 채로 남음). 지금 줄이 공백/탭만 있는 상태에서 닫는
 * 문자를 막 쳤다면, 그 줄의 들여쓰기를 한 단계 빼서 여는 줄과 맞춰준다.
 * maybeAutoCloseTag와 같은 이유로 inputEvent.inputType으로 "진짜 방금 이 문자를
 * 타이핑했는지"를 반드시 확인한다.
 */
function maybeOutdentClosingBracket(textarea, inputEvent) {
  if (!inputEvent || inputEvent.inputType !== "insertText") return;
  if (CLOSING_BRACKETS.indexOf(inputEvent.data) === -1) return;
  var pos = textarea.selectionStart;
  if (pos !== textarea.selectionEnd) return;
  var value = textarea.value;
  var bracketChar = value.charAt(pos - 1);
  var lineStart = value.lastIndexOf("\n", pos - 2) + 1;
  var beforeBracket = value.slice(lineStart, pos - 1);
  if (!/^[ \t]+$/.test(beforeBracket)) return; // 닫는 문자 앞에 공백/탭 말고 다른 게 있으면 안 건드림
  if (beforeBracket.length < INDENT_UNIT.length) return; // 뺄 들여쓰기가 없음

  var newIndent = beforeBracket.slice(0, beforeBracket.length - INDENT_UNIT.length);
  var rest = value.slice(pos);
  textarea.value = value.slice(0, lineStart) + newIndent + bracketChar + rest;
  textarea.selectionStart = textarea.selectionEnd = lineStart + newIndent.length + 1;
}

/**
 * textarea 안에서 Tab은 기본적으로 브라우저가 "다음 포커스 요소로 이동"으로
 * 처리해서 들여쓰기를 칠 수가 없다. keydown에서 가로채 직접 들여쓰기를
 * 넣거나(Tab) 빼준다(Shift+Tab, 커서가 있는 줄 맨 앞의 들여쓰기 한 칸만).
 */
function handleTabKey(textarea, shiftKey) {
  var pos = textarea.selectionStart;
  var end = textarea.selectionEnd;
  var value = textarea.value;

  if (!shiftKey) {
    textarea.value = value.slice(0, pos) + INDENT_UNIT + value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = pos + INDENT_UNIT.length;
    return;
  }

  var lineStart = value.lastIndexOf("\n", pos - 1) + 1;
  var lineHead = value.slice(lineStart, lineStart + INDENT_UNIT.length);
  if (lineHead !== INDENT_UNIT) return; // 지울 들여쓰기가 없음
  textarea.value = value.slice(0, lineStart) + value.slice(lineStart + INDENT_UNIT.length);
  var removedBeforePos = Math.max(0, Math.min(INDENT_UNIT.length, pos - lineStart));
  textarea.selectionStart = textarea.selectionEnd = pos - removedBeforePos;
}

/**
 * 미리보기 iframe 안에서 잡히지 않은 에러/Promise 거부를 postMessage로 부모에 보고하는
 * 부트스트랩 스크립트. srcdoc 문서의 <head> 맨 앞에 심어서 사용자 코드보다 먼저
 * 실행되게 한다 — 이렇게 해야 사용자 코드 실행 도중 언제 에러가 나든 다 잡힌다.
 * allow-same-origin 없는 sandbox(매번 opaque origin)여도 postMessage 자체는 되는 걸
 * 헤드리스 크롬으로 스파이크 확인했다(2026-07-24) — 받는 쪽에서는 event.origin이
 * 항상 "null"이라 못 쓰고, 대신 event.source를 iframe.contentWindow와 비교해서 우리
 * iframe에서 온 메시지인지 판별한다(createPreviewConsole 참고).
 */
function buildPreviewErrorBridgeScript() {
  return (
    "<script>" +
    "window.addEventListener('error', function (event) {" +
    "  try { window.parent.postMessage({ source: 'code-learn-preview', message: event.message }, '*'); } catch (e) {}" +
    "});" +
    "window.addEventListener('unhandledrejection', function (event) {" +
    "  try {" +
    "    var reason = event.reason;" +
    "    var text = reason && reason.message ? reason.message : String(reason);" +
    "    window.parent.postMessage({ source: 'code-learn-preview', message: '처리되지 않은 Promise 거부: ' + text }, '*');" +
    "  } catch (e) {}" +
    "});" +
    "<" + "/script>"
  );
}

/**
 * 미리보기 iframe과 짝지어진 "콘솔" 표시 영역(consoleEl)을 관리한다. editor.js의
 * createPlayground와 advanced-editor.js의 createAdvancedPlayground가 공통으로 쓴다.
 * srcdoc을 새로 실행할 때마다(각 run()) clear()를 호출해서 이전 실행의 에러가 남아있지
 * 않게 해야 한다.
 */
function createPreviewConsole(iframe, consoleEl) {
  window.addEventListener("message", function (event) {
    if (event.source !== iframe.contentWindow) return;
    var data = event.data;
    if (!data || data.source !== "code-learn-preview") return;
    var line = document.createElement("div");
    line.textContent = data.message;
    consoleEl.appendChild(line);
  });
  return {
    clear: function () {
      consoleEl.textContent = "";
    }
  };
}

function createPlayground(root, options) {
  options = options || {};
  var panels = options.panels || ["html", "css", "js"];
  var fixed = {
    html: options.html || "",
    css: options.css || "",
    js: options.js || ""
  };
  var labels = { html: "HTML", css: "CSS", js: "JavaScript" };
  // 기본값은 true(기존 동작 그대로) — 타이핑할 때마다 500ms 후 자동으로 미리보기가
  // 갱신된다. false로 주면 타이핑 중엔 미리보기를 안 건드리고(문법 강조/줄번호는
  // 계속 실시간으로 갱신됨) "실행 ▶" 버튼을 눌러야만 반영된다. 입문 단계는 "치면
  // 바로 옆에서 결과가 보인다"는 즉각 피드백이 중요해서 그대로 두고, 주니어/시니어처럼
  // JS 로직이 복잡해지는 미션은 태그를 다 닫기 전(예: "<p")처럼 타이핑 중간의 미완성
  // 상태가 그대로 미리보기에 깜빡여 보이는 게 오히려 방해가 될 수 있어서 이 옵션을
  // 추가함(사용자가 직접 겪고 지적한 문제) — 저장(onChange)은 이 옵션과 무관하게
  // 항상 타이핑 500ms 후 debounce로 계속 동작한다.
  var autoRun = options.autoRun !== false;
  // 여러 칸(html/css/js)을 나란히 쌓아 한 화면에 다 보여주는 대신, 탭 하나씩 눌러
  // 전환하는 방식으로 보여줄지. 주니어/시니어처럼 JS 로직이 길어지는 미션에서 세 칸이
  // 동시에 다 보이는 대신 한 번에 하나씩만 보면서 화면을 덜 어수선하게 쓰고 싶다는
  // 사용자 요청으로 추가함(2026-07-18, `assets/js/advanced-editor.js`의 탭 UI와
  // 같은 방식) — 미리보기 칸(오른쪽)은 그대로 두 칸짜리 레이아웃을 유지하고, 왼쪽
  // 입력 영역만 이렇게 바뀐다.
  var tabbed = !!options.tabbed;

  var uid = "pg-" + Math.random().toString(36).slice(2, 9);

  var editorsHtml;
  if (tabbed) {
    var tabsHtml = panels
      .map(function (key) {
        return '<button type="button" class="advanced-editor-tab" data-key="' + key + '">' + labels[key] + "</button>";
      })
      .join("");
    editorsHtml =
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
      "</div>";
  } else {
    editorsHtml = "";
    panels.forEach(function (key) {
      editorsHtml +=
        '<div class="editor-panel">' +
          '<label for="' + uid + '-' + key + '">' + labels[key] + '</label>' +
          '<div class="code-editor">' +
            '<div class="code-gutter" id="' + uid + '-' + key + '-gutter" aria-hidden="true"></div>' +
            '<div class="code-surface">' +
              '<pre class="code-highlight"><code id="' + uid + '-' + key + '-hl"></code></pre>' +
              '<textarea id="' + uid + '-' + key + '" class="code-input" spellcheck="false"></textarea>' +
            '</div>' +
          '</div>' +
        '</div>';
    });
  }

  root.innerHTML =
    '<div class="playground' + (tabbed ? " tabbed" : "") + '">' +
      '<div class="playground-editors' + (tabbed ? " tabbed" : "") + '">' + editorsHtml + '</div>' +
      '<div class="playground-preview">' +
        '<div class="preview-toolbar">' +
          '<span>' + (autoRun ? "미리보기" : "미리보기 (실행 버튼을 눌러야 갱신돼요)") + '</span>' +
          '<button type="button" class="btn run-btn">실행 ▶</button>' +
        '</div>' +
        '<iframe class="preview-frame" title="미리보기" sandbox="allow-scripts allow-modals"></iframe>' +
        '<pre class="preview-console" aria-live="polite"></pre>' +
      '</div>' +
    '</div>';

  var iframe = root.querySelector(".preview-frame");
  var runBtn = root.querySelector(".run-btn");
  var previewConsole = createPreviewConsole(iframe, root.querySelector(".preview-console"));

  // 탭 모드/스택 모드는 DOM 구조가 아예 달라서(공유 textarea 하나 vs 칸마다 textarea)
  // currentValue/updateVisual/syncScroll/bindEditorEvents를 모드별로 따로 만들어
  // 대입한다 — run()/notifyChange()/scheduleRun()/getCode()/setCode()는 그 결과인
  // currentValue()만 통해서 값을 주고받으므로 모드를 몰라도 된다.
  var currentValue, updateVisual, syncScroll, bindEditorEvents;
  var valuesState = {};
  var inputs, highlightEls, gutterEls; // 스택 모드 전용
  var sharedInput, sharedHighlightEl, sharedGutterEl, activeKey; // 탭 모드 전용

  if (tabbed) {
    var playgroundRoot = root.querySelector(".playground");
    var tabEls = Array.prototype.slice.call(root.querySelectorAll(".advanced-editor-tab"));
    var fullscreenBtn = root.querySelector(".advanced-fullscreen-btn");
    sharedInput = root.querySelector("#" + uid + "-input");
    sharedHighlightEl = root.querySelector("#" + uid + "-hl");
    sharedGutterEl = root.querySelector("#" + uid + "-gutter");
    activeKey = panels[0];
    panels.forEach(function (key) { valuesState[key] = fixed[key]; });
    sharedInput.value = valuesState[activeKey];

    // 지금 활성 탭의 textarea 내용을 메모리상 valuesState에 반영한다. 탭을 바꾸기
    // 직전엔 반드시 호출해야 한다 — 안 하면 방금 타이핑한 내용이 탭 전환 시 사라진
    // 것처럼 보이는 버그가 생긴다(advanced-editor.js의 flushActiveFile과 같은 이유).
    function flushActive() {
      valuesState[activeKey] = sharedInput.value;
    }

    currentValue = function (key) {
      return key === activeKey ? sharedInput.value : valuesState[key];
    };

    updateVisual = function () {
      var value = sharedInput.value;
      var highlighter = HIGHLIGHTERS[activeKey];
      var html = highlighter ? highlighter(value) : escapeHtml(value);
      if (html.charAt(html.length - 1) === "\n") html += " ";
      sharedHighlightEl.innerHTML = html;

      var lineCount = value.split("\n").length;
      var numbers = [];
      for (var i = 1; i <= lineCount; i++) numbers.push(i);
      sharedGutterEl.textContent = numbers.join("\n");
    };

    syncScroll = function () {
      var pre = sharedHighlightEl.parentElement;
      pre.scrollTop = sharedInput.scrollTop;
      pre.scrollLeft = sharedInput.scrollLeft;
      sharedGutterEl.scrollTop = sharedInput.scrollTop;
    };

    function setActiveTabUi() {
      tabEls.forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.key === activeKey);
      });
    }
    setActiveTabUi();

    tabEls.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.dataset.key;
        if (key === activeKey) return;
        flushActive();
        activeKey = key;
        sharedInput.value = valuesState[activeKey];
        setActiveTabUi();
        updateVisual();
      });
    });

    fullscreenBtn.addEventListener("click", function () {
      playgroundRoot.classList.toggle("fullscreen");
      fullscreenBtn.textContent = playgroundRoot.classList.contains("fullscreen") ? "⤡ 전체화면 닫기" : "⤢ 전체화면";
    });

    bindEditorEvents = function (scheduleRun) {
      updateVisual();
      sharedInput.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          handleTabKey(sharedInput, e.shiftKey);
          updateVisual();
          scheduleRun();
          return;
        }
        if (e.key !== "Enter" || e.isComposing) return;
        e.preventDefault();
        handleEnterKey(sharedInput);
        updateVisual();
        scheduleRun();
      });
      sharedInput.addEventListener("input", function (e) {
        if (activeKey === "html") maybeAutoCloseTag(sharedInput, e);
        if (!maybeTypeOverClosing(sharedInput, e)) {
          maybeAutoCloseBracket(sharedInput, e);
          maybeOutdentClosingBracket(sharedInput, e);
        }
        updateVisual();
        scheduleRun();
      });
      sharedInput.addEventListener("scroll", syncScroll);
    };
  } else {
    inputs = {};
    highlightEls = {};
    gutterEls = {};
    panels.forEach(function (key) {
      var el = root.querySelector("#" + uid + "-" + key);
      el.value = fixed[key];
      inputs[key] = el;
      highlightEls[key] = root.querySelector("#" + uid + "-" + key + "-hl");
      gutterEls[key] = root.querySelector("#" + uid + "-" + key + "-gutter");
    });

    currentValue = function (key) {
      return inputs[key] ? inputs[key].value : fixed[key];
    };

    updateVisual = function (key) {
      var value = currentValue(key);
      var highlighter = HIGHLIGHTERS[key];
      var html = highlighter ? highlighter(value) : escapeHtml(value);
      // <pre>는 맨 끝 개행만 있으면 마지막 빈 줄을 그려주지 않아 textarea와 줄 수가
      // 어긋난다 — 끝에 공백 하나를 더 붙여서 그 빈 줄에도 높이가 생기게 한다.
      if (html.charAt(html.length - 1) === "\n") html += " ";
      highlightEls[key].innerHTML = html;

      var lineCount = value.split("\n").length;
      var numbers = [];
      for (var i = 1; i <= lineCount; i++) numbers.push(i);
      gutterEls[key].textContent = numbers.join("\n");
    };

    syncScroll = function (key) {
      var ta = inputs[key];
      var pre = highlightEls[key].parentElement;
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
      gutterEls[key].scrollTop = ta.scrollTop;
    };

    bindEditorEvents = function (scheduleRun) {
      panels.forEach(function (key) {
        updateVisual(key);
        inputs[key].addEventListener("keydown", function (e) {
          if (e.key === "Tab") {
            e.preventDefault();
            handleTabKey(inputs[key], e.shiftKey);
            updateVisual(key);
            scheduleRun();
            return;
          }
          if (e.key !== "Enter" || e.isComposing) return;
          e.preventDefault();
          handleEnterKey(inputs[key]);
          updateVisual(key);
          scheduleRun();
        });
        inputs[key].addEventListener("input", function (e) {
          if (key === "html") maybeAutoCloseTag(inputs[key], e);
          if (!maybeTypeOverClosing(inputs[key], e)) {
            maybeAutoCloseBracket(inputs[key], e);
            maybeOutdentClosingBracket(inputs[key], e);
          }
          updateVisual(key);
          scheduleRun();
        });
        inputs[key].addEventListener("scroll", function () {
          syncScroll(key);
        });
      });
    };
  }

  function run() {
    previewConsole.clear();
    var css = currentValue("css");
    var js = currentValue("js");
    var doc =
      "<!doctype html><html><head><meta charset=\"utf-8\">" +
      buildPreviewErrorBridgeScript() +
      (css ? "<style>" + css + "</style>" : "") +
      "</head><body>" +
      currentValue("html") +
      (js ? "<script>" + js + "<" + "/script>" : "") +
      "</body></html>";
    iframe.setAttribute("srcdoc", doc);
  }

  function notifyChange() {
    if (options.onChange) {
      options.onChange({ html: currentValue("html"), css: currentValue("css"), js: currentValue("js") });
    }
  }

  var timer = null;
  function scheduleRun() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (autoRun) run();
      notifyChange();
    }, 500);
  }

  bindEditorEvents(scheduleRun);
  runBtn.addEventListener("click", function () {
    run();
    notifyChange();
  });

  run(); // 최초 렌더링만 — 사용자가 아직 아무것도 안 건드렸으므로 onChange(저장)는 호출하지 않는다.

  return {
    getCode: function () {
      return { html: currentValue("html"), css: currentValue("css"), js: currentValue("js") };
    },
    setCode: function (code) {
      code = code || {};
      if (tabbed) {
        panels.forEach(function (key) {
          if (code[key] !== undefined) valuesState[key] = code[key];
        });
        sharedInput.value = valuesState[activeKey];
        updateVisual();
      } else {
        panels.forEach(function (key) {
          if (code[key] !== undefined) {
            inputs[key].value = code[key];
            updateVisual(key);
          }
        });
      }
      run();
    },
    run: run
  };
}
