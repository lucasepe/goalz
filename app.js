const state = {
  teamsLoaded: false,
  teams: [],
  api: null,
  wasmReady: false,
  queuedFile: null,
  locale: "it",
};

const nodes = {
  fileInput: document.getElementById("teamsFile"),
  fileTrigger: document.getElementById("fileTrigger"),
  fileName: document.getElementById("fileName"),
  sampleButton: document.getElementById("sampleFile"),
  langLabel: document.querySelector('label[for="langSelect"]'),
  langSelect: document.getElementById("langSelect"),
  kicker: document.getElementById("kicker"),
  headline: document.getElementById("headline"),
  subtitle: document.getElementById("subtitle"),
  status: document.getElementById("uploadStatus"),
  teamsLabel: document.getElementById("teamsLabel"),
  homeTeam: document.getElementById("homeTeam"),
  awayTeam: document.getElementById("awayTeam"),
  inputHeading: document.getElementById("inputHeading"),
  homeTeamLabel: document.getElementById("homeTeamLabel"),
  awayTeamLabel: document.getElementById("awayTeamLabel"),
  resultHeading: document.getElementById("resultHeading"),
  rhoLabel: document.getElementById("rhoLabel"),
  rho: document.getElementById("rho"),
  rhoValue: document.getElementById("rhoValue"),
  homeAvailability: document.getElementById("homeAvailability"),
  awayAvailability: document.getElementById("awayAvailability"),
  homeAvailabilityLabel: document.getElementById("homeAvailabilityLabel"),
  awayAvailabilityLabel: document.getElementById("awayAvailabilityLabel"),
  homeAvailabilityValue: document.getElementById("homeAvailabilityValue"),
  awayAvailabilityValue: document.getElementById("awayAvailabilityValue"),
  homeAvailabilityTooltip: document.getElementById("homeAvailabilityTooltip"),
  awayAvailabilityTooltip: document.getElementById("awayAvailabilityTooltip"),
  homeAvailabilityTooltipText: document.getElementById("homeAvailabilityTooltipText"),
  awayAvailabilityTooltipText: document.getElementById("awayAvailabilityTooltipText"),
  homeAvailabilityTooltipWrap: document.getElementById("homeAvailabilityTooltipWrap"),
  awayAvailabilityTooltipWrap: document.getElementById("awayAvailabilityTooltipWrap"),
  rhoTooltip: document.getElementById("rhoTooltip"),
  rhoTooltipText: document.getElementById("rhoTooltipText"),
  rhoTooltipWrap: document.getElementById("rhoTooltipWrap"),
  runButton: document.getElementById("runButton"),
  result: document.getElementById("resultContent"),
  error: document.getElementById("error"),
  limitsFooterLink: document.getElementById("limitsFooterLink"),
  guideFooterLink: document.getElementById("guideFooterLink"),
  paymentFooterLink: document.getElementById("paymentFooterLink"),
};

