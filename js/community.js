const tabs = document.querySelectorAll(".community-tab button");
tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active-tab"));
    btn.classList.add("active-tab");

    // 탭 이름으로 필터링 (예시)
    const selected = btn.textContent.trim();
    console.log("선택된 탭:", selected);

    // 여기에 실제 데이터 필터링 로직 넣을 수 있음
  });
});
