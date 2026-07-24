export default {
  id: "js-localstorage-intro",
  title: "브라우저에 값 기억하기 — localStorage",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "새로고침해도 사라지지 않게, 브라우저에 값을 저장하고 다시 불러와봐요.",
  instructions:
    "<p>지금까지 만든 변수는 페이지를 새로고침하면 전부 사라졌죠. " +
    "<code>localStorage</code>를 쓰면 브라우저에 값을 저장해서, 새로고침하거나 창을 닫았다 " +
    "다시 열어도 그대로 남아있게 할 수 있어요.</p>" +
    "<ul>" +
      "<li><code>localStorage.setItem(\"키\", 값)</code> — 값을 저장해요.</li>" +
      "<li><code>localStorage.getItem(\"키\")</code> — 저장된 값을 읽어와요(저장된 적 없으면 " +
      "<code>null</code>).</li>" +
    "</ul>" +
    "<p><strong>사실 이 사이트도 정확히 이 방법으로 여러분이 통과한 미션 목록을 기억해요</strong> — " +
    "값이 문자열이 아니면(예: 객체나 배열) <code>JSON.stringify</code>로 문자열로 바꿔서 저장하고, " +
    "읽어올 땐 <code>JSON.parse</code>로 되돌리는데, 지금은 우선 문자열 하나를 저장하고 " +
    "불러오는 것부터 연습해볼게요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#save-btn\").addEventListener(\"click\", function () {\n" +
    "  var name = document.querySelector(\"#name-input\").value;\n" +
    "  localStorage.setItem(\"myName\", name);\n});\n\n" +
    "document.querySelector(\"#load-btn\").addEventListener(\"click\", function () {\n" +
    "  var saved = localStorage.getItem(\"myName\");\n" +
    "  document.querySelector(\"#output\").textContent = saved;\n});</code></pre>" +
    "<p>에디터의 HTML에는 입력칸(<code>#name-input</code>), 저장 버튼(<code>#save-btn</code>), " +
    "불러오기 버튼(<code>#load-btn</code>), 결과를 보여줄 <code>#output</code>이 준비되어 " +
    "있어요. 저장 버튼을 누르면 입력칸의 값을 <code>\"myName\"</code>이라는 키로 " +
    "<code>localStorage</code>에 저장하고, 불러오기 버튼을 누르면 그 키로 값을 읽어와서 " +
    "<code>#output</code>에 보여주도록 만들어보세요.</p>",
  starter: {
    html:
      '<input id="name-input" placeholder="이름을 입력하세요" />\n' +
      '<button id="save-btn">저장하기</button>\n' +
      '<button id="load-btn">불러오기</button>\n' +
      '<p id="output"></p>',
    css: "",
    js:
      "// 여기에 저장 버튼 클릭 시 localStorage.setItem(\"myName\", ...)으로 입력값을 저장하고,\n" +
      '// 불러오기 버튼 클릭 시 localStorage.getItem("myName")으로 읽어서 #output에 넣어보세요'
  },
  check: function (code) {
    var js = code.js || "";
    var setMatch = /localStorage\s*\.\s*setItem\s*\(\s*(['"`])myName\1\s*,/.exec(js);
    if (!setMatch) {
      return { pass: false, message: 'localStorage.setItem("myName", ...)으로 입력값을 저장해보세요.' };
    }
    if (!/localStorage\s*\.\s*getItem\s*\(\s*['"`]myName['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'localStorage.getItem("myName")으로 저장된 값을 읽어와보세요.' };
    }
    var clicks = (js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || []).length;
    if (clicks < 2) {
      return { pass: false, message: "저장 버튼과 불러오기 버튼 모두에 클릭 이벤트를 등록해보세요." };
    }
    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#output['"`]\s*\)\s*\.\s*textContent\s*=/.test(js)) {
      return { pass: false, message: "읽어온 값을 #output의 textContent에 넣어보세요." };
    }
    return {
      pass: true,
      message: "통과! localStorage로 값을 저장하고 불러왔어요 — 이 사이트가 진행도를 기억하는 방식과 똑같아요."
    };
  }
};
