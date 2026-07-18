import { parseCssRules } from "./helpers.js";

export default {
  id: "css-content-property",
  title: "CSS로 화면에 내용 만들기 — content, ::before/::after",
  level: "입문 · CSS",
  tier: "입문",
  panels: ["html", "css"],
  summary: "CSS만으로도 화면에 글자나 장식을 만들 수 있다는 걸 보고, HTML과 CSS가 왜 역할이 다른지 알아봐요.",
  instructions:
    "<p>지금까지는 HTML에 이미 있는 내용을 CSS로 꾸미기만 했죠. 그런데 CSS는 사실 " +
    "<strong>없던 내용을 화면에 새로 만들어낼</strong> 수도 있어요. " +
    "<code>::before</code>/<code>::after</code>는 요소의 앞/뒤에 CSS만으로 가상의 " +
    "요소를 하나 끼워 넣는 선택자고, 그 안의 <code>content</code> 속성에 글자를 넣으면 " +
    "화면에 그대로 나타나요.</p>" +
    "<div class=\"demo-row\">" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS 없이</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 없이\" sandbox=\"\" " +
        "srcdoc=\"<span>공지사항</span>\">" +
        "</iframe>" +
      "</div>" +
      "<div class=\"demo-col\">" +
        "<div class=\"demo-label\">CSS의 content로 글자를 추가했을 때</div>" +
        "<iframe class=\"demo-frame\" title=\"CSS 적용 후\" sandbox=\"\" " +
        "srcdoc=\"<style>.badge::after{content:'NEW';background:#e5626b;color:#fff;" +
        "padding:2px 6px;margin-left:8px;border-radius:4px;font-size:12px;}</style>" +
        "<span class='badge'>공지사항</span>\">" +
        "</iframe>" +
      "</div>" +
    "</div>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>.badge::after {\n  content: \"NEW\";\n  background: red;\n  color: white;\n" +
    "  padding: 2px 6px;\n}</code></pre>" +
    "<p><strong>그런데 여기서 중요한 게 있어요.</strong> CSS의 <code>content</code>로 만든 " +
    "글자는 화면엔 보이지만 <em>진짜 텍스트가 아니에요</em> — 마우스로 선택하거나 복사할 수 " +
    "없고, 화면 읽기 프로그램(스크린 리더)도 번역기도 못 읽고, 검색엔진도 찾지 못해요. " +
    "<strong>근데 이건 \"숨겨져서 보호되는\" 게 아니라 그냥 고장난 거예요.</strong> 개발자도구나 " +
    "페이지 소스 보기로 CSS 파일을 열어보면 <code>content</code> 안의 글자가 그냥 평문으로 " +
    "다 보이거든요 — 오히려 일반 텍스트보다 더 쉽게 새어나가요. 그러니까 \"복사가 안 되니까 " +
    "중요한 정보는 CSS에 넣어서 보호하자\"는 생각은 틀렸어요 — 보호 효과는 거의 없으면서, " +
    "그 내용을 정당하게 필요로 하는 사람들(스크린 리더 사용자, 검색엔진, 번역기)만 확실히 " +
    "못 쓰게 망가뜨리는 거예요. 그래서 방문자에게 진짜로 전달해야 하는 내용(글, 정보)은 항상 " +
    "<strong>HTML</strong>에 넣어야 하고, CSS의 <code>content</code>는 \"NEW\" 배지처럼 " +
    "없어도 의미 전달에 지장 없는 순수 장식용으로만 써야 해요. 이게 HTML과 CSS가 하는 일이 " +
    "서로 다른 진짜 이유예요 — <strong>HTML은 \"내용이 뭐냐\"</strong>를, <strong>CSS는 " +
    "\"어떻게 보이냐\"</strong>를 담당해요.</p>" +
    "<p>에디터의 HTML에는 <code>span.badge</code>가 준비되어 있어요. CSS 칸에 " +
    "<code>.badge::after</code> 선택자를 만들고 <code>content</code>로 원하는 글자를 " +
    "추가해보세요.</p>",
  starter: {
    html: "<span class=\"badge\">공지사항</span>",
    css: "/* 여기에 .badge::after 선택자를 만들고 content로 글자를 추가해보세요 */"
  },
  check: function (code) {
    var rules = parseCssRules(code.css);
    var found = rules.some(function (r) {
      return /::\s*(before|after)/.test(r.selectorText) && r.declarations.content && r.declarations.content.trim();
    });
    if (!found) {
      return {
        pass: false,
        message: "::before 또는 ::after 선택자를 만들고 content 속성에 원하는 글자를 넣어보세요."
      };
    }
    return { pass: true, message: "통과! CSS의 content로 화면에 새 내용을 만들어봤어요." };
  }
};
