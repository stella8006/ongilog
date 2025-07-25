// components/header.html과 footer.html을 각 위치에 삽입
document.addEventListener("DOMContentLoaded", () => {
  const inject = (id, path) => {
    fetch(path)
      .then((res) => res.text())
      .then((html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      });
  };

  inject("header-placeholder", "/components/header.html");
  inject("footer-placeholder", "/components/footer.html");
});

// 공통 날짜 포맷 함수 (yyyy-mm-dd)
function formatDate(date) {
  return date.toISOString().split("T")[0];
}
