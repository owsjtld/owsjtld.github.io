export default {
  id: "js-textcontent-intro",
  title: "자바스크립트로 글자 바꾸기",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  startFromMission: "css-font-size-intro",
  summary: "이제 JS 칸이 추가돼요. document.querySelector로 요소를 골라 글자를 직접 바꿔볼게요.",
  instructions:
    "<p>HTML과 CSS만으로는 페이지가 열린 뒤에 내용이 스스로 바뀌게 할 수 없어요. 이제부터 " +
    "<strong>JavaScript(JS)</strong> 칸이 새로 생겨요 — JS로 페이지 안의 요소를 직접 골라서 글자를 바꿀 수 있어요. " +
    "HTML 칸에는 이전 미션에서 작성한 h1/p가 그대로 들어있어요 (그 미션을 안 했다면 예시 문장이 대신 들어가요).</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">JS 없이</div>" +
        "<iframe class=\"demo-frame\" title=\"JS 없이\" sandbox=\"\" " +
        "srcdoc=\"<h1>안녕하세요</h1>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">JS로 textContent를 바꿨을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"JS 적용 후\" sandbox=\"allow-scripts\" " +
        "srcdoc=\"<h1>안녕하세요</h1><script>document.querySelector('h1').textContent='반가워요!';<" + "/script>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p>이렇게 <code>document.querySelector(\"선택자\")</code>로 원하는 요소를 고른 뒤, " +
    "<code>.textContent</code>에 새 문자열을 대입하면 화면의 글자가 바뀌어요. 버튼을 누르지 않아도 " +
    "페이지가 열리자마자 바로 실행돼요. 아래 예시처럼 JS 칸에 직접 타이핑해보세요.</p>" +
    "<pre><code>document.querySelector(\"p\").textContent = \"새로운 문장이에요!\";</code></pre>" +
    "<p>예시는 <code>p</code> 태그를 바꿨지만, 이번 미션에서는 <strong>h1</strong> 태그의 글자를 " +
    "JS로 바꿔보세요.</p>",
  starter: {
    html: "<h1>안녕하세요</h1>\n<p>이 문장은 그대로 둘 거예요.</p>",
    css: "",
    js: "// 여기에 document.querySelector(\"h1\")로 h1을 선택하고 textContent를 바꿔보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var re = /document\s*\.\s*querySelector\s*\(\s*(['"`])h1\1\s*\)\s*\.\s*textContent\s*=\s*(['"`])([^'"`]*)\2/i;
    var match = js.match(re);
    if (!match) {
      return {
        pass: false,
        message: 'document.querySelector("h1").textContent = "..."; 형태로 h1의 글자를 바꿔보세요.'
      };
    }
    if (!match[3].trim()) {
      return { pass: false, message: "textContent에 빈 문자열 말고 실제 문장을 넣어주세요." };
    }
    return { pass: true, message: "통과! 자바스크립트로 h1의 글자를 잘 바꿨어요." };
  }
};
