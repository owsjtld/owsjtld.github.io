import { findRuleForClass } from "./helpers.js";

export default {
  id: "css-flexbox-row-intro",
  title: "가로로 나란히 배치하기 — display: flex",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "display: flex로 세로로 쌓이던 요소들을 가로로 나란히 배치해봐요.",
  instructions:
    "<p>지금까지 만든 <code>div</code>들은 기본적으로 위에서 아래로 세로로 쌓여요. " +
    "여러 요소를 <strong>가로로 나란히</strong> 놓고 싶을 땐, 그 요소들을 감싸는 " +
    "부모에 <code>display: flex</code>를 지정해요. 그러면 그 안의 자식들이 한 줄로 " +
    "나란히 배치돼요. <code>gap</code>으로 그 사이 간격도 줄 수 있어요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">flex 없이 (세로로 쌓임)</div>" +
        "<iframe class=\"demo-frame\" title=\"flex 없이\" sandbox=\"\" " +
        "srcdoc=\"<div>1</div><div>2</div><div>3</div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">display: flex를 지정했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"flex 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.row{display:flex;gap:8px;}</style>" +
        "<div class='row'><div>1</div><div>2</div><div>3</div></div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>.row {\n  display: flex;\n  gap: 12px;\n}</code></pre>" +
    "<p>에디터에 <code>div.row</code> 안에 자식 <code>div</code> 3개가 준비되어 있어요. " +
    "<code>.row</code>에 <code>display: flex</code>를 지정해서 세 자식이 가로로 나란히 " +
    "놓이도록 만들어보세요.</p>",
  starter: {
    html: "<div class=\"row\">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>",
    css: "/* 여기에 .row에 display: flex를 지정해보세요 */"
  },
  check: function (code) {
    var rule = findRuleForClass(code.css, "row");
    if (!rule || !/flex/i.test(rule.declarations.display || "")) {
      return { pass: false, message: ".row에 display: flex를 지정해보세요." };
    }
    return { pass: true, message: "통과! display: flex로 자식들을 가로로 나란히 배치했어요." };
  }
};