const I18N = {
  it: {
    langLabel: "Lingua",
    headline: "Predisponi il tuo match in 3 click",
    subtitle: "Carica il file CSV, scegli la squadra che gioca in Casa e Fuori casa, lancia la stima e leggi la previsione.",
    fileButton: "Carica il file CSV con i dati della lega",
    teamsLabel: "Teams CSV",
    sampleButton: "oppure ... usa i dati di esempio della Serie A (non aggiornati)",
    filePlaceholder: "-- seleziona --",
    noFileSelected: "",
    noFileLoaded: "Nessun file caricato",
    inputHeading: "Input",
    homeTeamLabel: "In casa",
    awayTeamLabel: "Fuori casa",
    resultHeading: "Predizione",
    resultPlaceholder: "In attesa del caricamento del file CSV.",
    headingXg: "xG",
    heading1X2: "1X2",
    headingMarkets: "Mercati goal",
    headingSignals: "Segnali",
    summaryHomeXg: "xG casa",
    summaryAwayXg: "xG ospite",
    summaryHome: "Casa",
    summaryDraw: "Pareggio",
    summaryAway: "Trasferta",
    over15: "Over 1.5",
    over25: "Over 2.5",
    btts: "BTTS",
    xgEdge: "xG Edge",
    lean: "Lean",
    fairOver25: "Fair O2.5",
    rhoLabel: "Correzione modello (risultati bassi)",
    homeAvailabilityLabel: "Disponibilita casa",
    awayAvailabilityLabel: "Disponibilita trasferta",
    homeAvailabilityTooltipLabel: "Informazioni disponibilita casa",
    awayAvailabilityTooltipLabel: "Informazioni disponibilita trasferta",
    homeAvailabilityTooltipText: "Coefficiente manuale 0-1. 1.00 significa nessuna riduzione dell'xG casa; valori piu bassi riducono l'xG stimato.",
    awayAvailabilityTooltipText: "Coefficiente manuale 0-1. 1.00 significa nessuna riduzione dell'xG trasferta; valori piu bassi riducono l'xG stimato.",
    rhoTooltipLabel: "Informazioni su rho (Dixon-Coles)",
    rhoTooltipText: "rho (Dixon-Coles) corregge la probabilita dei risultati a basso punteggio. Valori piu negativi aumentano il peso di 0-0, 1-0 e 0-1 e riducono 1-1.",
    runButtonLabel: "Calcola",
    selectTeamError: "Prima carica un CSV valido.",
    modelWaiting: "Modello in attesa delle squadre.",
    modelReady: "Modello pronto. Scegli le squadre e calcola.",
    selectMissingTeamError: "Seleziona una squadra home e una away.",
    sameTeamError: "Home e away devono essere squadre diverse.",
    predictionUnknownError: "Errore sconosciuto durante il calcolo.",
    fileCsvError: "CSV vuoto.",
    apiMissingError: "interfaccia WASM non inizializzata",
    apiMethodMissingError: "interfaccia WASM non valida: setTeamsCSV mancante",
    wasmEmptyResponse: "risposta WASM vuota",
    wasmInvalidJson: "risposta WASM non valida (JSON).",
    invalidPayload: "risposta WASM non valida: {payload}",
    wasmLoadError: "Impossibile caricare la WASM",
    wasmLoadMessageError: "errore caricamento",
    sampleReadError: "Errore nel caricamento del dataset di esempio",
    sampleReadNotFound: "Impossibile leggere il file serie-a-sample.csv",
    wasmReady: "WASM pronto. Carica il file CSV",
    wasmWaiting: "WASM non ancora pronto. Attendi...",
    loadingAuto: "WASM non ancora pronto. Caricamento automatico al termine dell'inizializzazione.",
    loadingInit: "WASM non ancora pronto. Inizializzazione in corso.",
    loadedTeams: "Caricate {count} squadre",
    noModelError: "Errore nel caricamento del CSV",
    paymentFooterLabel: "Ottieni i files CSV con i dati delle leghe",
    guideFooterLink: "Guida al formato CSV",
    limitsFooterLink: "Limiti e disclaimer",
  },
  en: {
    langLabel: "Language",
    headline: "Build your match prediction in 3 clicks",
    subtitle: "Upload the CSV file, pick Home Team and Away Team, run the model and read the forecast.",
    fileButton: "Upload the CSV file with league data",
    teamsLabel: "Teams CSV",
    sampleButton: "or ... use the sample Serie A data (not updated)",
    filePlaceholder: "-- choose --",
    noFileSelected: "",
    noFileLoaded: "No file loaded",
    inputHeading: "Input",
    homeTeamLabel: "Home",
    awayTeamLabel: "Away",
    resultHeading: "Prediction",
    resultPlaceholder: "Awaiting input.",
    headingXg: "xG",
    heading1X2: "1X2",
    headingMarkets: "Goals markets",
    headingSignals: "Signals",
    summaryHomeXg: "Home xG",
    summaryAwayXg: "Away xG",
    summaryHome: "Home",
    summaryDraw: "Draw",
    summaryAway: "Away",
    over15: "Over 1.5",
    over25: "Over 2.5",
    btts: "BTTS",
    xgEdge: "xG Edge",
    lean: "Lean",
    fairOver25: "Fair O2.5",
    rhoLabel: "Model correction (low-score outcomes)",
    homeAvailabilityLabel: "Home availability",
    awayAvailabilityLabel: "Away availability",
    homeAvailabilityTooltipLabel: "Home availability info",
    awayAvailabilityTooltipLabel: "Away availability info",
    homeAvailabilityTooltipText: "Manual 0-1 coefficient. 1.00 means no reduction of home xG; lower values reduce expected xG.",
    awayAvailabilityTooltipText: "Manual 0-1 coefficient. 1.00 means no reduction of away xG; lower values reduce expected xG.",
    rhoTooltipLabel: "Dixon-Coles rho info",
    rhoTooltipText: "rho (Dixon-Coles) adjusts low-score outcome probabilities. More negative values increase 0-0, 1-0 and 0-1, and reduce 1-1.",
    runButtonLabel: "Run",
    selectTeamError: "Load a valid CSV first.",
    modelWaiting: "Model waiting for teams data.",
    modelReady: "Model ready. Pick teams and run prediction.",
    selectMissingTeamError: "Select home and away teams.",
    sameTeamError: "Home and away must be different.",
    predictionUnknownError: "Unknown prediction error.",
    fileCsvError: "Empty CSV.",
    apiMissingError: "WASM API not initialized",
    apiMethodMissingError: "Invalid WASM API: setTeamsCSV missing",
    wasmEmptyResponse: "Empty WASM response",
    wasmInvalidJson: "Invalid WASM response (JSON).",
    wasmLoadError: "Unable to load WASM",
    wasmLoadMessageError: "Loading error",
    sampleReadError: "Unable to load sample dataset",
    sampleReadNotFound: "Could not read serie-a-sample.csv",
    invalidPayload: "Invalid WASM response: {payload}",
    wasmReady: "WASM ready. Upload teams.csv",
    wasmWaiting: "WASM not ready yet. Please wait...",
    loadingAuto: "WASM not ready yet. File will be loaded automatically.",
    loadingInit: "WASM not ready yet. Initialization in progress.",
    loadedTeams: "Loaded {count} teams",
    noModelError: "Error while reading CSV",
    paymentFooterLabel: "Get league CSV data files",
    guideFooterLink: "CSV format guide",
    limitsFooterLink: "Limits and disclaimer",
  },
};

