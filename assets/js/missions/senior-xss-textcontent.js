export default {
  id: "senior-xss-textcontent",
  title: "innerHTML 대신 textContent — XSS 맛보기",
  level: "시니어 · 보안",
  tier: "시니어",
  panels: ["html", "css", "js"],
  summary: "방문자가 입력한 내용을 화면에 그대로 보여줄 때, innerHTML을 쓰면 안 되는 이유를 직접 겪어봐요.",
  instructions:
    "<p>지금까지 <code>.textContent</code>로 글자를 넣었죠. 비슷하게 생긴 " +
    "<code>.innerHTML</code>이라는 것도 있는데, 이건 문자열을 <strong>진짜 HTML로 해석</strong>" +
    "해서 넣어버려요. 방문자가 입력한 내용을 그대로 innerHTML에 넣으면, 방문자가 " +
    "<code>&lt;img onerror=...&gt;</code> 같은 걸 입력해서 진짜 코드를 실행시킬 수 있어요 — " +
    "이런 공격을 <strong>XSS(Cross-Site Scripting)</strong>라고 불러요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">innerHTML을 썼다면 (위험 — 배경이 빨갛게 바뀜)</div>" +
        "<iframe class=\"demo-frame\" title=\"innerHTML 위험\" sandbox=\"allow-scripts\" " +
        "srcdoc=\"<p>방문자가 입력한 내용: <img src=x onerror='document.body.style.background=&quot;tomato&quot;'></p>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">textContent를 썼다면 (안전 — 그냥 글자로만 보임)</div>" +
        "<iframe class=\"demo-frame\" title=\"textContent 안전\" sandbox=\"\" " +
        "srcdoc=\"<p>방문자가 입력한 내용: &lt;img src=x onerror=...&gt; (그냥 글자예요)</p>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong> — 절대 이렇게 쓰면 안 돼요.</p>" +
    "<pre><code>// 위험: 방문자가 입력한 내용을 그대로 innerHTML에 넣음\n" +
    "document.querySelector(\"#out\").innerHTML = input.value;\n\n" +
    "// 안전: textContent는 뭘 넣든 그냥 글자로만 보여줌\n" +
    "document.querySelector(\"#out\").textContent = input.value;</code></pre>" +
    "<p>에디터에 입력칸(<code>#msg-input</code>), 표시 버튼(<code>#show-btn</code>), 결과 칸" +
    "(<code>#out</code>)이 준비되어 있어요. 버튼을 클릭하면 입력한 내용이 " +
    "<code>#out</code>에 <strong>textContent로</strong> 안전하게 표시되도록 만들어보세요.</p>",
  starter: {
    html:
      "<input id=\"msg-input\" type=\"text\" placeholder=\"아무 내용이나 입력해보세요\">\n" +
      "<button id=\"show-btn\">표시</button>\n" +
      "<p id=\"out\"></p>",
    css: "",
    js: "// 여기에 버튼 클릭 시 입력값을 #out에 textContent로 안전하게 표시해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 버튼 클릭 이벤트를 등록해보세요.' };
    }
    if (/\.innerHTML\s*=/.test(js)) {
      return { pass: false, message: "innerHTML은 위험해요! 대신 textContent를 써보세요." };
    }
    if (!/\.textContent\s*=/.test(js)) {
      return { pass: false, message: "결과를 textContent로 안전하게 표시해보세요." };
    }
    if (!/\.value/.test(js)) {
      return { pass: false, message: "input의 .value로 입력한 내용을 읽어와보세요." };
    }
    return { pass: true, message: "통과! innerHTML 대신 textContent로 안전하게 표시했어요." };
  }
};
