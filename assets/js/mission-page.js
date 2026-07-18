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

  var playgroundOptions = {
    html: inheritedHtml || (ownSaved && ownSaved.html) || mission.starter.html,
    css: (ownSaved && ownSaved.css) || mission.starter.css,
    js: (ownSaved && ownSaved.js) || mission.starter.js,
    panels: mission.panels,
    onChange: function (code) {
      saveCode(mission.id, code);
    }
  };
  var pg = createPlayground(document.getElementById("playground"), playgroundOptions);
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
    var result = mission.check(code);
    feedbackEl.textContent = result.message;
    feedbackEl.className = "feedback show " + (result.pass ? "pass" : "fail");
    if (result.pass) {
      saveProgress(mission.id);
      switchToNextMode();
    }
  });
})();
