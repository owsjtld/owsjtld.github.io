export default {
  id: "js-dataset-intro",
  title: "data 속성을 더 간단히 읽기 — .dataset",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "getAttribute(\"data-...\") 대신, .dataset.이름으로 더 간단하게 data 속성을 읽어봐요.",
  instructions:
    "<p>전에 <code>data-category</code> 같은 속성을 <code>요소.getAttribute(\"data-category\")</code>로 " +
    "읽어봤죠. 사실 더 간단한 방법이 있어요 — <code>요소.dataset.category</code>처럼 " +
    "<strong>점(.)으로 바로</strong> 읽을 수 있어요. <code>data-이름</code>의 \"이름\" 부분만 " +
    "<code>dataset</code> 뒤에 붙이면 돼요(<code>data-my-color</code>라면 " +
    "<code>dataset.myColor</code>처럼 하이픈 다음 글자가 대문자로 바뀌어요).</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;p id=\"box\" data-message=\"안녕하세요!\"&gt;&lt;/p&gt;\n\n" +
    "var box = document.querySelector(\"#box\");\n" +
    "document.querySelector(\"#output\").textContent = box.dataset.message;</code></pre>" +
    "<p>에디터의 HTML에는 <code>data-message</code> 속성이 붙은 " +
    "<code>#box</code>와 빈 <code>#output</code>이 준비되어 있어요. " +
    "<code>#box</code>의 <code>dataset.message</code> 값을 읽어서 " +
    "<code>#output</code>의 <code>textContent</code>에 넣어보세요.</p>",
  starter: {
    html: '<p id="box" data-message="안녕하세요!"></p>\n<p id="output"></p>',
    css: "",
    js: "// 여기에 #box의 dataset.message 값을 읽어서 #output의 textContent에 넣어보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/\.\s*dataset\s*\.\s*message\b/.test(js)) {
      return { pass: false, message: ".dataset.message로 data-message 값을 읽어보세요." };
    }
    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#output['"`]\s*\)\s*\.\s*textContent\s*=/.test(js)) {
      return { pass: false, message: "읽은 값을 #output의 textContent에 넣어보세요." };
    }
    return { pass: true, message: "통과! .dataset으로 data 속성을 더 간단하게 읽었어요." };
  }
};
