# MEMORY (진행 상태 — 간결하게 유지)

## 현재 상태 (2026-07-18)

- **git**: `main`은 초기 커밋만 있음. 오늘 작업분은 `2026-07-18` 브랜치에 있고 최신 커밋 몇 개는 아직 push 전(이번에 고친/추가한 미션 파일들, CLAUDE.md/MEMORY.md는 보류 중). 브랜치/PR 정책은 CLAUDE.md "저장소 정책"에 영구 기록.
- **owsjtld.github.io** (별도 저장소, GitHub Pages 개인 사이트)에 CODE-LEARN을 `code-learn` 브랜치로 배포, 사용자가 직접 main에 병합해서 https://owsjtld.github.io/ 에서 실제로 서비스 중. 이 저장소는 브랜치명을 날짜가 아니라 서비스명으로 짓는 별도 규칙 — 전역 메모리 `ref-owsjtld-github-io-repo` 참고. main엔 이전에 사용자가 운영하던 "연암 독서록 AI 채점 시스템"이 있었고 `연암ai평가기` 브랜치로 보존해둠.
- **구글 애널리틱스**(측정 ID `G-DD7N8WWRGM`) 4개 HTML 페이지에 붙임, CODE-LEARN/owsjtld.github.io 양쪽 다 반영 완료. 애드센스(광고)는 아직 미가입 — 사용자가 가입/승인받으면 그 코드 붙여주기로 함.
- **전체 미션 43개** (`assets/js/missions/` 안 파일 하나당 미션 하나, `missions-data.js`가 커리큘럼 순서로 조립). 입문 29 / 주니어 11 / 시니어 3. **원칙: 최종적으로는 입문<주니어<시니어 순으로 미션 개수가 많아져야 함(CLAUDE.md에 영구 기록, 2026-07-18)** — 지금 한창 만드는 중이라 아직 안 지켜도 됨.
- **레이아웃(flexbox/grid) 공백 해소함(2026-07-18).** 사용자가 "지금 만든 미션만으로 이 사이트를 만들 수 있냐"고 물어봐서 점검하다가, flexbox/grid를 하나도 안 가르쳤다는 큰 공백을 발견 — `css-flexbox-row-intro`/`css-flexbox-justify-align-intro`/`css-grid-intro` 3개를 박스모델(margin) 바로 뒤, JS 시작 전에 추가함. 이 사이트 헤더(`justify-content:space-between`)와 카드 그리드(`display:grid`) 패턴을 그대로 예시로 씀.
- **멀티파일(탭) 고급 에디터 파일럿 완료(2026-07-18).** 남은 공백 중 "ES 모듈(여러 파일로 나누기)"은 기존 단일 파일 에디터 구조로는 절대 못 가르친다는 걸 확인하고, `assets/js/advanced-editor.js`(탭+전체화면+실행 버튼)를 새로 만들어 파일럿 미션 `js-module-import-intro` 1개로 검증함 — Playwright로 실제 cross-file `import` 실행, 탭 전환, 저장/복원까지 전부 통과. 핵심 함정(Blob은 iframe 내부에서 만들어야 함 등)은 CLAUDE.md "아키텍처 핵심 결정"에 영구 기록. **기존 주니어/시니어 미션 11+2개를 이 에디터로 옮기는 건 아직 안 함 — 파일럿 결과 사용자와 상의 후 결정.** 남은 공백: localStorage(이 에디터로도 미리보기 iframe이 여전히 opaque origin이라 아직 못 풂), 코드 에디터 자체 구현(난이도상 미션화 부적합).
- **단일 파일 에디터가 이제 전체 미션에서 탭 UI로 통일됨(2026-07-18, 최종 상태).** `createPlayground`에 `tabbed`(html/css/js를 칸별로 쌓지 않고 탭으로 전환)와 `autoRun`(자동실행 여부) 옵션 추가, `mission.html` 전체(입문 포함)에 `tabbed:true` 공통 적용. **`autoRun`은 같은 세션 안에서 두 번 바뀌어서 결국 다시 전체 `true`(자동실행)로 정착함** — 주니어/시니어만 버튼 방식으로 뒀던 이유(타이핑 중 미완성 상태가 깜빡임)를, 아래 `{`→`}` 자동 닫기로 근본 원인을 고치고 나서 "홈 화면 문구와도 맞아야 한다"며 되돌림. 전체화면은 에디터만이 아니라 `.playground` 전체(에디터+미리보기 두 칸)를 확장. `sandbox.html`은 그대로 예전 3칸 스택+자동실행.
- **CSS/JS의 "{" 자동 닫기 추가(`maybeAutoCloseBracket`, 2026-07-18, 사용자 요청).** HTML 태그 자동 닫기와 같은 패턴. `(`/`[`는 type-over 처리 없이 넣으면 오히려 중복 괄호 위험이 있어 일부러 안 넣음. **채점/미리보기를 "닫는 중괄호·세미콜론 없으면 실패"로 엄격하게 만들지는 않았음** — CSS 스펙상 파일 끝 미종료 블록/마지막 선언 세미콜론 생략은 실제로 정당한 문법이라, 엄격화하면 오히려 잘못된 걸 가르치게 됨. 자세한 내용 CLAUDE.md 참고.
- 2026-07-18에 커리큘럼 전체 재검토 후 5건 수정 + 12개 미션 신규 추가함(전부 Playwright로 채점 흐름/실제 동작까지 검증함):
  - 수정: `html-semantic-content` 예시의 미교육 태그 h2→h1 교체 / `junior-dark-mode-toggle`에 `document.body` 설명 추가 / `html-form-basics`가 label for/id 연결까지 검증하도록 강화 / `html-image-basics`의 죽은 placeholder URL 교체 / `junior-star-rating` 채점 허점(별과 무관한 곳에서 클래스만 add해도 통과되던 것) 보강.
  - 신규(입문): `html-strong-em`, `html-br-hr`, `html-blockquote`, `js-array-loop-intro`(배열+forEach), `js-object-basics`(객체 `{키:값}`), `js-array-slice-intro`(`slice`로 배열 자르기).
  - 신규(주니어): `junior-filter-buttons`(`querySelectorAll`+`NodeList.forEach`+`data-*`/`getAttribute` 최초 도입), `junior-card-list`(객체 배열+forEach로 카드 여러 개 생성), `junior-pagination`(`slice`+`Math.ceil`+상태 변수를 바꾸고 다시 그리는 `render` 함수 패턴 최초 도입).
  - **이 사이트(CODE-LEARN) 자체가 쓰는 주니어급 UI 패턴(다크모드/필터/카드 목록/페이지네이션)은 이제 전부 미션으로 커버됨.** 이전 백로그였던 `strong`/`em`/`br`/`hr`/`blockquote` 미교육 문제도 해소됨.
