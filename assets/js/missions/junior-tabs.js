export default {
  id: "junior-tabs",
  title: "탭 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "탭 버튼을 눌러서 보여지는 내용을 바꿔봐요.",
  instructions:
    "<p>탭 버튼 하나를 누르면 그 탭의 내용은 보이고 다른 탭의 내용은 숨겨져야 해요. " +
    "<code>classList.remove(\"hidden\")</code>으로 보여주고 싶은 내용의 숨김을 없애고, " +
    "<code>classList.add(\"hidden\")</code>으로 다른 내용은 숨기면 돼요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#tab1-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#tab1-panel\").classList.remove(\"hidden\");\n" +
    "  document.querySelector(\"#tab2-panel\").classList.add(\"hidden\");\n});</code></pre>" +
    "<p>에디터에 탭 버튼 두 개(<code>#tab1-btn</code>, <code>#tab2-btn</code>)와 내용 두 개" +
    "(<code>#tab1-panel</code>, <code>#tab2-panel</code>)가 준비되어 있어요. 각 탭 버튼을 " +
    "누르면 그 탭의 내용만 보이도록 만들어보세요.</p>",
  starter: {
    html:
      "<button id=\"tab1-btn\">탭 1</button>\n" +
      "<button id=\"tab2-btn\">탭 2</button>\n" +
      "<div id=\"tab1-panel\">첫 번째 내용이에요.</div>\n" +
      "<div id=\"tab2-panel\" class=\"hidden\">두 번째 내용이에요.</div>",
    css: ".hidden {\n  display: none;\n}",
    js: "// 여기에 탭 버튼 클릭 시 classList.add/remove로 hidden 클래스를 조작해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var clicks = (js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || []).length;
    if (clicks < 2) {
      return { pass: false, message: "탭 버튼 두 개 모두에 클릭 이벤트를 등록해보세요." };
    }
    if (!/classList\s*\.\s*add\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.add("hidden")으로 다른 탭의 내용을 숨겨보세요.' };
    }
    if (!/classList\s*\.\s*remove\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.remove("hidden")으로 클릭한 탭의 내용을 보여주세요.' };
    }
    return { pass: true, message: "통과! 탭을 잘 만들었어요." };
  }
};
