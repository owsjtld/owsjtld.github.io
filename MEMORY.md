# MEMORY (진행 상태 — 간결하게 유지)

## 현재 상태 (2026-07-24)

- **git**: `2026-07-18` 브랜치에서 계속 작업 중(같은 날짜면 새 브랜치 안 만들고 이어씀). **오늘 작업분은 아직 push 안 함** — 사용자가 "코드만 더 쓰고 push는 나중에"라고 명시적으로 보류함. `owsjtld.github.io`의 `code-learn` 브랜치도 예전에 CODE-LEARN 파일을 복사해 push한 이력이 있지만(로컬 클론은 세션 종료로 사라짐), 오늘 변경분은 아직 어디에도 반영 안 됨.
- **owsjtld.github.io**는 여러 서비스를 브랜치로 나눠 갖는 저장소(브랜치명=서비스명, 날짜 아님). 전역 메모리 `ref-owsjtld-github-io-repo` 참고.
- **전체 미션 49개**(입문 35 / 주니어 11 / 시니어 3). **원칙: 최종적으로 입문<주니어<시니어 순으로 개수가 많아져야 함** — 아직 반대, 지금은 괜찮음(CLAUDE.md 영구 기록).
- **오늘 추가한 것**:
  1. 미리보기 iframe에서 `alert()`/`confirm()`/`prompt()`가 전혀 안 뜨던 문제 발견·수정 — `sandbox="allow-scripts"`만 있으면 스펙상 모달이 막혀서 그랬음, `allow-modals` 추가(`editor.js`, `advanced-editor.js`). **아직 push 안 함.**
  2. "이 사이트(CODE-LEARN) 자체를 만들 수 있는 수준"이라는 주니어 목표에 비춰 빠져있던 JS 개념 6개를 입문 tier 미션으로 신규 추가: 템플릿 리터럴(`js-template-literal-intro`), 배열 `map`(`js-array-map-intro`), `.dataset`(`js-dataset-intro`), 이벤트 위임(`js-event-delegation-intro`), `localStorage`(`js-localstorage-intro`, 이 사이트의 진행도 저장 방식과 직접 연결지어 설명), URL 쿼리스트링 `URLSearchParams`(`js-url-params-intro`, `mission.html?id=` 방식과 연결지어 설명). `junior-pagination` 뒤, `js-module-import-intro` 앞에 배치. 전부 starter는 빈 채, 예시 코드로 check() 통과 확인 완료.
  3. (다른 창 CLI에서 동시 진행) 괄호/따옴표 자동닫기+type-over, 전체화면 스크롤 버그 수정 — CLAUDE.md에 영구 기록됨, 겹치는 파일 없이 병행 작업함.
- 이 사용자의 브라우저 localStorage는 여러 다른 프로젝트와 저장 공간을 공유함 — `localStorage.clear()` 절대 제안하지 말 것.

## 사이트 방향 (일부 확정 · 일부 논의 중)

벤치마킹한 3가지 유형: ① 챌린지/시안 제출형(Frontend Mentor, Frontend Practice) ② 브라우저 내장 에디터형(Scrimba, Codecademy — **CODE-LEARN이 이미 이 구조**) ③ UI 컴포넌트 bite-sized형(FrontendPro). **확정**: ②를 핵심 구조로 유지, 주니어는 ③ 스타일. ①은 이미지 에셋/제출 갤러리가 필요해 스트레치 목표로 보류 — **나중에 착수할 때 Claude가 먼저 사용자에게 시안 이미지를 가져다 달라고 요청할 것**(임의로 안 긁어옴). 단계별 목표는 CLAUDE.md "커리큘럼 단계별 목표" 절이 정답.

**미결정**: 어려운 디자인 챌린지(①) 티어에 한해 광고+로그인 수익 모델 제안받음 — "로그인/서버/DB 없음" 원칙과 충돌하는 큰 전환이라 별도 논의 필요. GitHub Pages는 소규모 트래픽엔 문제없지만 대규모 수익화엔 안 맞다고 안내함.

## 다음에 할 일 후보

- 오늘 작업분(CODE-LEARN, 필요시 owsjtld.github.io) push — 사용자가 요청할 때만.
- 미리보기 실행 실패 시 이유를 알려주는 장치 (postMessage 스파이크, CLAUDE.md "남은 할 일" 참고)
- 기존 주니어/시니어 미션(고급 에디터 파일럿 제외)을 새 탭/고급 에디터로 옮길지 결정
- 시니어 보안 주제 추가, 또는 ① 시안 챌린지 착수(사용자에게 이미지 요청 필요)
- 사용자에게 HTML/CSS/JS 직접 가르치는 세션 계속 진행 (사이트 제작과 별개로 이어갈 것)
