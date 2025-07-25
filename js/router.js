function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then((res) => {
      if (!res.ok) throw new Error("페이지 로드 실패");
      return res.text();
    })
    .then((html) => {
      const content = document.getElementById("page-content");
      content.innerHTML = html;

      // 공통 및 페이지 전용 초기화
      runPageInit(page);
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("page-content").innerHTML =
        "<p>페이지를 불러올 수 없습니다.</p>";
    });
}

function runPageInit(page) {
  // 페이지 이름에 따라 초기화 함수 실행
  switch (page) {
    case "index":
      typeof initIndexPage === "function" && initIndexPage();
      break;
    case "pattern":
      typeof initPatternPage === "function" && initPatternPage();
      break;
    case "community":
      typeof initCommunityPage === "function" && initCommunityPage();
      break;
    case "mypage":
      typeof initMypagePage === "function" && initMypagePage();
      break;
    case "share":
      typeof initSharePage === "function" && initSharePage();
      break;
  }

  // 페이지 전용 JS 파일이 있다면 자동으로 로드
  loadPageScript(page);
}

function loadPageScript(page) {
  const existing = document.getElementById("page-script");
  if (existing) existing.remove();

  const scriptPath = `js/${page}.js`;

  fetch(scriptPath, { method: "HEAD" }).then((res) => {
    if (res.ok) {
      const script = document.createElement("script");
      script.id = "page-script";
      script.src = scriptPath;
      script.defer = true;
      document.body.appendChild(script);
    }
  });
}

// 해시 변경 시 페이지 로드
window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#", "") || "index";
  loadPage(page);
});

// 첫 로딩 시 현재 해시 기준으로 페이지 로드
document.addEventListener("DOMContentLoaded", () => {
  const page = location.hash.replace("#", "") || "index";
  loadPage(page);
});
