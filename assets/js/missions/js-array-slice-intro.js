export default {
  id: "js-array-slice-intro",
  title: "배열 잘라내기 — slice",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "긴 배열에서 원하는 구간만 slice로 잘라내서 화면에 보여줘요.",
  instructions:
    "<p><code>배열.slice(시작, 끝)</code>은 배열에서 <strong>시작 번호부터 끝 번호 " +
    "직전까지</strong>만 잘라서 새 배열로 돌려줘요(끝 번호에 해당하는 건 포함 안 " +
    "돼요). 배열의 첫 번째 값은 번호 0이에요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var fruits = [\"사과\", \"바나나\", \"포도\", \"딸기\", \"수박\", \"키위\"];\n" +
    "var firstThree = fruits.slice(0, 3); // [\"사과\", \"바나나\", \"포도\"]\n\n" +
    "firstThree.forEach(function (fruit) {\n" +
    "  var li = document.createElement(\"li\");\n" +
    "  li.textContent = fruit;\n" +
    "  document.querySelector(\"#fruit-list\").appendChild(li);\n});</code></pre>" +
    "<p>에디터의 JS 칸에는 과일 6개가 담긴 배열이 이미 준비되어 있어요. " +
    "<code>slice</code>로 그중 <strong>앞의 3개만</strong> 잘라내고, <code>forEach</code>로 " +
    "각각을 <code>li</code>로 만들어 <code>#fruit-list</code>에 추가해보세요.</p>",
  starter: {
    html: "<ul id=\"fruit-list\"></ul>",
    css: "",
    js:
      "var fruits = [\"사과\", \"바나나\", \"포도\", \"딸기\", \"수박\", \"키위\"];\n\n" +
      "// 여기에 fruits.slice(...)로 앞의 3개만 잘라내고, forEach로 li를 만들어 #fruit-list에 추가해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/\.\s*slice\s*\(\s*0\s*,\s*3\s*\)/.test(js)) {
      return { pass: false, message: "slice(0, 3)으로 배열의 앞 3개만 잘라내보세요." };
    }
    if (!/\.\s*forEach\s*\(/.test(js)) {
      return { pass: false, message: "잘라낸 배열을 forEach로 순회해보세요." };
    }
    if (!/document\s*\.\s*createElement\s*\(\s*['"`]li['"`]\s*\)/i.test(js)) {
      return { pass: false, message: 'document.createElement("li")로 새 li를 만들어보세요.' };
    }
    if (!/appendChild/.test(js)) {
      return { pass: false, message: "만든 li를 appendChild로 목록에 추가해보세요." };
    }
    return { pass: true, message: "통과! slice로 배열을 잘라내고 forEach로 잘 그렸어요." };
  }
};
