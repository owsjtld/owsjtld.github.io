export default {
  id: "js-template-literal-intro",
  title: "템플릿 리터럴 — 백틱(`)으로 문자열에 값 끼워넣기",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "따옴표 대신 백틱과 ${ }를 써서, 변수 값을 문자열 안에 바로 끼워넣어봐요.",
  instructions:
    "<p>지금까지는 문자열 안에 변수 값을 넣을 때 <code>+</code>로 이어 붙였죠 " +
    "(<code>\"안녕하세요, \" + name + \"님!\"</code>처럼). <strong>템플릿 리터럴</strong>을 쓰면 " +
    "따옴표(<code>'</code>, <code>\"</code>) 대신 백틱(<code>`</code>)으로 문자열을 감싸고, " +
    "그 안에 <code>${ 변수 }</code> 형태로 값을 바로 끼워넣을 수 있어요 — <code>+</code>로 " +
    "이어 붙일 필요가 없어져요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var name = \"모카\";\n\n" +
    "// 기존 방식\nvar greeting1 = \"안녕하세요, \" + name + \"님!\";\n\n" +
    "// 템플릿 리터럴\nvar greeting2 = `안녕하세요, ${name}님!`;\n\n" +
    "document.querySelector(\"#greeting\").textContent = greeting2;</code></pre>" +
    "<p>에디터의 HTML에는 빈 <code>p#greeting</code>이 준비되어 있어요. JS 칸에는 " +
    "<code>name</code> 변수가 이미 만들어져 있어요. 템플릿 리터럴(백틱과 <code>${ }</code>)을 " +
    "사용해서 그 이름이 들어간 인사말을 만들고, <code>#greeting</code>의 " +
    "<code>textContent</code>에 넣어보세요.</p>",
  starter: {
    html: '<p id="greeting"></p>',
    css: "",
    js:
      'var name = "모카";\n\n' +
      "// 여기에 템플릿 리터럴(백틱, ${ })로 인사말을 만들고 #greeting에 넣어보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/`[^`]*\$\{[^}]+\}[^`]*`/.test(js)) {
      return {
        pass: false,
        message: "백틱(`)과 ${ }를 사용한 템플릿 리터럴로 문자열을 만들어보세요."
      };
    }
    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#greeting['"`]\s*\)\s*\.\s*textContent\s*=/.test(js)) {
      return { pass: false, message: "만든 문자열을 #greeting의 textContent에 넣어보세요." };
    }
    return { pass: true, message: "통과! 템플릿 리터럴로 변수 값을 문자열에 잘 끼워넣었어요." };
  }
};
