export default {
  id: "junior-modal",
  title: "모달(팝업창) 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "버튼을 누르면 화면 위에 팝업창이 뜨고, 닫기 버튼으로 다시 닫는 모달을 만들어봐요.",
  instructions:
    "<p>모달은 버튼을 누르면 화면 위에 떠서 보이는 팝업창이에요. 열기 버튼은 " +
    "<code>classList.remove(\"hidden\")</code>으로 숨김을 없애고, 모달 안의 닫기 버튼은 " +
    "<code>classList.add(\"hidden\")</code>으로 다시 숨겨요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#open-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#modal\").classList.remove(\"hidden\");\n});\n" +
    "document.querySelector(\"#close-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#modal\").classList.add(\"hidden\");\n});</code></pre>" +
    "<p>에디터에 열기 버튼(<code>#open-btn</code>)과 모달(<code>#modal</code>, 안에 닫기 버튼 " +
    "<code>#close-btn</code> 포함)이 준비되어 있어요. 두 버튼에 각각 클릭 이벤트를 등록해서 " +
    "모달을 열고 닫아보세요.</p>",
  starter: {
    html:
      "<button id=\"open-btn\">모달 열기</button>\n" +
      "<div id=\"modal\" class=\"hidden\">\n" +
      "  <p>모달 내용이에요.</p>\n" +
      "  <button id=\"close-btn\">닫기</button>\n" +
      "</div>",
    css: ".hidden {\n  display: none;\n}\n#modal {\n  border: 2px solid #333;\n  padding: 16px;\n}",
    js: "// 여기에 열기/닫기 버튼 클릭 시 #modal에서 hidden 클래스를 붙이거나 떼보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var clicks = (js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || []).length;
    if (clicks < 2) {
      return { pass: false, message: "열기 버튼과 닫기 버튼 모두에 클릭 이벤트를 등록해보세요." };
    }
    if (!/classList\s*\.\s*remove\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.remove("hidden")으로 모달을 열어보세요.' };
    }
    if (!/classList\s*\.\s*add\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.add("hidden")으로 모달을 닫아보세요.' };
    }
    return { pass: true, message: "통과! 모달을 잘 만들었어요." };
  }
};
