import { anyRuleForTagHasProp } from "./helpers.js";

export default {
  id: "css-margin-intro",
  title: "바깥 여백 주기 — margin",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "margin으로 요소와 요소 사이에 간격을 줘봐요.",
  instructions:
    "<p><code>margin</code>은 테두리 <strong>바깥쪽</strong>, 즉 이 요소와 다른 요소 사이의 " +
    "간격을 주는 속성이에요. padding이 안쪽 여백이라면 margin은 바깥쪽 여백이에요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">margin 없이 (상자끼리 붙음)</div>" +
        "<iframe class=\"demo-frame\" title=\"margin 없이\" sandbox=\"\" " +
        "srcdoc=\"<style>div{border:2px solid #333;padding:10px;}</style><div>상자1</div><div>상자2</div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">margin을 지정했을 때 (간격이 생김)</div>" +
        "<iframe class=\"demo-frame\" title=\"margin 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>div{border:2px solid #333;padding:10px;margin:10px;}</style><div>상자1</div><div>상자2</div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>div {\n  border: 2px solid #333;\n  padding: 10px;\n  margin: 10px;\n}</code></pre>" +
    "<p>에디터에는 상자 두 개(<code>div</code>)가 있어요. 그 <code>div</code> 규칙에 " +
    "<code>margin</code>을 추가해서 두 상자 사이에 간격을 만들어보세요.</p>",
  starter: {
    html: "<div>상자1</div>\n<div>상자2</div>",
    css: "div {\n  border: 2px solid #333;\n  padding: 10px;\n  /* 여기에 margin을 추가해보세요 */\n}"
  },
  check: function (code) {
    var rule = anyRuleForTagHasProp(code.css, "div", "margin");
    if (!rule) {
      return { pass: false, message: "div에 margin 속성을 추가해보세요 (예: margin: 10px;)." };
    }
    return { pass: true, message: "통과! margin으로 바깥쪽 간격을 잘 줬어요." };
  }
};
