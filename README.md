# CODE-LEARN

방문자가 아무 설치·설정 없이 브라우저에서 바로 HTML/CSS/JS를 연습할 수 있는 정적 웹사이트입니다.

**라이브 데모: https://owsjtld.github.io/**

## 특징

- **설치 없음** — 회원가입도, 빌드도, npm install도 필요 없이 브라우저만 있으면 바로 시작할 수 있습니다.
- **빌드 도구·프레임워크·백엔드 없음** — 순수 HTML/CSS/JS 파일만으로 동작하는 정적 사이트입니다. 외부 라이브러리도 전혀 쓰지 않습니다(코드 에디터의 문법 강조까지 전부 직접 구현).
- **두 가지 학습 방식**
  - **자유 연습(샌드박스)**: HTML/CSS/JS를 마음대로 입력하고 실시간으로 결과를 확인하는 플레이그라운드
  - **미션**: 작은 과제를 하나씩 풀면서 개념을 익히는 방식. 입문 → 주니어 → 시니어 순으로 난이도가 올라갑니다.
- **진행 상황은 브라우저 로컬에만 저장**됩니다(`localStorage`). 서버나 로그인이 없어 다른 사람과 공유되지 않는, 순전히 개인 기기 기록입니다.

## 로컬에서 실행하기

이 프로젝트는 미션 데이터를 ES 모듈(`import`/`export`)로 여러 파일에 나눠뒀기 때문에, `index.html`을 그냥 더블클릭해서 여는 방식(`file://`)으로는 CORS 문제로 정상 동작하지 않습니다. 로컬 서버를 하나 띄워서 `http://`로 접속해야 합니다.

```bash
# 예: Python이 설치되어 있다면
python -m http.server 5972

# 또는 Node.js가 설치되어 있다면
npx serve .
```

이후 브라우저에서 `http://localhost:5972`로 접속하면 됩니다. (GitHub Pages 같은 실제 호스팅은 `https://`로 서비스되므로 이 문제가 없습니다.)

## 폴더 구조

```
index.html                홈
sandbox.html               자유 연습(샌드박스) 페이지
missions.html               미션 목록 페이지
mission.html                미션 실행 페이지 (?id=미션ID로 어떤 미션인지 결정)
assets/css/style.css        사이트 전체 공용 스타일
assets/js/editor.js         재사용 가능한 코드 입력 + 실시간 미리보기 컴포넌트
assets/js/advanced-editor.js 파일을 여러 개로 나눠 다루는 고급(탭) 에디터
assets/js/missions-data.js  missions/ 안의 미션 파일들을 커리큘럼 순서로 조립
assets/js/missions/         미션 하나당 파일 하나(제목/설명/시작 코드/채점 함수)
assets/js/storage.js        진행도·코드 저장소 어댑터 (지금은 localStorage 구현)
```

## 미션 추가하기

`assets/js/missions/` 안에 새 파일 하나를 만들고(다른 미션 파일을 참고해서 구조를 맞추면 됩니다), `assets/js/missions-data.js`에 import 한 줄과 배열 항목 한 줄을 추가하면 됩니다. 자세한 아키텍처 결정과 관례는 `CLAUDE.md`에 정리되어 있습니다.
