import { findRuleForClass } from "./helpers.js";

export default {
  id: "css-flexbox-justify-align-intro",
  title: "양 끝에 배치하고 가운데 정렬하기 — justify-content, align-items",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "이 사이트의 상단 헤더처럼, 로고는 왼쪽 끝에 메뉴는 오른쪽 끝에 놓고 세로로도 가운데 맞춰봐요.",
  instructions:
    "<p>사실 이 사이트 맨 위의 헤더(로고는 왼쪽, 메뉴는 오른쪽)도 <code>display: flex</code>로 " +
    "만들어져 있어요. <code>flex</code>를 지정한 부모에는 자식들을 더 세밀하게 배치하는 " +
    "속성 두 개를 추가로 쓸 수 있어요.</p>" +
    "<ul>" +
      "<li><code>justify-content</code> — 가로 방향 배치. <code>space-between</code>이면 " +
      "첫 자식은 맨 왼쪽, 마지막 자식은 맨 오른쪽으로 밀리고 남는 공간이 사이사이에 " +
      "분배돼요.</li>" +
      "<li><code>align-items</code> — 세로 방향 배치. <code>center</code>면 자식들이 " +
      "세로 가운데로 정렬돼요.</li>" +
    "</ul>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">flex만 있을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"flex만\" sandbox=\"\" " +
        "srcdoc=\"<style>.bar{display:flex;height:60px;border:1px solid #999;}</style>" +
        "<div class='bar'><div>로고</div><div>메뉴</div></div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">justify-content/align-items 적용 후</div>" +
        "<iframe class=\"demo-frame\" title=\"적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.bar{display:flex;justify-content:space-between;align-items:center;" +
        "height:60px;border:1px solid #999;}</style>" +
        "<div class='bar'><div>로고</div><div>메뉴</div></div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>.bar {\n  display: flex;\n  justify-content: space-between;\n" +
    "  align-items: center;\n}</code></pre>" +
    "<p>에디터의 CSS에는 <code>.header-demo</code>에 <code>display: flex</code>가 이미 " +
    "지정되어 있어요. 그 규칙에 <code>justify-content: space-between</code>과 " +
    "<code>align-items: center</code>를 추가해서, 로고는 왼쪽 끝에 메뉴는 오른쪽 끝에, " +
    "그리고 세로로는 가운데에 오도록 만들어보세요.</p>",
  starter: {
    html:
      "<div class=\"header-demo\">\n" +
      "  <div class=\"logo\">LOGO</div>\n" +
      "  <div class=\"menu\">메뉴</div>\n" +
      "</div>",
    css:
      ".header-demo {\n  display: flex;\n  height: 60px;\n  border: 1px solid #999;\n" +
      "  /* 여기에 justify-content와 align-items를 추가해보세요 */\n}"
  },
  check: function (code) {
    var rule = findRuleForClass(code.css, "header-demo");
    if (!rule) {
      return { pass: false, message: ".header-demo 규칙을 찾을 수 없어요." };
    }
    if (!/space-between/i.test(rule.declarations["justify-content"] || "")) {
      return { pass: false, message: "justify-content: space-between을 추가해보세요." };
    }
    if (!/center/i.test(rule.declarations["align-items"] || "")) {
      return { pass: false, message: "align-items: center를 추가해보세요." };
    }
    return { pass: true, message: "통과! justify-content와 align-items로 헤더처럼 배치했어요." };
  }
};
