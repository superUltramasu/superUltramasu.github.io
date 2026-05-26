const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const regions = {
  "北海道・東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  "北陸": ["新潟県", "富山県", "石川県", "福井県"],
  "関東": ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
  "中部": ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
  "近畿": ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  "中国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  "四国": ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
};

const prefectureReadings = {
  "北海道": "ほっかいどう",
  "青森県": "あおもりけん",
  "岩手県": "いわてけん",
  "宮城県": "みやぎけん",
  "秋田県": "あきたけん",
  "山形県": "やまがたけん",
  "福島県": "ふくしまけん",
  "茨城県": "いばらきけん",
  "栃木県": "とちぎけん",
  "群馬県": "ぐんまけん",
  "埼玉県": "さいたまけん",
  "千葉県": "ちばけん",
  "東京都": "とうきょうと",
  "神奈川県": "かながわけん",
  "新潟県": "にいがたけん",
  "富山県": "とやまけん",
  "石川県": "いしかわけん",
  "福井県": "ふくいけん",
  "山梨県": "やまなしけん",
  "長野県": "ながのけん",
  "岐阜県": "ぎふけん",
  "静岡県": "しずおかけん",
  "愛知県": "あいちけん",
  "三重県": "みえけん",
  "滋賀県": "しがけん",
  "京都府": "きょうとふ",
  "大阪府": "おおさかふ",
  "兵庫県": "ひょうごけん",
  "奈良県": "ならけん",
  "和歌山県": "わかやまけん",
  "鳥取県": "とっとりけん",
  "島根県": "しまねけん",
  "岡山県": "おかやまけん",
  "広島県": "ひろしまけん",
  "山口県": "やまぐちけん",
  "徳島県": "とくしまけん",
  "香川県": "かがわけん",
  "愛媛県": "えひめけん",
  "高知県": "こうちけん",
  "福岡県": "ふくおかけん",
  "佐賀県": "さがけん",
  "長崎県": "ながさきけん",
  "熊本県": "くまもとけん",
  "大分県": "おおいたけん",
  "宮崎県": "みやざきけん",
  "鹿児島県": "かごしまけん",
  "沖縄県": "おきなわけん"
};

const historicalMapCodeFallbacks = {
  "03216": "03305",
  "04216": "04423",
  "11246": "11445",
  "12239": "12402",
  "17212": "17344",
  "23238": "23304",
  "40231": "40305"
};

const parentCityCodeByName = {
  "熊本市": "43201"
};

const regionOptionsEl = document.querySelector("#regionOptions");
const regionLegendEl = document.querySelector("#regionLegend");
const quizModeRadios = [...document.querySelectorAll('input[name="quizMode"]')];
const municipalityTypeGroupEl = document.querySelector("#municipalityTypeGroup");
const typeCheckboxes = [...document.querySelectorAll('input[name="municipalityType"]')];
const questionCountEl = document.querySelector("#questionCount");
const availableCountEl = document.querySelector("#availableCount");
const setupMessageEl = document.querySelector("#setupMessage");
const setupViewEl = document.querySelector("#setupView");
const quizViewEl = document.querySelector("#quizView");
const resultViewEl = document.querySelector("#resultView");
const startButton = document.querySelector("#startButton");
const backToSetupButton = document.querySelector("#backToSetupButton");
const retryButton = document.querySelector("#retryButton");
const reviewButton = document.querySelector("#reviewButton");
const resultSetupButton = document.querySelector("#resultSetupButton");
const municipalityEl = document.querySelector("#municipality");
const quizPromptEl = document.querySelector("#quizPrompt");
const questionImageEl = document.querySelector("#questionImage");
const mapQuestionEl = document.querySelector("#mapQuestion");
const answerFilterEl = document.querySelector("#answerFilter");
const optionsWrapEl = document.querySelector(".options-wrap");
const optionsEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const currentNoEl = document.querySelector("#currentNo");
const totalNoEl = document.querySelector("#totalNo");
const resultRateEl = document.querySelector("#resultRate");
const resultScoreEl = document.querySelector("#resultScore");
const resultMapSummaryEl = document.querySelector("#resultMapSummary");
const wrongListEl = document.querySelector("#wrongList");

let questionPool = [];
let currentQuestion = null;
let optionPrefectures = [];
let score = 0;
let answered = 0;
let locked = false;
let wrongAnswers = [];
let mapAnswerResults = [];
let selectedCorrectPrefectures = [];
let reviewMode = false;
let resultReviewQuestions = [];
let localPlaceSettingsPrefecture = null;
let localPlaceSettingsMunicipality = null;
let localPlaceMunicipalityFilter = "";
let localPlaceLoadingPromise = null;

function currentQuizMode() {
  return document.querySelector('input[name="quizMode"]:checked')?.value ?? "municipality";
}

function getMunicipalityData() {
  return Array.isArray(window.municipalityData) ? window.municipalityData : [];
}

function getAreaCodeData() {
  return Array.isArray(window.areaCodeData) ? window.areaCodeData : [];
}

function getDiamondData() {
  return Array.isArray(window.diamondData) ? window.diamondData : [];
}

function getMapTopology() {
  return window.japanMapTopology ?? null;
}

function getMunicipalityCodeData() {
  return Array.isArray(window.municipalityCodeData) ? window.municipalityCodeData : [];
}

function getLocalPlaceMapData() {
  return window.localPlaceMapData ?? { municipalities: [] };
}

function getLocalPlaceDataFiles() {
  window.localPlaceDataFiles = window.localPlaceDataFiles || {};
  return window.localPlaceDataFiles;
}

function getLocalPlaceMunicipalities() {
  return Array.isArray(getLocalPlaceMapData().municipalities) ? getLocalPlaceMapData().municipalities : [];
}

function getLocalPlaceCandidateMunicipalities(prefecture = null) {
  const manifestItems = getLocalPlaceMunicipalities();
  const byKey = new Map(manifestItems.map((item) => [`${item.prefecture}\t${item.name}`, item]));
  getAugmentedMunicipalityCodeData().forEach((item) => {
    const key = `${item.prefecture}\t${item.name}`;
    if (byKey.has(key)) return;
    byKey.set(key, {
      prefecture: item.prefecture,
      code: item.code,
      name: item.name,
      available: true,
      remoteTopojsonPath: localPlaceRemoteTopojsonPath(item.code)
    });
  });
  const items = [...byKey.values()];
  return prefecture ? items.filter((item) => item.prefecture === prefecture) : items;
}

function localPlaceDataForCode(code) {
  return getLocalPlaceDataFiles()[code] ?? null;
}

function selectedLocalPlaceMunicipalityMetadata() {
  return getLocalPlaceCandidateMunicipalities().find((item) => (
    item.prefecture === localPlaceSettingsPrefecture &&
    item.name === localPlaceSettingsMunicipality
  )) ?? null;
}

function selectedLocalPlaceQuestionCount() {
  const municipality = selectedLocalPlaceMunicipality();
  return municipality?.places?.length ? aggregateLocalPlaces(municipality.places).length : municipality?.placeCount ?? null;
}

function localPlaceRemoteTopojsonPath(code) {
  return `https://geoshape.ex.nii.ac.jp/ka/topojson/2020/${code.slice(0, 2)}/r2ka${code}.topojson`;
}

function localPlaceGeometryCode(geometry) {
  return String(geometry?.properties?.KEY_CODE ?? geometry?.properties?.code ?? geometry?.id ?? "");
}

function localPlaceGeometryName(geometry) {
  return String(geometry?.properties?.S_NAME ?? geometry?.properties?.name ?? geometry?.properties?.MOJI ?? "");
}

function normalizeLocalPlaceTopology(rawTopology) {
  const objects = rawTopology?.objects ?? {};
  const sourceObject = objects.town ?? objects.places ?? Object.values(objects)[0];
  const geometries = sourceObject?.geometries ?? [];
  const places = [];
  const normalizedGeometries = [];

  geometries.forEach((geometry) => {
    const code = localPlaceGeometryCode(geometry);
    const name = localPlaceGeometryName(geometry);
    if (!code || !name) return;
    const normalizedGeometry = {
      ...geometry,
      id: code,
      properties: {
        ...(geometry.properties ?? {}),
        code,
        name
      }
    };
    normalizedGeometries.push(normalizedGeometry);
    places.push({ code, name, reading: "" });
  });

  return {
    places,
    topology: {
      type: rawTopology?.type ?? "Topology",
      transform: rawTopology?.transform,
      arcs: rawTopology?.arcs ?? [],
      objects: {
        places: {
          type: sourceObject?.type ?? "GeometryCollection",
          geometries: normalizedGeometries
        }
      }
    }
  };
}

function localPlaceBaseName(name) {
  const base = name.replace(/[一二三四五六七八九十百〇零壱弐参１２３４５６７８９０0-9]+丁目$/, "");
  return base || name;
}

