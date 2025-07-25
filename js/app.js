function initIndexPage() {
  const dateInput = document.getElementById("selectedDate");
  const btnYesterday = document.getElementById("btnYesterday");
  const btnTomorrow = document.getElementById("btnTomorrow");
  const logList = document.getElementById("logList");

  if (!dateInput || !btnYesterday || !btnTomorrow || !logList) return;

  const today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;
  updateNavButtons();
  loadLogsFor(today);

  btnYesterday.addEventListener("click", () => {
    const d = new Date(dateInput.value);
    d.setDate(d.getDate() - 1);
    dateInput.value = d.toISOString().slice(0, 10);
    loadLogsFor(dateInput.value);
    updateNavButtons();
  });

  btnTomorrow.addEventListener("click", () => {
    const d = new Date(dateInput.value);
    d.setDate(d.getDate() + 1);
    dateInput.value = d.toISOString().slice(0, 10);
    loadLogsFor(dateInput.value);
    updateNavButtons();
  });

  dateInput.addEventListener("change", () => {
    loadLogsFor(dateInput.value);
    updateNavButtons();
  });

  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-type");
      const dateStr = dateInput.value;

      // ✅ 미래 날짜 제한
      const todayStr = new Date().toISOString().slice(0, 10);
      if (dateStr > todayStr) {
        alert("미래 날짜에는 기록할 수 없습니다.");
        return;
      }

      const key = `logs-${dateStr}`;
      const logs = JSON.parse(localStorage.getItem(key) || "[]");
      logs.push({ time: new Date().getTime(), category });
      localStorage.setItem(key, JSON.stringify(logs));
      loadLogsFor(dateStr);
    });
  });

  function loadLogsFor(dateStr) {
    logList.innerHTML = "";
    const logs = JSON.parse(localStorage.getItem(`logs-${dateStr}`) || "[]");

    if (logs.length === 0) {
      logList.innerHTML = `<li class="empty-message">기록이 없습니다.</li>`;
      return;
    }

    logs.forEach((log) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="time">${formatTime(log.time)}</span>
        <span class="dot" style="background:${getCategoryColor(
          log.category
        )};"></span>
        <span class="label">${log.category}</span>
        <i class="fa fa-chevron-right"></i>
      `;
      logList.appendChild(li);
    });
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getCategoryColor(cat) {
    switch (cat) {
      case "식사":
        return "#f7941e";
      case "약복용":
        return "#ef3b2d";
      case "수면":
        return "#007dc5";
      case "기타":
        return "#3fae2a";
      default:
        return "#999";
    }
  }

  function updateNavButtons() {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    btnTomorrow.disabled = new Date(dateInput.value) >= tomorrow;
  }
}
