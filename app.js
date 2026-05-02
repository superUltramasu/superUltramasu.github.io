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

function renderRegionOptions() {
  regionOptionsEl.innerHTML = "";
  Object.keys(regions).forEach((regionName, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "region";
    input.value = regionName;
    input.checked = index === 0;
    input.addEventListener("change", updateQuestionCountOptions);
    label.append(input, document.createTextNode(regionName));
    regionOptionsEl.appendChild(label);
  });
}

function selectedRegionNames() {
  return [...document.querySelectorAll('input[name="region"]:checked')]
    .map((checkbox) => checkbox.value);
}

function selectedPrefectures() {
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

function formatPrefectureList(prefectureList) {
  return prefectureList.join("、");
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
  const municipalityMode = quizMode === "municipality";
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
    setupMessageEl.textContent = "地方を1つ以上選んでください。";
  } else if (municipalityMode && typeCount === 0) {
    setupMessageEl.textContent = "市区町村を1つ以上選んでください。";
  } else if (count === 0) {
    setupMessageEl.textContent = "選択条件に合う自治体がありません。条件を変更してください。";
  } else {
    setupMessageEl.textContent = areaCodeMode
      ? "市外局番クイズの条件を選んで開始してください。"
      : quizMode === "diamond"
        ? "横断歩道ダイヤクイズの条件を選んで開始してください。"
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
  municipalityEl.classList.toggle("hidden", quizMode === "diamond");
  questionImageEl.classList.toggle("hidden", quizMode !== "diamond");
  if (quizMode === "diamond") {
    municipalityEl.textContent = "";
    questionImageEl.src = currentQuestion.image;
    questionImageEl.alt = "横断歩道ダイヤ";
  } else {
    municipalityEl.textContent = currentQuestion.name;
    questionImageEl.removeAttribute("src");
    questionImageEl.alt = "";
  }

  quizPromptEl.textContent = quizMode === "areaCode"
    ? "この市外局番が使われている代表地域は？"
    : quizMode === "diamond"
      ? "この横断歩道ダイヤが存在する都道府県は？"
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
  const correctText = formatPrefectureList(currentQuestion.prefectures);

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
    feedbackEl.textContent = currentQuizMode() === "diamond"
      ? `正解です。このダイヤは${correctText}です。`
      : `正解です。${currentQuestion.name}は${correctText}です。`;
    feedbackEl.className = "feedback correct";
  } else {
    locked = true;
    selectedButton.classList.add("wrong");
    feedbackEl.textContent = currentQuizMode() === "diamond"
      ? `残念！このダイヤは${correctText}でした。`
      : `残念！${currentQuestion.name}は${correctText}でした。`;
    feedbackEl.className = "feedback wrong";
    wrongAnswers.push({
      name: currentQuestion.name,
      selected: selectedPrefecture,
      correct: correctText,
      question: {
        name: currentQuestion.name,
        prefectures: [...currentQuestion.prefectures],
        image: currentQuestion.image
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
      image: question.image
    }))
    : wrongAnswers.map((wrong) => ({
      name: wrong.question.name,
      prefectures: [...wrong.question.prefectures],
      image: wrong.question.image
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
  radio.addEventListener("change", updateQuestionCountOptions);
});

startButton.addEventListener("click", startQuiz);
backToSetupButton.addEventListener("click", backToSetup);
retryButton.addEventListener("click", startQuiz);
reviewButton.addEventListener("click", startReview);
resultSetupButton.addEventListener("click", backToSetup);

renderRegionOptions();
updateQuestionCountOptions();
updateScoreboard();