- 코드 에디터/채점 방식/보안 정책/미션 추가 절차 등 세부 아키텍처 결정은 전부 CLAUDE.md에 영구 기록되어 있음 — 여기서 반복 안 함.
- 이 사용자의 브라우저 localStorage는 여러 다른 프로젝트와 저장 공간을 공유함 — `localStorage.clear()` 절대 제안하지 말 것.

## 사이트 방향 (일부 확정 · 일부 논의 중)

벤치마킹한 3가지 유형: ① 챌린지/시안 제출형(Frontend Mentor, Frontend Practice) ② 브라우저 내장 에디터형(Scrimba, Codecademy — **CODE-LEARN이 이미 이 구조**) ③ UI 컴포넌트 bite-sized형(FrontendPro). **확정**: ②를 핵심 구조로 유지, 주니어는 ③ 스타일. ①은 이미지 에셋/제출 갤러리가 필요해 스트레치 목표로 보류 — **나중에 착수할 때 Claude가 먼저 사용자에게 시안 이미지를 가져다 달라고 요청할 것**(임의로 안 긁어옴). 단계별 목표는 CLAUDE.md "커리큘럼 단계별 목표" 절이 정답.

**미결정**: 어려운 디자인 챌린지(①) 티어에 한해 광고+로그인 수익 모델 제안받음 — "로그인/서버/DB 없음" 원칙과 충돌하는 큰 전환이라 별도 논의 필요. 애널리틱스/광고 관련 논의는 이미 진행함(위 참고), GitHub Pages는 소규모 트래픽엔 문제없지만 대규모 수익화엔 안 맞다고 안내함.

## 다음에 할 일 후보

- 주니어 UI 패턴(다크모드/필터/카드 목록/페이지네이션)은 다 커버됨 — 다음 주니어 확장은 새 컴포넌트 발굴부터 필요
- 시니어 보안 주제 추가, 또는 ① 시안 챌린지 착수(사용자에게 이미지 요청 필요)
- 사용자에게 HTML/CSS/JS 직접 가르치는 세션 계속 진행 (사이트 제작과 별개로 이어갈 것)
