export default {
  id: "js-array-map-intro",
  title: "배열 변형하기 — map",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "forEach와 달리, map은 각 값을 변형한 새로운 배열을 만들어서 돌려줘요.",
  instructions:
    "<p><code>forEach</code>는 배열을 하나씩 순회하기만 할 뿐 아무것도 돌려주지 않아요. " +
    "반면 <code>배열.map(function (값) { return 새값; })</code>은 함수 안에서 " +
    "<code>return</code>한 값들을 모아 <strong>새로운 배열</strong>로 돌려줘요 — 원본 배열은 " +
    "그대로 두고, 각 값을 변형한 새 배열이 필요할 때 써요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var words = [\"안녕\", \"반가워\"];\n\n" +
    "var loudWords = words.map(function (word) {\n" +
    "  return word + \"!\";\n});\n" +
    "// loudWords는 [\"안녕!\", \"반가워!\"] — words 자신은 안 바뀌어요\n\n" +
    "loudWords.forEach(function (word) {\n" +
    "  var li = document.createElement(\"li\");\n" +
    "  li.textContent = word;\n" +
    "  document.querySelector(\"#loud-list\").appendChild(li);\n});</code></pre>" +
    "<p>에디터의 JS 칸에는 단어 배열(<code>words</code>)이 준비되어 있어요. " +
    "<code>map</code>으로 각 단어 뒤에 느낌표(<code>\"!\"</code>)를 붙인 새 배열을 만들고, " +
    "그 새 배열을 <code>forEach</code>로 순회하면서 <code>li</code>로 만들어 " +
    "<code>#loud-list</code>에 추가해보세요.</p>",
  starter: {
    html: '<ul id="loud-list"></ul>',
    css: "",
    js:
      'var words = ["안녕", "반가워", "잘가"];\n\n' +
      "// 여기에 map으로 각 단어 뒤에 \"!\"를 붙인 새 배열을(return 사용) 만들고,\n" +
      "// forEach로 li를 만들어 #loud-list에 추가해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/\.\s*map\s*\(\s*function\s*\(/.test(js)) {
      return { pass: false, message: "map(function (word) { ... })으로 배열을 변형해보세요." };
    }
    if (!/return\s+[\w$]+\s*\+\s*(['"`])!\1/.test(js)) {
      return {
        pass: false,
        message: "map 안에서 return으로 각 단어 뒤에 \"!\"를 붙인 새 값을 반환해보세요."
      };
    }
    if (!/\.\s*forEach\s*\(/.test(js)) {
      return { pass: false, message: "map으로 만든 새 배열을 forEach로 순회해보세요." };
    }
    if (!/document\s*\.\s*createElement\s*\(\s*['"`]li['"`]\s*\)/i.test(js)) {
      return { pass: false, message: 'document.createElement("li")로 새 li를 만들어보세요.' };
    }
    if (!/appendChild/.test(js)) {
      return { pass: false, message: "만든 li를 appendChild로 #loud-list에 추가해보세요." };
    }
    return { pass: true, message: "통과! map으로 배열을 변형하고 forEach로 잘 그렸어요." };
  }
};
