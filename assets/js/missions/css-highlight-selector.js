import { findRuleForClass } from "./helpers.js";

export default {
  id: "css-highlight-selector",
  title: "CSS 선택자로 강조하기",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "원하는 이름으로 직접 클래스를 만들고, 그 클래스를 CSS로 선택해서 스타일을 입혀봐요.",
  instructions:
    "<p>지난 미션에서는 <code>h1</code>처럼 태그 이름으로 선택했다면, 이번엔 <strong>클래스 선택자</strong>로 " +
    "여러 개 중 원하는 요소만 골라 꾸며볼게요. 이번엔 클래스 이름이 미리 정해져 있지 않아요 — " +
    "<strong>직접 이름을 정해서</strong> HTML에 붙이고, 그 이름 그대로 CSS에서 선택해볼 거예요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">클래스만 붙였을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"클래스만 붙였을 때\" sandbox=\"\" " +
        "srcdoc=\"<p>사과</p><p class='my-class'>바나나</p><p>포도</p>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS로 그 클래스를 선택했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.my-class{color:orange;font-weight:bold;}</style>" +
        "<p>사과</p><p class='my-class'>바나나</p><p>포도</p>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p>이렇게 요소에 <code>class=\"클래스이름\"</code>을 붙이고, CSS에서 <code>.클래스이름</code> " +
    "(맨 앞에 점)으로 선택하면 같은 태그(<code>&lt;p&gt;</code>) 중에서도 원하는 것만 골라 " +
    "스타일을 줄 수 있어요. 예를 들어 이렇게요.</p>" +
    "<pre><code>&lt;p class=\"my-class\"&gt;바나나&lt;/p&gt;</code></pre>" +
    "<pre><code>.my-class {\n  color: orange;\n}</code></pre>" +
    "<p>아래 문단들 중 강조하고 싶은 것 하나 이상에 원하는 이름으로 <code>class</code>를 " +
    "직접 추가하고, CSS 칸에 그 클래스를 선택하는 규칙을 만들어서 <code>color</code>를 " +
    "입혀보세요 (예시 그대로 <code>my-class</code>를 써도 되고, 다른 이름을 지어도 돼요).</p>",
  starter: {
    html:
      "<p>사과</p>\n" +
      "<p>바나나</p>\n" +
      "<p>포도</p>\n" +
      "<p>망고</p>",
    css: "/* 여기에 직접 지은 클래스 선택자로 스타일을 입혀보세요 */"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var classedEls = Array.prototype.slice.call(doc.querySelectorAll("[class]"));
    if (classedEls.length === 0) {
      return {
        pass: false,
        message: '원하는 p 태그에 class 속성을 추가해보세요 (예: class="my-class").'
      };
    }
    var classNames = [];
    classedEls.forEach(function (el) {
      el.className.split(/\s+/).forEach(function (c) {
        if (c && classNames.indexOf(c) === -1) classNames.push(c);
      });
    });
    for (var i = 0; i < classNames.length; i++) {
      var rule = findRuleForClass(code.css, classNames[i]);
      if (rule && Object.keys(rule.declarations).length > 0) {
        return {
          pass: true,
          message: "통과! ." + classNames[i] + " 클래스를 직접 만들어서 스타일을 잘 입혔어요."
        };
      }
    }
    return {
      pass: false,
      message:
        "CSS 칸에 ." + classNames[0] + " 선택자로 규칙을 만들고 스타일을 입혀보세요."
    };
  }
};
