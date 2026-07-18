/**
 * 저장소 어댑터. 지금은 전부 localStorage로 구현되어 있다 (방문자 기기 로컬 기록,
 * 서버/로그인 없음). 나중에 서버로 옮길 때는 이 파일 안의 함수 내용만 fetch 기반으로
 * 바꾸면 되고, 이 함수들을 호출하는 missions.html / mission-page.js 쪽 코드는
 * 그대로 재사용할 수 있게 일부러 이 파일에만 localStorage를 몰아뒀다.
 * 서버 전환 절차는 CLAUDE.md의 "저장 방식(localStorage → 서버 전환 가이드)" 참고.
 */

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem("codelearn_progress") || "{}");
  } catch (e) {
    return {};
  }
}

function saveProgress(missionId) {
  var progress = getProgress();
  progress[missionId] = true;
  localStorage.setItem("codelearn_progress", JSON.stringify(progress));
}

function getAllSavedCode() {
  try {
    return JSON.parse(localStorage.getItem("codelearn_code") || "{}");
  } catch (e) {
    return {};
  }
}

function getSavedCode(missionId) {
  return getAllSavedCode()[missionId] || null;
}

function saveCode(missionId, code) {
  var all = getAllSavedCode();
  all[missionId] = code;
  localStorage.setItem("codelearn_code", JSON.stringify(all));
}
