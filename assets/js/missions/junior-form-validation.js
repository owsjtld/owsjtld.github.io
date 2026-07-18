export default {
  id: "junior-form-validation",
  title: "폼 유효성 검사 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "입력칸이 비어있으면 제출을 막고 안내 메시지를 보여줘봐요.",
  instructions:
    "<p>실제 폼은 아무거나 막 제출되면 안 돼요 — 필요한 값이 비어있으면 알려줘야 해요. " +
    "그러려면 <strong>조건에 따라 다르게 동작</strong>해야 하는데, 이럴 때 " +
    "<code>if (조건) { ... } else { ... }</code>를 써요. 조건이 참이면 <code>if</code> 블록이, " +
    "거짓이면 <code>else</code> 블록이 실행돼요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#submit-btn\").addEventListener(\"click\", function () {\n" +
    "  var input = document.querySelector(\"#name-input\");\n" +
    "  if (input.value === \"\") {\n" +
    "    document.querySelector(\"#error-msg\").textContent = \"이름을 입력해주세요!\";\n" +
    "  } else {\n" +
    "    document.querySelector(\"#error-msg\").textContent = \"제출됐어요!\";\n" +
    "  }\n});</code></pre>" +
    "<p>에디터에 입력칸(<code>#name-input</code>), 제출 버튼(<code>#submit-btn</code>), 메시지 " +
    "칸(<code>#error-msg</code>)이 준비되어 있어요. 입력칸이 비어있으면 안내 메시지를, " +
    "비어있지 않으면 다른 메시지를 보여주도록 만들어보세요.</p>",
  starter: {
    html:
      "<input id=\"name-input\" type=\"text\" placeholder=\"이름을 입력하세요\">\n" +
      "<button id=\"submit-btn\">제출</button>\n" +
      "<p id=\"error-msg\"></p>",
    css: "",
    js: "// 여기에 제출 버튼 클릭 시 if/else로 입력값이 비어있는지 확인해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: '제출 버튼에 addEventListener("click", ...)를 등록해보세요.' };
    }
    if (!/if\s*\(/.test(js)) {
      return { pass: false, message: "if문으로 입력값이 비어있는지 확인해보세요." };
    }
    if (!/\.value/.test(js)) {
      return { pass: false, message: "input의 .value로 입력한 내용을 확인해보세요." };
    }
    if (!/\.textContent\s*=/.test(js)) {
      return { pass: false, message: "결과에 따라 안내 메시지를 textContent로 보여줘보세요." };
    }
    return { pass: true, message: "통과! 폼 유효성 검사를 잘 만들었어요." };
  }
};
