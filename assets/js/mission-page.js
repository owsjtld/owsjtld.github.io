/**
 * mission.html 전용 로직: URL의 ?id= 로 미션을 찾아 렌더링하고 채점한다.
 * 진행도/코드 저장은 assets/js/storage.js의 함수들을 사용한다 (지금은 localStorage 구현).
 *
 * 이 파일은 <script type="module">로 로드된다(MISSIONS를 missions-data.js에서
 * import해야 해서). storage.js/editor.js는 여전히 평범한(모듈 아닌) 스크립트라
 * import 없이도 getProgress/createPlayground 같은 전역 함수를 그대로 쓸 수 있다 —
 * 모듈이 아닌 <script>가 만든 전역은 모듈 스크립트에서도 그냥 보인다. 모듈은 문서
 * 파싱이 끝난 뒤(defer와 비슷하게) 실행되므로, 그 전역들이 먼저 채워져 있는 게
 * 보장된다. 모듈 스크립트는 항상 strict mode라 이 IIFE 감싸기는 사실 더 이상 꼭
 * 필요하진 않지만(모듈 최상단 스코프 자체가 이미 격리돼있음), 그대로 유지해도 무해하다.
 */
import { MISSIONS } from "./missions-data.js";

(function () {
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // code.js와(있다면) code.html 안 <script> 태그들의 문법이 유효한지만 확인한다.
  // new Function(문자열)은 그 문자열을 함수 "본문"으로 파싱만 하고, 반환된 함수를
  // 호출하지 않는 한 안의 코드는 전혀 실행되지 않는다 — 그래서 이 검사는 "코드를
  // 실행해서 결과를 훔쳐보지 않는다"는 채점 보안 원칙을 깨지 않는다. 문법이 멀쩡하면
  // null을, 문법 오류가 있으면 그 Error 객체를 돌려준다.
  function findJsSyntaxError(code) {
    var sources = [];
    if (code.js) sources.push(code.js);
    if (code.html) {
      var doc = new DOMParser().parseFromString(code.html, "text/html");
      Array.prototype.forEach.call(doc.querySelectorAll("script"), function (el) {
        if (el.textContent.trim()) sources.push(el.textContent);
      });
    }
    for (var i = 0; i < sources.length; i++) {
      try {
        new Function(sources[i]);
      } catch (e) {
        return e;
      }
    }
    return null;
  }

  var id = getParam("id");
  var missionIndex = MISSIONS.findIndex(function (m) { return m.id === id; });
  var mission = MISSIONS[missionIndex];
  var app = document.getElementById("mission-app");

  if (!mission) {
    app.innerHTML =
      '<p>미션을 찾을 수 없어요. <a href="missions.html">미션 목록으로 돌아가기</a></p>';
    return;
  }

  // MISSIONS 배열 순서 = 학습 순서라, 다음 미션도 그냥 배열의 다음 자리를 본다
  // (현재 tier 필터와 무관하게 전체 커리큘럼 순서를 따름). 마지막 미션이면 없음.
  var nextMission = MISSIONS[missionIndex + 1];

  document.title = mission.title + " — CODE-LEARN";

  // HTML은 startFromMission이 지정된 경우 그 미션의 "최신" 저장 코드를 매번 우선으로 가져온다
  // (한 번 복사해오고 끝이 아니라, 이전 미션을 나중에 고치면 여기도 그 변경이 그대로 반영됨).
  // CSS/JS는 그 미션 고유의 작업물이라 이 미션 자체에 저장된 값을 그대로 이어서 쓴다.
  var ownSaved = getSavedCode(mission.id);
  var sourceSaved = mission.startFromMission ? getSavedCode(mission.startFromMission) : null;
  var inheritedHtml = sourceSaved && sourceSaved.html ? sourceSaved.html : null;

  var inheritedNote = inheritedHtml
    ? '<p class="inherited-note">이전 미션에서 작성한 최신 HTML을 가져왔어요. 이전 미션을 나중에 고치면 여기도 그 내용으로 다시 시작돼요.</p>'
    : "";

  app.innerHTML =
    '<div class="mission-header">' +
      '<div class="level">' + mission.level + "</div>" +
      "<h1>" + mission.title + "</h1>" +
    "</div>" +
    '<div class="mission-instructions">' + mission.instructions + "</div>" +
    inheritedNote +
    '<div id="playground"></div>' +
    '<div class="mission-actions">' +
      '<a class="btn" href="missions.html">목록으로</a>' +
      '<div class="mission-actions-right">' +
        '<span id="feedback" class="feedback"></span>' +
        '<button type="button" class="btn primary" id="check-btn">채점하기</button>' +
      "</div>" +
    "</div>";

  // 예시 코드(<pre>)는 "직접 타이핑해보라"는 용도라 복붙을 막는다. CSS user-select:none이
  // 1차 방어(마우스로 긁을 수 없음)이고, copy 이벤트를 한 번 더 막아서(키보드 단축키 등으로
  // 우회하는 경우까지) 이중으로 막는다.
  Array.prototype.forEach.call(app.querySelectorAll(".mission-instructions pre"), function (pre) {
    pre.addEventListener("copy", function (e) { e.preventDefault(); });
  });

  // 고급 에디터(파일 여러 개 + 탭) 미션은 mission.advancedEditor === true로 표시된다.
  // startFromMission 이어받기는 HTML 한 칸짜리 일반 미션 전용 개념이라 여기엔 해당 없다 —
  // 그래서 옵션을 만드는 로직 자체를 두 갈래로 나눈다.
  var pg;
  if (mission.advancedEditor) {
    var savedFiles = (ownSaved && ownSaved.files) || {};
    var advancedOptions = {
      files: {},
      fileOrder: mission.fileOrder,
      entry: mission.entry,
      bodyHtml: mission.bodyHtml,
      onChange: function (code) {
        saveCode(mission.id, code);
      }
    };
    (mission.fileOrder || Object.keys(mission.starter.files)).forEach(function (name) {
      advancedOptions.files[name] = savedFiles[name] !== undefined ? savedFiles[name] : mission.starter.files[name];
    });
    pg = createAdvancedPlayground(document.getElementById("playground"), advancedOptions);
  } else {
    var playgroundOptions = {
      html: inheritedHtml || (ownSaved && ownSaved.html) || mission.starter.html,
      css: (ownSaved && ownSaved.css) || mission.starter.css,
      js: (ownSaved && ownSaved.js) || mission.starter.js,
      panels: mission.panels,
      // 탭 UI(editor.js의 tabbed 옵션)는 모든 미션에 공통으로 적용한다 — html/css/js를
      // 동시에 쌓아 보여주는 대신 탭으로 하나씩 전환하며 보게 해서 화면을 덜 어수선하게
      // 쓴다(입문처럼 칸이 하나뿐인 미션도 탭 UI로 통일).
      // autoRun은 굳이 안 넘겨서 기본값(true, 자동실행)을 모든 미션이 그대로 쓴다 —
      // "타이핑하면 바로 옆에서 결과가 보인다"는 즉각 피드백이 홈 화면 문구와도
      // 일치해야 한다는 사용자 의견으로, 주니어/시니어만 실행 버튼 방식으로 뒀던 걸
      // 되돌림(2026-07-18). 원래 그 방식을 도입했던 이유(타이핑 중간의 미완성 태그/
      // 중괄호가 미리보기에 깜빡이는 것)는 maybeAutoCloseBracket({ 자동 닫기)로
      // 근본 원인 쪽을 고쳐서 해소했다.
      tabbed: true,
      onChange: function (code) {
        saveCode(mission.id, code);
      }
    };
    pg = createPlayground(document.getElementById("playground"), playgroundOptions);
  }
  var feedbackEl = document.getElementById("feedback");
  var checkBtn = document.getElementById("check-btn");

  // "채점하기" 버튼은 통과하는 순간 같은 버튼이 "다음 문제로"로 바뀐다(버튼을 새로
  // 하나 더 만들지 않는다). 다음 미션이 없으면(마지막 미션) 이동할 곳이 없으니
  // 완료 표시만 하고 버튼을 비활성화한다.
  function switchToNextMode() {
    if (nextMission) {
      checkBtn.textContent = "다음 문제로 →";
      checkBtn.dataset.mode = "next";
    } else {
      checkBtn.textContent = "🎉 모든 미션 완료!";
      checkBtn.disabled = true;
    }
  }

  // 이 미션을 이전에 이미 통과했다면(진행도에 남아있으면), 다시 채점 안 눌러도
  // 바로 "다음 문제로" 상태로 열리게 한다.
  if (getProgress()[mission.id]) {
    switchToNextMode();
  }

  checkBtn.addEventListener("click", function () {
    if (checkBtn.dataset.mode === "next") {
      window.location.href = "mission.html?id=" + encodeURIComponent(nextMission.id);
      return;
    }
    var code = pg.getCode();
    saveCode(mission.id, code);

    // 채점(check)은 코드를 실행하지 않고 문자열/정규식만 보기 때문에, 문법 자체가
    // 깨진 JS(예: function ("이름") { ... }처럼 매개변수 자리에 문자열을 넣는 실수)도
    // 정규식 패턴만 맞으면 그냥 "통과"로 잘못 넘어간다 — 실제로는 스크립트 전체가
    // 파싱 단계에서 실패해서 클릭해도 아무 반응이 없는데도 그렇다(사용자가 실제로
    // 겪고 발견한 문제, 2026-07-18). 그래서 개별 미션의 check()를 부르기 전에
    // 공통으로 한 번 문법만 먼저 검사한다 — new Function(문자열)은 그 문자열을
    // *파싱만* 하고 실행은 안 하므로(반환된 함수를 호출하지 않음), "실행 결과를
    // 훔쳐보지 않는다"는 채점 보안 원칙을 안 건드린다. advancedEditor(ES 모듈,
    // import/export 문법) 미션은 Function 생성자로 파싱이 아예 안 되는 문법이라
    // 이번엔 검사 대상에서 뺐다.
    if (!mission.advancedEditor) {
      var syntaxError = findJsSyntaxError(code);
      if (syntaxError) {
        feedbackEl.textContent = "자바스크립트 문법에 오류가 있어요: " + syntaxError.message;
        feedbackEl.className = "feedback show fail";
        return;
      }
    }

    var result = mission.check(code);
    feedbackEl.textContent = result.message;
    feedbackEl.className = "feedback show " + (result.pass ? "pass" : "fail");
    if (result.pass) {
      saveProgress(mission.id);
      switchToNextMode();
    }
  });
})();
