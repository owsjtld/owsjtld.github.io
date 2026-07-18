export default {
  id: "js-module-import-intro",
  title: "여러 파일로 나누기 — import와 export",
  level: "시니어 · 구조",
  tier: "시니어",
  advancedEditor: true,
  fileOrder: ["utils.js", "index.js"],
  entry: "index.js",
  bodyHtml: '<p id="output"></p>',
  summary: "코드를 여러 파일로 나누고, export/import로 서로 연결해봐요. 이 사이트도 실제로 이렇게 만들어져 있어요.",
  instructions:
    "<p>지금까지는 미션 하나에 파일이 하나(또는 HTML/CSS/JS 딱 세 칸)뿐이었죠. 실제 " +
    "프로젝트는 코드가 커지면 파일 여러 개로 나눠서 관리해요 — 사실 이 사이트 자체도 " +
    "미션 하나당 파일 하나씩(<code>assets/js/missions/</code> 폴더 안)으로 나눠져 있고, " +
    "<code>missions-data.js</code>가 그 파일들을 import해서 조립해요.</p>" +
    "<p>파일을 나누면 한 파일에서 만든 함수를 다른 파일에서도 쓰고 싶을 때가 생겨요. " +
    "이럴 때 쓰는 게 <code>export</code>(이 파일 밖에서도 쓸 수 있게 내보내기)와 " +
    "<code>import</code>(다른 파일이 내보낸 걸 가져오기)예요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>// utils.js\nexport function shout(text) {\n  return text + \"!!!\";\n}</code></pre>" +
    "<pre><code>// index.js\nimport { shout } from \"./utils.js\";\n\n" +
    "document.querySelector(\"#output\").textContent = shout(\"안녕\");</code></pre>" +
    "<p>이렇게 <code>export function 이름(...) { ... }</code>로 함수를 내보내고, " +
    "다른 파일에서 <code>import { 이름 } from \"./파일명\";</code>으로 가져와서 그대로 " +
    "함수처럼 호출할 수 있어요.</p>" +
    "<p>이번 미션은 화면 구성이 좀 달라요 — 위쪽에 <code>utils.js</code>/<code>index.js</code> " +
    "탭이 있어서 눌러서 파일을 바꿔가며 편집하고, \"전체화면\" 버튼으로 크게 펼쳐볼 수 " +
    "있어요. 코드를 다 쓴 뒤 오른쪽 아래 \"실행 ▶\" 버튼을 누르면 실제로 두 파일이 " +
    "연결되어 실행된 결과가 보여요(예전처럼 타이핑할 때마다 자동으로 실행되지 않고, " +
    "버튼을 눌러야 실행돼요).</p>" +
    "<p><code>utils.js</code>에 원하는 이름으로 함수 하나를 만들어 <code>export</code>하고, " +
    "<code>index.js</code>에서 그 이름 그대로 <code>import</code>해서 호출한 결과를 " +
    "<code>#output</code>의 <code>textContent</code>에 넣어보세요(예시처럼 " +
    "<code>shout</code>를 써도 되고, 다른 이름을 지어도 돼요 — 대신 두 파일에서 " +
    "<strong>똑같은 이름</strong>을 써야 연결이 돼요).</p>",
  starter: {
    files: {
      "utils.js": "// 여기에 함수 하나를 만들고 export 해보세요",
      "index.js":
        "// 여기에 './utils.js'에서 그 함수를 import하고,\n" +
        "// #output의 textContent에 호출한 결과를 넣어보세요"
    }
  },
  check: function (code) {
    var files = code.files || {};
    var utilsSrc = files["utils.js"] || "";
    var indexSrc = files["index.js"] || "";

    var exportMatch = /export\s+function\s+(\w+)\s*\(/.exec(utilsSrc);
    if (!exportMatch) {
      return {
        pass: false,
        message: "utils.js에 export function 함수이름(...) { ... } 형태로 함수를 만들고 export 해보세요."
      };
    }
    var fnName = exportMatch[1];

    var importRe = new RegExp("import\\s*\\{[^}]*\\b" + fnName + "\\b[^}]*\\}\\s*from\\s*['\"]\\./utils\\.js['\"]");
    if (!importRe.test(indexSrc)) {
      return {
        pass: false,
        message: 'index.js에서 import { ' + fnName + ' } from "./utils.js"; 로 그 함수를 가져와보세요.'
      };
    }

    var callRe = new RegExp("\\b" + fnName + "\\s*\\(");
    if (!callRe.test(indexSrc)) {
      return { pass: false, message: fnName + "() 함수를 index.js에서 실제로 호출해보세요." };
    }

    if (!/document\s*\.\s*querySelector\s*\(\s*['"`]#output['"`]\s*\)\s*\.\s*textContent\s*=/.test(indexSrc)) {
      return { pass: false, message: "#output의 textContent에 그 결과를 넣어보세요." };
    }

    return { pass: true, message: "통과! utils.js의 함수를 index.js에서 import해서 실제로 실행했어요." };
  }
};