function localPlaceBaseReading(reading) {
  if (!reading) return "";
  const suffixes = [
    "じゅうきゅうちょうめ", "じゅうはっちょうめ", "じゅうななちょうめ", "じゅうろくちょうめ",
    "じゅうごちょうめ", "じゅうよんちょうめ", "じゅうさんちょうめ", "じゅうにちょうめ", "じゅういっちょうめ",
    "じゅっちょうめ", "じっちょうめ", "きゅうちょうめ", "くちょうめ", "はっちょうめ", "はちちょうめ",
    "ななちょうめ", "しちちょうめ", "ろくちょうめ", "ごちょうめ", "よんちょうめ", "よちょうめ",
    "しちょうめ", "さんちょうめ", "にちょうめ", "いっちょうめ"
  ];
  const suffix = suffixes.find((item) => reading.endsWith(item));
  return suffix ? reading.slice(0, -suffix.length) : reading;
}

function aggregateLocalPlaces(places) {
  const groups = new Map();
  places.forEach((place) => {
    const name = localPlaceBaseName(place.name);
    if (!groups.has(name)) {
      groups.set(name, {
        name,
        reading: localPlaceBaseReading(place.reading ?? ""),
        code: place.code,
        codes: []
      });
    }
    const group = groups.get(name);
    if (!group.codes.includes(place.code)) {
      group.codes.push(place.code);
    }
    if (!group.reading && place.reading) {
      group.reading = localPlaceBaseReading(place.reading);
    }
  });
  return [...groups.values()];
}

function loadScriptOnce(src) {
  const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
  if (existing?.dataset.loaded === "true") return Promise.resolve();
  if (existing?.dataset.loading === "true") {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.dataset.dynamicSrc = src;
    script.dataset.loading = "true";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      script.dataset.loading = "false";
      resolve();
    }, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });
}

