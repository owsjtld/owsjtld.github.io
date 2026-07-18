import { findRuleForTag } from "./helpers.js";

export default {
  id: "css-font-size-intro",
  title: "CSS 추가하기 — 글자 크기 바꾸기",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  startFromMission: "html-intro-card",
  summary: "이제 CSS 칸이 추가돼요. 지난 미션의 HTML을 그대로 가져와 CSS로 글자 크기를 바꿔볼게요.",
  instructions:
    "<p>HTML만으로는 글자 크기나 색깔 같은 걸 바꿀 수 없어요. 이제부터 <strong>CSS</strong> 칸이 새로 생겨요 — " +
    "CSS를 추가하면 같은 HTML도 완전히 다르게 꾸밀 수 있어요. HTML 칸에는 지난 " +
    "\"나만의 소개 카드\" 미션에서 직접 작성한 h1/p가 그대로 들어있어요 (그 미션을 안 했다면 예시 문장이 대신 들어가요).</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS 없이</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 없이\" sandbox=\"\" " +
        "srcdoc=\"<h1>안녕하세요</h1>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS로 font-size를 지정했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>h1{font-size:48px;}</style><h1>안녕하세요</h1>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p>이렇게 <code>font-size</code> 속성으로 글자 크기를 지정할 수 있어요. 아래 예시처럼 CSS 칸에 직접 타이핑해보세요.</p>" +
    "<pre><code>h1 {\n  font-size: 48px;\n}</code></pre>" +
    "<p>CSS 칸에 <code>h1</code> 선택자를 만들고 <code>font-size</code>를 원하는 크기로 지정해보세요.</p>",
  starter: {
    html: "<h1>안녕하세요</h1>\n<p>이 문장은 원래 크기 그대로 둘 거예요.</p>",
    css: "/* 여기에 h1의 font-size를 지정해보세요 */"
  },
  check: function (code) {
    var rule = findRuleForTag(code.css, "h1");
    if (!rule) {
      return { pass: false, message: "h1을 선택하는 CSS 규칙을 만들어보세요." };
    }
    if (!rule.declarations["font-size"]) {
      return { pass: false, message: "h1 규칙 안에 font-size 속성을 추가해보세요." };
    }
    return { pass: true, message: "통과! CSS로 글자 크기를 잘 바꿨어요." };
  }
};
