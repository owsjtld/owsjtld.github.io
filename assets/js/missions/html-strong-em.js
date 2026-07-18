export default {
  id: "html-strong-em",
  title: "글자 강조하기 — strong과 em",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "strong과 em으로 문장 안 일부를 강조해봐요.",
  instructions:
    "<p><code>&lt;strong&gt;</code>은 <strong>중요한 내용</strong>임을, <code>&lt;em&gt;</code>은 " +
    "<em>강조해서 읽어야 할 부분</em>임을 나타내는 태그예요. 브라우저는 보통 strong은 " +
    "굵게, em은 기울임으로 보여주지만, 진짜 의미는 \"이 부분이 중요하다/강조된다\"는 뜻이에요 " +
    "— 화면 읽기 프로그램도 이 부분을 실제로 다르게 읽어줘요. 그냥 굵게/기울임 모양만 " +
    "원한다면 CSS의 font-weight/font-style을 쓰면 되지만, 의미까지 담고 싶을 땐 이 " +
    "태그들을 써요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;p&gt;이 상품은 &lt;strong&gt;오늘까지만&lt;/strong&gt; 할인돼요. " +
    "&lt;em&gt;서두르세요!&lt;/em&gt;&lt;/p&gt;</code></pre>" +
    "<p>에디터에 <code>p</code> 태그로 문장을 하나 적고, 그 안에 <code>strong</code>과 " +
    "<code>em</code>을 각각 하나 이상 넣어보세요.</p>",
  starter: {
    html: "<!-- 여기에 p 안에서 strong과 em을 각각 써보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var strong = doc.querySelector("strong");
    if (!strong || !strong.textContent.trim()) {
      return { pass: false, message: "strong 태그를 만들고 안에 내용을 적어보세요." };
    }
    var em = doc.querySelector("em");
    if (!em || !em.textContent.trim()) {
      return { pass: false, message: "em 태그를 만들고 안에 내용을 적어보세요." };
    }
    return { pass: true, message: "통과! strong과 em으로 글자를 잘 강조했어요." };
  }
};
