function initPatternPage() {
  const btnWeek = document.getElementById("weekly-btn");
  const btnMonth = document.getElementById("monthly-btn");

  btnWeek.addEventListener("click", () => renderPattern(7));
  btnMonth.addEventListener("click", () => renderPattern(30));
  renderPattern(7); // 기본 주간
}

let donutChart = null;

function renderPattern(days) {
  const now = new Date();
  const counts = {};
  let totalDays = 0;

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const logs = JSON.parse(localStorage.getItem(`logs-${dateStr}`) || "[]");
    if (logs.length > 0) totalDays++;
    logs.forEach((log) => {
      counts[log.category] = (counts[log.category] || 0) + 1;
    });
  }

  // 표
  const tbody = document.querySelector("#pattern-table tbody");
  tbody.innerHTML = "";
  for (const category in counts) {
    const avg = (counts[category] / totalDays).toFixed(1);
    const row = `<tr><td>${category}</td><td>${avg}</td></tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  }

  // 리포트
  const most = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .pop();
  const report = most
    ? `가장 자주 기록된 항목은 '${most[0]}'로 총 ${most[1]}회 기록되었습니다.`
    : "기록된 데이터가 없습니다.";
  document.getElementById("report-text").textContent = report;

  // 도넛 차트
  const chartNote = document.getElementById("chart-note");
  if (totalDays >= 3) {
    chartNote.style.display = "none";
    renderChart(counts);
  } else {
    chartNote.style.display = "block";
    if (donutChart) donutChart.destroy();
  }
}

function renderChart(counts) {
  const ctx = document.getElementById("donutChart").getContext("2d");
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  const colors = ["#f7941e", "#ef3b2d", "#007dc5", "#3fae2a", "#aaa", "#ccc"];

  if (donutChart) donutChart.destroy();

  donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}
