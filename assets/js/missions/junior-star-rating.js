import { findRuleForClass } from "./helpers.js";

export default {
  id: "junior-star-rating",
  title: "별점 컴포넌트 만들기",
  level: "주니어 · 컴포넌트",
  tier: "주니어",
  panels: ["html", "css", "js"],
  summary: "별을 클릭하면 그 별까지 채워지는 별점 컴포넌트를 만들어봐요.",
  instructions:
    "<p>별 3개 중 하나를 클릭하면, 그 별과 그 앞의 별들까지 전부 채워진 색으로 바뀌어야 " +
    "해요. 예를 들어 2번째 별을 클릭하면 1번, 2번 별은 채워지고 3번 별은 그대로예요. " +
    "각 별의 클릭 이벤트 안에서, 채워야 할 별들에는 <code>classList.add(\"클래스이름\")</code>을, " +
    "안 채워야 할 별에는 <code>classList.remove(\"클래스이름\")</code>을 호출하면 돼요. " +
    "클래스 이름은 원하는 대로 직접 정해도 돼요.</p>" +
    "<p><strong>예시 (2번째 별 클릭 시)</strong></p>" +
    "<pre><code>document.querySelector(\"#star2\").addEventListener(\"click\", function () {\n" +
    "  document.querySelector(\"#star1\").classList.add(\"filled\");\n" +
    "  document.querySelector(\"#star2\").classList.add(\"filled\");\n" +
    "  document.querySelector(\"#star3\").classList.remove(\"filled\");\n});</code></pre>" +
    "<p>에디터에 별 3개(<code>#star1</code>, <code>#star2</code>, <code>#star3</code>)가 준비되어 " +
    "있어요. 별 3개 모두에 클릭 이벤트를 등록하고, CSS에 채워진 별의 스타일(색 등)을 " +
    "직접 만들어보세요.</p>",
  starter: {
    html:
      "<span id=\"star1\" class=\"star\">★</span>\n" +
      "<span id=\"star2\" class=\"star\">★</span>\n" +
      "<span id=\"star3\" class=\"star\">★</span>",
    css: ".star {\n  font-size: 32px;\n  color: #ccc;\n  cursor: pointer;\n}\n" +
      "/* 여기에 채워진 별의 클래스를 만들어보세요 */",
    js: "// 여기에 별 3개 각각의 클릭 이벤트를 등록해보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var clicks = (js.match(/addEventListener\s*\(\s*['"`]click['"`]/g) || []).length;
    if (clicks < 3) {
      return { pass: false, message: "별 3개 모두에 클릭 이벤트를 등록해보세요." };
    }
    var addMatch = /classList\s*\.\s*add\s*\(\s*['"`]([\w-]+)['"`]\s*\)/.exec(js);
    if (!addMatch) {
      return { pass: false, message: '클릭한 별에 classList.add("클래스이름")으로 클래스를 추가해보세요.' };
    }
    var className = addMatch[1];
    var addCount = (js.match(new RegExp("classList\\s*\\.\\s*add\\s*\\(\\s*['\"`]" + className + "['\"`]\\s*\\)", "g")) || []).length;
    if (addCount < 3) {
      return {
        pass: false,
        message: "별 3개를 각각 클릭했을 때 ." + className + " 클래스가 채워야 할 별에 붙도록 만들어보세요."
      };
    }
    // 별 3개 모두, 그 별 근처에서 add/remove 중 하나가 호출되는지 확인 — 한 번의 클릭에
    // 별 3개 전부를 무조건 add()만 해버리는(즉 항상 다 채워버리는) 코드를 걸러내기 위함.
    for (var starNum = 1; starNum <= 3; starNum++) {
      var nearActionRe = new RegExp(
        "#star" + starNum + "[\\s\\S]{0,200}?classList\\s*\\.\\s*(add|remove)\\s*\\(\\s*['\"`]" + className + "['\"`]\\s*\\)"
      );
      if (!nearActionRe.test(js)) {
        return {
          pass: false,
          message: "#star" + starNum + " 근처에서도 ." + className + " 클래스를 add 또는 remove 해보세요 (클릭한 별에 따라 채워지는 범위가 달라져야 해요)."
        };
      }
    }
    var rule = findRuleForClass(code.css, className);
    if (!rule || Object.keys(rule.declarations).length === 0) {
      return { pass: false, message: "CSS에서 ." + className + " 클래스의 스타일(색 등)을 만들어보세요." };
    }
    return { pass: true, message: "통과! 별점 컴포넌트를 잘 만들었어요." };
  }
};
