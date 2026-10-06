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

const mapLakeOverlays = [
  { name: "サロマ湖", prefectures: ["北海道"], cx: 574, cy: 75, rx: 8, ry: 3 },
  { name: "網走湖", prefectures: ["北海道"], cx: 566, cy: 84, rx: 3, ry: 3 },
  { name: "屈斜路湖", prefectures: ["北海道"], cx: 557, cy: 91, rx: 4, ry: 4 },
  { name: "摩周湖", prefectures: ["北海道"], cx: 563, cy: 91, rx: 2, ry: 2 },
  { name: "支笏湖", prefectures: ["北海道"], cx: 501, cy: 117, rx: 4, ry: 3 },
  { name: "洞爺湖", prefectures: ["北海道"], cx: 487, cy: 124, rx: 3, ry: 2 },
  { name: "十和田湖", prefectures: ["青森県", "秋田県"], cx: 483, cy: 173, rx: 4, ry: 3 },
  { name: "小川原湖", prefectures: ["青森県"], cx: 493, cy: 157, rx: 2, ry: 6 },
  { name: "猪苗代湖", prefectures: ["福島県"], cx: 474, cy: 267, rx: 6, ry: 3 },
  { name: "中禅寺湖", prefectures: ["栃木県"], cx: 459, cy: 284, rx: 3, ry: 2 },
  {
    name: "霞ヶ浦",
    prefectures: ["茨城県"],
    points: [
      [471, 294], [474, 291], [478, 292], [481, 294], [485, 293], [488, 296],
      [486, 299], [482, 300], [480, 303], [476, 302], [474, 299], [470, 298]
    ]
  },
  {
    name: "北浦",
    prefectures: ["茨城県"],
    points: [
      [486, 288], [489, 290], [490, 294], [490, 298], [489, 302], [488, 306],
      [486, 308], [484, 305], [485, 301], [486, 297], [485, 293]
    ]
  },
  {
    name: "涸沼",
    prefectures: ["茨城県"],
    points: [[469, 302], [471, 301], [474, 302], [475, 304], [472, 305], [469, 304]]
  },
  { name: "河口湖", prefectures: ["山梨県"], cx: 435, cy: 321, rx: 3, ry: 1 },
  { name: "山中湖", prefectures: ["山梨県"], cx: 441, cy: 325, rx: 2, ry: 1 },
  { name: "本栖湖", prefectures: ["山梨県"], cx: 431, cy: 321, rx: 2, ry: 1 },
  { name: "諏訪湖", prefectures: ["長野県"], cx: 421, cy: 310, rx: 3, ry: 2 },
  {
    name: "浜名湖",
    prefectures: ["静岡県"],
    points: [[411, 336], [415, 334], [420, 336], [421, 340], [418, 343], [414, 342], [411, 340]]
  },
  {
    name: "琵琶湖",
    prefectures: ["滋賀県"],
    points: [[374, 307], [379, 311], [381, 318], [379, 327], [377, 337], [372, 333], [370, 323], [371, 314]]
  },
  {
    name: "中海",
    prefectures: ["鳥取県", "島根県"],
    points: [[289, 313], [294, 311], [301, 312], [304, 315], [300, 317], [293, 317], [288, 315]]
  },
  {
    name: "宍道湖",
    prefectures: ["島根県"],
    points: [[278, 314], [284, 312], [292, 313], [295, 315], [291, 318], [283, 318], [277, 316]]
  },
  { name: "池田湖", prefectures: ["鹿児島県"], cx: 220, cy: 439, rx: 3, ry: 2 }
];

const regionOptionsEl = document.querySelector("#regionOptions");
const regionLegendEl = document.querySelector("#regionLegend");
const quizModeRadios = [...document.querySelectorAll('input[name="quizMode"]')];
const shinkansenDirectionRadios = [...document.querySelectorAll('input[name="shinkansenDirection"]')];
const privateQuizOptionsEl = document.querySelector("#privateQuizOptions");
const privatePackInputEl = document.querySelector("#privatePackInput");
const privatePackStatusEl = document.querySelector("#privatePackStatus");
const privatePackMessageEl = document.querySelector("#privatePackMessage");
const removePrivatePackButtonEl = document.querySelector("#removePrivatePackButton");
const municipalityTypeGroupEl = document.querySelector("#municipalityTypeGroup");
const shinkansenDirectionGroupEl = document.querySelector("#shinkansenDirectionGroup");
const questionCountGroupEl = document.querySelector("#questionCountGroup");
const typeCheckboxes = [...document.querySelectorAll('input[name="municipalityType"]')];
const questionCountEl = document.querySelector("#questionCount");
const availableCountEl = document.querySelector("#availableCount");
const setupMessageEl = document.querySelector("#setupMessage");
const setupViewEl = document.querySelector("#setupView");
const quizViewEl = document.querySelector("#quizView");
const standardQuestionAreaEl = document.querySelector("#standardQuestionArea");
const standardOptionsWrapEl = document.querySelector("#standardOptionsWrap");
const shinkansenQuizEl = document.querySelector("#shinkansenQuiz");
const shinkansenQuizTitleEl = document.querySelector("#shinkansenQuizTitle");
const shinkansenDirectionLabelEl = document.querySelector("#shinkansenDirectionLabel");
const shinkansenBoardEl = document.querySelector("#shinkansenBoard");
const shinkansenFeedbackEl = document.querySelector("#shinkansenFeedback");
const shinkansenSubmitButtonEl = document.querySelector("#shinkansenSubmitButton");
const shinkansenRetryButtonEl = document.querySelector("#shinkansenRetryButton");
const resultViewEl = document.querySelector("#resultView");
const startButton = document.querySelector("#startButton");
const backToSetupButton = document.querySelector("#backToSetupButton");
const retryButton = document.querySelector("#retryButton");
const reviewButton = document.querySelector("#reviewButton");
const resultSetupButton = document.querySelector("#resultSetupButton");
const municipalityEl = document.querySelector("#municipality");
const quizPromptEl = document.querySelector("#quizPrompt");
const questionImageEl = document.querySelector("#questionImage");
const questionImagePairEl = document.querySelector("#questionImagePair");
const diamondPairImageEl = document.querySelector("#diamondPairImage");
const tomarePairImageEl = document.querySelector("#tomarePairImage");
const mapQuestionEl = document.querySelector("#mapQuestion");
const answerFilterEl = document.querySelector("#answerFilter");
const answerSubmitButtonEl = document.querySelector("#answerSubmitButton");
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
let pendingPrefectureSelections = [];
let groupedSelectionMode = false;
let activeShinkansenStations = [];
let shinkansenCompleted = false;
let shinkansenBoardColumns = 0;
let reviewMode = false;
let resultReviewQuestions = [];
let localPlaceSettingsPrefecture = null;
let localPlaceSettingsMunicipality = null;
let localPlaceMunicipalityFilter = "";
let localPlaceLoadingPromise = null;
let privateQuizPack = null;

const privatePackDatabaseName = "prefquiz-private-data";
const privatePackStoreName = "packs";
const activePrivatePackKey = "active";

function currentQuizMode() {
  return document.querySelector('input[name="quizMode"]:checked')?.value ?? "municipality";
}

function isShinkansenMode(mode = currentQuizMode()) {
  return mode === "shinkansenStations";
}

function getShinkansenData() {
  return window.shinkansenData && typeof window.shinkansenData === "object"
    ? window.shinkansenData
    : {};
}

function selectedShinkansenDirection() {
  return document.querySelector('input[name="shinkansenDirection"]:checked')?.value ?? "down";
}

