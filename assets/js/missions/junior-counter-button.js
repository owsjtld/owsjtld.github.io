export default {
  id: "junior-counter-button",
  title: "카운터 버튼 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "+1 / -1 버튼을 눌러서 숫자가 오르내리는 카운터를 만들어봐요.",
  instructions:
    "<p>버튼 두 개와 숫자를 보여주는 칸을 만들어서, 누를 때마다 숫자가 바뀌게 해볼게요. " +
    "지금 화면에 있는 숫자를 <code>textContent</code>로 읽어서, <code>Number(...)</code>로 " +
    "진짜 숫자로 바꾸고, 1을 더하거나 뺀 다음 다시 <code>textContent</code>에 넣으면 돼요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#increment\").addEventListener(\"click\", function () {\n" +
    "  var countEl = document.querySelector(\"#count\");\n" +
    "  countEl.textContent = Number(countEl.textContent) + 1;\n});</code></pre>" +
    "<p>에디터에 -1 버튼(<code>#decrement</code>), 숫자 칸(<code>#count</code>), +1 버튼" +
    "(<code>#increment</code>)이 준비되어 있어요. 두 버튼 모두에 클릭 이벤트를 등록해서, " +
    "+1 버튼은 숫자를 1 늘리고 -1 버튼은 1 줄이도록 만들어보세요.</p>",
  starter: {
    html:
      "<button id=\"decrement\">-1</button>\n" +
      "<span id=\"count\">0</span>\n" +
      "<button id=\"increment\">+1</button>",
    css: "button {\n  margin: 0 8px;\n}",
    js: "// 여기에 #increment와 #decrement 버튼 클릭 시 #count의 숫자를 바꿔보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var clickMatches = js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || [];
    if (clickMatches.length < 2) {
      return {
        pass: false,
        message: '+1 버튼과 -1 버튼 모두에 각각 addEventListener("click", ...)를 등록해보세요.'
      };
    }
    var assigns = js.match(/textContent\s*=\s*Number\s*\([^)]*\)\s*[+-]\s*1/g) || [];
    var hasIncrement = assigns.some(function (a) { return /\+\s*1/.test(a); });
    var hasDecrement = assigns.some(function (a) { return /-\s*1/.test(a); });
    if (!hasIncrement || !hasDecrement) {
      return {
        pass: false,
        message: "Number(...)로 숫자로 바꾼 값에 +1과 -1을 각각 적용해서 textContent에 다시 넣어보세요."
      };
    }
    return { pass: true, message: "통과! 카운터 버튼을 잘 만들었어요." };
  }
};
