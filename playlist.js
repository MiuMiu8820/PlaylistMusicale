/**
 * @fileoverview Playlist Manager
 * Sistema di gestione playlist musicale lato browser.
 * Permette inserimento, rimozione, preferiti, calcolo durata e rendering UI.
 *
 * NON modifica il DOM esterno, usa solo funzioni interne e render().
 *
 * @version 1.0.0
 */

// ==============================
// STATO GLOBALE
// ==============================

/**
 * Array contenente tutti i brani della playlist
 * @type {Array<Object>}
 */
let playlist = [];

// ==============================
// CORE FUNCTIONS
// ==============================

/**
 * Aggiunge un nuovo brano alla playlist
 *
 * @param {string} titolo - Titolo del brano
 * @param {string} artista - Nome artista
 * @param {number} durata - Durata in secondi
 */
function inserisciBrano(titolo, artista, durata) {
  playlist.push({
    id: Date.now(),
    titolo,
    artista,
    durata,
    preferito: false
  });
}

/**
 * Rimuove un brano dalla playlist tramite ID
 *
 * @param {number} id - ID del brano da eliminare
 */
function rimuoviBrano(id) {
  playlist = playlist.filter(b => b.id !== id);
}

/**
 * Attiva/disattiva stato preferito di un brano
 *
 * @param {number} id - ID del brano
 */
function togglePreferito(id) {
  const b = playlist.find(x => x.id === id);
  if (b) b.preferito = !b.preferito;
}

/**
 * Calcola la durata totale della playlist
 *
 * @returns {number} durata totale in secondi
 */
function calcolaDurataTotale() {
  return playlist.reduce((a, b) => a + b.durata, 0);
}

// ==============================
// RENDER UI
// ==============================

/**
 * Aggiorna la UI della playlist nel DOM
 */
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

// ==============================
// EVENTI UI
// ==============================

/**
 * Gestione eventi bottoni sidebar
 */
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

      // reset UI durata
      const box = document.getElementById("total-duration");
      box.classList.add("hidden");
      box.textContent = "";
    }
  });
});

// ==============================
// FORM HANDLER
// ==============================

/**
 * Gestione submit form aggiunta brano
 */
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

/**
 * Chiude il form di inserimento
 */
document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("add-form").classList.add("hidden");
});

// ==============================
// INIT APP
// ==============================

/**
 * Avvia l'applicazione
 */
render();