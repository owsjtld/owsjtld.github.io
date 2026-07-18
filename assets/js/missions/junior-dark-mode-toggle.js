import { findRuleForClass } from "./helpers.js";

export default {
  id: "junior-dark-mode-toggle",
  title: "다크모드 토글 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "버튼을 누르면 페이지 전체가 라이트/다크 모드로 바뀌는 토글을 직접 만들어봐요.",
  instructions:
    "<p>지금까지 배운 두 가지 — <strong>클릭 이벤트</strong>와 <strong>classList.toggle</strong> — 를 " +
    "합쳐서 실제 컴포넌트를 만들어볼게요. 버튼을 클릭할 때마다 <code>document.body</code>에 " +
    "원하는 이름의 클래스를 토글하고, CSS에서 그 클래스가 있을 때의 스타일(어두운 배경, " +
    "밝은 글자색 등)을 정하면 다크모드 토글이 완성돼요.</p>" +
    "<p>이번엔 클래스 이름도 직접 정하는 거예요 — 예시는 <code>dark</code>를 쓰지만 원하는 " +
    "이름으로 지어도 됩니다.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>/* CSS */\nbody.dark {\n  background: #111;\n  color: #fff;\n}</code></pre>" +
    "<pre><code>// JS\ndocument.querySelector(\"#toggle-btn\").addEventListener(\"click\", function () {\n" +
    "  document.body.classList.toggle(\"dark\");\n});</code></pre>" +
    "<p>에디터에 버튼과 안내 문구가 이미 준비되어 있어요. CSS에 원하는 클래스가 " +
    "<code>body</code>에 붙었을 때의 스타일을, JS에 버튼 클릭 시 " +
    "<code>document.body.classList.toggle(\"클래스이름\")</code>을 직접 만들어보세요.</p>",
  starter: {
    html:
      "<button id=\"toggle-btn\">다크모드 켜기/끄기</button>\n" +
      "<p>이 페이지가 다크모드로 바뀌는지 확인해보세요.</p>",
    css: "/* 여기에 body가 다크모드일 때(원하는 클래스) 적용될 스타일을 만들어보세요 */",
    js: "// 여기에 버튼 클릭 시 document.body에서 원하는 클래스를 토글해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: 'addEventListener("click", ...)로 버튼 클릭 이벤트를 등록해보세요.' };
    }
    var toggleMatch = /document\s*\.\s*body\s*\.\s*classList\s*\.\s*toggle\s*\(\s*['"`]([\w-]+)['"`]\s*\)/.exec(js);
    if (!toggleMatch) {
      return {
        pass: false,
        message: 'document.body.classList.toggle("클래스이름")으로 body에 클래스를 토글해보세요.'
      };
    }
    var className = toggleMatch[1];
    var rule = findRuleForClass(code.css, className);
    if (!rule || Object.keys(rule.declarations).length === 0) {
      return {
        pass: false,
        message: "CSS에서 ." + className + " 클래스가 적용됐을 때의 스타일(배경색, 글자색 등)을 만들어보세요."
      };
    }
    return { pass: true, message: "통과! 클릭하면 다크모드가 켜지고 꺼지는 토글을 잘 만들었어요." };
  }
};
