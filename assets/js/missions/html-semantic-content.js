export default {
  id: "html-semantic-content",
  title: "시맨틱 레이아웃 — 콘텐츠 묶기 (section, article, aside)",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "section, article, aside로 본문 안 콘텐츠를 의미 있게 묶어봐요.",
  instructions:
    "<p>이번엔 <code>main</code> 안에서 콘텐츠를 더 세분화할 때 쓰는 태그들이에요.</p>" +
    "<ul>" +
      "<li><code>&lt;article&gt;</code> — 그 자체로 독립적으로도 의미가 통하는 콘텐츠 " +
      "(블로그 글, 뉴스 기사 하나 등)</li>" +
      "<li><code>&lt;section&gt;</code> — 주제별로 묶은 구역 (보통 제목이 딸린 챕터 같은 것)</li>" +
      "<li><code>&lt;aside&gt;</code> — 본문과 관련은 있지만 부가적인 내용 " +
      "(사이드바, 관련 링크 등)</li>" +
    "</ul>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;section&gt;\n  &lt;h1&gt;공지사항&lt;/h1&gt;\n  &lt;article&gt;\n" +
    "    &lt;p&gt;오늘 새 글이 올라왔습니다.&lt;/p&gt;\n  &lt;/article&gt;\n&lt;/section&gt;\n" +
    "&lt;aside&gt;\n  &lt;p&gt;관련 링크: ...&lt;/p&gt;\n&lt;/aside&gt;</code></pre>" +
    "<p>에디터에 <code>section</code>, <code>article</code>, <code>aside</code> 태그를 각각 " +
    "만들고, 그 안에 원하는 내용을 직접 채워보세요.</p>",
  starter: {
    html: "<!-- 여기에 section, article, aside로 콘텐츠를 묶어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var required = ["section", "article", "aside"];
    for (var i = 0; i < required.length; i++) {
      var el = doc.querySelector(required[i]);
      if (!el) {
        return { pass: false, message: "<" + required[i] + "> 태그를 만들어보세요." };
      }
      if (!el.textContent.trim()) {
        return { pass: false, message: "<" + required[i] + "> 안에 내용을 채워보세요." };
      }
    }
    return { pass: true, message: "통과! section, article, aside로 콘텐츠를 잘 묶었어요." };
  }
};