async function ensureSelectedLocalPlaceDataLoaded() {
  const municipality = selectedLocalPlaceMunicipalityMetadata();
  if (!municipality) return null;
  const loaded = localPlaceDataForCode(municipality.code);
  if (loaded?.places?.length) return loaded;

  if (municipality.dataPath) {
    localPlaceLoadingPromise = loadScriptOnce(municipality.dataPath).then(() => {
      const loadedAfterScript = localPlaceDataForCode(municipality.code);
      if (!loadedAfterScript?.places?.length) {
        throw new Error(`${municipality.name}の町丁目データを読み込めませんでした。`);
      }
      return loadedAfterScript;
    });
    return localPlaceLoadingPromise;
  }

  localPlaceLoadingPromise = fetch(municipality.remoteTopojsonPath ?? localPlaceRemoteTopojsonPath(municipality.code))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${municipality.name}の町丁目データを取得できませんでした。`);
      }
      return response.json();
    })
    .then((rawTopology) => {
      const { places, topology } = normalizeLocalPlaceTopology(rawTopology);
      if (places.length === 0) {
        throw new Error(`${municipality.name}の町丁目データが空でした。`);
      }
      const payload = {
        prefecture: municipality.prefecture,
        code: municipality.code,
        name: municipality.name,
        places,
        topology
      };
      getLocalPlaceDataFiles()[municipality.code] = payload;
      municipality.placeCount = places.length;
      return payload;
    });
  return localPlaceLoadingPromise;
}

function isPrefectureMapMode(quizMode = currentQuizMode()) {
  return quizMode === "map" || quizMode === "municipalityMap" || quizMode === "mapAreaCode";
}

function isLocalPlaceMapMode(quizMode = currentQuizMode()) {
  return quizMode === "localPlaceMap" || quizMode === "localPlaceMapClick";
}

function isMapClickMode(quizMode = currentQuizMode()) {
  return quizMode === "municipalityMap" || quizMode === "localPlaceMapClick";
}

function normalizedMapMunicipalityName(name) {
  return name
    .replace(/（[^）]+）/g, "")
    .replace(/ヶ/g, "ケ")
    .replace(/惠/g, "恵");
}

function getAugmentedMunicipalityCodeData() {
  const topology = getMapTopology();
  const geometryIds = new Set(topology?.objects?.municipalities?.geometries?.map((geometry) => geometry.id) ?? []);
  const items = [...getMunicipalityCodeData()];
  const seenCodes = new Set(items.map((item) => item.code));
  const byNormalizedName = new Map(items.map((item) => [
    `${item.prefecture}\t${normalizedMapMunicipalityName(item.name)}\t${item.type}`,
    item
  ]));

  items.forEach((item) => {
    if (item.type !== "区") return;
    const match = item.name.match(/^(.+市).+区$/);
    if (!match) return;
    const cityCode = parentCityCodeCandidates(item, match[1], geometryIds)[0];
    if (seenCodes.has(cityCode) || !geometryIds.has(cityCode)) return;
    items.push({
      code: cityCode,
      name: match[1],
      prefecture: item.prefecture,
      type: "市"
    });
    seenCodes.add(cityCode);
  });

  getMunicipalityData().forEach((item) => {
    const normalizedKey = `${item.prefecture}\t${normalizedMapMunicipalityName(item.name)}\t${item.type}`;
    const matched = byNormalizedName.get(normalizedKey);
    if (!matched || seenCodes.has(matched.code) || !geometryIds.has(matched.code)) return;
    items.push({
      code: matched.code,
      name: item.name,
      prefecture: item.prefecture,
      type: item.type
    });
    seenCodes.add(matched.code);
  });

  return items;
}

function parentCityCodeCandidates(item, cityName, geometryIds) {
  return [
    parentCityCodeByName[cityName],
    `${item.code.slice(0, 4)}0`,
    `${item.code.slice(0, 3)}00`
  ].filter((code, index, codes) => code && codes.indexOf(code) === index && geometryIds.has(code));
}

function mapDisplayCodeForMunicipality(item, geometryIds) {
  if (geometryIds.has(item.code)) return item.code;
  const fallback = historicalMapCodeFallbacks[item.code];
  if (fallback && geometryIds.has(fallback)) return fallback;
  if (item.type === "区") {
    const cityName = item.name.match(/^(.+市).+区$/)?.[1] ?? "";
    return parentCityCodeCandidates(item, cityName, geometryIds)[0] ?? null;
  }
  return null;
}

function getAreaCodeMapData() {
  return Array.isArray(window.areaCodeMapData) ? window.areaCodeMapData : [];
}

function getNationalUniversityData() {
  return Array.isArray(window.nationalUniversityData) ? window.nationalUniversityData : [];
}

function getPublicUniversityData() {
  return Array.isArray(window.publicUniversityData) ? window.publicUniversityData : [];
}

function getPrivateUniversityData() {
  return Array.isArray(window.privateUniversityData) ? window.privateUniversityData : [];
}

function getMunicipalityReadings() {
  return window.municipalityReadings && typeof window.municipalityReadings === "object"
    ? window.municipalityReadings
    : {};
}

function getMunicipalityReadingEntries() {
  return Object.entries(getMunicipalityReadings())
    .filter(([name, reading]) => name.length > 1 && typeof reading === "string" && reading.length > 0)
    .sort((a, b) => b[0].length - a[0].length);
}

function renderRegionOptions() {
  regionOptionsEl.innerHTML = "";
  regionOptionsEl.classList.remove("local-place-region", "local-place-prefectures", "local-place-drilldown");
  if (isLocalPlaceMapMode()) {
    renderLocalPlaceRegionOptions();
    return;
  }

  const mapMode = isPrefectureMapMode();
  regionLegendEl.textContent = mapMode ? "県" : "地方";
  const choices = mapMode ? prefectures : Object.keys(regions);

  choices.forEach((choice, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = mapMode ? "radio" : "checkbox";
    input.name = "region";
    input.value = choice;
    input.checked = mapMode ? choice === "東京都" : index === 0;
    input.addEventListener("change", updateQuestionCountOptions);
    label.append(input, document.createTextNode(choice));
    regionOptionsEl.appendChild(label);
  });
}

function localPlaceMunicipalitiesByPrefecture(prefecture) {
  return getLocalPlaceCandidateMunicipalities(prefecture);
}

function localPlaceMunicipalityCandidateNames(prefecture) {
  const fromMapData = localPlaceMunicipalitiesByPrefecture(prefecture).map((item) => item.name);
  const fromMunicipalityData = getAugmentedMunicipalityCodeData()
    .filter((item) => item.prefecture === prefecture)
    .map((item) => item.name);
  return [...new Set([...fromMunicipalityData, ...fromMapData])];
}

function selectedLocalPlaceMunicipality() {
  const metadata = selectedLocalPlaceMunicipalityMetadata();
  return metadata ? (localPlaceDataForCode(metadata.code) ?? metadata) : null;
}

function renderPrefectureButtonsForLocalPlace() {
  regionLegendEl.textContent = "県";
  regionOptionsEl.classList.add("local-place-prefectures");
  regionOptionsEl.classList.remove("local-place-drilldown");
  const availablePrefs = new Set(getLocalPlaceCandidateMunicipalities().map((item) => item.prefecture));

  prefectures.forEach((prefecture) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "setting-choice-button";
    button.textContent = prefecture;
    button.disabled = !availablePrefs.has(prefecture);
    button.addEventListener("click", () => {
      localPlaceSettingsPrefecture = prefecture;
      localPlaceMunicipalityFilter = "";
      localPlaceSettingsMunicipality = localPlaceMunicipalitiesByPrefecture(prefecture)[0]?.name ?? null;
      renderRegionOptions();
      updateQuestionCountOptions();
    });
    regionOptionsEl.appendChild(button);
  });
}

function renderMunicipalityButtonsForLocalPlace() {
  regionLegendEl.textContent = "市区町村";
  regionOptionsEl.classList.add("local-place-drilldown");
  regionOptionsEl.classList.remove("local-place-prefectures");

  const header = document.createElement("div");
  header.className = "drilldown-header";
  const title = document.createElement("strong");
  title.textContent = localPlaceSettingsPrefecture;
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "secondary-button compact-button";
  backButton.textContent = "県一覧に戻る";
  backButton.addEventListener("click", () => {
    localPlaceSettingsPrefecture = null;
    localPlaceSettingsMunicipality = null;
    localPlaceMunicipalityFilter = "";
    renderRegionOptions();
    updateQuestionCountOptions();
  });
  header.append(title, backButton);

  const search = document.createElement("textarea");
  search.className = "answer-filter municipality-search";
  search.rows = 1;
  search.placeholder = "市区町村名を検索";
  search.value = localPlaceMunicipalityFilter;
  const grid = document.createElement("div");
  grid.className = "choice-grid region-grid municipality-drilldown-grid";
  search.addEventListener("input", () => {
    localPlaceMunicipalityFilter = search.value.replace(/\r?\n/g, "");
    search.value = localPlaceMunicipalityFilter;
    renderLocalPlaceMunicipalityGrid(grid);
    updateQuestionCountOptions();
  });
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  renderLocalPlaceMunicipalityGrid(grid);
  regionOptionsEl.append(header, search, grid);
}

function renderLocalPlaceMunicipalityGrid(grid) {
  grid.innerHTML = "";
  const availableNames = new Set(
    localPlaceMunicipalitiesByPrefecture(localPlaceSettingsPrefecture)
      .filter((item) => item.available !== false && (item.dataPath || item.remoteTopojsonPath))
      .map((item) => item.name)
  );
  localPlaceMunicipalityCandidateNames(localPlaceSettingsPrefecture)
    .filter((name) => optionMatchesFilter(name, localPlaceMunicipalityFilter))
    .forEach((name) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "setting-choice-button";
      button.textContent = name;
      button.disabled = !availableNames.has(name);
      button.classList.toggle("selected", name === localPlaceSettingsMunicipality);
      button.addEventListener("click", () => {
        localPlaceSettingsMunicipality = name;
        updateQuestionCountOptions();
        renderRegionOptions();
      });
      grid.appendChild(button);
    });
}

function renderLocalPlaceRegionOptions() {
  regionOptionsEl.classList.add("local-place-region");
  if (!localPlaceSettingsPrefecture) {
    renderPrefectureButtonsForLocalPlace();
    return;
  }
  renderMunicipalityButtonsForLocalPlace();
}

function selectedRegionNames() {
  if (isLocalPlaceMapMode()) {
    return selectedLocalPlaceMunicipality() ? [localPlaceSettingsMunicipality] : [];
  }

  return [...document.querySelectorAll('input[name="region"]:checked')]
    .map((checkbox) => checkbox.value);
}

function selectedPrefectures() {
  if (isLocalPlaceMapMode()) {
    return localPlaceSettingsPrefecture ? [localPlaceSettingsPrefecture] : [];
  }

  if (isPrefectureMapMode()) {
    return selectedRegionNames();
  }

  const selected = selectedRegionNames().flatMap((regionName) => regions[regionName] ?? []);
  return prefectures.filter((prefecture) => selected.includes(prefecture));
}

function selectedTypes() {
  return typeCheckboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function matchingAreaCodes() {
  const prefs = selectedPrefectures();
  return getAreaCodeData().filter((item) => (
    item.prefectures.some((prefecture) => prefs.includes(prefecture))
  ));
}

function matchingDiamonds() {
  const prefs = selectedPrefectures();
  return getDiamondData()
    .map((item, index) => ({
      name: `ダイヤ ${index + 1}`,
      image: `./diamond-images/${item.image}`,
      prefectures: prefectures.filter((prefecture) => (
        prefs.includes(prefecture) && item.prefectures.includes(prefecture)
      ))
    }))
    .filter((item) => item.prefectures.length > 0);
}

function matchingMunicipalities() {
  const prefs = selectedPrefectures();
  const types = selectedTypes();
  return getMunicipalityData().filter((item) => (
    prefs.includes(item.prefecture) && types.includes(item.type)
  ));
}

function matchingNationalUniversities() {
  const prefs = selectedPrefectures();
  return getNationalUniversityData().filter((item) => prefs.includes(item.prefecture));
}

function matchingPublicUniversities() {
  const prefs = selectedPrefectures();
  return getPublicUniversityData().filter((item) => prefs.includes(item.prefecture));
}

function matchingPrivateUniversities() {
  const prefs = selectedPrefectures();
  return getPrivateUniversityData().filter((item) => prefs.includes(item.prefecture));
}

function isUniversityMode(quizMode = currentQuizMode()) {
  return quizMode === "nationalUniversity" || quizMode === "publicUniversity" || quizMode === "privateUniversity";
}

function matchingUniversitiesForCurrentMode() {
  const quizMode = currentQuizMode();
  if (quizMode === "publicUniversity") return matchingPublicUniversities();
  if (quizMode === "privateUniversity") return matchingPrivateUniversities();
  return matchingNationalUniversities();
}

function universityCategoryLabel(quizMode = currentQuizMode()) {
  if (quizMode === "publicUniversity") return "公立大学";
  if (quizMode === "privateUniversity") return "私立大学";
  return "国立大学";
}

function matchingMapMunicipalities() {
  const selectedPref = selectedPrefectures()[0];
  const types = selectedTypes();
  const topology = getMapTopology();
  const geometryIds = new Set(topology?.objects?.municipalities?.geometries?.map((geometry) => geometry.id) ?? []);
  return getAugmentedMunicipalityCodeData()
    .filter((item) => item.prefecture === selectedPref && types.includes(item.type))
    .map((item) => ({
      ...item,
      code: mapDisplayCodeForMunicipality(item, geometryIds)
    }))
    .filter((item) => item.code);
}

function matchingMapAreaCodes() {
  const selectedPref = selectedPrefectures()[0];
  const types = selectedTypes();
  const topology = getMapTopology();
  const geometryIds = new Set(topology?.objects?.municipalities?.geometries?.map((geometry) => geometry.id) ?? []);

  return getAreaCodeMapData()
    .map((item) => {
      const codes = item.municipalities
        .filter((municipality) => (
          municipality.prefecture === selectedPref &&
          types.includes(municipality.type)
        ))
        .map((municipality) => mapDisplayCodeForMunicipality(municipality, geometryIds))
        .filter(Boolean);
      return {
        name: item.areaCode,
        prefectures: [item.areaCode],
        codes: [...new Set(codes)]
      };
    })
    .filter((item) => item.codes.length > 0);
}

function matchingLocalPlaces() {
  const metadata = selectedLocalPlaceMunicipalityMetadata();
  const municipality = metadata ? localPlaceDataForCode(metadata.code) : selectedLocalPlaceMunicipality();
  return municipality?.places ? aggregateLocalPlaces(municipality.places) : [];
}

function decodedArc(topology, arcIndex) {
  const reverse = arcIndex < 0;
  const arc = topology.arcs[reverse ? ~arcIndex : arcIndex];
  if (!topology.transform) {
    const points = arc.map(([x, y]) => [x, -y]);
    return reverse ? points.reverse() : points;
  }

  const scale = topology.transform?.scale ?? [1, 1];
  const translate = topology.transform?.translate ?? [0, 0];
  let x = 0;
  let y = 0;
  const points = arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
  return reverse ? points.reverse() : points;
}

function ringPath(topology, ring) {
  const points = ring.flatMap((arcIndex, index) => {
    const arc = decodedArc(topology, arcIndex);
    return index === 0 ? arc : arc.slice(1);
  });
  const precision = topology.transform ? 2 : 6;
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(precision)},${y.toFixed(precision)}`).join(" ") + "Z";
}

