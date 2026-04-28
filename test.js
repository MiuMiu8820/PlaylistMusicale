const list = document.getElementById("list");
const stats = document.getElementById("stats");
const info = document.getElementById("info");
const form = document.getElementById("form");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");

let currentAction = null;

// ================= RENDER =================
function render() {
  const data = getPlaylist();

  stats.innerText = `${data.length} brani`;

  list.innerHTML = data.map(b => `
    <div class="item">
      <div>
        <b>${b.titolo}</b><br/>
        <small>${b.artista} • ${b.durata}s</small>
      </div>

      <div>
        <button onclick="togglePreferito(${b.id}); render()">⭐</button>
        <button onclick="rimuoviBrano(${b.id}); render()">❌</button>
      </div>
    </div>
  `).join("");
}

// ================= MENU =================
document.querySelectorAll("[data-action]").forEach(btn => {
  btn.onclick = () => {
    const action = btn.dataset.action;

    if (action === "add") {
      form.classList.remove("hidden");
      currentAction = "add";
    }

    if (action === "play") {
      info.innerText = "Riproduzione playlist...";
    }

    if (action === "duration") {
      info.innerText = `Durata totale: ${durataTotale()} sec`;
    }

    if (action === "favorites") {
      info.innerText = "Funzione preferiti già attiva ⭐";
    }

    if (action === "clear") {
      svuotaPlaylist();
      render();
    }
  };
});

// ================= FORM =================
document.getElementById("save").onclick = () => {
  inserisciBrano(title.value, artist.value, Number(duration.value));
  form.classList.add("hidden");
  render();
};

document.getElementById("cancel").onclick = () => {
  form.classList.add("hidden");
};

// ================= INIT =================
render();
 