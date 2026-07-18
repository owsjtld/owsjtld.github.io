import { anyRuleForTagHasProp } from "./helpers.js";

export default {
  id: "css-border-intro",
  title: "테두리 그리기 — border",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "border로 요소 둘레에 테두리를 그려봐요.",
  instructions:
    "<p><code>border</code>는 요소 둘레에 테두리를 그리는 속성이에요. " +
    "<code>굵기 스타일 색</code> 순서로 한 번에 적어요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">border 없이</div>" +
        "<iframe class=\"demo-frame\" title=\"border 없이\" sandbox=\"\" " +
        "srcdoc=\"<div>상자</div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">border를 지정했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"border 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>div{border:2px solid #333;}</style><div>상자</div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>div {\n  border: 2px solid #333;\n}</code></pre>" +
    "<p>에디터의 HTML에는 <code>div</code>가 이미 준비되어 있어요. CSS 칸에 그 " +
    "<code>div</code>의 <code>border</code>를 지정해보세요.</p>",
  starter: {
    html: "<div>상자</div>",
    css: "/* 여기에 div의 border를 지정해보세요 */"
  },
  check: function (code) {
    var rule = anyRuleForTagHasProp(code.css, "div", "border");
    if (!rule) {
      return { pass: false, message: "div에 border 속성을 추가해보세요 (예: border: 2px solid #333;)." };
    }
    return { pass: true, message: "통과! border로 테두리를 잘 그렸어요." };
  }
};
