export default {
  id: "html-br-hr",
  title: "줄바꿈과 구분선 — br과 hr",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "br로 문장 중간에 줄을 바꾸고, hr로 구역을 나누는 가로줄을 그어봐요.",
  instructions:
    "<p><code>&lt;br&gt;</code>은 문장 중간에서 줄만 바꾸는 태그예요(새 문단이 아니라 " +
    "그냥 줄바꿈). <code>&lt;hr&gt;</code>은 화면에 가로줄을 그어서 내용을 구역별로 " +
    "나눠 보여주는 태그예요. 둘 다 <code>img</code>처럼 <strong>닫는 태그가 없어요</strong>.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;p&gt;첫째 줄&lt;br&gt;둘째 줄&lt;/p&gt;\n&lt;hr&gt;\n&lt;p&gt;구분선 아래 내용&lt;/p&gt;</code></pre>" +
    "<p>에디터에 <code>p</code> 안에서 <code>br</code>로 줄을 한 번 바꿔보고, 그 아래에 " +
    "<code>hr</code>로 구분선을 하나 그어보세요.</p>",
  starter: {
    html: "<!-- 여기에 br과 hr을 각각 써보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    if (!doc.querySelector("br")) {
      return { pass: false, message: "br 태그를 만들어보세요." };
    }
    if (!doc.querySelector("hr")) {
      return { pass: false, message: "hr 태그를 만들어보세요." };
    }
    return { pass: true, message: "통과! br과 hr을 잘 사용했어요." };
  }
};
