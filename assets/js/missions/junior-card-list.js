export default {
  id: "junior-card-list",
  title: "카드 여러 개 한번에 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "객체 여러 개를 배열에 담고 forEach로 순회하면서, 카드를 여러 개 한번에 만들어봐요.",
  instructions:
    "<p>사실 이 사이트의 미션 목록(<code>missions.html</code>)도 정확히 이 방식으로 " +
    "만들어져 있어요 — 미션 정보(제목, 설명)를 담은 객체 여러 개를 배열에 넣어두고, " +
    "<code>forEach</code>로 하나씩 꺼내서 카드 하나씩을 만들어 화면에 붙여요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var cards = [\n" +
    "  { title: \"카드 만들기\", desc: \"div로 카드 모양을 만들어요.\" },\n" +
    "  { title: \"폼 만들기\", desc: \"input과 button으로 폼을 만들어요.\" }\n" +
    "];\n\n" +
    "cards.forEach(function (card) {\n" +
    "  var box = document.createElement(\"div\");\n\n" +
    "  var titleEl = document.createElement(\"p\");\n" +
    "  titleEl.textContent = card.title;\n\n" +
    "  var descEl = document.createElement(\"p\");\n" +
    "  descEl.textContent = card.desc;\n\n" +
    "  box.appendChild(titleEl);\n" +
    "  box.appendChild(descEl);\n" +
    "  document.querySelector(\"#card-list\").appendChild(box);\n});</code></pre>" +
    "<p>에디터의 HTML에는 빈 <code>div#card-list</code>가 준비되어 있어요. JS 칸에 " +
    "<code>title</code>과 <code>desc</code> 키를 가진 객체 3개 이상을 배열에 담고, " +
    "<code>forEach</code>로 순회하면서 각 객체마다 <code>div</code> 카드 하나(제목과 설명을 " +
    "담은 p 태그 2개 포함)를 만들어 <code>#card-list</code>에 추가해보세요.</p>",
  starter: {
    html: "<div id=\"card-list\"></div>",
    css: "",
    js: "// 여기에 title/desc 키를 가진 객체 3개 이상을 배열에 담고, forEach로 카드를 만들어보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var objCount = (js.match(/\{\s*[\w"'`]+\s*:\s*[^,{}]+,\s*[\w"'`]+\s*:\s*[^,{}]+\s*\}/g) || []).length;
    if (objCount < 3) {
      return { pass: false, message: "title과 desc 키를 가진 객체를 3개 이상 배열에 담아보세요." };
    }
    if (!/\.\s*forEach\s*\(/.test(js)) {
      return { pass: false, message: "forEach로 객체 배열을 하나씩 순회해보세요." };
    }
    var createCount = (js.match(/document\s*\.\s*createElement\s*\(/g) || []).length;
    if (createCount < 3) {
      return {
        pass: false,
        message: "forEach 안에서 카드 상자(div)와 제목/설명(p) 태그를 각각 document.createElement로 만들어보세요."
      };
    }
    var appendCount = (js.match(/appendChild/g) || []).length;
    if (appendCount < 3) {
      return { pass: false, message: "만든 요소들을 appendChild로 카드 안에, 카드를 #card-list 안에 붙여보세요." };
    }
    return { pass: true, message: "통과! 객체 배열과 forEach로 카드를 여러 개 만들었어요." };
  }
};
