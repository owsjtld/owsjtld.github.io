export default {
  id: "html-table-basics",
  title: "표 만들기 — table, tr, th, td",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "table, tr, th, td로 표 형태의 데이터를 만들어봐요.",
  instructions:
    "<p><code>&lt;table&gt;</code>은 표를 만드는 태그예요. 그 안에 <code>&lt;tr&gt;</code>(table row, " +
    "행)로 한 줄씩 만들고, 각 줄 안에는 <code>&lt;th&gt;</code>(제목 칸, header) 또는 " +
    "<code>&lt;td&gt;</code>(데이터 칸)를 넣어요. 보통 첫 번째 행은 th로 제목을 적고, 그 아래 행들은 " +
    "td로 실제 데이터를 채워요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;table&gt;\n  &lt;tr&gt;\n    &lt;th&gt;이름&lt;/th&gt;\n    &lt;th&gt;나이&lt;/th&gt;\n  &lt;/tr&gt;\n" +
    "  &lt;tr&gt;\n    &lt;td&gt;모카&lt;/td&gt;\n    &lt;td&gt;3&lt;/td&gt;\n  &lt;/tr&gt;\n&lt;/table&gt;</code></pre>" +
    "<p>에디터에 <code>table</code>을 만들고, 첫 번째 <code>tr</code>에는 <code>th</code>로 제목을 " +
    "2개 이상, 그 아래 <code>tr</code>에는 <code>td</code>로 데이터를 2개 이상 직접 적어보세요.</p>",
  starter: {
    html: "<!-- 여기에 table, tr, th, td로 표를 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var table = doc.querySelector("table");
    if (!table) {
      return { pass: false, message: "table 태그를 만들어보세요." };
    }
    if (table.querySelectorAll("tr").length < 2) {
      return { pass: false, message: "tr로 행을 2개 이상 만들어보세요 (제목 행 + 데이터 행)." };
    }
    var ths = Array.prototype.filter.call(table.querySelectorAll("th"), function (th) {
      return th.textContent.trim();
    });
    if (ths.length < 2) {
      return { pass: false, message: "th로 제목 칸을 2개 이상 적어보세요." };
    }
    var tds = Array.prototype.filter.call(table.querySelectorAll("td"), function (td) {
      return td.textContent.trim();
    });
    if (tds.length < 2) {
      return { pass: false, message: "td로 데이터 칸을 2개 이상 적어보세요." };
    }
    return { pass: true, message: "통과! table, tr, th, td로 표를 잘 만들었어요." };
  }
};
