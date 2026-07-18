# MEMORY (진행 상태 — 간결하게 유지)

## 현재 상태 (2026-07-18)

- **git**: `https://github.com/owsjtld/CODE-LEARN`의 `main`에 초기 커밋 push 완료. 그 이후 작업 전부(미션 30개, 에디터 기능 다수, 버그 수정, 커리큘럼 감사, 시니어 티어 신설) **아직 커밋 안 됨** — 사용자가 요청하면 커밋.
- **입문(HTML 로드맵+CSS 박스모델+`css-content-property`) + 주니어(컴포넌트 8개) 완료, 시니어 티어 신설(보안 주제 2개).** 전체 미션 30개, `TIERS=["전체","입문","주니어","시니어"]`. `MISSIONS` 배열 순서 = 커리큘럼 순서, 개별 내용은 `assets/js/missions/` 안 각 파일이 정답, 여기 반복 안 함.
- **2026-07-18: `missions-data.js` 하나(1500줄+)에 미션 30개가 다 몰려있던 걸 사용자가 지적해서, 미션 하나당 파일 하나(`assets/js/missions/<id>.js`)로 쪼갬.** 빌드 도구 없는 사이트라 브라우저 네이티브 ES 모듈(import/export)로 나눔 — `missions-data.js`가 이제 그 파일들을 커리큘럼 순서로 import해서 조립만 함. **트레이드오프: file://로 직접 열면 CORS 때문에 안 되고 로컬 서버가 필요함**(GitHub Pages 배포엔 문제없음) — 사용자에게 이 트레이드오프 확인받고 진행. `mission-page.js`와 `missions.html` 인라인 스크립트도 `type="module"`로 전환, `editor.js`/`storage.js`는 그대로 둬도 됨(모듈에서도 일반 스크립트의 전역은 그냥 보임). 자세한 내용 CLAUDE.md "아키텍처 핵심 결정"/"새 미션 추가하는 법" 참고 — **앞으로 미션 추가할 땐 큰 배열에 객체 추가가 아니라 `missions/`에 새 파일 + `missions-data.js`에 import 한 줄 추가하는 방식으로 바뀜.** 분리 후 기존 회귀 테스트(박스모델 7개, 주니어 18개, 시니어 6개, 복붙방지/content 5개) 전부 재실행해서 통과 확인함.
- **시니어 티어 첫 주제 = 웹 보안, "클라이언트 쪽 방어는 진짜 보안이 아니다"가 핵심 축(사용자가 복붙방지/CSS content 얘기하다가 도출).** `senior-xss-textcontent`(innerHTML 대신 textContent), `senior-eval-danger`(eval() 대신 Number()) 2개 완료. CLAUDE.md "커리큘럼 단계별 목표"에 다음 후보(클라이언트 검증의 한계, javascript: URL 등)도 적어둠 — 서버가 없는 사이트라 "타이핑해서 체험"하기 어려운 보안 주제는 신중히 설계할 것.
- **순서 버그가 반복해서 발생하는 실수 유형임이 확인됨(이번 세션에 2번: ul/li, div).** 새 미션 추가 시 그 미션이 쓰는 모든 태그가 이전 미션에서 이미 가르쳐졌는지 매번 확인할 것(CLAUDE.md에 영구 규칙 기록).
- **데모 iframe(`srcdoc`) 관련 버그 2건 발견 및 수정(둘 다 CLAUDE.md에 영구 기록):** ① `<\\/script>` 백슬래시 이스케이프는 틀린 방법 — HTML엔 백슬래시 이스케이프가 없어서 스크립트가 안 끝나고 조용히 실행이 안 됨(`js-textcontent-intro` 데모가 실제로 이래서 안 바뀌고 있었음) → `"<" + "/script>"` 문자열 분리로 고침. ② `srcdoc="..."` 안에서 중첩된 큰따옴표를 백슬래시로 이스케이프해도 HTML은 무시하고 그 자리에서 속성이 끊김(`senior-*` 데모 2개에서 실제로 겪음) → `&quot;` 엔티티로 고침.
- **CSS 채점 헬퍼(`parseCssRules`) 버그 수정함**: `border`/`padding`/`margin` 같은 축약 속성은 CSSOM이 개별 속성으로 풀어버려서 이름 그대로 못 잡던 문제 — `CSS_SHORTHAND_PROPS` 목록으로 별도 처리.
- `css-highlight-selector`(클래스 선택자), `html-div-span-basics`, 여러 주니어 미션은 학습자가 직접 클래스 이름을 짓고 그 이름 그대로 CSS/JS에서 찾아 동적으로 채점하는 방식 — 이 사이트의 관례.
- **미션 예시 코드(`<pre>`) 복붙 방지**: `user-select:none` + `copy` 이벤트 차단으로 이중 방어(CLAUDE.md 영구 정책, 새 예시 코드 UI 만들 때마다 같이 적용).
- 미션 페이지 버튼: `목록으로`(왼쪽) / `채점하기`(오른쪽, 통과하면 같은 버튼이 "다음 문제로 →"로 바뀜, 재방문 시 그 상태 유지). 코드 에디터(`assets/js/editor.js`, 외부 의존성 0개): 문법 강조+줄번호+자동 태그 닫기(표준 태그만, `KNOWN_HTML_TAGS`)+자동 들여쓰기+괄호 자동 내어쓰기+Tab/Shift+Tab 들여쓰기.
- 남은 백로그(급하지 않음): `html-semantic-content` 예시가 안 배운 `h2`를 그냥 씀 / `document.body` 개념 설명 안 함 / 폼 미션이 `label` for/id 연결 검증 안 함 / `strong`/`em`/`br`/`hr`/`blockquote` 미교육.
- 이 사용자의 브라우저 localStorage는 여러 다른 프로젝트와 저장 공간을 공유함 — `localStorage.clear()` 절대 제안하지 말 것. 호스팅은 GitHub Pages가 기본 추천안(미확정).

## 사이트 방향 (2026-07-18, 일부 확정 · 일부 논의 중)

벤치마킹한 3가지 유형: ① 챌린지/시안 제출형(Frontend Mentor, Frontend Practice) ② 브라우저 내장 에디터형(Scrimba, Codecademy — **CODE-LEARN이 이미 이 구조**) ③ UI 컴포넌트 bite-sized형(FrontendPro). **확정**: ②를 핵심 구조로 유지, 주니어는 ③ 스타일. ①은 이미지 에셋/제출 갤러리가 필요해 스트레치 목표로 보류 — **나중에 착수할 때 Claude가 먼저 사용자에게 시안 이미지를 가져다 달라고 요청할 것**(임의로 안 긁어옴). 단계별 목표는 CLAUDE.md "커리큘럼 단계별 목표" 절이 정답.

**미결정**: 어려운 디자인 챌린지(①) 티어에 한해 광고+로그인 수익 모델 제안받음 — "로그인/서버/DB 없음" 원칙과 충돌하는 큰 전환이라 별도 논의 필요. Claude 권고: 콘텐츠부터 늘리는 게 우선.

## 다음에 할 일 후보

- 주니어 컴포넌트 처음 목록(8개)과 시니어 첫 보안 미션(2개) 다 끝남 — 다음 방향(주니어 더 추가 / 백로그 채우기 / ① 시안 챌린지 착수 / 시니어 보안 주제 추가)을 사용자와 다시 상의해야 함.
- 사용자에게 HTML/CSS/JS를 직접 가르치는 세션 진행 (사이트 제작과 별개로 계속 이어갈 것).