function t(key, vars = {}) {
  const lang = I18N[state.locale] ? state.locale : "it";
  const dict = I18N[lang];
  const fallback = I18N.en;
  const sourceText = (dict && Object.prototype.hasOwnProperty.call(dict, key))
    ? dict[key]
    : (fallback && Object.prototype.hasOwnProperty.call(fallback, key))
      ? fallback[key]
      : key;
  let value = sourceText;
  Object.entries(vars).forEach(([k, v]) => {
    value = value.replace(`{${k}}`, String(v));
  });
  return value;
}

function applyLocale(locale) {
  state.locale = I18N[locale] ? locale : "it";
  nodes.langSelect.value = state.locale;
  if (nodes.langLabel) {
    nodes.langLabel.textContent = t("langLabel");
  }
 
  nodes.headline.textContent = t("headline");
  nodes.subtitle.textContent = t("subtitle");
  nodes.fileTrigger.textContent = t("fileButton");
  if (nodes.teamsLabel) {
    nodes.teamsLabel.textContent = t("teamsLabel");
  }
  nodes.sampleButton.textContent = t("sampleButton");
  if (nodes.inputHeading) {
    nodes.inputHeading.textContent = t("inputHeading");
  }
  if (nodes.homeTeamLabel) {
    nodes.homeTeamLabel.textContent = t("homeTeamLabel");
  }
  if (nodes.awayTeamLabel) {
    nodes.awayTeamLabel.textContent = t("awayTeamLabel");
  }
  if (nodes.resultHeading) {
    nodes.resultHeading.textContent = t("resultHeading");
  }
  if (nodes.rhoLabel) {
    nodes.rhoLabel.textContent = t("rhoLabel");
  }
  if (nodes.homeAvailabilityLabel) {
    nodes.homeAvailabilityLabel.textContent = t("homeAvailabilityLabel");
  }
  if (nodes.awayAvailabilityLabel) {
    nodes.awayAvailabilityLabel.textContent = t("awayAvailabilityLabel");
  }
  if (nodes.homeAvailabilityTooltip && nodes.homeAvailabilityTooltipText) {
    const homeTooltipText = t("homeAvailabilityTooltipText");
    nodes.homeAvailabilityTooltip.removeAttribute("title");
    nodes.homeAvailabilityTooltipText.textContent = homeTooltipText;
    nodes.homeAvailabilityTooltip.setAttribute("aria-label", t("homeAvailabilityTooltipLabel"));
    nodes.homeAvailabilityTooltip.setAttribute("aria-controls", "homeAvailabilityTooltipText");
    nodes.homeAvailabilityTooltip.setAttribute("aria-expanded", "false");
    nodes.homeAvailabilityTooltipText.setAttribute("aria-hidden", "true");
  }
  if (nodes.awayAvailabilityTooltip && nodes.awayAvailabilityTooltipText) {
    const awayTooltipText = t("awayAvailabilityTooltipText");
    nodes.awayAvailabilityTooltip.removeAttribute("title");
    nodes.awayAvailabilityTooltipText.textContent = awayTooltipText;
    nodes.awayAvailabilityTooltip.setAttribute("aria-label", t("awayAvailabilityTooltipLabel"));
    nodes.awayAvailabilityTooltip.setAttribute("aria-controls", "awayAvailabilityTooltipText");
    nodes.awayAvailabilityTooltip.setAttribute("aria-expanded", "false");
    nodes.awayAvailabilityTooltipText.setAttribute("aria-hidden", "true");
  }
  if (nodes.rhoTooltip && nodes.rhoTooltipText) {
    const tooltipText = t("rhoTooltipText");
    nodes.rhoTooltip.removeAttribute("title");
    nodes.rhoTooltipText.textContent = tooltipText;
    nodes.rhoTooltip.setAttribute("aria-label", t("rhoTooltipLabel"));
    nodes.rhoTooltip.setAttribute("aria-controls", "rhoTooltipText");
    nodes.rhoTooltip.setAttribute("aria-expanded", "false");
    nodes.rhoTooltipText.setAttribute("aria-hidden", "true");
    if (nodes.rhoTooltipText) {
      nodes.rhoTooltipText.setAttribute("aria-live", "polite");
    }
  }
  nodes.rhoValue.textContent = Number(nodes.rho.value).toFixed(2);
  if (nodes.homeAvailabilityValue && nodes.homeAvailability) {
    nodes.homeAvailabilityValue.textContent = Number(nodes.homeAvailability.value).toFixed(2);
  }
  if (nodes.awayAvailabilityValue && nodes.awayAvailability) {
    nodes.awayAvailabilityValue.textContent = Number(nodes.awayAvailability.value).toFixed(2);
  }
  if (nodes.runButton) {
    nodes.runButton.textContent = t("runButtonLabel");
  }
  fillSelect();
  if (!nodes.fileName.textContent || nodes.fileName.textContent.trim() === "") {
    nodes.fileName.textContent = t("noFileSelected");
  }
  if (state.teamsLoaded) {
    setStatus(t("loadedTeams", { count: state.teams.length }));
  } else if (state.queuedFile) {
    setStatus(t("loadingAuto"));
  } else if (state.wasmReady) {
    setStatus(t("wasmReady"));
  } else {
    setStatus(t("wasmWaiting"));
  }
  if (nodes.limitsFooterLink) {
    nodes.limitsFooterLink.textContent = t("limitsFooterLink");
    nodes.limitsFooterLink.href = state.locale === "en" ? "limits_en.html" : "limits_it.html";
  }
  if (nodes.guideFooterLink) {
    nodes.guideFooterLink.textContent = t("guideFooterLink");
    nodes.guideFooterLink.href = state.locale === "en" ? "guide_en.html" : "guide_it.html";
  }
  if (nodes.paymentFooterLink) {
    nodes.paymentFooterLink.textContent = t("paymentFooterLabel");
    nodes.paymentFooterLink.href = state.locale === "en" ? "payment_en.html" : "payment_it.html";
    nodes.paymentFooterLink.removeAttribute("target");
    nodes.paymentFooterLink.removeAttribute("rel");
  }
  if (!state.teamsLoaded) {
    nodes.result.textContent = t("resultPlaceholder");
  }
}

