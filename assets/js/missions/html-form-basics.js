export default {
  id: "html-form-basics",
  title: "폼 만들기 — form, input, label, select, textarea, button",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "form과 입력 관련 태그들로 방문자에게 정보를 입력받는 폼을 만들어봐요.",
  instructions:
    "<p><code>&lt;form&gt;</code>은 입력칸들을 하나로 묶는 태그예요. 그 안에 여러 입력 관련 " +
    "태그를 함께 써요.</p>" +
    "<ul>" +
      "<li><code>&lt;label&gt;</code> — 입력칸이 뭘 위한 건지 설명하는 글자</li>" +
      "<li><code>&lt;input&gt;</code> — 한 줄짜리 텍스트 등을 입력받는 칸</li>" +
      "<li><code>&lt;select&gt;</code>/<code>&lt;option&gt;</code> — 여러 선택지 중 하나를 " +
      "고르는 드롭다운</li>" +
      "<li><code>&lt;textarea&gt;</code> — 여러 줄짜리 긴 글을 입력받는 칸</li>" +
      "<li><code>&lt;button&gt;</code> — 폼을 제출하는 버튼</li>" +
    "</ul>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;form&gt;\n  &lt;label for=\"name\"&gt;이름&lt;/label&gt;\n" +
    "  &lt;input type=\"text\" id=\"name\"&gt;\n\n  &lt;label for=\"color\"&gt;좋아하는 색&lt;/label&gt;\n" +
    "  &lt;select id=\"color\"&gt;\n    &lt;option value=\"red\"&gt;빨강&lt;/option&gt;\n" +
    "    &lt;option value=\"blue\"&gt;파랑&lt;/option&gt;\n  &lt;/select&gt;\n\n" +
    "  &lt;label for=\"msg\"&gt;메시지&lt;/label&gt;\n  &lt;textarea id=\"msg\"&gt;&lt;/textarea&gt;\n\n" +
    "  &lt;button type=\"submit\"&gt;보내기&lt;/button&gt;\n&lt;/form&gt;</code></pre>" +
    "<p>에디터에 <code>form</code>을 만들고, 그 안에 <code>label</code>, <code>input</code>, " +
    "<code>select</code>(option 2개 이상), <code>textarea</code>, <code>button</code>을 직접 " +
    "채워보세요.</p>",
  starter: {
    html: "<!-- 여기에 form과 입력 태그들로 폼을 만들어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var form = doc.querySelector("form");
    if (!form) {
      return { pass: false, message: "form 태그를 만들어보세요." };
    }
    var label = form.querySelector("label");
    if (!label || !label.textContent.trim()) {
      return { pass: false, message: "label 태그로 입력칸 설명을 적어보세요." };
    }
    if (!form.querySelector("input")) {
      return { pass: false, message: "input 태그를 만들어보세요." };
    }
    var select = form.querySelector("select");
    if (!select || select.querySelectorAll("option").length < 2) {
      return { pass: false, message: "select 태그 안에 option을 2개 이상 만들어보세요." };
    }
    if (!form.querySelector("textarea")) {
      return { pass: false, message: "textarea 태그를 만들어보세요." };
    }
    var button = form.querySelector("button");
    if (!button || !button.textContent.trim()) {
      return { pass: false, message: "button 태그를 만들고 안에 글자를 적어보세요." };
    }
    return { pass: true, message: "통과! form과 입력 태그들로 폼을 잘 만들었어요." };
  }
};
