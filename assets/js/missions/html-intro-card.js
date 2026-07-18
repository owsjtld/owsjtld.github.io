export default {
  id: "html-intro-card",
  title: "나만의 소개 카드",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "h1과 p 태그로 간단한 자기소개를 작성해봐요.",
  instructions:
    "<p>이번 미션에서는 <code>&lt;h1&gt;</code>과 <code>&lt;p&gt;</code> 태그를 사용해 " +
    "간단한 자기소개 카드를 만듭니다. 아래 예시를 참고해서, 에디터에 <strong>직접 타이핑</strong>해보세요 " +
    "(이름과 소개 문장은 예시 그대로 말고 자신의 내용으로 적어보세요). " +
    "아직 CSS는 배우지 않았으니 지금은 HTML 칸만 있어요 — 브라우저 기본 모습 그대로 보일 거예요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;h1&gt;모카&lt;/h1&gt;\n&lt;p&gt;저는 요즘 웹 개발을 배우고 있어요.&lt;/p&gt;</code></pre>",
  starter: {
    html: "<!-- 여기에 직접 h1과 p 태그를 입력해보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var h1 = doc.querySelector("h1");
    var p = doc.querySelector("p");

    if (!h1 || !h1.textContent.trim()) {
      return { pass: false, message: "h1 태그를 만들고 그 안에 내용을 적어주세요." };
    }
    if (!p || !p.textContent.trim()) {
      return { pass: false, message: "p 태그를 만들고 그 안에 내용을 적어주세요." };
    }
    return { pass: true, message: "통과! h1과 p 태그를 잘 사용했어요." };
  }
};
