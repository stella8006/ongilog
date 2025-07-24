function recordAction(type) {
  const now = new Date();
  const timestamp = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const entry = { type, time: timestamp };

  let logs = JSON.parse(localStorage.getItem('onkilog')) || [];
  logs.push(entry);
  localStorage.setItem('onkilog', JSON.stringify(logs));

  renderLogs();
}

function renderLogs() {
  const logList = document.getElementById('log-list');
  logList.innerHTML = '';

  const logs = JSON.parse(localStorage.getItem('onkilog')) || [];
  logs.slice().reverse().forEach(log => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${log.time}</span><span>${log.type}</span>`;
    logList.appendChild(li);
  });
}

function showTodayDate() {
  const today = new Date();
  const dayStr = today.toISOString().split('T')[0];
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const label = `${dayStr} (${week[today.getDay()]})`;
  document.getElementById('today-date').textContent = label;
}

document.addEventListener('DOMContentLoaded', () => {
  showTodayDate();
  renderLogs();
});