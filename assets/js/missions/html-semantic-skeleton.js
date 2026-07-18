export default {
  id: "html-semantic-skeleton",
  title: "시맨틱 레이아웃 — 페이지의 뼈대 (header, nav, main, footer)",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "header, nav, main, footer로 페이지의 큰 구조에 의미를 붙여봐요.",
  instructions:
    "<p>지금까지는 <code>&lt;div&gt;</code>로도 화면을 나눌 수 있었지만, div는 그냥 빈 상자라 " +
    "아무 의미가 없어요. <code>&lt;header&gt;</code>(상단), <code>&lt;nav&gt;</code>(메뉴), " +
    "<code>&lt;main&gt;</code>(진짜 본문), <code>&lt;footer&gt;</code>(하단)는 브라우저와 " +
    "화면 읽기 프로그램, 검색엔진에게 \"여기는 어떤 역할을 하는 부분이다\"라고 의미를 알려주는 " +
    "<strong>시맨틱 태그</strong>예요. 눈에 보이는 모양은 div와 거의 똑같지만(따로 스타일을 " +
    "주지 않으면 특별한 꾸밈은 없어요) 의미가 다르답니다.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;header&gt;\n  &lt;h1&gt;내 사이트&lt;/h1&gt;\n&lt;/header&gt;\n" +
    "&lt;nav&gt;\n  &lt;a href=\"#\"&gt;홈&lt;/a&gt;\n&lt;/nav&gt;\n" +
    "&lt;main&gt;\n  &lt;p&gt;여기가 진짜 내용이 들어가는 곳이에요.&lt;/p&gt;\n&lt;/main&gt;\n" +
    "&lt;footer&gt;\n  &lt;p&gt;ⓒ 2026&lt;/p&gt;\n&lt;/footer&gt;</code></pre>" +
    "<p>에디터에 <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code> " +
    "태그를 각각 만들고, 그 안에 원하는 내용을 직접 채워보세요.</p>",
  starter: {
    html: "<!-- 여기에 header, nav, main, footer로 페이지 뼈대를 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var required = ["header", "nav", "main", "footer"];
    for (var i = 0; i < required.length; i++) {
      var el = doc.querySelector(required[i]);
      if (!el) {
        return { pass: false, message: "<" + required[i] + "> 태그를 만들어보세요." };
      }
      if (!el.textContent.trim()) {
        return { pass: false, message: "<" + required[i] + "> 안에 내용을 채워보세요." };
      }
    }
    return { pass: true, message: "통과! header, nav, main, footer로 페이지 뼈대를 잘 만들었어요." };
  }
};
