export default {
  id: "junior-todo-list",
  title: "투두리스트 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "입력한 할 일을 목록에 새로 추가하는 투두리스트를 만들어봐요.",
  instructions:
    "<p>지금까지는 이미 있는 요소를 골라서 바꾸기만 했다면, 이번엔 <strong>새 요소를 " +
    "직접 만들어서</strong> 추가해볼게요.</p>" +
    "<ul>" +
      "<li><code>input.value</code> — 입력칸에 지금 적혀있는 글자를 읽어와요.</li>" +
      "<li><code>document.createElement(\"li\")</code> — 새로운 li 태그를 (화면엔 아직 안 " +
      "보이게) 하나 만들어요.</li>" +
      "<li><code>부모.appendChild(자식)</code> — 만든 요소를 진짜로 화면에 붙여요.</li>" +
    "</ul>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#add-btn\").addEventListener(\"click\", function () {\n" +
    "  var input = document.querySelector(\"#todo-input\");\n" +
    "  var li = document.createElement(\"li\");\n" +
    "  li.textContent = input.value;\n" +
    "  document.querySelector(\"#todo-list\").appendChild(li);\n" +
    "  input.value = \"\";\n});</code></pre>" +
    "<p>에디터에 입력칸(<code>#todo-input</code>), 추가 버튼(<code>#add-btn</code>), 목록" +
    "(<code>#todo-list</code>)이 준비되어 있어요. 추가 버튼을 클릭하면 입력한 내용이 " +
    "새 <code>li</code>로 목록에 추가되도록 만들어보세요.</p>",
  starter: {
    html:
      "<input id=\"todo-input\" type=\"text\" placeholder=\"할 일을 입력하세요\">\n" +
      "<button id=\"add-btn\">추가</button>\n" +
      "<ul id=\"todo-list\"></ul>",
    css: "",
    js: "// 여기에 추가 버튼 클릭 시 입력값으로 새 li를 만들어 목록에 추가해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: '추가 버튼에 addEventListener("click", ...)를 등록해보세요.' };
    }
    if (!/document\s*\.\s*createElement\s*\(\s*['"`]li['"`]\s*\)/i.test(js)) {
      return { pass: false, message: 'document.createElement("li")로 새 li 태그를 만들어보세요.' };
    }
    if (!/appendChild/.test(js)) {
      return { pass: false, message: "appendChild로 만든 li를 목록에 추가해보세요." };
    }
    if (!/\.value/.test(js)) {
      return { pass: false, message: "input의 .value로 입력한 내용을 읽어와보세요." };
    }
    return { pass: true, message: "통과! 투두리스트를 잘 만들었어요." };
  }
};
