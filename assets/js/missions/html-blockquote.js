export default {
  id: "html-blockquote",
  title: "인용문 — blockquote",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "blockquote로 다른 곳에서 가져온 말이나 글을 인용해봐요.",
  instructions:
    "<p><code>&lt;blockquote&gt;</code>는 다른 사람의 말이나 다른 글에서 가져온 내용임을 " +
    "나타내는 태그예요. 브라우저는 보통 안쪽 여백을 줘서 살짝 들여쓴 것처럼 보여줘요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;blockquote&gt;\n  아는 것을 안다고 하고, 모르는 것을 모른다고 하는 것,\n" +
    "  그것이 아는 것이다.\n&lt;/blockquote&gt;</code></pre>" +
    "<p>에디터에 <code>blockquote</code> 태그를 만들고, 그 안에 원하는 인용문을 직접 " +
    "적어보세요.</p>",
  starter: {
    html: "<!-- 여기에 blockquote로 인용문을 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var bq = doc.querySelector("blockquote");
    if (!bq || !bq.textContent.trim()) {
      return { pass: false, message: "blockquote 태그를 만들고 안에 내용을 적어보세요." };
    }
    return { pass: true, message: "통과! blockquote로 인용문을 잘 만들었어요." };
  }
};