function geometryPath(topology, geometry) {
  if (geometry.type === "Polygon") {
    return geometry.arcs.map((ring) => ringPath(topology, ring)).join(" ");
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.arcs.flatMap((polygon) => polygon.map((ring) => ringPath(topology, ring))).join(" ");
  }

  return "";
}

function mapBounds(paths) {
  const numbers = paths.join(" ").match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const xs = numbers.filter((_, index) => index % 2 === 0);
  const ys = numbers.filter((_, index) => index % 2 === 1);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = Math.max(maxX - minX, maxY - minY) * 0.04;
  return `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
}

function pathBounds(path) {
  const numbers = path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const xs = numbers.filter((_, index) => index % 2 === 0);
  const ys = numbers.filter((_, index) => index % 2 === 1);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys)
  };
}

function sectionMapItems(mapItems, selectedPref) {
  const remoteIslandSettings = {
    "東京都": { maxSections: 5, gapRatio: 0.035, axis: "y" },
    "鹿児島県": { maxSections: 7, gapRatio: 0.055, axis: "y" },
    "沖縄県": { maxSections: 8, gapRatio: 0.035, axis: "x" }
  };
  const settings = remoteIslandSettings[selectedPref];
  if (!settings || mapItems.length < 3) {
    return [mapItems];
  }

  const full = pathBounds(mapItems.map((item) => item.path).join(" "));
  const width = full.maxX - full.minX;
  const height = full.maxY - full.minY;
  const axis = settings.axis ?? (height > width ? "y" : "x");
  const keyedItems = mapItems
    .map((item) => {
      const bounds = pathBounds(item.path);
      return {
        ...item,
        center: axis === "y"
          ? (bounds.minY + bounds.maxY) / 2
          : (bounds.minX + bounds.maxX) / 2
      };
    })
    .sort((a, b) => a.center - b.center);

  const range = Math.max(1, keyedItems[keyedItems.length - 1].center - keyedItems[0].center);
  const gaps = [];
  for (let i = 1; i < keyedItems.length; i += 1) {
    gaps.push({
      index: i,
      gap: keyedItems[i].center - keyedItems[i - 1].center
    });
  }

  const splitIndexes = gaps
    .filter((item) => item.gap > range * settings.gapRatio)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, settings.maxSections - 1)
    .map((item) => item.index)
    .sort((a, b) => a - b);

  if (splitIndexes.length === 0) {
    return [mapItems];
  }

  const sections = [];
  let start = 0;
  splitIndexes.forEach((index) => {
    sections.push(keyedItems.slice(start, index));
    start = index;
  });
  sections.push(keyedItems.slice(start));
  return sections
    .filter((section) => section.length > 0)
    .sort((a, b) => {
      const aBounds = pathBounds(a.map((item) => item.path).join(" "));
      const bBounds = pathBounds(b.map((item) => item.path).join(" "));
      return aBounds.minY === bBounds.minY
        ? aBounds.minX - bBounds.minX
        : aBounds.minY - bBounds.minY;
    });
}

function mapPathClass(code, targetCodes, selectedCodes, resultMode, options = {}) {
  if (options.clickable) {
    if (selectedCodes.has(code)) return "map-click-selected";
    return "map-area map-clickable";
  }
  if (!resultMode) {
    return targetCodes.has(code) && !options.hideTarget ? "map-target" : "map-area";
  }
  if (selectedCodes.has(code)) return "map-result-wrong";
  if (targetCodes.has(code)) return "map-result-correct";
  return "map-area";
}

function appendMapPaths(parent, mapItems, targetCodes, selectedCodes, options = {}) {
  const resultMode = options.resultMode ?? false;
  mapItems.forEach((item) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", item.path);
    path.setAttribute("class", mapPathClass(item.code, targetCodes, selectedCodes, resultMode, options));
    path.dataset.code = item.code;
    if (item.name) {
      path.dataset.name = item.name;
    }
    if (options.clickable && typeof options.onMapAnswer === "function") {
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", item.name ?? item.code);
      path.addEventListener("click", () => options.onMapAnswer(item.code, item.name, path));
      path.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        options.onMapAnswer(item.code, item.name, path);
      });
    }
    parent.appendChild(path);
  });
}

function createMapSvg(mapItems, targetCodes, selectedPref, labelSuffix = "", selectedCodes = new Set(), options = {}) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", mapBounds(mapItems.map((item) => item.path)));
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${selectedPref}の地図${labelSuffix}`);

  appendMapPaths(svg, mapItems, targetCodes, selectedCodes, options);

  return svg;
}

function mapCompositeLayout(selectedPref, sectionCount) {
  const layouts = {
    "沖縄県": [
      { x: -150, y: -300, width: 900, height: 700 },  // 本島～久米島
      { x: 100, y: 100, width: 510, height: 465 },  // 石垣島, 西表島, 波照間島
      { x: 200, y: 100, width: 630, height: 360 },  // 水納島, 多良間島
      { x: 500, y: 100, width: 420, height: 300 },  // 北大東島, 南大東島
      { x: 610, y: 314, width: 95, height: 75 },  // 宮古島, 伊良部島, 下地島
      { x: 70, y: 425, width: 75, height: 80 },  // 与那国
      // もともと書いてあったけど見えなかったものは削除している
    ],
    "鹿児島県": [
      { x: 350, y: 0, width: 600, height: 350 },  // 本島
      { x: 400, y: 350, width: 250, height: 250 },  // 十島
      { x: 200, y: 0, width: 70, height: 70 },  // 上ノ根島, 横当島
      { x: 150, y: 100, width: 300, height: 300 },  // 奄美
      { x: 70, y: 400, width: 70, height: 70 },  // 沖永良部島
      { x: 50, y: 500, width: 40, height: 40 },  // 与論
      // もともと書いてあったけど見えなかったものは削除している
    ],
    "東京都": [
      { x: -5, y: -60, width: 420, height: 420 },  // 本島
      { x: 100, y: 300, width: 300, height: 300 },  // 大島～御蔵島
      { x: 400, y: 0, width: 250, height: 250 },  // 八丈島～青ヶ島
      { x: 400, y: 300, width: 300, height: 300 }, // 小笠原諸島
      // もともと書いてあったけど見えなかったものは削除している
    ]
  };
  const layout = layouts[selectedPref] ?? [];
  return layout.slice(0, sectionCount);
}

function appendInsetMap(parent, section, targetCodes, bounds, selectedCodes = new Set(), options = {}) {
  const inset = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  inset.setAttribute("x", bounds.x);
  inset.setAttribute("y", bounds.y);
  inset.setAttribute("width", bounds.width);
  inset.setAttribute("height", bounds.height);
  inset.setAttribute("viewBox", mapBounds(section.map((item) => item.path)));
  inset.setAttribute("preserveAspectRatio", "xMidYMid meet");

  appendMapPaths(inset, section, targetCodes, selectedCodes, options);

  parent.appendChild(inset);
}

function createCompositeMapSvg(sections, targetCodes, selectedPref, selectedCodes = new Set(), options = {}) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 820 610");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${selectedPref}の分割地図`);
  svg.setAttribute("class", "map-composite");

  const divider = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let dividerAttr = "";
  divider.setAttribute("class", "map-divider");

  switch (selectedPref) {
    case "鹿児島県":
      dividerAttr = "M500 0V150L420 250";
      break;
    case "沖縄県":
      dividerAttr = "M18 404H454L650 210V48M650 210H810";
      break;
    case "東京都":
      dividerAttr = "M18 305H410L410 0V600M410 305H810";
      break;
    default:
      dividerAttr = "";
  }

  divider.setAttribute("d", dividerAttr);
  svg.appendChild(divider);

  const layout = mapCompositeLayout(selectedPref, sections.length);
  sections.forEach((section, index) => {
    appendInsetMap(svg, section, targetCodes, layout[index] ?? {
      x: 30 + (index % 3) * 260,
      y: 40 + Math.floor(index / 3) * 190,
      width: 230,
      height: 170
    }, selectedCodes, options);
  });

  return svg;
}

