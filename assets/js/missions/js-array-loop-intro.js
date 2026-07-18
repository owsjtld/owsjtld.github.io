export default {
  id: "js-array-loop-intro",
  title: "배열과 반복문 — forEach로 여러 개 한번에 다루기",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "배열에 여러 값을 담고, forEach로 하나씩 꺼내서 화면에 반복해서 그려봐요.",
  instructions:
    "<p>지금까지는 요소 하나씩 골라서 다뤘죠. 여러 개의 값을 한번에 다루고 싶을 땐 " +
    "<strong>배열</strong>(대괄호 <code>[ ]</code>)에 담아요. 그리고 배열 안의 값을 " +
    "하나씩 꺼내서 뭔가를 반복하고 싶을 땐 <code>배열.forEach(function (값) { ... })</code>를 " +
    "써요 — 이 함수는 배열 안의 값 개수만큼 자동으로 반복 실행돼요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var fruits = [\"사과\", \"바나나\", \"포도\"];\n\n" +
    "fruits.forEach(function (fruit) {\n" +
    "  var li = document.createElement(\"li\");\n" +
    "  li.textContent = fruit;\n" +
    "  document.querySelector(\"#fruit-list\").appendChild(li);\n});</code></pre>" +
    "<p>이렇게 하면 배열 안의 값 하나마다 <code>li</code>가 하나씩 만들어져서 목록에 " +
    "추가돼요 — 값이 3개면 3번, 10개면 10번 자동으로 반복돼요. 하나씩 " +
    "<code>document.createElement</code>를 따로따로 부를 필요가 없어져요.</p>" +
    "<p>에디터의 HTML에는 빈 <code>ul#fruit-list</code>가 준비되어 있어요. JS 칸에 원하는 " +
    "문자열 3개 이상을 담은 배열을 만들고, <code>forEach</code>로 각각을 " +
    "<code>li</code>로 만들어 <code>#fruit-list</code>에 추가해보세요.</p>",
  starter: {
    html: "<ul id=\"fruit-list\"></ul>",
    css: "",
    js: "// 여기에 문자열 3개 이상을 담은 배열을 만들고, forEach로 각각을 li로 추가해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var hasArray = /\[\s*(['"`][^'"`]*['"`]\s*,\s*){2,}['"`][^'"`]*['"`]\s*\]/.test(js);
    if (!hasArray) {
      return { pass: false, message: "문자열 3개 이상을 담은 배열([...])을 만들어보세요." };
    }
    if (!/\.\s*forEach\s*\(/.test(js)) {
      return { pass: false, message: "forEach로 배열 안의 값을 하나씩 꺼내서 반복해보세요." };
    }
    if (!/document\s*\.\s*createElement\s*\(\s*['"`]li['"`]\s*\)/i.test(js)) {
      return { pass: false, message: 'forEach 안에서 document.createElement("li")로 새 li를 만들어보세요.' };
    }
    if (!/appendChild/.test(js)) {
      return { pass: false, message: "만든 li를 appendChild로 목록에 추가해보세요." };
    }
    return { pass: true, message: "통과! 배열과 forEach로 여러 항목을 반복해서 만들었어요." };
  }
};
