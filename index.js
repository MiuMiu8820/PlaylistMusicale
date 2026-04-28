/**
 * @fileoverview Playlist Manager (Browser Version)
 * Gestione completa di una playlist musicale con interfaccia web.
 * Include inserimento, rimozione, durata totale e rendering UI.
 *
 * @version 3.0.0
 */

// ==============================
// STRUTTURA DATI
// ==============================

/**
 * @typedef {Object} Brano
 * @property {number} id
 * @property {string} titolo
 * @property {string} artista
 * @property {number} durata
 */

/** @type {Brano[]} */
let playlist = [];

// ==============================
// FUNZIONI CORE
// ==============================

/**
 * Inserisce un nuovo brano nella playlist
 * @param {string} titolo
 * @param {string} artista
 * @param {number} durata
 */
function inserisciBrano(titolo, artista, durata) {
  if (!titolo || !artista || durata <= 0) return;

  playlist.push({
    id: Date.now(),
    titolo,
    artista,
    durata
  });
}

/**
 * Svuota completamente la playlist
 */
function svuotaPlaylist() {
  playlist = [];
}

/**
 * Calcola la durata totale
 * @returns {number}
 */
function calcolaDurataTotale() {
  return playlist.reduce((acc, b) => acc + b.durata, 0);
}

// ==============================
// UI RENDER
// ==============================

/**
 * Aggiorna la visualizzazione della playlist
 */
function renderPlaylist() {
  const container = document.getElementById("playlist");
  const count = document.getElementById("playlist-count");

  count.textContent = playlist.length;

  if (playlist.length === 0) {
    container.innerHTML = "<div>Nessun brano</div>";
    return;
  }

  container.innerHTML = playlist.map((b, i) => `
    <div class="playlist-item">
      <span>${i + 1}. ${b.titolo} - ${b.artista}</span>
      <span>${b.durata}s</span>
    </div>
  `).join("");
}

// ==============================
// EVENTI UI
// ==============================

/**
 * Inizializza tutti gli event listener dell'interfaccia
 */
function initUI() {

  // Bottoni sidebar
  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;

      switch (action) {
        case "add":
          document.getElementById("add-form").classList.remove("hidden");
          break;

        case "clear":
          svuotaPlaylist();
          renderPlaylist();
          break;

        case "duration":
          const totale = calcolaDurataTotale();
          const box = document.getElementById("total-duration");
          box.textContent = "Durata totale: " + totale + " sec";
          box.classList.remove("hidden");
          break;

        case "play":
          console.log("Riproduzione simulata...");
          break;
      }
    });
  });

  // Form inserimento
  document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const titolo = document.getElementById("title-input").value;
    const artista = document.getElementById("artist-input").value;
    const durata = Number(document.getElementById("duration-input").value);

    inserisciBrano(titolo, artista, durata);
    renderPlaylist();

    e.target.reset();
    e.target.classList.add("hidden");
  });
}

// ==============================
// INIT APP
// ==============================

/**
 * Avvia l'applicazione
 */
function initApp() {
  initUI();
  renderPlaylist();
}

// Avvio automatico
initApp();