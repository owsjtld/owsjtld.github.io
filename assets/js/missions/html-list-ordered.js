export default {
  id: "html-list-ordered",
  title: "목록 만들기 — 순서 있는 목록 (ol)",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "ol 태그로 순서가 중요한 목록을 만들어봐요.",
  instructions:
    "<p><code>&lt;ol&gt;</code>은 순서 있는 목록(ordered list)이에요. <code>&lt;ul&gt;</code>과 태그 이름만 " +
    "다르고 안에 <code>&lt;li&gt;</code>를 쓰는 건 똑같은데, 화면에는 점 대신 1, 2, 3 같은 번호가 자동으로 " +
    "붙어요. 순서가 중요한 내용(요리 순서, 순위 등)에 써요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;ol&gt;\n  &lt;li&gt;물을 끓인다&lt;/li&gt;\n  &lt;li&gt;라면을 넣는다&lt;/li&gt;\n&lt;/ol&gt;</code></pre>" +
    "<p>에디터에 <code>ol</code> 태그를 만들고, 그 안에 <code>li</code>로 순서가 있는 항목 2가지 이상을 " +
    "직접 적어보세요.</p>",
  starter: {
    html: "<!-- 여기에 ol과 li로 순서가 있는 목록을 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var ol = doc.querySelector("ol");
    if (!ol) {
      return { pass: false, message: "ol 태그를 만들어보세요." };
    }
    var items = Array.prototype.filter.call(ol.querySelectorAll("li"), function (li) {
      return li.textContent.trim();
    });
    if (items.length < 2) {
      return { pass: false, message: "ol 안에 li 태그로 항목을 2개 이상 적어보세요." };
    }
    return { pass: true, message: "통과! ol로 순서 있는 목록을 잘 만들었어요." };
  }
};
