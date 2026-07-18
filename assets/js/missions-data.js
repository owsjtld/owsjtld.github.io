/**
 * 미션 목록 조립 파일. 실제 미션 내용은 assets/js/missions/ 폴더 안에 미션 하나당
 * 파일 하나로 나뉘어 있다 (2026-07-18, 미션이 30개까지 늘면서 파일 하나에 다 담겨있던
 * 걸 나눔). 이 파일은 그 파일들을 커리큘럼 순서대로 import해서 MISSIONS 배열로
 * 조립하기만 한다.
 *
 * 빌드 도구가 없는 정적 사이트라 여러 파일로 나누는 방법은 브라우저 네이티브
 * ES 모듈(import/export)을 쓴다 — 이 파일과 missions/ 안의 각 파일, 그리고 이걸
 * import하는 missions.html의 인라인 스크립트/mission-page.js도 전부
 * <script type="module">이어야 한다. **ES 모듈은 file://로 직접 열면 CORS 때문에
 * 동작하지 않는다 — 로컬에서 열어볼 땐 반드시 로컬 서버를 띄워서 http(s)://로
 * 접속해야 한다** (GitHub Pages 같은 실제 호스팅은 https://라서 문제없음). 이건
 * 사용자에게 그 트레이드오프를 확인받고 진행한 것 — 자세한 내용은 CLAUDE.md 참고.
 *
 * panels: 이 미션에서 보여줄 입력 칸 ("html" / "css" / "js" 중 일부). 아직 안 배운 언어의
 *   칸은 아예 존재하면 안 되므로, 그 미션에서 새로 다루는 것까지만 넣는다.
 * tier: missions.html의 단계 필터에 쓰이는 값 ("입문" / "주니어" / "시니어").
 *   missions.html의 TIERS 배열과 이름을 맞춰야 필터가 정상 동작한다.
 * check(code)는 { pass: boolean, message: string }을 반환해야 한다.
 * code는 { html, css, js } 형태의 "현재 입력 중인 코드 문자열"이다.
 *
 * 새 미션을 추가하려면: ① missions/ 안에 파일 하나 새로 만들고(다른 미션 파일 하나를
 * 참고해서 구조를 맞추면 됨), ② 아래에 import 한 줄과 배열 안에 그 항목 한 줄을
 * 커리큘럼상 알맞은 위치에 추가하면 된다. **그 미션이 쓰는 태그가 이 위치 이전의
 * 다른 미션에서 이미 가르쳐졌는지 꼭 확인할 것** — 반복해서 겪은 실수 유형이다
 * (자세한 내용은 CLAUDE.md "새 미션 추가하는 법" 참고).
 */

import htmlIntroCard from "./missions/html-intro-card.js";
import cssFontSizeIntro from "./missions/css-font-size-intro.js";
import cssHighlightSelector from "./missions/css-highlight-selector.js";
import htmlDivSpanBasics from "./missions/html-div-span-basics.js";
import cssBorderIntro from "./missions/css-border-intro.js";
import cssPaddingIntro from "./missions/css-padding-intro.js";
import cssMarginIntro from "./missions/css-margin-intro.js";
import jsTextcontentIntro from "./missions/js-textcontent-intro.js";
import htmlListUnordered from "./missions/html-list-unordered.js";
import htmlListOrdered from "./missions/html-list-ordered.js";
import htmlLinkBasics from "./missions/html-link-basics.js";
import htmlImageBasics from "./missions/html-image-basics.js";
import htmlSemanticSkeleton from "./missions/html-semantic-skeleton.js";
import htmlSemanticContent from "./missions/html-semantic-content.js";
import htmlTableBasics from "./missions/html-table-basics.js";
import htmlFormBasics from "./missions/html-form-basics.js";
import htmlStyleScriptEmbed from "./missions/html-style-script-embed.js";
import cssContentProperty from "./missions/css-content-property.js";
import jsClickEventIntro from "./missions/js-click-event-intro.js";
import jsClasslistToggleIntro from "./missions/js-classlist-toggle-intro.js";
import juniorDarkModeToggle from "./missions/junior-dark-mode-toggle.js";
import juniorCounterButton from "./missions/junior-counter-button.js";
import juniorAccordion from "./missions/junior-accordion.js";
import juniorModal from "./missions/junior-modal.js";
import juniorTabs from "./missions/junior-tabs.js";
import juniorStarRating from "./missions/junior-star-rating.js";
import juniorTodoList from "./missions/junior-todo-list.js";
import juniorFormValidation from "./missions/junior-form-validation.js";
import seniorXssTextcontent from "./missions/senior-xss-textcontent.js";
import seniorEvalDanger from "./missions/senior-eval-danger.js";

export var MISSIONS = [
  htmlIntroCard,
  cssFontSizeIntro,
  cssHighlightSelector,
  htmlDivSpanBasics,
  cssBorderIntro,
  cssPaddingIntro,
  cssMarginIntro,
  jsTextcontentIntro,
  htmlListUnordered,
  htmlListOrdered,
  htmlLinkBasics,
  htmlImageBasics,
  htmlSemanticSkeleton,
  htmlSemanticContent,
  htmlTableBasics,
  htmlFormBasics,
  htmlStyleScriptEmbed,
  cssContentProperty,
  jsClickEventIntro,
  jsClasslistToggleIntro,
  juniorDarkModeToggle,
  juniorCounterButton,
  juniorAccordion,
  juniorModal,
  juniorTabs,
  juniorStarRating,
  juniorTodoList,
  juniorFormValidation,
  seniorXssTextcontent,
  seniorEvalDanger
];

// 디버깅 편의용 — 콘솔에서 바로 MISSIONS를 볼 수 있게 전역에도 노출해둔다
// (다른 스크립트가 이 전역에 의존하지는 않음, 전부 import로 명시적으로 가져다 씀).
window.MISSIONS = MISSIONS;
