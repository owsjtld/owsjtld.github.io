# MEMORY (진행 상태 — 간결하게 유지)

## 현재 상태 (2026-07-24)

- **git**: `2026-07-18` 브랜치에서 계속 작업 중(같은 날짜면 새 브랜치 안 만들고 이어씀). 오늘 작업분은 CODE-LEARN(`2026-07-18`)과 `owsjtld.github.io`(`code-learn`) 양쪽 다 push 완료 — **단, `owsjtld.github.io` 쪽은 `code-learn` → `main` 병합을 사용자가 직접 해야 실제 라이브 사이트(`https://owsjtld.github.io/`)에 반영된다** (Claude는 main 병합 안 함).
- **owsjtld.github.io**는 여러 서비스를 브랜치로 나눠 갖는 저장소(브랜치명=서비스명, 날짜 아님). 전역 메모리 `ref-owsjtld-github-io-repo` 참고.
- **전체 미션 48개**(입문 34 / 주니어 11 / 시니어 3). **원칙: 최종적으로 입문<주니어<시니어 순으로 개수가 많아져야 함** — 아직 반대, 지금은 괜찮음(CLAUDE.md 영구 기록).
- **오늘 추가한 것, 전부 CLAUDE.md에 세부 내용 영구 기록됨(여기서 반복 안 함)**:
  1. 미리보기 iframe에서 `alert()` 등 모달이 안 뜨던 문제 수정(`allow-modals` 추가).
  2. `localStorage`/`sessionStorage`/`document.cookie`/`indexedDB`가 이 iframe 안에서 origin이 없어(opaque) 절대 못 쓴다는 걸 헤드리스 크롬으로 검증 — 이걸 쓰는 `js-localstorage-intro` 미션은 만들었다가 삭제함. **앞으로 미션 만들 때 이 네 API를 실제로 호출하게 하면 안 됨.**
  3. 커리큘럼 공백을 메우는 JS 미션 5개 추가(템플릿 리터럴/`map`/`.dataset`/이벤트 위임/URL 쿼리스트링) — `junior-pagination` 뒤에 배치.
  4. **미리보기 실행 실패를 알려주는 "콘솔" 패널 완성** — `postMessage`로 iframe 안 에러를 부모에 보고하고 `.preview-console`(터미널 느낌)에 표시. 실제 서버 띄우고 Playwright로 정상/에러/재실행 시나리오 다 확인함.
  5. (다른 창 CLI에서 동시 진행) 괄호/따옴표 자동닫기+type-over, 전체화면 스크롤 버그 수정 — 겹치는 파일 없이 병행 작업함.
- 이 사용자의 브라우저 localStorage는 여러 다른 프로젝트와 저장 공간을 공유함 — `localStorage.clear()` 절대 제안하지 말 것.

## 사이트 방향 (일부 확정 · 일부 논의 중)

벤치마킹한 3가지 유형: ① 챌린지/시안 제출형(Frontend Mentor, Frontend Practice) ② 브라우저 내장 에디터형(Scrimba, Codecademy — **CODE-LEARN이 이미 이 구조**) ③ UI 컴포넌트 bite-sized형(FrontendPro). **확정**: ②를 핵심 구조로 유지, 주니어는 ③ 스타일. ①은 이미지 에셋/제출 갤러리가 필요해 스트레치 목표로 보류 — **나중에 착수할 때 Claude가 먼저 사용자에게 시안 이미지를 가져다 달라고 요청할 것**(임의로 안 긁어옴). 단계별 목표는 CLAUDE.md "커리큘럼 단계별 목표" 절이 정답.

**미결정**: 어려운 디자인 챌린지(①) 티어에 한해 광고+로그인 수익 모델 제안받음 — "로그인/서버/DB 없음" 원칙과 충돌하는 큰 전환이라 별도 논의 필요. GitHub Pages는 소규모 트래픽엔 문제없지만 대규모 수익화엔 안 맞다고 안내함.

## 다음에 할 일 후보

- `owsjtld.github.io`의 `code-learn` → `main` 병합(사용자가 직접) 후 실제 라이브 사이트에서 alert/콘솔 패널 재확인.
- 기존 주니어/시니어 미션(고급 에디터 파일럿 제외)을 새 탭/고급 에디터로 옮길지 결정
- 시니어 보안 주제 추가, 또는 ① 시안 챌린지 착수(사용자에게 이미지 요청 필요)
- 사용자에게 HTML/CSS/JS 직접 가르치는 세션 계속 진행 (사이트 제작과 별개로 이어갈 것)