function parseWasmResponse(raw) {
  if (raw === null || raw === undefined) {
    return null;
  }
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(t("wasmInvalidJson"));
    }
  }
  return raw;
}

function setError(msg) {
  nodes.error.textContent = msg;
  nodes.error.classList.remove("hidden");
}

function clearError() {
  nodes.error.textContent = "";
  nodes.error.classList.add("hidden");
}

function closeTooltip(trigger, text, wrap) {
  if (!wrap) return;
  wrap.classList.remove("is-open");
  trigger?.setAttribute("aria-expanded", "false");
  text?.setAttribute("aria-hidden", "true");
}

function toggleTooltip(trigger, text, wrap) {
  if (!wrap) return;
  const isOpen = wrap.classList.toggle("is-open");
  trigger?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  text?.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function bindTooltip(trigger, text, wrap) {
  if (!trigger || !wrap) return;
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleTooltip(trigger, text, wrap);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTooltip(trigger, text, wrap);
      trigger.blur();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTooltip(trigger, text, wrap);
    }
  });
}

function percent(v) {
  return `${Number(v).toFixed(2)}%`;
}

function setStatus(message) {
  nodes.status.textContent = message;
}

function enableForm(enabled) {
  nodes.homeTeam.disabled = !enabled;
  nodes.awayTeam.disabled = !enabled;
  nodes.runButton.disabled = !enabled;
}