function selectedShinkansenRoute() {
  return isShinkansenMode() ? selectedRegionNames()[0] ?? "" : "";
}

function shinkansenStationsForSettings() {
  const stations = getShinkansenData()[selectedShinkansenRoute()] ?? [];
  const normalized = stations.map(([name, reading]) => ({ name, reading }));
  return selectedShinkansenDirection() === "up" ? normalized.reverse() : normalized;
}

function isPrivateQuizMode(mode = currentQuizMode()) {
  return mode.startsWith("private:");
}

function currentPrivateQuiz(mode = currentQuizMode()) {
  if (!isPrivateQuizMode(mode) || !privateQuizPack) return null;
  const quizId = mode.slice("private:".length);
  return privateQuizPack.quizzes.find((quiz) => quiz.id === quizId) ?? null;
}

function getMunicipalityData() {
  return Array.isArray(window.municipalityData) ? window.municipalityData : [];
}

function getAreaCodeData() {
  return Array.isArray(window.areaCodeData) ? window.areaCodeData : [];
}

function openPrivatePackDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(privatePackDatabaseName, 1);
    request.addEventListener("upgradeneeded", () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(privatePackStoreName)) {
        database.createObjectStore(privatePackStoreName);
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error ?? new Error("端末内ストレージを開けませんでした。")));
  });
}

async function privatePackStoreRequest(mode, callback) {
  const database = await openPrivatePackDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(privatePackStoreName, mode);
      const store = transaction.objectStore(privatePackStoreName);
      const request = callback(store);
      let requestResult;
      request.addEventListener("success", () => {
        requestResult = request.result;
      });
      transaction.addEventListener("complete", () => resolve(requestResult));
      transaction.addEventListener("abort", () => reject(transaction.error ?? new Error("端末内ストレージの更新が中止されました。")));
      transaction.addEventListener("error", () => reject(transaction.error ?? new Error("端末内ストレージを更新できませんでした。")));
    });
  } finally {
    database.close();
  }
}

function loadStoredPrivatePack() {
  return privatePackStoreRequest("readonly", (store) => store.get(activePrivatePackKey));
}

function savePrivatePack(pack) {
  return privatePackStoreRequest("readwrite", (store) => store.put(pack, activePrivatePackKey));
}

function deleteStoredPrivatePack() {
  return privatePackStoreRequest("readwrite", (store) => store.delete(activePrivatePackKey));
}

function validatePrivateQuizPack(rawPack) {
  if (!rawPack || typeof rawPack !== "object" || Array.isArray(rawPack)) {
    throw new Error("パックの形式が正しくありません。");
  }
  if (rawPack.format !== "prefquiz-private-pack" || rawPack.version !== 1) {
    throw new Error("対応していないパック形式またはバージョンです。");
  }
  if (typeof rawPack.name !== "string" || !rawPack.name.trim()) {
    throw new Error("パック名が設定されていません。");
  }
  if (!Array.isArray(rawPack.quizzes) || rawPack.quizzes.length === 0 || rawPack.quizzes.length > 50) {
    throw new Error("クイズは1～50件にしてください。");
  }

  const quizIds = new Set();
  const quizzes = rawPack.quizzes.map((quiz, quizIndex) => {
    if (!quiz || typeof quiz !== "object") {
      throw new Error(`${quizIndex + 1}件目のクイズ定義が正しくありません。`);
    }
    const id = String(quiz.id ?? "").trim();
    const title = String(quiz.title ?? "").trim();
    if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(id) || quizIds.has(id)) {
      throw new Error(`クイズID「${id || "未設定"}」が不正または重複しています。`);
    }
    if (!title) throw new Error(`クイズ「${id}」の表示名がありません。`);
    quizIds.add(id);

    const type = quiz.type === "intersection-pair" ? "intersection-pair" : "image";
    if (type === "intersection-pair") {
      const sourceQuizIds = Array.isArray(quiz.sourceQuizIds)
        ? quiz.sourceQuizIds.map((sourceId) => String(sourceId).trim())
        : [];
      if (sourceQuizIds.length !== 2 || sourceQuizIds[0] === sourceQuizIds[1]) {
        throw new Error(`複合クイズ「${title}」のsourceQuizIdsには異なる2つのクイズIDが必要です。`);
      }
      const imageAlts = Array.isArray(quiz.imageAlts) && quiz.imageAlts.length === 2
        ? quiz.imageAlts.map((alt) => String(alt).trim())
        : ["左の問題画像", "右の問題画像"];
      return {
        id,
        type,
        title,
        prompt: String(quiz.prompt ?? "2つの画像に共通する都道府県は？").trim(),
        answerLabel: String(quiz.answerLabel ?? "2つの画像").trim(),
        imageAlts,
        sourceQuizIds
      };
    }

    if (!Array.isArray(quiz.items) || quiz.items.length === 0 || quiz.items.length > 5000) {
      throw new Error(`クイズ「${title}」の問題は1～5000件にしてください。`);
    }

    const items = quiz.items.map((item, itemIndex) => {
      const itemName = String(item?.name ?? `問題 ${itemIndex + 1}`).trim();
      const image = String(item?.image ?? "");
      const answers = Array.isArray(item?.prefectures) ? [...new Set(item.prefectures)] : [];
      if (!/^data:image\/(?:png|jpeg|webp|gif);base64,/i.test(image)) {
        throw new Error(`「${title}」の${itemIndex + 1}問目に、パック内画像がありません。`);
      }
      if (answers.length === 0 || answers.some((prefecture) => !prefectures.includes(prefecture))) {
        throw new Error(`「${title}」の${itemIndex + 1}問目に不正な都道府県があります。`);
      }
      return { name: itemName, image, prefectures: answers };
    });

    return {
      id,
      type,
      title,
      prompt: String(quiz.prompt ?? "この画像に対応する都道府県は？").trim(),
      answerLabel: String(quiz.answerLabel ?? "画像").trim(),
      imageAlt: String(quiz.imageAlt ?? title).trim(),
      items
    };
  });

  const quizzesById = new Map(quizzes.map((quiz) => [quiz.id, quiz]));
  quizzes.filter((quiz) => quiz.type === "intersection-pair").forEach((quiz) => {
    quiz.sourceQuizIds.forEach((sourceId) => {
      const sourceQuiz = quizzesById.get(sourceId);
      if (!sourceQuiz) {
        throw new Error(`複合クイズ「${quiz.title}」の参照先「${sourceId}」がありません。`);
      }
      if (sourceQuiz.type !== "image") {
        throw new Error(`複合クイズ「${quiz.title}」は通常の画像クイズだけを参照できます。`);
      }
    });
  });

  return {
    format: "prefquiz-private-pack",
    version: 1,
    name: rawPack.name.trim(),
    createdAt: typeof rawPack.createdAt === "string" ? rawPack.createdAt : "",
    quizzes
  };
}

function setPrivatePackMessage(message, isError = false) {
  privatePackMessageEl.textContent = message;
  privatePackMessageEl.classList.toggle("error", isError);
}

function updatePrivatePackStatus() {
  privatePackStatusEl.innerHTML = "";
  const badge = document.createElement("span");
  badge.className = `mode-badge${privateQuizPack ? " private" : ""}`;
  badge.textContent = privateQuizPack ? "プライベートモード" : "一般ユーザー";
  const description = document.createTextNode(
    privateQuizPack
      ? `${privateQuizPack.name}（${privateQuizPack.quizzes.length}カテゴリ）をこの端末で利用中です。`
      : "公開クイズのみ利用できます。"
  );
  privatePackStatusEl.append(badge, description);
  removePrivatePackButtonEl.classList.toggle("hidden", !privateQuizPack);
}