function createQuestionMapSvg(question, selectedPref, selectedCodes = new Set(), options = {}) {
  const topology = getMapTopology();
  const geometries = topology?.objects?.municipalities?.geometries ?? [];
  const candidates = getAugmentedMunicipalityCodeData().filter((item) => item.prefecture === selectedPref);
  const candidateCodes = new Set(candidates.map((item) => item.code));
  const candidateByCode = new Map(candidates.map((item) => [item.code, item]));
  const targetCodes = new Set(question.codes);
  question.codes.forEach((code) => candidateCodes.add(code));
  selectedCodes.forEach((code) => candidateCodes.add(code));
  const mapItems = geometries
    .filter((geometry) => candidateCodes.has(geometry.id))
    .map((geometry) => ({
      code: geometry.id,
      name: candidateByCode.get(geometry.id)?.name,
      path: geometryPath(topology, geometry)
    }))
    .filter((item) => item.path);

  const sections = sectionMapItems(mapItems, selectedPref);
  if (sections.length === 1) {
    return createMapSvg(sections[0], targetCodes, selectedPref, options.labelSuffix ?? "", selectedCodes, options);
  }

  return createCompositeMapSvg(sections, targetCodes, selectedPref, selectedCodes, options);
}

function createLocalPlaceMapSvg(question, selectedCodes = new Set(), options = {}) {
  const municipality = localPlaceDataForCode(question.localPlaceMunicipalityCode)
    ?? selectedLocalPlaceMunicipality();
  const topology = municipality?.topology;
  const geometries = topology?.objects?.places?.geometries ?? [];
  const targetCodes = new Set(question.codes);
  const mapItems = geometries
    .map((geometry) => ({
      code: geometry.properties?.code ?? geometry.id,
      name: localPlaceBaseName(geometry.properties?.name ?? ""),
      path: geometryPath(topology, geometry)
    }))
    .filter((item) => item.path);

  return createMapSvg(
    mapItems,
    targetCodes,
    municipality?.name ?? "市区町村",
    options.labelSuffix ?? "",
    selectedCodes,
    options
  );
}

function renderMapQuestion(question) {
  mapQuestionEl.innerHTML = "";
  if (isLocalPlaceMapMode()) {
    mapQuestionEl.appendChild(createLocalPlaceMapSvg(
      question,
      new Set(),
      isMapClickMode()
        ? {
          hideTarget: true,
          clickable: true,
          onMapAnswer: answerMapClick
        }
        : {}
    ));
    return;
  }
  mapQuestionEl.appendChild(createQuestionMapSvg(
    question,
    selectedPrefectures()[0],
    new Set(),
    isMapClickMode()
      ? {
        hideTarget: true,
        clickable: true,
        onMapAnswer: answerMapClick
      }
      : {}
  ));
}

function formatPrefectureList(prefectureList) {
  return prefectureList.join("、");
}

function normalizedMunicipalityName(name) {
  return name.replace(/（[^）]+）/g, "");
}

function stripMunicipalitySuffixReading(name, reading) {
  const suffixes = [
    ["市", "し"],
    ["区", "く"],
    ["町", "ちょう"],
    ["町", "まち"],
    ["村", "そん"],
    ["村", "むら"]
  ];
  for (const [nameSuffix, readingSuffix] of suffixes) {
    if (name.endsWith(nameSuffix) && reading.endsWith(readingSuffix)) {
      return {
        stem: name.slice(0, -nameSuffix.length),
        suffix: nameSuffix,
        reading: reading.slice(0, -readingSuffix.length)
      };
    }
  }
  return { stem: name, suffix: "", reading };
}

function formatMunicipalityWithReading(name) {
  const readings = getMunicipalityReadings();
  const reading = readings[name] ?? readings[normalizedMunicipalityName(name)];
  if (!reading) return name;
  const parts = stripMunicipalitySuffixReading(name, reading);
  return `${parts.stem}（${parts.reading}）${parts.suffix}`;
}

function formatRegionNameForFeedback(name) {
  const readings = getMunicipalityReadings();
  if (readings[name] || readings[normalizedMunicipalityName(name)]) {
    return formatMunicipalityWithReading(name);
  }
  return getMunicipalityReadingEntries().reduce((text, [municipalityName]) => {
    if (!text.includes(municipalityName)) return text;
    return text.split(municipalityName).join(formatMunicipalityWithReading(municipalityName));
  }, name);
}

function formatAnswerListForFeedback(answerList) {
  return answerList.map(formatRegionNameForFeedback).join("、");
}

function kanaToRoman(kana, style = "kunrei") {
  const digraphs = {
    "きゃ": ["kya", "kya"], "きゅ": ["kyu", "kyu"], "きょ": ["kyo", "kyo"],
    "しゃ": ["sya", "sha"], "しゅ": ["syu", "shu"], "しょ": ["syo", "sho"],
    "ちゃ": ["tya", "cha"], "ちゅ": ["tyu", "chu"], "ちょ": ["tyo", "cho"],
    "にゃ": ["nya", "nya"], "にゅ": ["nyu", "nyu"], "にょ": ["nyo", "nyo"],
    "ひゃ": ["hya", "hya"], "ひゅ": ["hyu", "hyu"], "ひょ": ["hyo", "hyo"],
    "みゃ": ["mya", "mya"], "みゅ": ["myu", "myu"], "みょ": ["myo", "myo"],
    "りゃ": ["rya", "rya"], "りゅ": ["ryu", "ryu"], "りょ": ["ryo", "ryo"],
    "ぎゃ": ["gya", "gya"], "ぎゅ": ["gyu", "gyu"], "ぎょ": ["gyo", "gyo"],
    "じゃ": ["zya", "ja"], "じゅ": ["zyu", "ju"], "じょ": ["zyo", "jo"],
    "びゃ": ["bya", "bya"], "びゅ": ["byu", "byu"], "びょ": ["byo", "byo"],
    "ぴゃ": ["pya", "pya"], "ぴゅ": ["pyu", "pyu"], "ぴょ": ["pyo", "pyo"]
  };
  const kanaMap = {
    "あ": ["a", "a"], "い": ["i", "i"], "う": ["u", "u"], "え": ["e", "e"], "お": ["o", "o"],
    "か": ["ka", "ka"], "き": ["ki", "ki"], "く": ["ku", "ku"], "け": ["ke", "ke"], "こ": ["ko", "ko"],
    "さ": ["sa", "sa"], "し": ["si", "shi"], "す": ["su", "su"], "せ": ["se", "se"], "そ": ["so", "so"],
    "た": ["ta", "ta"], "ち": ["ti", "chi"], "つ": ["tu", "tsu"], "て": ["te", "te"], "と": ["to", "to"],
    "な": ["na", "na"], "に": ["ni", "ni"], "ぬ": ["nu", "nu"], "ね": ["ne", "ne"], "の": ["no", "no"],
    "は": ["ha", "ha"], "ひ": ["hi", "hi"], "ふ": ["hu", "fu"], "へ": ["he", "he"], "ほ": ["ho", "ho"],
    "ま": ["ma", "ma"], "み": ["mi", "mi"], "む": ["mu", "mu"], "め": ["me", "me"], "も": ["mo", "mo"],
    "や": ["ya", "ya"], "ゆ": ["yu", "yu"], "よ": ["yo", "yo"],
    "ら": ["ra", "ra"], "り": ["ri", "ri"], "る": ["ru", "ru"], "れ": ["re", "re"], "ろ": ["ro", "ro"],
    "わ": ["wa", "wa"], "を": ["o", "o"], "ん": ["n", "n"],
    "が": ["ga", "ga"], "ぎ": ["gi", "gi"], "ぐ": ["gu", "gu"], "げ": ["ge", "ge"], "ご": ["go", "go"],
    "ざ": ["za", "za"], "じ": ["zi", "ji"], "ず": ["zu", "zu"], "ぜ": ["ze", "ze"], "ぞ": ["zo", "zo"],
    "だ": ["da", "da"], "ぢ": ["di", "ji"], "づ": ["du", "zu"], "で": ["de", "de"], "ど": ["do", "do"],
    "ば": ["ba", "ba"], "び": ["bi", "bi"], "ぶ": ["bu", "bu"], "べ": ["be", "be"], "ぼ": ["bo", "bo"],
    "ぱ": ["pa", "pa"], "ぴ": ["pi", "pi"], "ぷ": ["pu", "pu"], "ぺ": ["pe", "pe"], "ぽ": ["po", "po"],
    "ぁ": ["a", "a"], "ぃ": ["i", "i"], "ぅ": ["u", "u"], "ぇ": ["e", "e"], "ぉ": ["o", "o"],
    "ゃ": ["ya", "ya"], "ゅ": ["yu", "yu"], "ょ": ["yo", "yo"], "ゎ": ["wa", "wa"]
  };
  const pick = (entry) => entry[style === "hepburn" ? 1 : 0];
  let output = "";
  let smallTsu = false;
  for (let index = 0; index < kana.length; index += 1) {
    const two = kana.slice(index, index + 2);
    let roman = "";
    if (kana[index] === "っ") {
      smallTsu = true;
      continue;
    }
    if (digraphs[two]) {
      roman = pick(digraphs[two]);
      index += 1;
    } else if (kanaMap[kana[index]]) {
      roman = pick(kanaMap[kana[index]]);
    }
    if (!roman) continue;
    if (smallTsu && /^[a-z]/.test(roman)) {
      output += roman[0];
      smallTsu = false;
    }
    output += roman;
  }
  return output;
}

