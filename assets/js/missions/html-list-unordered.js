export default {
  id: "html-list-unordered",
  title: "목록 만들기 — 순서 없는 목록 (ul, li)",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "ul과 li 태그로 순서 없는 목록을 만들어봐요.",
  instructions:
    "<p><code>&lt;ul&gt;</code>은 순서 없는 목록(un-ordered list)을 만드는 태그예요. 그 안에 " +
    "<code>&lt;li&gt;</code>(list item)로 항목을 하나씩 넣으면, 화면에는 각 항목 앞에 점(•)이 붙어서 나와요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;ul&gt;\n  &lt;li&gt;사과&lt;/li&gt;\n  &lt;li&gt;바나나&lt;/li&gt;\n&lt;/ul&gt;</code></pre>" +
    "<p>에디터에 <code>ul</code> 태그를 만들고, 그 안에 <code>li</code> 태그로 좋아하는 것 2가지 이상을 " +
    "직접 적어보세요.</p>",
  starter: {
    html: "<!-- 여기에 ul과 li로 목록을 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var ul = doc.querySelector("ul");
    if (!ul) {
      return { pass: false, message: "ul 태그를 만들어보세요." };
    }
    var items = Array.prototype.filter.call(ul.querySelectorAll("li"), function (li) {
      return li.textContent.trim();
    });
    if (items.length < 2) {
      return { pass: false, message: "ul 안에 li 태그로 항목을 2개 이상 적어보세요." };
    }
    return { pass: true, message: "통과! ul과 li로 목록을 잘 만들었어요." };
  }
};
