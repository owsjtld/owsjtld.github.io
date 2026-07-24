export default {
  id: "js-event-delegation-intro",
  title: "이벤트 위임 — 부모 하나에만 리스너 걸기",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "자식 하나하나에 리스너를 달지 않고, 부모 하나에만 걸어서 어떤 자식이 눌렸는지 알아내봐요.",
  instructions:
    "<p>전에 필터 버튼 미션에서는 버튼마다(<code>forEach</code>로) 리스너를 하나씩 달았어요. " +
    "그런데 나중에 목록이 <strong>동적으로 새로 생기는 경우</strong>(예: 페이지네이션처럼 다시 " +
    "그려지는 목록)엔 새로 생긴 항목엔 리스너가 안 달려있어서 곤란해요. 이럴 때 쓰는 방법이 " +
    "<strong>이벤트 위임</strong>이에요 — 자식 하나하나 대신 <strong>부모 요소 하나에만</strong> " +
    "리스너를 걸어두는 거예요. 클릭 이벤트는 자식에서 부모로 \"버블링\"(전파)되기 때문에, " +
    "자식을 클릭해도 부모에 걸어둔 리스너가 실행돼요 — 그때 <code>event.target</code>이 " +
    "\"실제로 클릭된 그 자식 요소\"를 가리켜요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>document.querySelector(\"#color-list\").addEventListener(\"click\", function (event) {\n" +
    "  var color = event.target.dataset.color;\n" +
    "  document.querySelector(\"#selected\").textContent = color;\n});</code></pre>" +
    "<p>여기서 리스너는 <code>#color-list</code>(부모 <code>ul</code>) 딱 하나에만 달려있지만, " +
    "그 안의 <code>li</code> 중 아무거나 클릭해도 <code>event.target</code>이 그 " +
    "<code>li</code>를 가리켜서 정상적으로 동작해요.</p>" +
    "<p>에디터의 HTML에는 <code>li</code> 3개가 담긴 <code>#color-list</code>(각각 " +
    "<code>data-color</code> 속성 있음)와 빈 <code>#selected</code>가 준비되어 있어요. " +
    "<code>#color-list</code> 하나에만 클릭 이벤트를 걸고, <code>event.target.dataset.color</code>로 " +
    "클릭된 항목의 색 이름을 읽어서 <code>#selected</code>의 <code>textContent</code>에 " +
    "넣어보세요.</p>",
  starter: {
    html:
      '<ul id="color-list">\n' +
      '  <li data-color="빨강">빨강</li>\n' +
      '  <li data-color="파랑">파랑</li>\n' +
      '  <li data-color="초록">초록</li>\n' +
      "</ul>\n" +
      '<p id="selected"></p>',
    css: "",
    js:
      "// 여기에 #color-list 하나에만 클릭 이벤트를 걸고,\n" +
      "// event.target.dataset.color로 클릭된 항목의 색을 #selected에 넣어보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (
      !/document\s*\.\s*querySelector\s*\(\s*['"`]#color-list['"`]\s*\)\s*\.\s*addEventListener\s*\(\s*['"`]click['"`]/.test(
        js
      )
    ) {
      return { pass: false, message: '#color-list에 addEventListener("click", ...)을 하나만 걸어보세요.' };
    }
    if (!/\.\s*target\s*\.\s*dataset\s*\.\s*color\b/.test(js)) {
      return { pass: false, message: "event.target.dataset.color로 실제 클릭된 항목의 색을 읽어보세요." };
    }
    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#selected['"`]\s*\)\s*\.\s*textContent\s*=/.test(js)) {
      return { pass: false, message: "읽은 색 이름을 #selected의 textContent에 넣어보세요." };
    }
    return { pass: true, message: "통과! 부모 하나에만 걸어둔 리스너로 이벤트 위임을 잘 사용했어요." };
  }
};