function optionReading(option) {
  const loadedLocalPlaceMunicipalities = Object.values(getLocalPlaceDataFiles());
  const localPlace = loadedLocalPlaceMunicipalities
    .flatMap((municipality) => aggregateLocalPlaces(municipality.places ?? []))
    .find((place) => place.name === option);
  if (localPlace?.reading) return localPlace.reading.replace(/[^ぁ-ん]/g, "");

  let reading = option;
  Object.entries(prefectureReadings).forEach(([name, kana]) => {
    reading = reading.split(name).join(kana);
  });
  getMunicipalityReadingEntries().forEach(([name, kana]) => {
    reading = reading.split(name).join(kana);
  });
  const directReading = getMunicipalityReadings()[option] ?? getMunicipalityReadings()[normalizedMunicipalityName(option)];
  return (directReading ?? reading).replace(/[^ぁ-ん]/g, "");
}

function optionFilterKeys(option) {
  if (/^\d/.test(option)) {
    return [option.replace(/^0+/, "") || "0"];
  }
  const reading = optionReading(option);
  const keys = [
    option.toLowerCase(),
    kanaToRoman(reading, "kunrei"),
    kanaToRoman(reading, "hepburn")
  ].filter(Boolean);
  return [...new Set(keys)];
}

function optionMatchesFilter(option, filterText) {
  const query = filterText.trim().toLowerCase();
  if (!query) return true;
  return optionFilterKeys(option).some((key) => key.startsWith(query));
}

function buildQuestions(items) {
  const groups = new Map();
  items.forEach((item) => {
    if (!groups.has(item.name)) {
      groups.set(item.name, {
        name: item.name,
        prefectures: []
      });
    }

    const group = groups.get(item.name);
    if (!group.prefectures.includes(item.prefecture)) {
      group.prefectures.push(item.prefecture);
    }
  });

  return [...groups.values()].map((question) => ({
    ...question,
    prefectures: prefectures.filter((prefecture) => question.prefectures.includes(prefecture))
  }));
}

function availableQuestions() {
  if (currentQuizMode() === "areaCode") {
    return matchingAreaCodes().map((item) => ({
      name: item.code,
      prefectures: item.answers
    }));
  }

  if (currentQuizMode() === "diamond") {
    return matchingDiamonds();
  }

  if (currentQuizMode() === "map") {
    return matchingMapMunicipalities().map((item) => ({
      name: item.name,
      prefectures: [item.name],
      codes: [item.code]
    }));
  }

  if (currentQuizMode() === "municipalityMap") {
    return matchingMapMunicipalities().map((item) => ({
      name: item.name,
      prefectures: [item.name],
      codes: [item.code]
    }));
  }

  if (currentQuizMode() === "mapAreaCode") {
    return matchingMapAreaCodes();
  }

  if (isLocalPlaceMapMode()) {
    const municipality = selectedLocalPlaceMunicipality();
    return matchingLocalPlaces().map((item) => ({
      name: item.name,
      prefectures: [item.name],
      codes: item.codes ?? [item.code],
      localPlaceMunicipalityCode: municipality?.code
    }));
  }

  if (isUniversityMode()) {
    return matchingUniversitiesForCurrentMode().map((item) => ({
      name: item.name,
      prefectures: [item.location]
    }));
  }

  return buildQuestions(matchingMunicipalities());
}

function questionCountChoices(max) {
  const baseChoices = [5, 10, 20, 30, 50, 100, 200, 300, 500, 1000];
  const choices = baseChoices.filter((count) => count < max);
  if (max > 0) {
    choices.push(max);
  }
  return [...new Set(choices)];
}

function updateQuestionCountOptions() {
  const previousValue = Number(questionCountEl.value);
  const regionCount = selectedRegionNames().length;
  const typeCount = selectedTypes().length;
  const quizMode = currentQuizMode();
  const areaCodeMode = quizMode === "areaCode";
  const municipalityMode = quizMode === "municipality" || quizMode === "map" || quizMode === "municipalityMap" || quizMode === "mapAreaCode";
  const localPlaceMode = isLocalPlaceMapMode(quizMode);
  const universityMode = isUniversityMode(quizMode);
  const universityLabel = universityCategoryLabel(quizMode);
  const rawCount = localPlaceMode ? selectedLocalPlaceQuestionCount() : availableQuestions().length;
  const provisionalLocalPlaceCount = localPlaceMode && rawCount == null && selectedLocalPlaceMunicipalityMetadata();
  const count = provisionalLocalPlaceCount ? 100 : rawCount;
  const choices = questionCountChoices(count);
  questionCountEl.innerHTML = "";

  choices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = String(choice);
    option.textContent = choice === count && !provisionalLocalPlaceCount ? `${choice}問（全問）` : `${choice}問`;
    questionCountEl.appendChild(option);
  });

  if (choices.includes(previousValue)) {
    questionCountEl.value = String(previousValue);
  } else if (count > 0) {
    questionCountEl.value = provisionalLocalPlaceCount ? "5" : String(count);
  }

  availableCountEl.textContent = provisionalLocalPlaceCount ? "出題可能: 読み込み後に確定" : `出題可能: ${count}問`;
  municipalityTypeGroupEl.classList.toggle("hidden", !municipalityMode);
  const canStart = regionCount > 0 && (!municipalityMode || typeCount > 0) && count > 0;
  startButton.disabled = !canStart;
  questionCountEl.disabled = !canStart;

  if (regionCount === 0) {
    setupMessageEl.textContent = localPlaceMode
      ? "県を選び、市区町村を1つ選んでください。"
      : quizMode === "map" || quizMode === "mapAreaCode"
      ? "県を1つ選んでください。"
      : "地方を1つ以上選んでください。";
  } else if (municipalityMode && typeCount === 0) {
    setupMessageEl.textContent = "市区町村を1つ以上選んでください。";
  } else if (count === 0) {
    setupMessageEl.textContent = localPlaceMode
      ? "選択した市区町村の町丁目データがありません。別の市区町村を選んでください。"
      : universityMode
      ? `選択条件に合う${universityLabel}がありません。条件を変更してください。`
      : "選択条件に合う自治体がありません。条件を変更してください。";
  } else {
    setupMessageEl.textContent = areaCodeMode
      ? "市外局番クイズの条件を選んで開始してください。"
      : quizMode === "diamond"
        ? "横断歩道ダイヤクイズの条件を選んで開始してください。"
        : quizMode === "map"
          ? "地図クイズの条件を選んで開始してください。"
        : quizMode === "municipalityMap"
          ? "市区町村名から地図上の位置を当てるクイズの条件を選んで開始してください。"
        : quizMode === "mapAreaCode"
          ? "地図市外局番クイズの条件を選んで開始してください。"
        : quizMode === "localPlaceMapClick"
          ? "町丁目名から地図上の位置を当てるクイズの条件を選んで開始してください。"
        : localPlaceMode
          ? "町丁目地図クイズの条件を選んで開始してください。"
        : universityMode
          ? `${universityLabel}名クイズの条件を選んで開始してください。`
        : "条件を選んで開始してください。";
  }
  setupMessageEl.classList.toggle("error", !canStart);
}

function shuffle(items) {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function showView(viewName) {
  setupViewEl.classList.toggle("hidden", viewName !== "setup");
  quizViewEl.classList.toggle("hidden", viewName !== "quiz");
  resultViewEl.classList.toggle("hidden", viewName !== "result");
}

function updateScoreboard() {
  scoreEl.textContent = score;
  const currentNo = currentQuestion ? answered + (locked ? 0 : 1) : answered;
  currentNoEl.textContent = Math.min(currentNo, questionPool.length);
  totalNoEl.textContent = questionPool.length;
}

function renderOptions() {
  optionsEl.innerHTML = "";
  const filterText = answerFilterEl.value;
  optionPrefectures
    .filter((prefecture) => optionMatchesFilter(prefecture, filterText))
    .forEach((prefecture) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pref-button";
    button.textContent = prefecture;
    if (selectedCorrectPrefectures.includes(prefecture)) {
      button.classList.add("correct");
      button.disabled = true;
    } else if (locked) {
      button.disabled = true;
    }
    button.addEventListener("click", () => answer(prefecture, button));
    optionsEl.appendChild(button);
  });
}