function privateQuizModeChanged() {
  renderRegionOptions();
  updateQuestionCountOptions();
}

function renderPrivateQuizOptions() {
  const previouslySelectedMode = currentQuizMode();
  privateQuizOptionsEl.innerHTML = "";
  privateQuizOptionsEl.classList.toggle("hidden", !privateQuizPack);
  if (!privateQuizPack) return;

  let restoredSelection = false;
  privateQuizPack.quizzes.forEach((quiz) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quizMode";
    input.value = `private:${quiz.id}`;
    input.checked = input.value === previouslySelectedMode;
    restoredSelection ||= input.checked;
    input.addEventListener("change", privateQuizModeChanged);
    label.append(input, document.createTextNode(quiz.title));
    privateQuizOptionsEl.appendChild(label);
  });

  if (isPrivateQuizMode(previouslySelectedMode) && !restoredSelection) {
    document.querySelector('input[name="quizMode"][value="municipality"]').checked = true;
  }
}

function activatePrivateQuizPack(pack) {
  privateQuizPack = pack;
  renderPrivateQuizOptions();
  updatePrivatePackStatus();
  renderRegionOptions();
  updateQuestionCountOptions();
}

async function importPrivateQuizPack(file) {
  if (!file) return;
  if (file.size > 150 * 1024 * 1024) {
    throw new Error("パックが150MBを超えています。複数のパックに分けてください。");
  }
  const text = await file.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("パックをJSONとして読み取れませんでした。");
  }
  const pack = validatePrivateQuizPack(parsed);
  await savePrivatePack(pack);
  activatePrivateQuizPack(pack);
  setPrivatePackMessage(`「${pack.name}」をこの端末に保存しました。`);
}

async function removePrivateQuizPack() {
  await deleteStoredPrivatePack();
  if (isPrivateQuizMode()) {
    document.querySelector('input[name="quizMode"][value="municipality"]').checked = true;
  }
  privateQuizPack = null;
  renderPrivateQuizOptions();
  updatePrivatePackStatus();
  renderRegionOptions();
  updateQuestionCountOptions();
  setPrivatePackMessage("この端末からプライベートクイズを削除しました。");
}

function isImagePrefectureMode(mode = currentQuizMode()) {
  return isPrivateQuizMode(mode);
}

function isPrivatePairQuizMode(mode = currentQuizMode()) {
  return currentPrivateQuiz(mode)?.type === "intersection-pair";
}

function isPairImageQuizMode(mode = currentQuizMode()) {
  return isPrivatePairQuizMode(mode);
}

function isSingleImagePrefectureMode(mode = currentQuizMode()) {
  return isPrivateQuizMode(mode) && !isPrivatePairQuizMode(mode);
}

function imageQuizLabel(mode = currentQuizMode()) {
  return currentPrivateQuiz(mode)?.answerLabel ?? "画像";
}

function imageQuizPrompt(mode = currentQuizMode()) {
  return currentPrivateQuiz(mode)?.prompt ?? "この画像に対応する都道府県は？";
}

function usesGroupedPrefectureOptions(mode = currentQuizMode()) {
  return mode === "municipality" || mode === "areaCodePrefecture" || isImagePrefectureMode(mode);
}

function getMapTopology() {
  return window.japanMapTopology ?? null;
}

function getMunicipalityCodeData() {
  return Array.isArray(window.municipalityCodeData) ? window.municipalityCodeData : [];
}

function getPrefectureMapPathOverrides() {
  return window.prefectureMapPathOverrides ?? {};
}

function getMapGeometryIds() {
  const topology = getMapTopology();
  const ids = new Set(topology?.objects?.municipalities?.geometries?.map((geometry) => geometry.id) ?? []);
  Object.values(getPrefectureMapPathOverrides()).forEach((config) => {
    const items = Array.isArray(config) ? config : config?.items;
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (item.code) ids.add(item.code);
    });
  });
  return ids;
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

function localPlaceDisplayName(name) {
  const digitMap = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9 };
  const kanjiNumber = (text) => {
    if (text === "十") return 10;
    if (text.startsWith("十")) return 10 + (digitMap[text.slice(1)] ?? 0);
    if (text.includes("十")) {
      const [tens, ones] = text.split("十");
      return (digitMap[tens] ?? 1) * 10 + (digitMap[ones] ?? 0);
    }
    return digitMap[text] ?? text;
  };
  return name.replace(/([一二三四五六七八九十１２３４５６７８９0-9]+)丁目$/, (_, number) => {
    const normalized = number.replace(/[１２３４５６７８９０]/g, (digit) => String("１２３４５６７８９０".indexOf(digit) + 1).replace("10", "0"));
    return `${/^[一二三四五六七八九十]+$/.test(normalized) ? kanjiNumber(normalized) : normalized}丁目`;
  });
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
  return quizMode === "map" || quizMode === "municipalityMap" || quizMode === "mapAreaCode" || quizMode === "areaCodeMap";
}

function isLocalPlaceMapMode(quizMode = currentQuizMode()) {
  return quizMode === "localPlaceMap" || quizMode === "localPlaceMapClick";
}

function isMapClickMode(quizMode = currentQuizMode()) {
  return quizMode === "municipalityMap" || quizMode === "areaCodeMap" || quizMode === "localPlaceMapClick";
}

function isAreaCodeMapMode(quizMode = currentQuizMode()) {
  return quizMode === "mapAreaCode" || quizMode === "areaCodeMap";
}

function normalizedMapMunicipalityName(name) {
  return name
    .replace(/（[^）]+）/g, "")
    .replace(/ヶ/g, "ケ")
    .replace(/惠/g, "恵");
}

