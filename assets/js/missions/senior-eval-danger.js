export default {
  id: "senior-eval-danger",
  title: "eval()은 왜 위험할까",
  level: "시니어 · 보안",
  tier: "시니어",
  panels: ["html", "css", "js"],
  summary: "입력받은 문자열을 eval()로 그냥 실행하면 안 되는 이유를 직접 겪어봐요.",
  instructions:
    "<p><code>eval(문자열)</code>은 그 문자열을 진짜 JS 코드처럼 실행해버려요. " +
    "<code>\"2+2\"</code> 같은 계산식을 계산기처럼 처리하고 싶어서 방문자 입력을 그대로 " +
    "<code>eval()</code>에 넣으면 편해 보이지만, 방문자가 계산식 대신 " +
    "<strong>아무 JS 코드나</strong> 입력해서 실행시킬 수 있다는 뜻이기도 해요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">계산식을 입력했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"정상적인 계산\" sandbox=\"allow-scripts\" " +
        "srcdoc=\"<p>결과: <span id='r'></span></p><script>document.querySelector('#r').textContent = eval('2 + 2');<" + "/script>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">계산식 대신 다른 코드를 넣었을 때 (위험 — 배경이 바뀜)</div>" +
        "<iframe class=\"demo-frame\" title=\"악용 사례\" sandbox=\"allow-scripts\" " +
        "srcdoc=\"<p>결과: <span id='r'></span></p><script>eval('document.body.style.background=&quot;tomato&quot;');<" + "/script>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p>계산식만 들어올 거라 믿고 <code>eval()</code>을 썼는데, 실제로는 아무 코드나 실행되는 " +
    "구멍이 생겨버렸어요. 안전하게 하려면 <code>eval()</code> 없이 직접 숫자를 계산하거나, " +
    "허용할 동작을 미리 정해둔 목록(객체)에서만 골라 실행해야 해요.</p>" +
    "<p><strong>예시</strong> — 절대 이렇게 쓰면 안 돼요.</p>" +
    "<pre><code>// 위험: 입력값을 그대로 실행\nvar result = eval(input.value);\n\n" +
    "// 안전: Number()로 숫자만 다루거나, 직접 계산\n" +
    "var result = Number(input.value) + 1;</code></pre>" +
    "<p>에디터에 입력칸(<code>#num-input</code>), 버튼(<code>#calc-btn</code>), 결과 칸" +
    "(<code>#result</code>)이 준비되어 있어요. <code>eval()</code> 없이, " +
    "<code>Number(...)</code>로 입력값을 숫자로 바꿔서 1을 더한 값을 " +
    "<code>#result</code>에 표시해보세요.</p>",
  starter: {
    html:
      "<input id=\"num-input\" type=\"text\" placeholder=\"숫자를 입력하세요\">\n" +
      "<button id=\"calc-btn\">+1 계산</button>\n" +
      "<p id=\"result\"></p>",
    css: "",
    js: "// 여기에 eval() 없이 Number(...)로 안전하게 계산해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 버튼 클릭 이벤트를 등록해보세요.' };
    }
    if (/\beval\s*\(/.test(js)) {
      return { pass: false, message: "eval()은 위험해요! Number(...)로 바꿔서 직접 계산해보세요." };
    }
    if (!/Number\s*\(/.test(js)) {
      return { pass: false, message: "Number(...)로 입력값을 안전하게 숫자로 바꿔보세요." };
    }
    if (!/\.textContent\s*=/.test(js)) {
      return { pass: false, message: "계산 결과를 textContent로 보여줘보세요." };
    }
    return { pass: true, message: "통과! eval() 없이도 안전하게 계산했어요." };
  }
};