function answerCandidatesForCurrentMode() {
  if (currentQuizMode() === "areaCode") {
    const prefs = selectedPrefectures();
    return getAreaCodeData()
      .filter((item) => item.prefectures.some((prefecture) => prefs.includes(prefecture)))
      .flatMap((item) => item.answers);
  }

  if (currentQuizMode() === "diamond") {
    return selectedPrefectures();
  }

  if (currentQuizMode() === "map") {
    return matchingMapMunicipalities().map((item) => item.name);
  }

  if (isMapClickMode()) {
    return [];
  }

  if (currentQuizMode() === "mapAreaCode") {
    return matchingMapAreaCodes().map((item) => item.name);
  }

  if (isLocalPlaceMapMode()) {
    return matchingLocalPlaces().map((item) => item.name);
  }

  if (isUniversityMode()) {
    return matchingUniversitiesForCurrentMode().map((item) => item.location);
  }

  return selectedPrefectures();
}

function setOptionsDisabled(disabled) {
  document.querySelectorAll(".pref-button").forEach((button) => {
    button.disabled = disabled;
  });
}

function selectedMapCodesForAnswer(selectedAnswer, quizMode) {
  if (quizMode !== "map" && quizMode !== "municipalityMap" && quizMode !== "mapAreaCode" && !isLocalPlaceMapMode(quizMode)) return [];
  if (quizMode === "map") {
    const item = matchingMapMunicipalities().find((municipality) => municipality.name === selectedAnswer);
    return item ? [item.code] : [];
  }
  if (quizMode === "municipalityMap") {
    return [selectedAnswer].filter(Boolean);
  }
  if (isLocalPlaceMapMode(quizMode)) {
    const item = matchingLocalPlaces().find((place) => place.name === selectedAnswer);
    return item ? (item.codes ?? [item.code]) : [];
  }
  return matchingMapAreaCodes().find((question) => question.name === selectedAnswer)?.codes ?? [];
}

function mapMunicipalityNameByCode(code) {
  return matchingMapMunicipalities().find((municipality) => municipality.code === code)?.name ?? code;
}

function recordMapAnswerResult(quizMode, selectedPrefectureName, correctCodes, isCorrect) {
  if (quizMode !== "map" && quizMode !== "municipalityMap" && quizMode !== "mapAreaCode" && !isLocalPlaceMapMode(quizMode)) return;
  if (!Array.isArray(correctCodes) || correctCodes.length === 0) return;
  mapAnswerResults.push({
    quizMode,
    selectedPrefectureName,
    correctCodes: [...correctCodes],
    isCorrect,
    localPlaceMunicipalityCode: currentQuestion?.localPlaceMunicipalityCode
  });
}

function answerMapClick(selectedCode, selectedName, selectedPath) {
  if (locked || !currentQuestion || !isMapClickMode()) return;

  const quizMode = currentQuizMode();
  const correct = currentQuestion.codes.includes(selectedCode);
  const questionNameText = formatRegionNameForFeedback(currentQuestion.name);
  const selectedText = selectedName ?? mapMunicipalityNameByCode(selectedCode);

  locked = true;
  selectedPath.classList.add("map-click-selected");
  recordMapAnswerResult(quizMode, selectedPrefectures()[0], currentQuestion.codes, correct);

  if (correct) {
    score += 1;
    feedbackEl.textContent = `正解です。選択した場所は${selectedText}です。`;
    feedbackEl.className = "feedback correct";
  } else {
    feedbackEl.textContent = `残念！選択した場所は${selectedText}です。`;
    feedbackEl.className = "feedback wrong";
    wrongAnswers.push({
      name: currentQuestion.name,
      selected: selectedText,
      correct: questionNameText,
      quizMode,
      selectedPrefectureName: selectedPrefectures()[0],
      selectedCodes: [selectedCode],
      question: {
        name: currentQuestion.name,
        prefectures: [...currentQuestion.prefectures],
        image: currentQuestion.image,
        codes: currentQuestion.codes
      }
    });
  }

  answered += 1;
  updateScoreboard();
  nextQuestion({ keepFeedback: true });
}

function nextQuestion(options = {}) {
  const { keepFeedback = false } = options;
  currentQuestion = questionPool[answered] ?? null;
  locked = false;
  selectedCorrectPrefectures = [];

  document.querySelectorAll(".pref-button").forEach((button) => {
    button.classList.remove("correct", "wrong");
  });

  if (!currentQuestion) {
    showResult();
    return;
  }

  answerFilterEl.value = "";
  renderOptions();

  const quizMode = currentQuizMode();
  const mapQuestionMode = quizMode === "map" || quizMode === "municipalityMap" || quizMode === "mapAreaCode" || isLocalPlaceMapMode(quizMode);
  municipalityEl.classList.toggle("hidden", quizMode === "diamond" || (mapQuestionMode && !isMapClickMode(quizMode)));
  questionImageEl.classList.toggle("hidden", quizMode !== "diamond");
  mapQuestionEl.classList.toggle("hidden", !mapQuestionMode);
  optionsWrapEl.classList.toggle("hidden", isMapClickMode(quizMode));
  if (quizMode === "diamond") {
    municipalityEl.textContent = "";
    questionImageEl.src = currentQuestion.image;
    questionImageEl.alt = "横断歩道ダイヤ";
    mapQuestionEl.innerHTML = "";
  } else if (mapQuestionMode) {
    municipalityEl.textContent = isMapClickMode(quizMode) ? currentQuestion.name : "";
    questionImageEl.removeAttribute("src");
    questionImageEl.alt = "";
    renderMapQuestion(currentQuestion);
  } else {
    municipalityEl.textContent = currentQuestion.name;
    questionImageEl.removeAttribute("src");
    questionImageEl.alt = "";
    mapQuestionEl.innerHTML = "";
  }

  quizPromptEl.textContent = quizMode === "areaCode"
    ? "この市外局番が使われている代表地域は？"
    : quizMode === "diamond"
      ? "この横断歩道ダイヤが存在する都道府県は？"
      : quizMode === "map"
        ? "赤色で示された市区町村は？"
      : quizMode === "municipalityMap"
        ? "この市区町村は地図上のどこ？"
      : quizMode === "mapAreaCode"
        ? "青色で示された地域の市外局番は？"
      : quizMode === "localPlaceMapClick"
        ? "この地名は地図上のどこ？"
      : isLocalPlaceMapMode(quizMode)
        ? "青色で示された地名は？"
      : isUniversityMode(quizMode)
        ? `この${universityCategoryLabel(quizMode)}の所在地は？`
      : "この自治体がある都道府県は？";
  if (!keepFeedback) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
  }
  setOptionsDisabled(false);
  updateScoreboard();
}

function answer(selectedPrefecture, selectedButton) {
  if (locked || !currentQuestion) return;
  if (selectedCorrectPrefectures.includes(selectedPrefecture)) return;
  const correct = currentQuestion.prefectures.includes(selectedPrefecture);
  const quizMode = currentQuizMode();
  const correctText = quizMode === "map" || quizMode === "areaCode" || isUniversityMode(quizMode) || isLocalPlaceMapMode(quizMode)
    ? formatAnswerListForFeedback(currentQuestion.prefectures)
    : formatPrefectureList(currentQuestion.prefectures);
  const questionNameText = formatRegionNameForFeedback(currentQuestion.name);

  if (correct) {
    selectedCorrectPrefectures.push(selectedPrefecture);
    selectedButton.classList.add("correct");
    selectedButton.disabled = true;

    if (selectedCorrectPrefectures.length < currentQuestion.prefectures.length) {
      feedbackEl.textContent = "";
      feedbackEl.className = "feedback";
      updateScoreboard();
      return;
    }

    locked = true;
    score += 1;
    recordMapAnswerResult(quizMode, selectedPrefectures()[0], currentQuestion.codes, true);
    feedbackEl.textContent = quizMode === "diamond"
      ? `正解です。このダイヤは${correctText}です。`
      : quizMode === "map"
        ? `正解です。赤色の場所は${correctText}です。`
      : quizMode === "mapAreaCode"
        ? `正解です。青色の地域の市外局番は${correctText}です。`
      : isLocalPlaceMapMode(quizMode)
        ? `正解です。青色の場所は${correctText}です。`
      : isUniversityMode(quizMode)
        ? `正解です。${currentQuestion.name}は${correctText}です。`
      : `正解です。${questionNameText}は${correctText}です。`;
    feedbackEl.className = "feedback correct";
  } else {
    locked = true;
    selectedButton.classList.add("wrong");
    const wrongSelectedCodes = selectedMapCodesForAnswer(selectedPrefecture, quizMode);
    recordMapAnswerResult(quizMode, selectedPrefectures()[0], currentQuestion.codes, false);
    feedbackEl.textContent = quizMode === "diamond"
      ? `残念！このダイヤは${correctText}でした。`
      : quizMode === "map"
        ? `残念！赤色の場所は${correctText}でした。`
      : quizMode === "mapAreaCode"
        ? `残念！青色の地域の市外局番は${correctText}でした。`
      : isLocalPlaceMapMode(quizMode)
        ? `残念！青色の場所は${correctText}でした。`
      : isUniversityMode(quizMode)
        ? `残念！${currentQuestion.name}は${correctText}でした。`
      : `残念！${questionNameText}は${correctText}でした。`;
    feedbackEl.className = "feedback wrong";
    wrongAnswers.push({
      name: currentQuestion.name,
      selected: selectedPrefecture,
      correct: correctText,
      quizMode,
      selectedPrefectureName: selectedPrefectures()[0],
      selectedCodes: wrongSelectedCodes,
      question: {
        name: currentQuestion.name,
        prefectures: [...currentQuestion.prefectures],
        image: currentQuestion.image,
        codes: currentQuestion.codes,
        localPlaceMunicipalityCode: currentQuestion.localPlaceMunicipalityCode
      }
    });
    document.querySelectorAll(".pref-button").forEach((button) => {
      if (currentQuestion.prefectures.includes(button.textContent)) {
        button.classList.add("correct");
      }
    });
  }

  answered += 1;
  setOptionsDisabled(true);
  updateScoreboard();
  nextQuestion({ keepFeedback: true });
}