function resetState() {
  state.teams = [];
  state.teamsLoaded = false;
  fillSelect();
  enableForm(false);
  nodes.result.textContent = t("modelWaiting");
}

function fillSelect() {
  nodes.homeTeam.innerHTML = "";
  nodes.awayTeam.innerHTML = "";
  nodes.homeTeam.appendChild(new Option(t("filePlaceholder"), ""));
  nodes.awayTeam.appendChild(new Option(t("filePlaceholder"), ""));

  state.teams.forEach((team) => {
    nodes.homeTeam.appendChild(new Option(team, team));
    nodes.awayTeam.appendChild(new Option(team, team));
  });
}

function applyTeamsCSV(rawText) {
  if (!rawText) {
    throw new Error(t("fileCsvError"));
  }
  if (!state.api) {
    throw new Error(t("apiMissingError"));
  }
  if (typeof state.api.setTeamsCSV !== "function") {
    throw new Error(t("apiMethodMissingError"));
  }

  const normalized = normalizeCSVText(rawText);
  const response = parseWasmResponse(state.api.setTeamsCSV(normalized));
  if (!response || response.ok !== true) {
    if (!response) {
      throw new Error(t("wasmEmptyResponse"));
    }
    if (typeof response.error === "string" && response.error.trim().length > 0) {
      throw new Error(response.error);
    }
    throw new Error(t("invalidPayload", { payload: JSON.stringify(response) }));
  }

  state.teams = response.teams || [];
  state.teamsLoaded = true;
  fillSelect();
  enableForm(true);
  setStatus(t("loadedTeams", { count: response.count }));
  nodes.result.textContent = t("modelReady");
}

function normalizeCSVText(rawText) {
  const normalized = String(rawText || "");
  if (!normalized.includes("\n") && normalized.includes("\r")) {
    return normalized;
  }

  const sampleLine = normalized
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);

  if (!sampleLine) {
    return normalized;
  }

  const hasComma = sampleLine.includes(",");
  const hasSemicolon = sampleLine.includes(";");
  if (!hasComma && hasSemicolon) {
    return normalized.replace(/;/g, ",");
  }

  return normalized;
}