function getAugmentedMunicipalityCodeData() {
  const geometryIds = getMapGeometryIds();
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
  if (isShinkansenMode()) {
    regionLegendEl.textContent = "路線";
    Object.keys(getShinkansenData()).forEach((routeName, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "region";
      input.value = routeName;
      input.checked = index === 0;
      input.addEventListener("change", updateQuestionCountOptions);
      label.append(input, document.createTextNode(routeName));
      regionOptionsEl.appendChild(label);
    });
    return;
  }
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

function matchingAreaCodePrefectures() {
  const prefs = selectedPrefectures();
  const questions = getAreaCodeData()
    .filter((item) => /^0\d{1,2}$/.test(item.code) && item.code !== "011")
    .map((item) => {
      const itemPrefectures = item.prefectures;
      return {
        name: item.code,
        prefectures: prefectures.filter((prefecture) => (
          prefs.includes(prefecture) && itemPrefectures.includes(prefecture)
        ))
      };
    })
    .filter((item) => item.prefectures.length > 0);

  if (prefs.includes("北海道")) {
    questions.unshift({
      name: "011-016",
      prefectures: ["北海道"]
    });
  }

  return questions;
}

function matchingPrivateImageQuestions() {
  const quiz = currentPrivateQuiz();
  if (!quiz) return [];
  const selected = selectedPrefectures();
  if (quiz.type === "intersection-pair") {
    const [leftQuiz, rightQuiz] = quiz.sourceQuizIds.map((quizId) => (
      privateQuizPack.quizzes.find((candidate) => candidate.id === quizId)
    ));
    return leftQuiz.items.flatMap((leftItem) => rightQuiz.items.flatMap((rightItem) => {
      const shared = prefectures.filter((prefecture) => (
        selected.includes(prefecture) &&
        leftItem.prefectures.includes(prefecture) &&
        rightItem.prefectures.includes(prefecture)
      ));
      return shared.length > 0 ? [{
        name: `${leftItem.name} × ${rightItem.name}`,
        image: leftItem.image,
        tomareImage: rightItem.image,
        imageAlts: quiz.imageAlts,
        prefectures: shared
      }] : [];
    }));
  }
  return quiz.items
    .map((item) => ({
      name: item.name,
      image: item.image,
      prefectures: prefectures.filter((prefecture) => (
        selected.includes(prefecture) && item.prefectures.includes(prefecture)
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
  const geometryIds = getMapGeometryIds();
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
  const geometryIds = getMapGeometryIds();

  return getAreaCodeMapData()
    .map((item) => {
      const codes = item.municipalities
        .filter((municipality) => municipality.prefecture === selectedPref)
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
    if (item.resultName) {
      path.dataset.resultName = item.resultName;
    }
    if (item.fillRule) {
      path.setAttribute("fill-rule", item.fillRule);
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

function lakePath(lake) {
  if (Array.isArray(lake.points) && lake.points.length > 2) {
    return lake.points
      .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
      .join(" ") + " Z";
  }

  const { cx, cy, rx, ry } = lake;
  const points = [
    [cx - rx, cy - ry * 0.1],
    [cx - rx * 0.72, cy - ry * 0.82],
    [cx - rx * 0.18, cy - ry],
    [cx + rx * 0.52, cy - ry * 0.68],
    [cx + rx, cy - ry * 0.05],
    [cx + rx * 0.7, cy + ry * 0.72],
    [cx + rx * 0.08, cy + ry],
    [cx - rx * 0.58, cy + ry * 0.62]
  ];
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") + " Z";
}

function mapLakeData() {
  return Array.isArray(window.mapLakeData) && window.mapLakeData.length > 0 ? window.mapLakeData : mapLakeOverlays;
}

function appendLakePaths(parent, selectedPref, options = {}) {
  if (options.showLakes === false) return;
  mapLakeData()
    .filter((lake) => lake.prefectures.includes(selectedPref))
    .forEach((lake) => {
      const lakePaths = Array.isArray(lake.paths) && lake.paths.length > 0 ? lake.paths : [lakePath(lake)];
      lakePaths.forEach((pathData) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("class", "map-lake");
        path.setAttribute("aria-label", lake.name);
        parent.appendChild(path);
      });
    });
}

function createMapSvg(mapItems, targetCodes, selectedPref, labelSuffix = "", selectedCodes = new Set(), options = {}) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", mapBounds(mapItems.map((item) => item.path)));
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${selectedPref}の地図${labelSuffix}`);

  appendMapPaths(svg, mapItems, targetCodes, selectedCodes, options);
  appendLakePaths(svg, selectedPref, options);

  return svg;
}

function createOverrideMapSvg(overrideConfig, mapItems, targetCodes, selectedPref, labelSuffix = "", selectedCodes = new Set(), options = {}) {
  if (!overrideConfig?.svg) return null;
  const parsed = new DOMParser().parseFromString(overrideConfig.svg, "image/svg+xml");
  const svg = parsed.documentElement;
  if (!svg || svg.nodeName.toLowerCase() !== "svg" || svg.querySelector("parsererror")) return null;

  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${selectedPref}の地図${labelSuffix}`);
  svg.classList.add("map-raw-override");

  const itemByCode = new Map(mapItems.map((item) => [item.code, item]));
  svg.querySelectorAll("path").forEach((path) => {
    const code = path.id?.match(/^M(\d{5})$/)?.[1];
    if (!code) return;
    const item = itemByCode.get(code);
    if (item?.path) {
      path.setAttribute("d", item.path);
    }
    path.removeAttribute("fill");
    path.removeAttribute("fill-opacity");
    path.removeAttribute("style");
    path.dataset.code = code;
    if (item?.name) {
      path.dataset.name = item.name;
    }
    if (item?.resultName) {
      path.dataset.resultName = item.resultName;
    }
    path.setAttribute("class", mapPathClass(code, targetCodes, selectedCodes, options.resultMode, options));
    if (item?.fillRule) {
      path.setAttribute("fill-rule", item.fillRule);
    } else {
      path.removeAttribute("fill-rule");
    }
    if (options.clickable && typeof options.onMapAnswer === "function") {
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", item?.name ?? code);
      path.addEventListener("click", () => options.onMapAnswer(code, item?.name, path));
      path.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        options.onMapAnswer(code, item?.name, path);
      });
    } else {
      path.removeAttribute("tabindex");
      path.removeAttribute("role");
      path.removeAttribute("aria-label");
    }
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

function appendInsetMap(parent, section, targetCodes, bounds, selectedCodes = new Set(), options = {}) {
  const inset = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  inset.setAttribute("x", bounds.x);
  inset.setAttribute("y", bounds.y);
  inset.setAttribute("width", bounds.width);
  inset.setAttribute("height", bounds.height);
  inset.setAttribute("viewBox", mapBounds(section.map((item) => item.path)));
  inset.setAttribute("preserveAspectRatio", "xMidYMid meet");

  appendMapPaths(inset, section, targetCodes, selectedCodes, options);
  appendLakePaths(inset, options.selectedPref ?? "", options);

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
    }, selectedCodes, { ...options, selectedPref });
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
  const overrideConfig = getPrefectureMapPathOverrides()[selectedPref];
  const overridePaths = Array.isArray(overrideConfig) ? overrideConfig : overrideConfig?.items;
  const hasOverridePaths = Array.isArray(overridePaths);
  const sourceItems = hasOverridePaths
    ? overridePaths
    : geometries.filter((item) => candidateCodes.has(item.code ?? item.id));
  const mapItems = sourceItems
    .map((item) => {
      const code = item.code ?? item.id;
      return {
        code,
        name: candidateByCode.get(code)?.name,
        path: item.path ?? geometryPath(topology, item),
        fillRule: item.fillRule
      };
    })
    .filter((item) => item.path);
  const mapOptions = hasOverridePaths ? { ...options, showLakes: false } : options;
  if (hasOverridePaths && overrideConfig?.svg) {
    const overrideSvg = createOverrideMapSvg(
      overrideConfig,
      mapItems,
      targetCodes,
      selectedPref,
      options.labelSuffix ?? "",
      selectedCodes,
      mapOptions
    );
    if (overrideSvg) return overrideSvg;
  }

  const sections = hasOverridePaths && overrideConfig?.keepTogether
    ? [mapItems]
    : sectionMapItems(mapItems, selectedPref);
  if (sections.length === 1) {
    return createMapSvg(sections[0], targetCodes, selectedPref, options.labelSuffix ?? "", selectedCodes, mapOptions);
  }

  return createCompositeMapSvg(sections, targetCodes, selectedPref, selectedCodes, mapOptions);
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
      resultName: localPlaceDisplayName(geometry.properties?.name ?? ""),
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

function optionMatchesAnyFilterTerm(option, filterText) {
  return filterText.trim().split(/\s+/).some((term) => optionMatchesFilter(option, term));
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
  if (isPrivateQuizMode()) {
    return matchingPrivateImageQuestions();
  }

  if (currentQuizMode() === "areaCode") {
    return matchingAreaCodes().map((item) => ({
      name: item.code,
      prefectures: item.answers
    }));
  }

  if (currentQuizMode() === "areaCodePrefecture") {
    return matchingAreaCodePrefectures();
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

  if (isAreaCodeMapMode()) {
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
  const areaCodePrefectureMode = quizMode === "areaCodePrefecture";
  const municipalityMode = quizMode === "municipality" || quizMode === "map" || quizMode === "municipalityMap";
  const localPlaceMode = isLocalPlaceMapMode(quizMode);
  const universityMode = isUniversityMode(quizMode);
  const shinkansenMode = isShinkansenMode(quizMode);
  const privateQuiz = currentPrivateQuiz(quizMode);
  const universityLabel = universityCategoryLabel(quizMode);
  const rawCount = shinkansenMode
    ? shinkansenStationsForSettings().length
    : localPlaceMode ? selectedLocalPlaceQuestionCount() : availableQuestions().length;
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
  shinkansenDirectionGroupEl.classList.toggle("hidden", !shinkansenMode);
  questionCountGroupEl.classList.toggle("hidden", shinkansenMode);
  const canStart = regionCount > 0 && (!municipalityMode || typeCount > 0) && count > 0;
  startButton.disabled = !canStart;
  questionCountEl.disabled = !canStart;

  if (regionCount === 0) {
    setupMessageEl.textContent = localPlaceMode
      ? "県を選び、市区町村を1つ選んでください。"
      : isPrefectureMapMode(quizMode)
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
    setupMessageEl.textContent = shinkansenMode
      ? `${selectedShinkansenRoute()}の駅名を${selectedShinkansenDirection() === "down" ? "下り" : "上り"}順で回答します。`
      : privateQuiz
      ? `プライベートクイズ「${privateQuiz.title}」の条件を選んで開始してください。`
      : areaCodeMode
      ? "市外局番クイズの条件を選んで開始してください。"
      : areaCodePrefectureMode
        ? "市外局番から都道府県を当てるクイズの条件を選んで開始してください。"
      : quizMode === "map"
          ? "地図クイズの条件を選んで開始してください。"
        : quizMode === "municipalityMap"
          ? "市区町村名から地図上の位置を当てるクイズの条件を選んで開始してください。"
        : quizMode === "mapAreaCode"
          ? "地図市外局番クイズの条件を選んで開始してください。"
        : quizMode === "areaCodeMap"
          ? "市外局番から地図上の位置を当てるクイズの条件を選んで開始してください。"
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

function createOptionButton(option) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pref-button";
    button.textContent = option;
    if (selectedCorrectPrefectures.includes(option)) {
      button.classList.add("correct");
      button.disabled = true;
    } else if (pendingPrefectureSelections.includes(option)) {
      button.classList.add("selected");
    } else if (locked) {
      button.disabled = true;
    }
    button.setAttribute("aria-pressed", pendingPrefectureSelections.includes(option) ? "true" : "false");
    button.addEventListener("click", () => answer(option, button));
    return button;
}

function selectedOrPendingPrefectures() {
  return new Set([...selectedCorrectPrefectures, ...pendingPrefectureSelections]);
}

function updateGroupedSelectionButtons() {
  optionsEl.querySelectorAll(".pref-button").forEach((button) => {
    const isPending = pendingPrefectureSelections.includes(button.textContent);
    button.classList.toggle("selected", isPending);
    button.setAttribute("aria-pressed", isPending ? "true" : "false");
  });
}

function updateRegionGroupCheckboxes() {
  optionsEl.querySelectorAll(".option-region-group").forEach((group) => {
    const checkbox = group.querySelector(".option-region-checkbox");
    const buttons = [...group.querySelectorAll(".pref-button")];
    const selected = selectedOrPendingPrefectures();
    const selectedCount = buttons.filter((button) => selected.has(button.textContent)).length;
    checkbox.checked = buttons.length > 0 && selectedCount === buttons.length;
    checkbox.indeterminate = selectedCount > 0 && selectedCount < buttons.length;
    checkbox.disabled = locked;
  });
}

function updateAnswerSubmitState() {
  const hasGroupedSelection = selectedCorrectPrefectures.length + pendingPrefectureSelections.length > 0;
  answerSubmitButtonEl.disabled = !currentQuestion || locked || (
    groupedSelectionMode ? !hasGroupedSelection : optionsEl.childElementCount === 0
  );
}

function togglePendingPrefecture(option) {
  if (locked || selectedCorrectPrefectures.includes(option)) return;
  groupedSelectionMode = true;
  if (pendingPrefectureSelections.includes(option)) {
    pendingPrefectureSelections = pendingPrefectureSelections.filter((prefecture) => prefecture !== option);
  } else {
    pendingPrefectureSelections.push(option);
  }
  updateGroupedSelectionButtons();
  updateRegionGroupCheckboxes();
  updateAnswerSubmitState();
}

function setRegionPendingSelection(regionPrefectures, shouldSelect) {
  if (locked) return;
  groupedSelectionMode = true;
  if (shouldSelect) {
    pendingPrefectureSelections = [...new Set([
      ...pendingPrefectureSelections,
      ...regionPrefectures.filter((prefecture) => !selectedCorrectPrefectures.includes(prefecture))
    ])];
  } else {
    pendingPrefectureSelections = pendingPrefectureSelections.filter((prefecture) => !regionPrefectures.includes(prefecture));
  }
  updateGroupedSelectionButtons();
  updateRegionGroupCheckboxes();
  updateAnswerSubmitState();
}

function renderGroupedPrefectureOptions(filteredOptions) {
  Object.entries(regions).forEach(([regionName, regionPrefectures]) => {
    const visiblePrefectures = regionPrefectures.filter((prefecture) => filteredOptions.includes(prefecture));
    if (visiblePrefectures.length === 0) return;

    const group = document.createElement("section");
    group.className = "option-region-group";
    const selector = document.createElement("label");
    selector.className = "option-region-selector";
    const name = document.createElement("strong");
    name.textContent = regionName;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "option-region-checkbox";
    checkbox.setAttribute("aria-label", `${regionName}をまとめて選択`);
    checkbox.addEventListener("change", () => {
      setRegionPendingSelection(visiblePrefectures, checkbox.checked);
    });
    selector.append(name, checkbox);

    const buttonGrid = document.createElement("div");
    buttonGrid.className = "option-region-buttons";
    visiblePrefectures.forEach((prefecture) => buttonGrid.appendChild(createOptionButton(prefecture)));
    group.append(selector, buttonGrid);
    optionsEl.appendChild(group);
  });
  updateRegionGroupCheckboxes();
}

function renderOptions() {
  optionsEl.innerHTML = "";
  const filterText = answerFilterEl.value;
  const filteredOptions = optionPrefectures.filter((option) => optionMatchesAnyFilterTerm(option, filterText));
  optionsEl.classList.toggle("grouped-options", usesGroupedPrefectureOptions());
  if (usesGroupedPrefectureOptions()) {
    renderGroupedPrefectureOptions(filteredOptions);
  } else {
    filteredOptions.forEach((option) => optionsEl.appendChild(createOptionButton(option)));
  }
  updateAnswerSubmitState();
}

function answerCandidatesForCurrentMode() {
  if (currentQuizMode() === "areaCode") {
    const prefs = selectedPrefectures();
    return getAreaCodeData()
      .filter((item) => item.prefectures.some((prefecture) => prefs.includes(prefecture)))
      .flatMap((item) => item.answers);
  }

  if (currentQuizMode() === "areaCodePrefecture") {
    return selectedPrefectures();
  }

  if (isImagePrefectureMode()) {
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
  document.querySelectorAll(".option-region-checkbox").forEach((checkbox) => {
    checkbox.disabled = disabled;
  });
  if (disabled) {
    answerSubmitButtonEl.disabled = true;
  } else {
    updateAnswerSubmitState();
  }
}

function selectedMapCodesForAnswer(selectedAnswer, quizMode) {
  if (quizMode !== "map" && quizMode !== "municipalityMap" && !isAreaCodeMapMode(quizMode) && !isLocalPlaceMapMode(quizMode)) return [];
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

function areaCodesForMapMunicipalityCode(code, prefectureName) {
  const geometryIds = getMapGeometryIds();
  return getAreaCodeMapData()
    .filter((item) => item.municipalities.some((municipality) => (
      municipality.prefecture === prefectureName &&
      mapDisplayCodeForMunicipality(municipality, geometryIds) === code
    )))
    .map((item) => item.areaCode);
}

function areaCodeResultMapLabel(code, municipalityName, prefectureName) {
  const areaCodes = areaCodesForMapMunicipalityCode(code, prefectureName);
  return areaCodes.length > 0
    ? `${areaCodes.join("、")} (${municipalityName ?? code})`
    : (municipalityName ?? code);
}

function recordMapAnswerResult(quizMode, selectedPrefectureName, correctCodes, isCorrect) {
  if (quizMode !== "map" && quizMode !== "municipalityMap" && !isAreaCodeMapMode(quizMode) && !isLocalPlaceMapMode(quizMode)) return;
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
  window.setTimeout(() => {
    nextQuestion({ keepFeedback: true });
  }, 500);
}

function nextQuestion(options = {}) {
  const { keepFeedback = false } = options;
  currentQuestion = questionPool[answered] ?? null;
  locked = false;
  selectedCorrectPrefectures = [];
  pendingPrefectureSelections = [];
  groupedSelectionMode = false;

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
  const mapQuestionMode = quizMode === "map" || quizMode === "municipalityMap" || isAreaCodeMapMode(quizMode) || isLocalPlaceMapMode(quizMode);
  municipalityEl.classList.toggle("hidden", isImagePrefectureMode(quizMode) || (mapQuestionMode && !isMapClickMode(quizMode)));
  questionImageEl.classList.toggle("hidden", !isSingleImagePrefectureMode(quizMode));
  questionImagePairEl.classList.toggle("hidden", !isPairImageQuizMode(quizMode));
  mapQuestionEl.classList.toggle("hidden", !mapQuestionMode);
  optionsWrapEl.classList.toggle("hidden", isMapClickMode(quizMode));
  if (isPairImageQuizMode(quizMode)) {
    municipalityEl.textContent = "";
    questionImageEl.removeAttribute("src");
    diamondPairImageEl.src = currentQuestion.image;
    tomarePairImageEl.src = currentQuestion.tomareImage;
    diamondPairImageEl.alt = currentQuestion.imageAlts?.[0] ?? "左の問題画像";
    tomarePairImageEl.alt = currentQuestion.imageAlts?.[1] ?? "右の問題画像";
    mapQuestionEl.innerHTML = "";
  } else if (isImagePrefectureMode(quizMode)) {
    municipalityEl.textContent = "";
    questionImageEl.src = currentQuestion.image;
    questionImageEl.alt = currentPrivateQuiz(quizMode)?.imageAlt ?? "問題画像";
    diamondPairImageEl.removeAttribute("src");
    tomarePairImageEl.removeAttribute("src");
    mapQuestionEl.innerHTML = "";
  } else if (mapQuestionMode) {
    municipalityEl.textContent = isMapClickMode(quizMode) ? currentQuestion.name : "";
    questionImageEl.removeAttribute("src");
    questionImageEl.alt = "";
    diamondPairImageEl.removeAttribute("src");
    tomarePairImageEl.removeAttribute("src");
    renderMapQuestion(currentQuestion);
  } else {
    municipalityEl.textContent = currentQuestion.name;
    questionImageEl.removeAttribute("src");
    questionImageEl.alt = "";
    diamondPairImageEl.removeAttribute("src");
    tomarePairImageEl.removeAttribute("src");
    mapQuestionEl.innerHTML = "";
  }

  quizPromptEl.textContent = quizMode === "areaCode"
    ? "この市外局番が使われている代表地域は？"
    : quizMode === "areaCodePrefecture"
      ? "この市外局番が使われている都道府県は？"
    : isSingleImagePrefectureMode(quizMode)
      ? imageQuizPrompt(quizMode)
    : isPairImageQuizMode(quizMode)
      ? imageQuizPrompt(quizMode)
      : quizMode === "map"
        ? "赤色で示された市区町村は？"
      : quizMode === "municipalityMap"
        ? "この市区町村は地図上のどこ？"
      : quizMode === "mapAreaCode"
        ? "青色で示された地域の市外局番は？"
      : quizMode === "areaCodeMap"
        ? "この市外局番は地図上のどこ？"
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
  if (usesGroupedPrefectureOptions() && groupedSelectionMode) {
    togglePendingPrefecture(selectedPrefecture);
    return;
  }
  const correct = currentQuestion.prefectures.includes(selectedPrefecture);

  if (correct) {
    selectedCorrectPrefectures.push(selectedPrefecture);
    selectedButton.classList.add("correct");
    selectedButton.disabled = true;

    if (selectedCorrectPrefectures.length < currentQuestion.prefectures.length) {
      feedbackEl.textContent = "";
      feedbackEl.className = "feedback";
      updateRegionGroupCheckboxes();
      updateScoreboard();
      return;
    }
  } else {
    selectedButton.classList.add("wrong");
  }

  finishAnswer([...selectedCorrectPrefectures, ...(correct ? [] : [selectedPrefecture])], correct);
}

function submitVisibleAnswers() {
  if (locked || !currentQuestion) return;
  const visibleButtons = [...optionsEl.querySelectorAll(".pref-button")];
  const submittedOptions = groupedSelectionMode
    ? pendingPrefectureSelections
    : visibleButtons.map((button) => button.textContent);
  if (submittedOptions.length === 0 && selectedCorrectPrefectures.length === 0) return;
  const selectedAnswers = [...new Set([...selectedCorrectPrefectures, ...submittedOptions])];
  const correct = selectedAnswers.length === currentQuestion.prefectures.length &&
    selectedAnswers.every((answer) => currentQuestion.prefectures.includes(answer));
  optionsEl.querySelectorAll(".pref-button").forEach((button) => {
    if (!selectedAnswers.includes(button.textContent)) return;
    button.classList.remove("selected");
    button.classList.add(currentQuestion.prefectures.includes(button.textContent) ? "correct" : "wrong");
  });
  finishAnswer(selectedAnswers, correct);
}

function finishAnswer(selectedAnswers, correct) {
  locked = true;
  const quizMode = currentQuizMode();
  const correctText = quizMode === "map" || quizMode === "areaCode" || isUniversityMode(quizMode) || isLocalPlaceMapMode(quizMode)
    ? formatAnswerListForFeedback(currentQuestion.prefectures)
    : formatPrefectureList(currentQuestion.prefectures);
  const questionNameText = formatRegionNameForFeedback(currentQuestion.name);

  if (correct) {
    score += 1;
    recordMapAnswerResult(quizMode, selectedPrefectures()[0], currentQuestion.codes, true);
    feedbackEl.textContent = isPairImageQuizMode(quizMode)
      ? `正解です。両方に共通するのは${correctText}です。`
      : isImagePrefectureMode(quizMode)
      ? `正解です。この${imageQuizLabel(quizMode)}は${correctText}です。`
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
    const wrongSelectedCodes = [...new Set(selectedAnswers.flatMap((answer) => selectedMapCodesForAnswer(answer, quizMode)))];
    recordMapAnswerResult(quizMode, selectedPrefectures()[0], currentQuestion.codes, false);
    feedbackEl.textContent = isPairImageQuizMode(quizMode)
      ? `残念！両方に共通するのは${correctText}でした。`
      : isImagePrefectureMode(quizMode)
      ? `残念！この${imageQuizLabel(quizMode)}は${correctText}でした。`
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
      selected: selectedAnswers.join("、"),
      correct: correctText,
      quizMode,
      selectedPrefectureName: selectedPrefectures()[0],
      selectedCodes: wrongSelectedCodes,
      question: {
        name: currentQuestion.name,
        prefectures: [...currentQuestion.prefectures],
        image: currentQuestion.image,
        tomareImage: currentQuestion.tomareImage,
        imageAlts: currentQuestion.imageAlts,
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

function normalizedStationAnswer(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .replace(/[\s　]+/g, "")
    .replace(/駅$/, "")
    .replace(/[ァ-ヶ]/g, (character) => String.fromCharCode(character.charCodeAt(0) - 0x60))
    .toLowerCase();
}

function stationAnswerIsCorrect(value, station) {
  const normalized = normalizedStationAnswer(value);
  return normalized.length > 0 && [station.name, station.reading]
    .some((answer) => normalizedStationAnswer(answer) === normalized);
}

function shinkansenColumnCount() {
  return window.matchMedia("(max-width: 700px)").matches ? 2 : 4;
}

function updateShinkansenProgress() {
  if (shinkansenCompleted) return;
  const filled = [...shinkansenBoardEl.querySelectorAll(".station-input")]
    .filter((input) => normalizedStationAnswer(input.value).length > 0)
    .length;
  scoreEl.textContent = "0";
  currentNoEl.textContent = String(filled);
  totalNoEl.textContent = String(activeShinkansenStations.length);
}

function createFlowArrow(direction, gridColumn) {
  const arrow = document.createElement("div");
  arrow.className = `station-flow-arrow ${direction}`;
  arrow.style.gridColumn = String(gridColumn);
  arrow.style.gridRow = "1";
  arrow.setAttribute("aria-hidden", "true");
  return arrow;
}

function renderShinkansenBoard() {
  const previousValues = new Map(
    [...shinkansenBoardEl.querySelectorAll(".station-input")]
      .map((input) => [Number(input.dataset.stationIndex), input.value])
  );
  const columns = shinkansenColumnCount();
  shinkansenBoardColumns = columns;
  shinkansenBoardEl.innerHTML = "";

  for (let rowStart = 0, rowIndex = 0; rowStart < activeShinkansenStations.length; rowStart += columns, rowIndex += 1) {
    const rowStations = activeShinkansenStations.slice(rowStart, rowStart + columns);
    const reverse = rowIndex % 2 === 1;
    const row = document.createElement("div");
    row.className = `shinkansen-row${reverse ? " reverse" : ""}`;
    row.style.gridTemplateColumns = Array.from({ length: columns }, (_, index) => (
      index < columns - 1 ? "minmax(0, 1fr) 42px" : "minmax(0, 1fr)"
    )).join(" ");

    rowStations.forEach((station, offset) => {
      const stationIndex = rowStart + offset;
      const visualColumn = reverse ? columns - offset : offset + 1;
      const card = document.createElement("div");
      card.className = "station-answer-card";
      card.style.gridColumn = String(visualColumn * 2 - 1);
      card.style.gridRow = "1";
      card.dataset.stationIndex = String(stationIndex);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "station-input";
      input.dataset.stationIndex = String(stationIndex);
      input.value = previousValues.get(stationIndex) ?? "";
      input.placeholder = "駅名";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.setAttribute("aria-label", `${stationIndex + 1}番目の駅名`);
      input.addEventListener("input", updateShinkansenProgress);
      input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        shinkansenBoardEl.querySelector(`.station-input[data-station-index="${stationIndex + 1}"]`)?.focus();
      });
      card.appendChild(input);
      row.appendChild(card);

      if (offset < rowStations.length - 1) {
        const nextVisualColumn = reverse ? visualColumn - 1 : visualColumn + 1;
        row.appendChild(createFlowArrow(reverse ? "left" : "right", Math.min(visualColumn, nextVisualColumn) * 2));
      }
    });

    if (rowStart + rowStations.length < activeShinkansenStations.length) {
      const turn = document.createElement("div");
      turn.className = `station-row-turn ${reverse ? "left" : "right"}`;
      const finalOffset = rowStations.length - 1;
      const finalVisualColumn = reverse ? columns - finalOffset : finalOffset + 1;
      turn.style.gridColumn = String(finalVisualColumn * 2 - 1);
      turn.setAttribute("aria-hidden", "true");
      row.appendChild(turn);
      row.classList.add("has-turn");
    }

    shinkansenBoardEl.appendChild(row);
  }
  updateShinkansenProgress();
}

function startShinkansenQuiz() {
  activeShinkansenStations = shinkansenStationsForSettings();
  shinkansenCompleted = false;
  score = 0;
  answered = 0;
  currentQuestion = null;
  questionPool = [];
  standardQuestionAreaEl.classList.add("hidden");
  standardOptionsWrapEl.classList.add("hidden");
  shinkansenQuizEl.classList.remove("hidden");
  shinkansenQuizTitleEl.textContent = `${selectedShinkansenRoute()} 駅名クイズ`;
  shinkansenDirectionLabelEl.textContent = selectedShinkansenDirection() === "down" ? "下り" : "上り";
  shinkansenFeedbackEl.textContent = "";
  shinkansenFeedbackEl.className = "feedback";
  shinkansenSubmitButtonEl.classList.remove("hidden");
  shinkansenRetryButtonEl.classList.add("hidden");
  shinkansenBoardEl.innerHTML = "";
  renderShinkansenBoard();
  showView("quiz");
  shinkansenBoardEl.querySelector(".station-input")?.focus();
}

function submitShinkansenAnswers() {
  if (shinkansenCompleted || activeShinkansenStations.length === 0) return;
  shinkansenCompleted = true;
  let correctCount = 0;

  activeShinkansenStations.forEach((station, stationIndex) => {
    const card = shinkansenBoardEl.querySelector(`.station-answer-card[data-station-index="${stationIndex}"]`);
    const input = card?.querySelector(".station-input");
    if (!card || !input) return;
    const entered = input.value.trim();
    const correct = stationAnswerIsCorrect(entered, station);
    card.classList.add(correct ? "correct" : "wrong");
    input.disabled = true;

    if (correct) {
      correctCount += 1;
      input.value = station.name;
      return;
    }

    if (!entered) input.classList.add("unanswered");
    const answer = document.createElement("strong");
    answer.className = "station-correct-answer";
    answer.textContent = station.name;
    card.appendChild(answer);
  });

  score = correctCount;
  answered = activeShinkansenStations.length;
  scoreEl.textContent = String(correctCount);
  currentNoEl.textContent = String(activeShinkansenStations.length);
  totalNoEl.textContent = String(activeShinkansenStations.length);
  shinkansenFeedbackEl.textContent = `${activeShinkansenStations.length}駅中${correctCount}駅正解です。`;
  shinkansenFeedbackEl.className = `feedback ${correctCount === activeShinkansenStations.length ? "correct" : "wrong"}`;
  shinkansenSubmitButtonEl.classList.add("hidden");
  shinkansenRetryButtonEl.classList.remove("hidden");
}

function showStandardQuizLayout() {
  standardQuestionAreaEl.classList.remove("hidden");
  standardOptionsWrapEl.classList.remove("hidden");
  shinkansenQuizEl.classList.add("hidden");
}

function startQuestionSet(questions, options = {}) {
  const { isReview = false } = options;
  questionPool = questions;
  score = 0;
  answered = 0;
  wrongAnswers = [];
  mapAnswerResults = [];
  selectedCorrectPrefectures = [];
  pendingPrefectureSelections = [];
  groupedSelectionMode = false;
  reviewMode = isReview;
  resultReviewQuestions = [];
  currentQuestion = null;
  showStandardQuizLayout();
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
    if (isShinkansenMode()) {
      startShinkansenQuiz();
      started = true;
      return;
    }
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

function resultMapSelectionOptions(answer) {
  if (isAreaCodeMapMode(answer.quizMode)) {
    return {
      labelForPath: (path) => areaCodeResultMapLabel(path.dataset.code, path.dataset.name, answer.selectedPrefectureName)
    };
  }
  if (isLocalPlaceMapMode(answer.quizMode)) {
    return {
      labelForPath: (path) => path.dataset.resultName ?? path.dataset.name ?? path.dataset.code
    };
  }
  return {};
}

function appendWrongMapResult(item, wrong) {
  const mapWrap = document.createElement("div");
  mapWrap.className = "wrong-map";
  const selectedCodes = new Set(wrong.selectedCodes ?? []);
  const svg = createQuestionMapSvg(
    wrong.question,
    wrong.selectedPrefectureName,
    selectedCodes,
    {
      resultMode: true,
      labelSuffix: "の不正解"
    }
  );
  mapWrap.appendChild(svg);
  appendResultMapSelection(mapWrap, svg, resultMapSelectionOptions(wrong));

  const legend = document.createElement("div");
  legend.className = "wrong-map-legend";
  legend.innerHTML = `
    <span><b class="legend-correct"></b>正解</span>
    <span><b class="legend-wrong"></b>選択</span>
  `;
  mapWrap.appendChild(legend);
  item.appendChild(mapWrap);
}

function appendResultMapSelection(container, svg, options = {}) {
  const display = document.createElement("div");
  display.className = "result-map-selection";
  display.textContent = "地図上のエリアをクリックすると名前を表示します。";

  let selectedPath = null;
  svg.querySelectorAll("path[data-code]").forEach((path) => {
    const label = options.labelForPath?.(path) ?? path.dataset.resultName ?? path.dataset.name ?? path.dataset.code;
    path.classList.add("map-result-selectable");
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", label);

    const selectPath = () => {
      if (selectedPath && selectedPath !== path) {
        selectedPath.classList.remove("map-result-selected");
      }
      selectedPath = path;
      selectedPath.classList.add("map-result-selected");
      display.textContent = `選択した場所: ${label}`;
    };

    path.addEventListener("click", selectPath);
    path.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectPath();
    });
  });

  container.appendChild(display);
}

function mapResultAnswers() {
  return mapAnswerResults.filter((answer) => (
    (answer.quizMode === "map" || answer.quizMode === "municipalityMap" || isAreaCodeMapMode(answer.quizMode) || isLocalPlaceMapMode(answer.quizMode)) &&
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

  const svg = createResultMapSvgForAnswer(mapAnswers[0], mapQuestion, wrongCodes);
  resultMapSummaryEl.appendChild(svg);
  appendResultMapSelection(resultMapSummaryEl, svg, resultMapSelectionOptions(mapAnswers[0]));

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
      tomareImage: question.tomareImage,
      imageAlts: question.imageAlts,
      codes: question.codes,
      localPlaceMunicipalityCode: question.localPlaceMunicipalityCode
    }))
    : wrongAnswers.map((wrong) => ({
      name: wrong.question.name,
      prefectures: [...wrong.question.prefectures],
      image: wrong.question.image,
      tomareImage: wrong.question.tomareImage,
      imageAlts: wrong.question.imageAlts,
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
        const images = wrong.question.tomareImage
          ? [
            { src: wrong.question.image, alt: `不正解だった${wrong.question.imageAlts?.[0] ?? "左の問題画像"}` },
            { src: wrong.question.tomareImage, alt: `不正解だった${wrong.question.imageAlts?.[1] ?? "右の問題画像"}` }
          ]
          : [{
            src: wrong.question.image,
            alt: `不正解だった${currentPrivateQuiz(wrong.quizMode)?.imageAlt ?? "問題画像"}`
          }];
        const imageContainer = wrong.question.tomareImage ? document.createElement("div") : item;
        if (wrong.question.tomareImage) imageContainer.className = "wrong-question-image-pair";
        images.forEach(({ src, alt }) => {
          const image = document.createElement("img");
          image.className = "wrong-question-image";
          image.src = src;
          image.alt = alt;
          imageContainer.appendChild(image);
        });
        if (imageContainer !== item) item.appendChild(imageContainer);
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
  showStandardQuizLayout();
  currentQuestion = null;
  questionPool = [];
  optionPrefectures = [];
  score = 0;
  answered = 0;
  wrongAnswers = [];
  mapAnswerResults = [];
  selectedCorrectPrefectures = [];
  pendingPrefectureSelections = [];
  groupedSelectionMode = false;
  activeShinkansenStations = [];
  shinkansenCompleted = false;
  reviewMode = false;
  resultReviewQuestions = [];
  updateScoreboard();
  updateQuestionCountOptions();
}

typeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateQuestionCountOptions);
});

shinkansenDirectionRadios.forEach((radio) => {
  radio.addEventListener("change", updateQuestionCountOptions);
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

answerSubmitButtonEl.addEventListener("click", submitVisibleAnswers);
shinkansenSubmitButtonEl.addEventListener("click", submitShinkansenAnswers);
shinkansenRetryButtonEl.addEventListener("click", startShinkansenQuiz);

window.addEventListener("resize", () => {
  if (!isShinkansenMode() || shinkansenCompleted || shinkansenQuizEl.classList.contains("hidden")) return;
  if (shinkansenColumnCount() !== shinkansenBoardColumns) renderShinkansenBoard();
});

quizModeRadios.forEach((radio) => {
  radio.addEventListener("change", privateQuizModeChanged);
});

privatePackInputEl.addEventListener("change", async () => {
  const [file] = privatePackInputEl.files ?? [];
  setPrivatePackMessage(file ? "パックを確認しています。" : "");
  try {
    await importPrivateQuizPack(file);
  } catch (error) {
    setPrivatePackMessage(error instanceof Error ? error.message : "パックを読み込めませんでした。", true);
  } finally {
    privatePackInputEl.value = "";
  }
});

removePrivatePackButtonEl.addEventListener("click", async () => {
  removePrivatePackButtonEl.disabled = true;
  try {
    await removePrivateQuizPack();
  } catch (error) {
    setPrivatePackMessage(error instanceof Error ? error.message : "パックを削除できませんでした。", true);
  } finally {
    removePrivatePackButtonEl.disabled = false;
  }
});

startButton.addEventListener("click", startQuiz);
backToSetupButton.addEventListener("click", backToSetup);
retryButton.addEventListener("click", startQuiz);
reviewButton.addEventListener("click", startReview);
resultSetupButton.addEventListener("click", backToSetup);

async function initializeApp() {
  updatePrivatePackStatus();
  renderPrivateQuizOptions();
  renderRegionOptions();
  updateQuestionCountOptions();
  updateScoreboard();

  try {
    const storedPack = await loadStoredPrivatePack();
    if (!storedPack) return;
    activatePrivateQuizPack(validatePrivateQuizPack(storedPack));
    setPrivatePackMessage("この端末に保存されたパックを読み込みました。");
  } catch (error) {
    setPrivatePackMessage(
      error instanceof Error ? `保存済みパックを読み込めませんでした: ${error.message}` : "保存済みパックを読み込めませんでした。",
      true
    );
  }
}

initializeApp();
