let playlist = [];

// ================= CORE =================

function inserisciBrano(titolo, artista, durata) {
  playlist.push({
    id: Date.now(),
    titolo,
    artista,
    durata,
    preferito: false
  });
}

function rimuoviBrano(id) {
  playlist = playlist.filter(b => b.id !== id);
}

function togglePreferito(id) {
  const b = playlist.find(x => x.id === id);
  if (b) b.preferito = !b.preferito;
}

function calcolaDurataTotale() {
  return playlist.reduce((a, b) => a + b.durata, 0);
}

// ================= RENDER =================

function render() {
  const list = document.getElementById("playlist");
  const count = document.getElementById("playlist-count");

  count.textContent = playlist.length;

  if (playlist.length === 0) {
    list.innerHTML = `<div class="empty">Nessun brano nella playlist</div>`;
    return;
  }

  list.innerHTML = playlist.map(b => `
    <div class="playlist-item ${b.preferito ? "favorite" : ""}">
      <div>
        <b>${b.titolo}</b> - ${b.artista}
      </div>

      <div>
        ${b.durata}s
        <button onclick="togglePreferito(${b.id}); render()">⭐</button>
        <button onclick="rimuoviBrano(${b.id}); render()">❌</button>
      </div>
    </div>
  `).join("");
}

// ================= UI =================

document.querySelectorAll("[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "add") {
      document.getElementById("add-form").classList.remove("hidden");
    }

    if (action === "play") {
      alert("▶ Riproduzione playlist...");
    }

    if (action === "duration") {
      document.getElementById("total-duration").classList.remove("hidden");
      document.getElementById("total-duration").textContent =
        "Durata totale: " + calcolaDurataTotale() + " sec";
    }

    if (action === "clear") {
  playlist = [];
  render();

  const box = document.getElementById("total-duration");
  box.classList.add("hidden");
  box.textContent = "";
}
  });
});

// ================= FORM =================

document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault();

  inserisciBrano(
    document.getElementById("title-input").value,
    document.getElementById("artist-input").value,
    Number(document.getElementById("duration-input").value)
  );

  e.target.reset();
  e.target.classList.add("hidden");
  render();
});

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("add-form").classList.add("hidden");
});

// INIT
render();