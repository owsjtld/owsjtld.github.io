import { findRuleForTag } from "./helpers.js";

export default {
  id: "html-style-script-embed",
  title: "한 파일에 CSS/JS 합치기 — style, script 태그",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "지금까지 나눠서 쓴 CSS/JS를 style과 script 태그로 HTML 안에 직접 넣어봐요.",
  instructions:
    "<p>지금까지는 이 사이트의 CSS 칸, JS 칸에 각각 나눠서 코드를 썼어요. 하지만 실제로 웹사이트를 " +
    "만들 땐 HTML 파일 하나 안에 CSS와 JS를 같이 넣는 경우가 많아요. <code>&lt;style&gt;</code> 태그 " +
    "안에 CSS 규칙을 쓰고, <code>&lt;script&gt;</code> 태그 안에 JS 코드를 쓰면 돼요 — 지금까지 배운 " +
    "CSS/JS 문법을 그대로, 위치만 HTML 안으로 옮기는 거예요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;style&gt;\n  h1 { color: blue; }\n&lt;/style&gt;\n\n&lt;h1&gt;안녕하세요&lt;/h1&gt;\n\n" +
    "&lt;script&gt;\n  document.querySelector(\"h1\").textContent = \"반가워요!\";\n" +
    "&lt;/script&gt;</code></pre>" +
    "<p>이 미션은 HTML 칸 하나뿐이에요(CSS/JS 칸이 따로 없어요). 그 안에 <code>h1</code> 태그를 " +
    "만들고, <code>&lt;style&gt;</code> 태그로 그 h1의 색을 바꾸는 CSS를, <code>&lt;script&gt;</code> " +
    "태그로 그 h1의 글자를 바꾸는 JS를 직접 넣어보세요.</p>",
  starter: {
    html: "<!-- 여기에 h1, style, script를 모두 직접 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var h1 = doc.querySelector("h1");
    if (!h1 || !h1.textContent.trim()) {
      return { pass: false, message: "h1 태그를 만들고 내용을 적어보세요." };
    }
    var styleEl = doc.querySelector("style");
    if (!styleEl) {
      return { pass: false, message: "<style> 태그를 만들어보세요." };
    }
    var styleRule = findRuleForTag(styleEl.textContent, "h1");
    if (!styleRule || Object.keys(styleRule.declarations).length === 0) {
      return { pass: false, message: "<style> 태그 안에 h1을 선택하는 CSS 규칙을 만들어보세요." };
    }
    var scriptEl = doc.querySelector("script");
    if (!scriptEl) {
      return { pass: false, message: "<script> 태그를 만들어보세요." };
    }
    var jsRe = /document\s*\.\s*querySelector\s*\(\s*(['"`])h1\1\s*\)\s*\.\s*textContent\s*=\s*(['"`])([^'"`]*)\2/i;
    var match = jsRe.exec(scriptEl.textContent);
    if (!match || !match[3].trim()) {
      return {
        pass: false,
        message: '<script> 태그 안에 document.querySelector("h1").textContent = "..."; 로 h1의 글자를 바꿔보세요.'
      };
    }
    return { pass: true, message: "통과! style과 script 태그로 CSS/JS를 HTML 안에 잘 합쳤어요." };
  }
};
