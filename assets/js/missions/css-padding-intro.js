import { anyRuleForTagHasProp } from "./helpers.js";

export default {
  id: "css-padding-intro",
  title: "안쪽 여백 주기 — padding",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "padding으로 테두리와 내용 사이에 여백을 줘봐요.",
  instructions:
    "<p><code>padding</code>은 테두리(border)와 그 안의 내용 사이에 여백을 주는 속성이에요. " +
    "padding이 없으면 글자가 테두리에 딱 붙어버려요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">padding 없이</div>" +
        "<iframe class=\"demo-frame\" title=\"padding 없이\" sandbox=\"\" " +
        "srcdoc=\"<style>div{border:2px solid #333;}</style><div>상자</div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">padding을 지정했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"padding 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>div{border:2px solid #333;padding:20px;}</style><div>상자</div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>div {\n  border: 2px solid #333;\n  padding: 20px;\n}</code></pre>" +
    "<p>에디터의 CSS에는 지난 미션에서 만든 border가 이미 들어있어요. 그 <code>div</code> " +
    "규칙에 <code>padding</code>을 추가해보세요.</p>",
  starter: {
    html: "<div>상자</div>",
    css: "div {\n  border: 2px solid #333;\n  /* 여기에 padding을 추가해보세요 */\n}"
  },
  check: function (code) {
    var rule = anyRuleForTagHasProp(code.css, "div", "padding");
    if (!rule) {
      return { pass: false, message: "div에 padding 속성을 추가해보세요 (예: padding: 20px;)." };
    }
    return { pass: true, message: "통과! padding으로 안쪽 여백을 잘 줬어요." };
  }
};