function renderPrediction(result) {
  const { match, xg, markets } = result;
  const html = `
    <h3>${match.home} vs ${match.away}</h3>
    <div class="summary-grid">
      <article class="summary-card">
        <h4>${t("headingXg")}</h4>
        <div class="summary-pairs">
          <div class="summary-item">
            <small>${t("summaryHomeXg")}</small>
            <strong>${xg.home.toFixed(2)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("summaryAwayXg")}</small>
            <strong>${xg.away.toFixed(2)}</strong>
          </div>
        </div>
      </article>

      <article class="summary-card">
        <h4>${t("heading1X2")}</h4>
        <div class="summary-pairs three">
          <div class="summary-item">
            <small>${t("summaryHome")}</small>
            <strong>${percent(markets.homeWin)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("summaryDraw")}</small>
            <strong>${percent(markets.draw)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("summaryAway")}</small>
            <strong>${percent(markets.awayWin)}</strong>
          </div>
        </div>
      </article>

      <article class="summary-card">
        <h4>${t("headingMarkets")}</h4>
        <div class="summary-pairs three">
          <div class="summary-item">
            <small>${t("over15")}</small>
            <strong>${percent(markets.over15)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("over25")}</small>
            <strong>${percent(markets.over25)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("btts")}</small>
            <strong>${percent(markets.btts)}</strong>
          </div>
        </div>
      </article>

      <article class="summary-card">
        <h4>${t("headingSignals")}</h4>
        <div class="summary-pairs three">
          <div class="summary-item">
            <small>${t("xgEdge")}</small>
            <strong>${markets.xgEdge.toFixed(3)}</strong>
          </div>
          <div class="summary-item">
            <small>${t("lean")}</small>
            <strong>${markets.lean}</strong>
          </div>
          <div class="summary-item">
            <small>${t("fairOver25")}</small>
            <strong>${markets.fairOver25.toFixed(2)}</strong>
          </div>
        </div>
      </article>
    </div>
  `;
  nodes.result.innerHTML = html;
}

function bootstrapWasm() {
  const go = new Go();
  const runBtn = document.getElementById("runButton");
  let resolved = false;

  const readyCheck = setInterval(() => {
    if (state.wasmReady || !window.goalzWasm) {
      return;
    }
    state.api = window.goalzWasm;
    state.wasmReady = true;
    clearError();
    clearInterval(readyCheck);
  
    setStatus(t("wasmReady"));
    nodes.fileInput.disabled = false;
    runBtn.disabled = true;
    nodes.sampleButton.disabled = false;
    resolved = true;
    if (state.queuedFile) {
      processUploadedFile(state.queuedFile);
      state.queuedFile = null;
    }
  }, 50);

  setTimeout(() => {
    if (!resolved) {
      setStatus(t("wasmWaiting"));
    }
  }, 250);

  WebAssembly.instantiateStreaming(fetch("goalz.wasm"), go.importObject)
    .then((result) => {
      go.run(result.instance);
    })
    .catch((err) => {
      clearInterval(readyCheck);
      setStatus(t("wasmLoadError"));
      setError(err.message || t("wasmLoadMessageError"));
      nodes.fileInput.disabled = false;
      nodes.sampleButton.disabled = true;
      state.wasmReady = false;
      state.queuedFile = null;
    });
}

function processUploadedFile(file) {
  clearError();
  const reader = new FileReader();
  reader.onload = () => {
    try {
      applyTeamsCSV(String(reader.result || ""));
    } catch (error) {
      const message = error && typeof error.message === "string" ? error.message : t("predictionUnknownError");
      setError(`${t("noModelError")}: ${message}`);
      setStatus(message);
      resetState();
    }
  };
  reader.readAsText(file);
}

nodes.fileInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  nodes.fileName.textContent = file.name || t("noFileSelected");

  if (!state.wasmReady) {
    setStatus(t("loadingAuto"));
    state.queuedFile = file;
    clearError();
    return;
  }

  processUploadedFile(file);
});

