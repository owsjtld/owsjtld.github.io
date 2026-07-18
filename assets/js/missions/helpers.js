/**
 * 미션 채점에 쓰이는 CSS 파싱 헬퍼들. iframe 내부 DOM에 접근하지 않고도
 * (=allow-same-origin 없이도) CSS 값을 채점하기 위한 용도 — 자세한 배경은
 * CLAUDE.md "아키텍처 핵심 결정" 절 참고.
 */

/**
 * border/padding/margin/font/background 같은 축약(shorthand) 속성은 CSSOM이
 * rule.style를 순회할 때 이 이름 그대로 안 나온다 — 브라우저가 자동으로 개별
 * 속성(border-top-width, padding-left ...)으로 풀어버리기 때문. 그래서 이 이름들은
 * rule.style.getPropertyValue()로 따로 한 번 더 확인해서 declarations에 넣어준다
 * (예: "div { border: 2px solid #333; }"만 써도 declarations.border가 값을 가지도록).
 */
export var CSS_SHORTHAND_PROPS = ["border", "padding", "margin", "font", "background"];

/**
 * CSS 텍스트를 실행 없이 파싱해서 [{selectorText, declarations}] 배열로 돌려준다.
 */
export function parseCssRules(cssText) {
  var rules = [];
  try {
    var sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    for (var i = 0; i < sheet.cssRules.length; i++) {
      var rule = sheet.cssRules[i];
      if (!rule.selectorText) continue;
      var decls = {};
      for (var j = 0; j < rule.style.length; j++) {
        var prop = rule.style[j];
        decls[prop] = rule.style.getPropertyValue(prop).trim();
      }
      CSS_SHORTHAND_PROPS.forEach(function (shorthand) {
        var value = rule.style.getPropertyValue(shorthand).trim();
        if (value) decls[shorthand] = value;
      });
      rules.push({ selectorText: rule.selectorText, declarations: decls });
    }
  } catch (e) {
    // CSSStyleSheet를 지원하지 않는 구형 브라우저용 아주 단순한 폴백
    var blockRe = /([^{}]+)\{([^}]*)\}/g;
    var m;
    while ((m = blockRe.exec(cssText))) {
      var decls2 = {};
      m[2].split(";").forEach(function (line) {
        var parts = line.split(":");
        if (parts.length === 2) {
          decls2[parts[0].trim().toLowerCase()] = parts[1].trim();
        }
      });
      rules.push({ selectorText: m[1].trim(), declarations: decls2 });
    }
  }
  return rules;
}

/**
 * "h1 + p", "h1 > p", "ul .highlight" 같은 선택자는 콤비네이터(+ > ~ 공백)로 이어진
 * 여러 조각 중 실제로 스타일이 적용되는 건 "가장 오른쪽" 조각뿐이다 (예: "h1 + p"는
 * h1이 아니라 p를 선택함). selectorText를 콤비네이터로 나눠서 마지막 조각만 돌려준다.
 */
export function lastCompoundSelector(selectorText) {
  var segments = selectorText.trim().split(/\s*[>+~]\s*|\s+/);
  return segments[segments.length - 1] || "";
}

export function compoundSelectorHasTag(compound, tagName) {
  var lower = compound.toLowerCase();
  var lowerTag = tagName.toLowerCase();
  if (lower === lowerTag) return true;
  if (lower.indexOf(lowerTag) === 0) {
    var next = lower.charAt(lowerTag.length);
    return next === "." || next === "#" || next === ":" || next === "[";
  }
  return false;
}

export function compoundSelectorHasClass(compound, className) {
  var token = "." + className.toLowerCase();
  var lower = compound.toLowerCase();
  var idx = lower.indexOf(token);
  while (idx !== -1) {
    var after = lower.charAt(idx + token.length);
    if (!after || after === "." || after === "#" || after === ":" || after === "[") {
      return true;
    }
    idx = lower.indexOf(token, idx + 1);
  }
  return false;
}

/**
 * cssText 안에서 실제로 tagName(예: "h1")에 스타일이 적용되는 규칙을 찾는다.
 * 콤마로 묶인 여러 선택자("h1, h2 {...}")도 각각 검사한다.
 */
export function findRuleForTag(cssText, tagName) {
  var rules = parseCssRules(cssText);
  for (var i = 0; i < rules.length; i++) {
    var branches = rules[i].selectorText.split(",");
    for (var b = 0; b < branches.length; b++) {
      if (compoundSelectorHasTag(lastCompoundSelector(branches[b]), tagName)) {
        return rules[i];
      }
    }
  }
  return null;
}

/** className에 대해서도 동일한 방식으로 찾는다. */
export function findRuleForClass(cssText, className) {
  var rules = parseCssRules(cssText);
  for (var i = 0; i < rules.length; i++) {
    var branches = rules[i].selectorText.split(",");
    for (var b = 0; b < branches.length; b++) {
      if (compoundSelectorHasClass(lastCompoundSelector(branches[b]), className)) {
        return rules[i];
      }
    }
  }
  return null;
}

/**
 * findRuleForTag와 달리, tagName을 선택하는 규칙이 여러 개 있어도(예: 보일러플레이트로
 * 미리 준 "div { border: ... }"에 방문자가 새 "div { padding: ... }" 규칙을 따로
 * 추가한 경우) prop을 실제로 갖고 있는 규칙을 찾을 때까지 전부 뒤진다. 박스모델
 * 미션들(border/padding/margin)처럼 "이미 있는 규칙에 이어서 써도 되고, 새 규칙을
 * 만들어도 되는" 상황의 채점에 쓴다.
 */
export function anyRuleForTagHasProp(cssText, tagName, prop) {
  var rules = parseCssRules(cssText);
  for (var i = 0; i < rules.length; i++) {
    var branches = rules[i].selectorText.split(",");
    for (var b = 0; b < branches.length; b++) {
      if (compoundSelectorHasTag(lastCompoundSelector(branches[b]), tagName) && rules[i].declarations[prop]) {
        return rules[i];
      }
    }
  }
  return null;
}
