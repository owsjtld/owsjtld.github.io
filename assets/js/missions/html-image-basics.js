export default {
  id: "html-image-basics",
  title: "이미지 넣기 — img 태그",
  level: "입문 · HTML",
  tier: "입문",
  panels: ["html"],
  summary: "img 태그로 이미지를 보여주고, alt로 설명을 남겨봐요.",
  instructions:
    "<p><code>&lt;img&gt;</code>은 이미지를 보여주는 태그예요. 다른 태그와 달리 " +
    "<strong>닫는 태그가 없어요</strong>(<code>&lt;/img&gt;</code>는 쓰지 않아요). " +
    "<code>src</code> 속성에 이미지 주소를 적고, <code>alt</code> 속성에는 이미지가 안 보일 때나 " +
    "화면 읽기 프로그램(스크린 리더)이 대신 읽어줄 설명을 적어요 — alt는 항상 챙기는 습관을 들이는 게 좋아요.</p>" +
    "<p><strong>예시</strong></p>" +
    "<pre><code>&lt;img src=\"https://via.placeholder.com/150\" alt=\"150x150 크기의 회색 이미지\"&gt;</code></pre>" +
    "<p>에디터에 <code>img</code> 태그를 만들고, <code>src</code>와 <code>alt</code>를 모두 직접 " +
    "채워보세요.</p>",
  starter: {
    html: "<!-- 여기에 img 태그로 이미지를 넣어보세요 -->"
  },
  check: function (code) {
    var doc = new DOMParser().parseFromString(code.html, "text/html");
    var img = doc.querySelector("img");
    if (!img) {
      return { pass: false, message: "img 태그를 만들어보세요." };
    }
    var src = (img.getAttribute("src") || "").trim();
    if (!src) {
      return { pass: false, message: "img 태그에 src 속성으로 이미지 주소를 적어보세요." };
    }
    var alt = (img.getAttribute("alt") || "").trim();
    if (!alt) {
      return { pass: false, message: "img 태그에 alt 속성으로 이미지 설명을 적어보세요." };
    }
    return { pass: true, message: "통과! img 태그로 이미지를 잘 넣었어요." };
  }
};
