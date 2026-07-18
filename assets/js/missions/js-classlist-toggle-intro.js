export default {
  id: "js-classlist-toggle-intro",
  title: "클래스 토글하기 — classList.toggle",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "버튼을 클릭할 때마다 클래스를 붙였다 뗐다 해봐요.",
  instructions:
    "<p><code>요소.classList.toggle(\"클래스이름\")</code>은 그 클래스가 없으면 붙이고, 있으면 " +
    "떼는 명령이에요. 클릭할 때마다 실행하면, 클릭할 때마다 그 클래스가 있다/없다를 반복하게 " +
    "되고 — CSS에 그 클래스의 스타일을 정해두면 클릭할 때마다 모양이 바뀌는 걸 볼 수 있어요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#my-btn\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#box\").classList.toggle(\"active\");\n});</code></pre>" +
    "<p>에디터의 HTML에는 버튼(<code>#toggle-btn</code>)과 상자(<code>#box</code>)가, CSS에는 " +
    "<code>.active</code> 클래스의 스타일이 이미 준비되어 있어요. JS 칸에 버튼을 클릭했을 때 " +
    "<code>#box</code>에서 <code>.active</code> 클래스가 토글되도록 만들어보세요.</p>",
  starter: {
    html:
      "<button id=\"toggle-btn\">토글</button>\n" +
      "<div id=\"box\">상자</div>",
    css:
      "#box {\n  padding: 20px;\n  border: 1px solid #999;\n}\n" +
      ".active {\n  background: yellow;\n}",
    js: "// 여기에 버튼 클릭 시 #box에서 classList.toggle(\"active\")를 호출해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 클릭 이벤트를 등록해보세요.' };
    }
    if (!/\.classList\s*\.\s*toggle\s*\(\s*['"`][\w-]+['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.toggle("클래스이름")으로 클래스를 토글해보세요.' };
    }
    return { pass: true, message: "통과! 클릭할 때마다 클래스를 토글하는 코드를 잘 만들었어요." };
  }
};
