export default {
  id: "junior-filter-buttons",
  title: "필터 버튼 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "카테고리 버튼을 누르면 그 카테고리의 항목만 남기고 나머지는 숨기는 필터를 만들어봐요.",
  instructions:
    "<p>지금까지는 <code>document.querySelector(\"선택자\")</code>로 딱 하나만 골랐다면, " +
    "이번엔 <code>document.querySelectorAll(\"선택자\")</code>를 써볼게요 — 이건 조건에 맞는 " +
    "요소를 전부 모아서 돌려줘요(정확히는 NodeList라는, 배열과 비슷하게 " +
    "<code>forEach</code>를 쓸 수 있는 목록이에요). 그래서 여러 항목을 한번에 순회하면서 " +
    "각각을 보여주거나 숨길 수 있어요.</p>" +
    "<p>그리고 아래 버튼과 항목에는 <code>data-category=\"과일\"</code>처럼 우리가 직접 " +
    "지어낸 속성이 붙어있어요 — 이렇게 태그에 자유롭게 붙이는 걸 <strong>data 속성</strong>이라고 " +
    "불러요. JS에서는 <code>요소.getAttribute(\"data-category\")</code>로 그 값을 읽어올 수 " +
    "있어요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var buttons = document.querySelectorAll(\".filter-bar button\");\n" +
    "buttons.forEach(function (btn) {\n" +
    "  btn.addEventListener(\"click\", function () {\n" +
    "    var category = btn.getAttribute(\"data-category\");\n" +
    "    var items = document.querySelectorAll(\"#item-list li\");\n" +
    "    items.forEach(function (item) {\n" +
    "      if (category === \"전체\" || item.getAttribute(\"data-category\") === category) {\n" +
    "        item.classList.remove(\"hidden\");\n" +
    "      } else {\n" +
    "        item.classList.add(\"hidden\");\n" +
    "      }\n" +
    "    });\n" +
    "  });\n});</code></pre>" +
    "<p>에디터에 필터 버튼 3개(전체/과일/채소, 각각 <code>data-category</code> 속성이 " +
    "붙어있어요)와 항목 4개(<code>#item-list</code> 안, 각각 <code>data-category</code>가 " +
    "붙어있어요)가 준비되어 있어요. 버튼을 누르면 그 카테고리(또는 \"전체\"일 때는 전부)에 " +
    "해당하는 항목만 보이고 나머지는 <code>hidden</code> 클래스로 숨겨지도록 " +
    "<code>forEach</code>를 사용해서 만들어보세요.</p>",
  starter: {
    html:
      "<div class=\"filter-bar\">\n" +
      "  <button data-category=\"전체\">전체</button>\n" +
      "  <button data-category=\"과일\">과일</button>\n" +
      "  <button data-category=\"채소\">채소</button>\n" +
      "</div>\n" +
      "<ul id=\"item-list\">\n" +
      "  <li data-category=\"과일\">사과</li>\n" +
      "  <li data-category=\"채소\">당근</li>\n" +
      "  <li data-category=\"과일\">바나나</li>\n" +
      "  <li data-category=\"채소\">양파</li>\n" +
      "</ul>",
    css: ".hidden {\n  display: none;\n}",
    js:
      "// 여기에 필터 버튼들을 forEach로 순회하며 클릭 이벤트를 등록하고,\n" +
      "// 클릭 시 #item-list 항목들도 forEach로 순회하며 조건에 따라 hidden을 토글해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    if (!/addEventListener\s*\(\s*['"`]click['"`]/.test(js)) {
      return { pass: false, message: '버튼들에 addEventListener("click", ...)로 클릭 이벤트를 등록해보세요.' };
    }
    if (!/forEach/.test(js)) {
      return { pass: false, message: "querySelectorAll로 모은 버튼들과 항목들을 forEach로 순회해보세요." };
    }
    if (!/classList\s*\.\s*add\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.add("hidden")으로 조건에 안 맞는 항목을 숨겨보세요.' };
    }
    if (!/classList\s*\.\s*remove\s*\(\s*['"`]hidden['"`]\s*\)/.test(js)) {
      return { pass: false, message: 'classList.remove("hidden")으로 조건에 맞는 항목을 보여주세요.' };
    }
    return { pass: true, message: "통과! 필터 버튼을 잘 만들었어요." };
  }
};
