export default {
  id: "js-object-basics",
  title: "객체로 여러 정보 묶기 — { 키: 값 }",
  level: "입문 · JS",
  tier: "입문",
  panels: ["html", "css", "js"],
  summary: "이름, 나이처럼 서로 다른 정보 여러 개를 객체 하나에 묶고, 점(.)으로 꺼내봐요.",
  instructions:
    "<p>지금까지 만든 배열은 값을 순서대로만 담았죠. 그런데 \"이름은 뭐고, 직업은 뭐고\"처럼 " +
    "여러 정보를 하나로 묶고 싶을 땐 <strong>객체(object)</strong>를 써요. " +
    "<code>{ 키: 값, 키: 값 }</code>처럼 중괄호 안에 이름표(키)를 붙여서 값을 저장하고, " +
    "<code>객체.키</code>로 그 값을 꺼낼 수 있어요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>var person = { name: \"모카\", job: \"웹 개발자\" };\n\n" +
    "document.querySelector(\"#name\").textContent = person.name;\n" +
    "document.querySelector(\"#job\").textContent = person.job;</code></pre>" +
    "<p>에디터의 HTML에는 이름과 직업을 보여줄 칸(<code>#name</code>, <code>#job</code>)이 " +
    "준비되어 있어요. JS 칸에 <code>name</code>과 <code>job</code> 두 키를 가진 객체를 " +
    "직접 만들고, 점(.)으로 각 값을 꺼내서 두 칸의 <code>textContent</code>에 넣어보세요.</p>",
  starter: {
    html: "<p>이름: <span id=\"name\"></span></p>\n<p>직업: <span id=\"job\"></span></p>",
    css: "",
    js: "// 여기에 name과 job 키를 가진 객체를 만들고, 점(.)으로 값을 꺼내 각 칸에 넣어보세요"
  },
  check: function (code) {
    var js = code.js || "";
    var hasObject = /\{\s*[\w"'`]+\s*:\s*[^,{}]+,\s*[\w"'`]+\s*:\s*[^,{}]+\s*\}/.test(js);
    if (!hasObject) {
      return { pass: false, message: "{ 키: 값, 키: 값 } 형태로 두 가지 정보를 담은 객체를 만들어보세요." };
    }
    var dotAccessCount = (js.match(/\.\s*textContent\s*=\s*[\w$]+\s*\.\s*[\w$]+/g) || []).length;
    if (dotAccessCount < 2) {
      return {
        pass: false,
        message: "객체.키 형태로 값을 꺼내서 두 칸(#name, #job)의 textContent에 각각 넣어보세요."
      };
    }
    return { pass: true, message: "통과! 객체에 정보를 묶고 점(.)으로 잘 꺼냈어요." };
  }
};
