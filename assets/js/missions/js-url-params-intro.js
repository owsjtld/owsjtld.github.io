export default {
  id: "js-url-params-intro",
  title: "URL에 담긴 정보 읽기 — URLSearchParams",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "URL 뒤에 붙는 ?id=42 같은 쿼리스트링을, URLSearchParams로 파싱해서 값을 꺼내봐요.",
  instructions:
    "<p>주소 뒤에 <code>?id=42</code>처럼 붙는 부분을 <strong>쿼리스트링</strong>이라고 해요. " +
    "이 사이트의 <code>mission.html?id=html-intro-card</code> 같은 주소도 정확히 이 방식으로 " +
    "\"어떤 미션을 보여줄지\"를 정해요 — 실제로 <code>mission-page.js</code>가 " +
    "<code>location.search</code>(현재 주소의 물음표 뒤 부분, 예: <code>\"?id=html-intro-card\"</code>)를 " +
    "읽어서 이 방법으로 <code>id</code> 값을 꺼내요.</p>" +
    "<p><code>new URLSearchParams(문자열)</code>로 쿼리스트링을 파싱하고, " +
    "<code>.get(\"키\")</code>로 원하는 값을 꺼낼 수 있어요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var query = \"?id=42\"; // 실제로는 location.search에 이런 문자열이 들어있어요\n\n" +
    "var params = new URLSearchParams(query);\n" +
    "var id = params.get(\"id\"); // \"42\"\n\n" +
    "document.querySelector(\"#output\").textContent = id;</code></pre>" +
    "<p>에디터의 JS 칸에는 쿼리스트링 문자열(<code>query</code>)이 준비되어 있어요. " +
    "<code>URLSearchParams</code>로 파싱하고 <code>.get(\"id\")</code>로 <code>id</code> 값을 " +
    "꺼내서 <code>#output</code>의 <code>textContent</code>에 넣어보세요.</p>",
  starter: {
    html: '<p id="output"></p>',
    css: "",
    js:
      'var query = "?id=42&sort=asc";\n\n' +
      '// 여기에 URLSearchParams로 query를 파싱해서 id 값을 꺼내 #output에 넣어보세요'
  },
  check: function (code) {
    var js = code.js || "";
    if (!/new\s+URLSearchParams\s*\(/.test(js)) {
      return { pass: false, message: "new URLSearchParams(query)로 쿼리스트링을 파싱해보세요." };
    }
    if (!/\.\s*get\s*\(\s*['"`]id['"`]\s*\)/.test(js)) {
      return { pass: false, message: '.get("id")로 id 값을 꺼내보세요.' };
    }
    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#output['"`]\s*\)\s*\.\s*textContent\s*=/.test(js)) {
      return { pass: false, message: "꺼낸 id 값을 #output의 textContent에 넣어보세요." };
    }
    return { pass: true, message: "통과! URLSearchParams로 쿼리스트링에서 값을 잘 꺼냈어요." };
  }
};
