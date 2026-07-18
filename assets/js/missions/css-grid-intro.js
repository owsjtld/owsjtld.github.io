import { findRuleForClass } from "./helpers.js";

export default {
  id: "css-grid-intro",
  title: "칸 맞춰 격자로 배치하기 — display: grid",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "display: grid로 카드들을 여러 줄, 여러 칸의 격자 모양으로 배치해봐요.",
  instructions:
    "<p>이 사이트의 미션 카드 목록이나 홈 화면의 카드들도 <code>display: grid</code>로 " +
    "배치돼 있어요. flex가 한 줄로 나란히 놓는 거라면, <code>grid</code>는 " +
    "<strong>가로세로 칸을 정해두고</strong> 그 칸에 맞춰 요소들을 배치해요.</p>" +
    "<ul>" +
      "<li><code>display: grid</code> — 이 부모를 격자로 만들어요.</li>" +
      "<li><code>grid-template-columns</code> — 세로 칸(열)을 몇 개, 어떤 너비로 나눌지 " +
      "정해요. <code>repeat(3, 1fr)</code>은 \"똑같은 너비(1fr)로 3칸\"이라는 뜻이에요.</li>" +
      "<li><code>gap</code> — 칸 사이의 간격이에요.</li>" +
    "</ul>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">grid 없이 (세로로 쌓임)</div>" +
        "<iframe class=\"demo-frame\" title=\"grid 없이\" sandbox=\"\" " +
        "srcdoc=\"<style>div div{border:1px solid #999;padding:8px;}</style>" +
        "<div><div>1</div><div>2</div><div>3</div><div>4</div></div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">display: grid 적용 후 (3칸 격자)</div>" +
        "<iframe class=\"demo-frame\" title=\"grid 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}" +
        ".g div{border:1px solid #999;padding:8px;}</style>" +
        "<div class='g'><div>1</div><div>2</div><div>3</div><div>4</div></div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>.grid-demo {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n" +
    "  gap: 12px;\n}</code></pre>" +
    "<p>(참고: 실제 이 사이트의 카드 목록은 화면 너비에 따라 칸 수가 자동으로 바뀌는 " +
    "<code>repeat(auto-fit, minmax(220px, 1fr))</code>이라는 더 응용된 값을 쓰는데, 지금은 " +
    "기본이 되는 고정 칸 수 방식부터 연습해요.)</p>" +
    "<p>에디터에 <code>div.grid-demo</code> 안에 자식 <code>div</code> 4개가 준비되어 " +
    "있어요. <code>.grid-demo</code>에 <code>display: grid</code>와 " +
    "<code>grid-template-columns</code>를 지정해서 격자로 배치해보세요.</p>",
  starter: {
    html:
      "<div class=\"grid-demo\">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n</div>",
    css: "/* 여기에 .grid-demo에 display: grid와 grid-template-columns를 지정해보세요 */"
  },
  check: function (code) {
    var rule = findRuleForClass(code.css, "grid-demo");
    if (!rule || !/grid/i.test(rule.declarations.display || "")) {
      return { pass: false, message: ".grid-demo에 display: grid를 지정해보세요." };
    }
    if (!rule.declarations["grid-template-columns"] || !rule.declarations["grid-template-columns"].trim()) {
      return { pass: false, message: "grid-template-columns로 칸을 몇 개로 나눌지 지정해보세요 (예: repeat(3, 1fr))." };
    }
    return { pass: true, message: "통과! display: grid로 격자 모양을 잘 만들었어요." };
  }
};