nodes.sampleButton.addEventListener("click", async () => {
  if (!state.wasmReady) {
    setStatus(t("loadingInit"));
    return;
  }
  clearError();
  try {
    const response = await fetch("serie-a-sample.csv");
    if (!response.ok) {
      throw new Error(t("sampleReadNotFound"));
    }
    const text = await response.text();
    applyTeamsCSV(text);
  } catch (error) {
    setError(error.message || t("sampleReadError"));
    resetState();
  }
});

nodes.rho.addEventListener("input", (e) => {
  nodes.rhoValue.textContent = Number(e.target.value).toFixed(2);
});

if (nodes.homeAvailability) {
  nodes.homeAvailability.addEventListener("input", (e) => {
    if (nodes.homeAvailabilityValue) {
      nodes.homeAvailabilityValue.textContent = Number(e.target.value).toFixed(2);
    }
  });
}

if (nodes.awayAvailability) {
  nodes.awayAvailability.addEventListener("input", (e) => {
    if (nodes.awayAvailabilityValue) {
      nodes.awayAvailabilityValue.textContent = Number(e.target.value).toFixed(2);
    }
  });
}

bindTooltip(nodes.rhoTooltip, nodes.rhoTooltipText, nodes.rhoTooltipWrap);
bindTooltip(nodes.homeAvailabilityTooltip, nodes.homeAvailabilityTooltipText, nodes.homeAvailabilityTooltipWrap);
bindTooltip(nodes.awayAvailabilityTooltip, nodes.awayAvailabilityTooltipText, nodes.awayAvailabilityTooltipWrap);

function closeAllTooltipsExcept(eventTarget) {
  const tooltipEntries = [
    [nodes.rhoTooltip, nodes.rhoTooltipText, nodes.rhoTooltipWrap],
    [nodes.homeAvailabilityTooltip, nodes.homeAvailabilityTooltipText, nodes.homeAvailabilityTooltipWrap],
    [nodes.awayAvailabilityTooltip, nodes.awayAvailabilityTooltipText, nodes.awayAvailabilityTooltipWrap],
  ];
  tooltipEntries.forEach(([trigger, text, wrap]) => {
    if (!wrap || wrap.contains(eventTarget)) return;
    closeTooltip(trigger, text, wrap);
  });
}

document.addEventListener("click", (event) => {
  closeAllTooltipsExcept(event.target);
});

document.addEventListener("touchstart", (event) => {
  closeAllTooltipsExcept(event.target);
});

nodes.fileTrigger.addEventListener("click", () => {
  nodes.fileInput.click();
});

nodes.langSelect.addEventListener("change", (event) => {
  applyLocale(event.target.value);
  if (!state.teamsLoaded) {
    nodes.result.textContent = t("resultPlaceholder");
  }
});

nodes.runButton.addEventListener("click", () => {
  clearError();

  if (!state.teamsLoaded || !state.api) {
    setError(t("selectTeamError"));
    return;
  }

  const home = nodes.homeTeam.value;
  const away = nodes.awayTeam.value;

  if (!home || !away) {
    setError(t("selectMissingTeamError"));
    return;
  }
  if (home === away) {
    setError(t("sameTeamError"));
    return;
  }

  try {
    const response = parseWasmResponse(
      state.api.predict(
        home,
        away,
        Number(nodes.rho.value),
        Number(nodes.homeAvailability?.value ?? 1),
        Number(nodes.awayAvailability?.value ?? 1),
      ),
    );
    if (!response || response.ok !== true) {
      throw new Error(response && response.error ? response.error : t("predictionUnknownError"));
    }
    renderPrediction(response);
  } catch (error) {
    setError(error.message || t("predictionUnknownError"));
  }
});

resetState();
nodes.fileName.textContent = t("noFileSelected");
setStatus(t("noFileLoaded"));
applyLocale((navigator.language || "it").toLowerCase().startsWith("en") ? "en" : "it");
bootstrapWasm();
