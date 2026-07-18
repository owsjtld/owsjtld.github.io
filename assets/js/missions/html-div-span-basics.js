import { findRuleForTag, findRuleForClass } from "./helpers.js";

export default {
  id: "html-div-span-basics",
  title: "div와 span — 의미 없는 범용 상자",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html", "css"],
  summary: "특별한 의미 없이 그냥 묶어서, CSS로 원하는 대로 자유롭게 꾸미는 div와 span을 배워봐요.",
  instructions:
    "<p><code>&lt;div&gt;</code>와 <code>&lt;span&gt;</code>은 지금까지 배운 태그들과 " +
    "다르게 <strong>아무 의미가 없는 그냥 상자</strong>예요. 의미가 없다는 게 오히려 장점인데, " +
    "다른 태그들처럼 정해진 역할이 없으니 CSS로 원하는 모양 뭐든 자유롭게 만들 수 있는 " +
    "빈 도화지가 되어주거든요.</p>" +
    "<ul>" +
      "<li><code>&lt;div&gt;</code> — 한 줄을 통째로 차지하는 상자(블록). 다른 요소들을 " +
      "덩어리로 묶을 때 써요.</li>" +
      "<li><code>&lt;span&gt;</code> — 줄바꿈 없이 문장 중간에 낄 수 있는 상자(인라인). 긴 " +
      "문장 중 일부 단어만 콕 집어 스타일을 주고 싶을 때 써요.</li>" +
    "</ul>" +
    "<p>CSS 없이는 그냥 밋밋한 텍스트일 뿐이지만, 클래스를 붙이고 CSS를 입히면 완전히 " +
    "달라져요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS 없이 (그냥 빈 상자)</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 없이\" sandbox=\"\" " +
        "srcdoc=\"<div>카드 내용</div>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS로 자유롭게 꾸몄을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.card{background:#333;color:#fff;padding:16px;border-radius:8px;}</style>" +
        "<div class='card'>카드 내용</div>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;div class=\"card\"&gt;\n  &lt;p&gt;이 안의 내용은 함께 묶여요.&lt;/p&gt;\n&lt;/div&gt;\n\n" +
    "&lt;p&gt;이 문장 중 &lt;span class=\"highlight\"&gt;일부만&lt;/span&gt; 강조하고 싶을 때는 " +
    "span을 써요.&lt;/p&gt;</code></pre>" +
    "<pre><code>.card {\n  background: #333;\n  color: #fff;\n  padding: 16px;\n}</code></pre>" +
    "<p>나중에 배울 <code>header</code>/<code>nav</code>/<code>main</code> 같은 " +
    "태그들은 div와 생긴 건 비슷하지만 \"여기는 이런 역할\"이라는 의미가 있어요 — div/span은 " +
    "그런 의미가 전혀 없는 순수한 상자라는 게 차이예요.</p>" +
    "<p>에디터에 <code>div</code> 태그 하나와 <code>span</code> 태그 하나를 만들고, 각각 안에 " +
    "내용을 채운 뒤, 둘 중 하나 이상에 원하는 이름으로 <code>class</code>를 붙이고 CSS로 " +
    "자유롭게 스타일을 입혀보세요.</p>",
  starter: {
    html: "<!-- 여기에 div 태그와 span 태그를 각각 만들어보세요 -->",
    css: "/* 여기에 div 또는 span을 CSS로 꾸며보세요 */"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var div = doc.querySelector("div");
    if (!div || !div.textContent.trim()) {
      return { pass: false, message: "div 태그를 만들고 안에 내용을 넣어보세요." };
    }
    var span = doc.querySelector("span");
    if (!span || !span.textContent.trim()) {
      return { pass: false, message: "span 태그를 만들고 안에 내용을 넣어보세요." };
    }
    var divStyled = findRuleForTag(code.css, "div");
    var spanStyled = findRuleForTag(code.css, "span");
    var classedEls = Array.prototype.slice.call(doc.querySelectorAll("[class]"));
    var classStyled = classedEls.some(function (el) {
      return el.className.split(/\s+/).some(function (c) {
        var rule = c && findRuleForClass(code.css, c);
        return rule && Object.keys(rule.declarations).length > 0;
      });
    });
    var hasStyle =
      (divStyled && Object.keys(divStyled.declarations).length > 0) ||
      (spanStyled && Object.keys(spanStyled.declarations).length > 0) ||
      classStyled;
    if (!hasStyle) {
      return {
        pass: false,
        message: "CSS로 div나 span 중 하나 이상을 자유롭게 꾸며보세요 (태그 선택자나 직접 지은 클래스 선택자 둘 다 괜찮아요)."
      };
    }
    return { pass: true, message: "통과! div와 span을 만들고 CSS로 자유롭게 꾸며봤어요." };
  }
};