function startQuestionSet(questions, options = {}) {
  const { isReview = false } = options;
  questionPool = questions;
  score = 0;
  answered = 0;
  wrongAnswers = [];
  mapAnswerResults = [];
  selectedCorrectPrefectures = [];
  reviewMode = isReview;
  resultReviewQuestions = [];
  currentQuestion = null;
  renderOptions();
  showView("quiz");
  nextQuestion();
}

async function startQuiz() {
  startButton.disabled = true;
  retryButton.disabled = true;
  let started = false;
  setupMessageEl.textContent = isLocalPlaceMapMode()
    ? "町丁目データを読み込んでいます。"
    : setupMessageEl.textContent;

  try {
    if (isLocalPlaceMapMode()) {
      await ensureSelectedLocalPlaceDataLoaded();
    }
    const candidates = shuffle(availableQuestions());
    const count = Number(questionCountEl.value);
    optionPrefectures = [...new Set(answerCandidatesForCurrentMode())];
    startQuestionSet(candidates.slice(0, count));
    started = true;
  } catch (error) {
    showView("setup");
    setupMessageEl.textContent = error instanceof Error ? error.message : "町丁目データを読み込めませんでした。";
    setupMessageEl.classList.add("error");
  } finally {
    retryButton.disabled = false;
    if (started) {
      updateQuestionCountOptions();
    } else {
      startButton.disabled = false;
    }
  }
}

function startReview() {
  if (resultReviewQuestions.length === 0) return;
  startQuestionSet(shuffle(resultReviewQuestions), { isReview: true });
}

function appendWrongDetail(item, wrong) {
  const detail = document.createElement("div");
  detail.className = "wrong-detail";

  const name = document.createElement("span");
  name.className = "wrong-name";
  name.textContent = wrong.name;

  const selected = document.createElement("span");
  selected.textContent = `選択: ${wrong.selected}`;

  const correct = document.createElement("span");
  correct.textContent = `正解: ${wrong.correct}`;

  detail.append(name, selected, correct);
  item.appendChild(detail);
}

function appendWrongMapResult(item, wrong) {
  const mapWrap = document.createElement("div");
  mapWrap.className = "wrong-map";
  const selectedCodes = new Set(wrong.selectedCodes ?? []);
  mapWrap.appendChild(createQuestionMapSvg(
    wrong.question,
    wrong.selectedPrefectureName,
    selectedCodes,
    {
      resultMode: true,
      labelSuffix: "の不正解"
    }
  ));

  const legend = document.createElement("div");
  legend.className = "wrong-map-legend";
  legend.innerHTML = `
    <span><b class="legend-correct"></b>正解</span>
    <span><b class="legend-wrong"></b>選択</span>
  `;
  mapWrap.appendChild(legend);
  item.appendChild(mapWrap);
}

function mapResultAnswers() {
  return mapAnswerResults.filter((answer) => (
    (answer.quizMode === "map" || answer.quizMode === "municipalityMap" || answer.quizMode === "mapAreaCode" || isLocalPlaceMapMode(answer.quizMode)) &&
    Array.isArray(answer.correctCodes) &&
    answer.correctCodes.length > 0
  ));
}

function createResultMapSvgForAnswer(answer, mapQuestion, wrongCodes) {
  if (isLocalPlaceMapMode(answer.quizMode)) {
    return createLocalPlaceMapSvg(
      {
        ...mapQuestion,
        localPlaceMunicipalityCode: answer.localPlaceMunicipalityCode
      },
      wrongCodes,
      {
        resultMode: true,
        labelSuffix: "の不正解一覧"
      }
    );
  }

  return createQuestionMapSvg(
    mapQuestion,
    answer.selectedPrefectureName,
    wrongCodes,
    {
      resultMode: true,
      labelSuffix: "の不正解一覧"
    }
  );
}

function renderResultMapSummary(mapAnswers) {
  resultMapSummaryEl.innerHTML = "";
  resultMapSummaryEl.classList.add("hidden");
  if (mapAnswers.length === 0) return;

  const selectedPref = mapAnswers[0].selectedPrefectureName;
  const correctCodes = new Set();
  const wrongCodes = new Set();
  mapAnswers.forEach((answer) => {
    const target = answer.isCorrect ? correctCodes : wrongCodes;
    answer.correctCodes.forEach((code) => target.add(code));
  });

  if (correctCodes.size === 0 && wrongCodes.size === 0) return;

  const mapQuestion = {
    name: "不正解の位置",
    prefectures: [],
    codes: [...correctCodes]
  };

  resultMapSummaryEl.appendChild(createResultMapSvgForAnswer(mapAnswers[0], mapQuestion, wrongCodes));

  const legend = document.createElement("div");
  legend.className = "wrong-map-legend";
  legend.innerHTML = `
    <span><b class="legend-correct"></b>正解した地域</span>
    <span><b class="legend-wrong"></b>不正解の地域</span>
  `;
  resultMapSummaryEl.appendChild(legend);
  resultMapSummaryEl.classList.remove("hidden");
}

function showResult() {
  currentQuestion = null;
  locked = true;
  resultReviewQuestions = reviewMode
    ? questionPool.map((question) => ({
      name: question.name,
      prefectures: [...question.prefectures],
      image: question.image,
      codes: question.codes,
      localPlaceMunicipalityCode: question.localPlaceMunicipalityCode
    }))
    : wrongAnswers.map((wrong) => ({
      name: wrong.question.name,
      prefectures: [...wrong.question.prefectures],
      image: wrong.question.image,
      codes: wrong.question.codes,
      localPlaceMunicipalityCode: wrong.question.localPlaceMunicipalityCode
    }));

  const total = questionPool.length;
  const rate = total === 0 ? 0 : Math.round((score / total) * 1000) / 10;
  resultRateEl.textContent = `${rate}%`;
  resultScoreEl.textContent = `${total}問中${score}問正解`;
  reviewButton.disabled = resultReviewQuestions.length === 0;
  wrongListEl.innerHTML = "";
  renderResultMapSummary(mapResultAnswers());

  if (wrongAnswers.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-result";
    item.textContent = "不正解はありません。";
    wrongListEl.appendChild(item);
  } else {
    wrongAnswers.forEach((wrong) => {
      const item = document.createElement("li");
      if (wrong.question.image) {
        const image = document.createElement("img");
        image.className = "wrong-question-image";
        image.src = wrong.question.image;
        image.alt = "不正解だった横断歩道ダイヤ";
        item.appendChild(image);
        appendWrongDetail(item, wrong);
      } else {
        appendWrongDetail(item, wrong);
      }
      wrongListEl.appendChild(item);
    });
  }

  showView("result");
  updateScoreboard();
}

function backToSetup() {
  showView("setup");
  currentQuestion = null;
  questionPool = [];
  optionPrefectures = [];
  score = 0;
  answered = 0;
  wrongAnswers = [];
  mapAnswerResults = [];
  selectedCorrectPrefectures = [];
  reviewMode = false;
  resultReviewQuestions = [];
  updateScoreboard();
  updateQuestionCountOptions();
}

typeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateQuestionCountOptions);
});

answerFilterEl.addEventListener("input", () => {
  answerFilterEl.value = answerFilterEl.value.replace(/\r?\n/g, "");
  renderOptions();
});

answerFilterEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

quizModeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    renderRegionOptions();
    updateQuestionCountOptions();
  });
});

startButton.addEventListener("click", startQuiz);
backToSetupButton.addEventListener("click", backToSetup);
retryButton.addEventListener("click", startQuiz);
reviewButton.addEventListener("click", startReview);
resultSetupButton.addEventListener("click", backToSetup);

renderRegionOptions();
updateQuestionCountOptions();
updateScoreboard();
