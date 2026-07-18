export default {
  id: "junior-pagination",
  title: "페이지네이션 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "이전/다음 버튼으로 여러 페이지에 나눠서 목록을 보여주는 페이지네이션을 만들어봐요.",
  instructions:
    "<p>이 사이트의 미션 목록(<code>missions.html</code>)에서 쓰는 페이지네이션을 직접 " +
    "만들어볼게요. 카운터 버튼 미션에서는 화면에 있는 숫자를 매번 읽어와서 계산했었죠. " +
    "이번엔 그 대신 <strong>지금 몇 페이지인지를 변수 자체에 기억</strong>해두고, 버튼을 " +
    "누를 때마다 그 변수를 바꾼 뒤 화면 전체를 다시 그려요.</p>" +
    "<ul>" +
      "<li><code>slice(시작, 끝)</code>으로 지금 페이지에 해당하는 항목만 잘라내요.</li>" +
      "<li><code>Math.ceil(전체 개수 / 페이지당 개수)</code>로 전체 페이지 수를 계산해요 — " +
      "나누어떨어지지 않아도 남는 항목을 위해 페이지 하나를 더 만들도록 <strong>올림</strong>해요.</li>" +
      "<li>다시 그리기 전엔 <code>목록.innerHTML = \"\";</code>로 기존 내용을 비워야 해요. " +
      "(innerHTML은 방문자가 입력한 내용을 그대로 넣을 때 위험한 거였죠 — 이렇게 그냥 빈 " +
      "문자열로 비우기만 할 땐 안전해요.)</li>" +
    "</ul>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>function render() {\n" +
    "  var totalPages = Math.ceil(items.length / PAGE_SIZE);\n" +
    "  var start = (currentPage - 1) * PAGE_SIZE;\n" +
    "  var pageItems = items.slice(start, start + PAGE_SIZE);\n\n" +
    "  var list = document.querySelector(\"#item-list\");\n" +
    "  list.innerHTML = \"\";\n" +
    "  pageItems.forEach(function (item) {\n" +
    "    var li = document.createElement(\"li\");\n" +
    "    li.textContent = item;\n" +
    "    list.appendChild(li);\n  });\n\n" +
    "  document.querySelector(\"#page-indicator\").textContent = currentPage + \" / \" + totalPages;\n}\n\n" +
    "document.querySelector(\"#prev-btn\").addEventListener(\"click\", function () {\n" +
    "  if (currentPage > 1) {\n    currentPage -= 1;\n    render();\n  }\n});\n" +
    "document.querySelector(\"#next-btn\").addEventListener(\"click\", function () {\n" +
    "  var totalPages = Math.ceil(items.length / PAGE_SIZE);\n" +
    "  if (currentPage < totalPages) {\n    currentPage += 1;\n    render();\n  }\n});\n\n" +
    "render(); // 페이지가 처음 열릴 때도 한 번 그려줘야 해요</code></pre>" +
    "<p>에디터의 JS 칸에는 항목 배열(<code>items</code>), 페이지당 개수(<code>PAGE_SIZE</code>), " +
    "지금 페이지(<code>currentPage</code>)가 이미 준비되어 있어요. 위 예시처럼 " +
    "<code>render</code>라는 이름의 함수를 만들어 화면을 그리는 로직을 넣고, " +
    "<code>#prev-btn</code>/<code>#next-btn</code> 클릭 시 <code>currentPage</code>를 바꾼 " +
    "뒤 <code>render()</code>를 다시 호출하고, 페이지가 처음 열릴 때도 <code>render()</code>를 " +
    "한 번 호출해보세요.</p>",
  starter: {
    html:
      "<ul id=\"item-list\"></ul>\n" +
      "<button id=\"prev-btn\">이전</button>\n" +
      "<span id=\"page-indicator\"></span>\n" +
      "<button id=\"next-btn\">다음</button>",
    css: "",
    js:
      "var items = [\"사과\", \"바나나\", \"포도\", \"딸기\", \"수박\", \"키위\", \"망고\"];\n" +
      "var PAGE_SIZE = 3;\n" +
      "var currentPage = 1;\n\n" +
      "// 여기에 render 함수를 만들어 slice로 현재 페이지 항목만 잘라 #item-list에 그리고,\n" +
      "// #prev-btn / #next-btn 클릭 시 currentPage를 바꾼 뒤 render()를 다시 호출해보세요.\n" +
      "// 마지막으로 페이지가 처음 열릴 때도 render()를 한 번 호출해보세요."
  },
  check: function (code) {
    var js = code.js || "";
    if (!/\.\s*slice\s*\(/.test(js)) {
      return { pass: false, message: "slice(...)로 현재 페이지에 해당하는 항목만 잘라내보세요." };
    }
    if (!/Math\s*\.\s*ceil\s*\(/.test(js)) {
      return { pass: false, message: "Math.ceil(...)로 전체 페이지 수를 계산해보세요." };
    }
    var clicks = (js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || []).length;
    if (clicks < 2) {
      return { pass: false, message: "이전 버튼과 다음 버튼 모두에 클릭 이벤트를 등록해보세요." };
    }
    if (!/currentPage\s*(\+=\s*1|=\s*currentPage\s*\+\s*1)/.test(js)) {
      return { pass: false, message: "다음 버튼을 클릭하면 currentPage를 1 늘려보세요." };
    }
    if (!/currentPage\s*(-=\s*1|=\s*currentPage\s*-\s*1)/.test(js)) {
      return { pass: false, message: "이전 버튼을 클릭하면 currentPage를 1 줄여보세요." };
    }
    var renderDefined = /function\s+render\s*\(/.test(js) || /render\s*=\s*function/.test(js);
    if (!renderDefined) {
      return {
        pass: false,
        message: "render라는 이름의 함수를 만들어서, 화면을 다시 그리는 로직을 그 안에 넣어보세요."
      };
    }
    var renderCalls = (js.match(/\brender\s*\(\s*\)/g) || []).length;
    if (renderCalls < 4) {
      return {
        pass: false,
        message: "currentPage가 바뀔 때마다 render()를 다시 호출하고, 페이지가 처음 열릴 때도 한 번 호출해보세요."
      };
    }
    if (!/innerHTML\s*=\s*(['"`])\s*\1/.test(js)) {
      return { pass: false, message: '다시 그리기 전에 목록을 비워야 해요 — 목록.innerHTML = "";로 비워보세요.' };
    }
    return { pass: true, message: "통과! 페이지네이션을 잘 만들었어요." };
  }
};
