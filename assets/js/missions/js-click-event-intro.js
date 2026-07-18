export default {
  id: "js-click-event-intro",
  title: "클릭하면 반응하기 — addEventListener",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "버튼을 클릭했을 때만 코드가 실행되게 만들어봐요.",
  instructions:
    "<p>지금까지 만든 JS는 페이지가 열리자마자 바로 실행됐어요. 이번엔 <strong>버튼을 눌렀을 때만</strong> " +
    "실행되게 해볼게요. <code>addEventListener(\"click\", function() { ... })</code>를 쓰면, " +
    "괄호 안 함수는 그 요소를 클릭했을 때만 실행돼요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#my-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#msg\").textContent = \"눌렀어요!\";\n});</code></pre>" +
    "<p>에디터의 HTML에는 이미 버튼(<code>#action-btn</code>)과 문구(<code>#status</code>)가 준비되어 " +
    "있어요. JS 칸에 <code>addEventListener(\"click\", ...)</code>로 그 버튼을 클릭했을 때 " +
    "<code>#status</code>의 <code>textContent</code>가 바뀌도록 만들어보세요.</p>",
  starter: {
    html:
      "<button id=\"action-btn\">눌러보세요</button>\n" +
      "<p id=\"status\">아직 안 눌렀어요.</p>",
    css: "",
    js: "// 여기에 addEventListener(\"click\", ...)로 클릭 이벤트를 등록해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 클릭 이벤트를 등록해보세요.' };
    }
    if (!/\.textContent\s*=/.test(js)) {
      return { pass: false, message: "클릭했을 때 어떤 요소의 textContent가 바뀌도록 만들어보세요." };
    }
    return { pass: true, message: "통과! 버튼 클릭에 반응하는 코드를 잘 만들었어요." };
  }
};
