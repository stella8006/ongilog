["header", "footer"].forEach((id) => {
  fetch(`common/${id}.html`)
    .then((r) => r.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
});
