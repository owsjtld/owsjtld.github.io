export default {
  id: "html-link-basics",
  title: "링크 만들기 — a 태그",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "a 태그와 href로 다른 페이지로 연결되는 링크를 만들어봐요.",
  instructions:
    "<p><code>&lt;a&gt;</code>는 클릭하면 다른 페이지로 이동하는 <strong>링크</strong>를 만드는 태그예요. " +
    "<code>href</code> 속성에 이동할 주소를 적고, 태그 안에는 화면에 보일 글자를 적어요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;a href=\"https://example.com\"&gt;여기를 클릭하세요&lt;/a&gt;</code></pre>" +
    "<p>에디터에 <code>a</code> 태그를 만들고, <code>href</code>에 아무 주소나 넣은 뒤 그 안에 원하는 " +
    "문구를 직접 적어보세요.</p>",
  starter: {
    html: "<!-- 여기에 a 태그로 링크를 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var a = doc.querySelector("a");
    if (!a) {
      return { pass: false, message: "a 태그를 만들어보세요." };
    }
    var href = (a.getAttribute("href") || "").trim();
    if (!href) {
      return { pass: false, message: "a 태그에 href 속성으로 이동할 주소를 적어보세요." };
    }
    if (!a.textContent.trim()) {
      return { pass: false, message: "a 태그 안에 화면에 보일 글자를 적어보세요." };
    }
    return { pass: true, message: "통과! a 태그로 링크를 잘 만들었어요." };
  }
};
