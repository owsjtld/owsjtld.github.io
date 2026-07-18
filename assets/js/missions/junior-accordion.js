export default {
  id: "junior-accordion",
  title: "아코디언 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "버튼을 누르면 숨겨진 내용이 펼쳐졌다 접혔다 하는 아코디언을 만들어봐요.",
  instructions:
    "<p>제목 버튼을 누르면 그 아래 내용이 펼쳐지고, 다시 누르면 접히는 컴포넌트예요. " +
    "<code>classList.toggle(\"클래스이름\")</code>으로 <code>display: none</code>인 클래스를 " +
    "붙였다 뗐다 하면 돼요 — 이미 배운 것들의 조합이에요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#acc-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#acc-panel\").classList.toggle(\"hidden\");\n});</code></pre>" +
    "<p>에디터에 버튼(<code>#acc-btn</code>)과 내용 칸(<code>#acc-panel</code>, 처음엔 " +
    "<code>hidden</code> 클래스로 숨겨져 있어요)이 준비되어 있어요. 버튼 클릭 시 " +
    "<code>#acc-panel</code>에서 <code>hidden</code> 클래스를 토글해보세요.</p>",
  starter: {
    html:
      "<button id=\"acc-btn\">더보기</button>\n" +
      "<div id=\"acc-panel\" class=\"hidden\">숨겨져 있던 내용이에요!</div>",
    css: ".hidden {\n  display: none;\n}",
    js: "// 여기에 버튼 클릭 시 #acc-panel에서 hidden 클래스를 토글해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 버튼 클릭 이벤트를 등록해보세요.' };
    }
    if (!/classList\s*\.\s*toggle\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.toggle("hidden")으로 내용을 펼치고 접어보세요.' };
    }
    return { pass: true, message: "통과! 아코디언을 잘 만들었어요." };
  }
};
