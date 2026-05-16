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
const optionsEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const currentNoEl = document.querySelector("#currentNo");
const totalNoEl = document.querySelector("#totalNo");
const resultRateEl = document.querySelector("#resultRate");
const resultScoreEl = document.querySelector("#resultScore");
const wrongListEl = document.querySelector("#wrongList");

let questionPool = [];
let currentQuestion = null;
let optionPrefectures = [];
let score = 0;
let answered = 0;
let locked = false;
let wrongAnswers = [];
let selectedCorrectPrefectures = [];
let reviewMode = false;
let resultReviewQuestions = [];

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
  const mapMode = currentQuizMode() === "map" || currentQuizMode() === "mapAreaCode";
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

function selectedRegionNames() {
  return [...document.querySelectorAll('input[name="region"]:checked')]
    .map((checkbox) => checkbox.value);
}

function selectedPrefectures() {
  if (currentQuizMode() === "map" || currentQuizMode() === "mapAreaCode") {
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
  return getMunicipalityCodeData().filter((item) => (
    item.prefecture === selectedPref && types.includes(item.type) && geometryIds.has(item.code)
  ));
}

function matchingMapAreaCodes() {
  const selectedPref = selectedPrefectures()[0];
  const types = selectedTypes();
  const topology = getMapTopology();
  const geometryIds = new Set(topology?.objects?.municipalities?.geometries?.map((geometry) => geometry.id) ?? []);

  return getAreaCodeMapData()
    .map((item) => ({
      name: item.areaCode,
      prefectures: [item.areaCode],
      codes: item.municipalities
        .filter((municipality) => (
          municipality.prefecture === selectedPref &&
          types.includes(municipality.type) &&
          geometryIds.has(municipality.code)
        ))
        .map((municipality) => municipality.code)
    }))
    .filter((item) => item.codes.length > 0);
}

function decodedArc(topology, arcIndex) {
  const reverse = arcIndex < 0;
  const arc = topology.arcs[reverse ? ~arcIndex : arcIndex];
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
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") + "Z";
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

function createMapSvg(mapItems, targetCodes, selectedPref, labelSuffix = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", mapBounds(mapItems.map((item) => item.path)));
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${selectedPref}の地図${labelSuffix}`);

  mapItems.forEach((item) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", item.path);
    path.setAttribute("class", targetCodes.has(item.code) ? "map-target" : "map-area");
    svg.appendChild(path);
  });

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

function appendInsetMap(parent, section, targetCodes, bounds) {
  const inset = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  inset.setAttribute("x", bounds.x);
  inset.setAttribute("y", bounds.y);
  inset.setAttribute("width", bounds.width);
  inset.setAttribute("height", bounds.height);
  inset.setAttribute("viewBox", mapBounds(section.map((item) => item.path)));
  inset.setAttribute("preserveAspectRatio", "xMidYMid meet");

  section.forEach((item) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", item.path);
    path.setAttribute("class", targetCodes.has(item.code) ? "map-target" : "map-area");
    inset.appendChild(path);
  });

  parent.appendChild(inset);
}

function createCompositeMapSvg(sections, targetCodes, selectedPref) {
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
    });
  });

  return svg;
}

function renderMapQuestion(question) {
  const topology = getMapTopology();
  const geometries = topology?.objects?.municipalities?.geometries ?? [];
  const selectedPref = selectedPrefectures()[0];
  const candidates = getMunicipalityCodeData().filter((item) => item.prefecture === selectedPref);
  const candidateCodes = new Set(candidates.map((item) => item.code));
  const targetCodes = new Set(question.codes);
  question.codes.forEach((code) => candidateCodes.add(code));
  const mapItems = geometries
    .filter((geometry) => candidateCodes.has(geometry.id))
    .map((geometry) => ({
      code: geometry.id,
      path: geometryPath(topology, geometry)
    }))
    .filter((item) => item.path);

  mapQuestionEl.innerHTML = "";
  const sections = sectionMapItems(mapItems, selectedPref);
  if (sections.length === 1) {
    mapQuestionEl.appendChild(createMapSvg(sections[0], targetCodes, selectedPref));
    return;
  }

  mapQuestionEl.appendChild(createCompositeMapSvg(sections, targetCodes, selectedPref));
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

  if (currentQuizMode() === "mapAreaCode") {
    return matchingMapAreaCodes();
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
  const municipalityMode = quizMode === "municipality" || quizMode === "map" || quizMode === "mapAreaCode";
  const universityMode = isUniversityMode(quizMode);
  const universityLabel = universityCategoryLabel(quizMode);
  const count = availableQuestions().length;
  const choices = questionCountChoices(count);
  questionCountEl.innerHTML = "";

  choices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = String(choice);
    option.textContent = choice === count ? `${choice}問（全問）` : `${choice}問`;
    questionCountEl.appendChild(option);
  });

  if (choices.includes(previousValue)) {
    questionCountEl.value = String(previousValue);
  } else if (count > 0) {
    questionCountEl.value = String(count);
  }

  availableCountEl.textContent = `出題可能: ${count}問`;
  municipalityTypeGroupEl.classList.toggle("hidden", !municipalityMode);
  const canStart = regionCount > 0 && (!municipalityMode || typeCount > 0) && count > 0;
  startButton.disabled = !canStart;
  questionCountEl.disabled = !canStart;

  if (regionCount === 0) {
    setupMessageEl.textContent = quizMode === "map" || quizMode === "mapAreaCode"
      ? "県を1つ選んでください。"
      : "地方を1つ以上選んでください。";
  } else if (municipalityMode && typeCount === 0) {
    setupMessageEl.textContent = "市区町村を1つ以上選んでください。";
  } else if (count === 0) {
    setupMessageEl.textContent = universityMode
      ? `選択条件に合う${universityLabel}がありません。条件を変更してください。`
      : "選択条件に合う自治体がありません。条件を変更してください。";
  } else {
    setupMessageEl.textContent = areaCodeMode
      ? "市外局番クイズの条件を選んで開始してください。"
      : quizMode === "diamond"
        ? "横断歩道ダイヤクイズの条件を選んで開始してください。"
        : quizMode === "map"
          ? "地図クイズの条件を選んで開始してください。"
        : quizMode === "mapAreaCode"
          ? "地図市外局番クイズの条件を選んで開始してください。"
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
  optionPrefectures.forEach((prefecture) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pref-button";
    button.textContent = prefecture;
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

  if (currentQuizMode() === "mapAreaCode") {
    return matchingMapAreaCodes().map((item) => item.name);
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

  const quizMode = currentQuizMode();
  municipalityEl.classList.toggle("hidden", quizMode === "diamond" || quizMode === "map" || quizMode === "mapAreaCode");
  questionImageEl.classList.toggle("hidden", quizMode !== "diamond");
  mapQuestionEl.classList.toggle("hidden", quizMode !== "map" && quizMode !== "mapAreaCode");
  if (quizMode === "diamond") {
    municipalityEl.textContent = "";
    questionImageEl.src = currentQuestion.image;
    questionImageEl.alt = "横断歩道ダイヤ";
    mapQuestionEl.innerHTML = "";
  } else if (quizMode === "map" || quizMode === "mapAreaCode") {
    municipalityEl.textContent = "";
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
      : quizMode === "mapAreaCode"
        ? "青色で示された地域の市外局番は？"
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
  const correctText = quizMode === "map" || quizMode === "areaCode" || isUniversityMode(quizMode)
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
    feedbackEl.textContent = quizMode === "diamond"
      ? `正解です。このダイヤは${correctText}です。`
      : quizMode === "map"
        ? `正解です。赤色の場所は${correctText}です。`
      : quizMode === "mapAreaCode"
        ? `正解です。青色の地域の市外局番は${correctText}です。`
      : isUniversityMode(quizMode)
        ? `正解です。${currentQuestion.name}は${correctText}です。`
      : `正解です。${questionNameText}は${correctText}です。`;
    feedbackEl.className = "feedback correct";
  } else {
    locked = true;
    selectedButton.classList.add("wrong");
    feedbackEl.textContent = quizMode === "diamond"
      ? `残念！このダイヤは${correctText}でした。`
      : quizMode === "map"
        ? `残念！赤色の場所は${correctText}でした。`
      : quizMode === "mapAreaCode"
        ? `残念！青色の地域の市外局番は${correctText}でした。`
      : isUniversityMode(quizMode)
        ? `残念！${currentQuestion.name}は${correctText}でした。`
      : `残念！${questionNameText}は${correctText}でした。`;
    feedbackEl.className = "feedback wrong";
    wrongAnswers.push({
      name: currentQuestion.name,
      selected: selectedPrefecture,
      correct: correctText,
      question: {
        name: currentQuestion.name,
        prefectures: [...currentQuestion.prefectures],
        image: currentQuestion.image,
        codes: currentQuestion.codes
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
  selectedCorrectPrefectures = [];
  reviewMode = isReview;
  resultReviewQuestions = [];
  currentQuestion = null;
  renderOptions();
  showView("quiz");
  nextQuestion();
}

function startQuiz() {
  const candidates = shuffle(availableQuestions());
  const count = Number(questionCountEl.value);
  optionPrefectures = [...new Set(answerCandidatesForCurrentMode())];
  startQuestionSet(candidates.slice(0, count));
}

function startReview() {
  if (resultReviewQuestions.length === 0) return;
  startQuestionSet(shuffle(resultReviewQuestions), { isReview: true });
}

function showResult() {
  currentQuestion = null;
  locked = true;
  resultReviewQuestions = reviewMode
    ? questionPool.map((question) => ({
      name: question.name,
      prefectures: [...question.prefectures],
      image: question.image,
      codes: question.codes
    }))
    : wrongAnswers.map((wrong) => ({
      name: wrong.question.name,
      prefectures: [...wrong.question.prefectures],
      image: wrong.question.image,
      codes: wrong.question.codes
    }));

  const total = questionPool.length;
  const rate = total === 0 ? 0 : Math.round((score / total) * 1000) / 10;
  resultRateEl.textContent = `${rate}%`;
  resultScoreEl.textContent = `${total}問中${score}問正解`;
  reviewButton.disabled = resultReviewQuestions.length === 0;
  wrongListEl.innerHTML = "";

  if (wrongAnswers.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-result";
    item.textContent = "不正解はありません。";
    wrongListEl.appendChild(item);
  } else {
    wrongAnswers.forEach((wrong) => {
      const item = document.createElement("li");
      const questionLabel = wrong.question.image
        ? `<img class="wrong-question-image" src="${wrong.question.image}" alt="不正解だった横断歩道ダイヤ">`
        : `<span class="wrong-name">${wrong.name}</span>`;
      item.innerHTML = `
        ${questionLabel}
        <span>選択: ${wrong.selected}</span>
        <span>正解: ${wrong.correct}</span>
      `;
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
  selectedCorrectPrefectures = [];
  reviewMode = false;
  resultReviewQuestions = [];
  updateScoreboard();
  updateQuestionCountOptions();
}

typeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateQuestionCountOptions);
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
