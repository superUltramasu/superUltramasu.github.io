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
const resultSetupButton = document.querySelector("#resultSetupButton");
const municipalityEl = document.querySelector("#municipality");
const optionsEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const currentNoEl = document.querySelector("#currentNo");
const totalNoEl = document.querySelector("#totalNo");
const nextButton = document.querySelector("#nextButton");
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

function getMunicipalityData() {
  return Array.isArray(window.municipalityData) ? window.municipalityData : [];
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

function availableQuestions() {
  const prefs = selectedPrefectures();
  const types = selectedTypes();
  return getMunicipalityData().filter((item) => (
    prefs.includes(item.prefecture) && types.includes(item.type)
  ));
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
  const canStart = regionCount > 0 && typeCount > 0 && count > 0;
  startButton.disabled = !canStart;
  questionCountEl.disabled = !canStart;

  if (regionCount === 0) {
    setupMessageEl.textContent = "地方を1つ以上選んでください。";
  } else if (typeCount === 0) {
    setupMessageEl.textContent = "市区町村を1つ以上選んでください。";
  } else if (count === 0) {
    setupMessageEl.textContent = "選択条件に合う自治体がありません。条件を変更してください。";
  } else {
    setupMessageEl.textContent = "条件を選んで開始してください。";
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

function setOptionsDisabled(disabled) {
  document.querySelectorAll(".pref-button").forEach((button) => {
    button.disabled = disabled;
  });
}

function prepareForAnswering() {
  nextButton.textContent = "次の問題";
  nextButton.disabled = true;
  setOptionsDisabled(false);
}

function nextQuestion() {
  currentQuestion = questionPool[answered] ?? null;
  locked = false;

  document.querySelectorAll(".pref-button").forEach((button) => {
    button.classList.remove("correct", "wrong");
  });

  if (!currentQuestion) {
    showResult();
    return;
  }

  municipalityEl.textContent = currentQuestion.name;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  prepareForAnswering();
  updateScoreboard();
}

function answer(selectedPrefecture, selectedButton) {
  if (locked || !currentQuestion) return;
  locked = true;
  const correct = selectedPrefecture === currentQuestion.prefecture;

  if (correct) {
    score += 1;
    selectedButton.classList.add("correct");
    feedbackEl.textContent = `正解です。${currentQuestion.name}は${currentQuestion.prefecture}です。`;
    feedbackEl.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    feedbackEl.textContent = `惜しいです。正解は${currentQuestion.prefecture}です。`;
    feedbackEl.classList.add("wrong");
    wrongAnswers.push({
      name: currentQuestion.name,
      selected: selectedPrefecture,
      correct: currentQuestion.prefecture
    });
    document.querySelectorAll(".pref-button").forEach((button) => {
      if (button.textContent === currentQuestion.prefecture) {
        button.classList.add("correct");
      }
    });
  }

  answered += 1;
  setOptionsDisabled(true);
  nextButton.disabled = false;
  nextButton.textContent = answered >= questionPool.length ? "結果を見る" : "次の問題";
  updateScoreboard();
}

function startQuiz() {
  const candidates = shuffle(availableQuestions());
  const count = Number(questionCountEl.value);
  questionPool = candidates.slice(0, count);
  optionPrefectures = selectedPrefectures();
  score = 0;
  answered = 0;
  wrongAnswers = [];
  currentQuestion = null;
  renderOptions();
  showView("quiz");
  nextQuestion();
}

function showResult() {
  currentQuestion = null;
  locked = true;
  const total = questionPool.length;
  const rate = total === 0 ? 0 : Math.round((score / total) * 1000) / 10;
  resultRateEl.textContent = `${rate}%`;
  resultScoreEl.textContent = `${total}問中${score}問正解`;
  wrongListEl.innerHTML = "";

  if (wrongAnswers.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-result";
    item.textContent = "不正解はありません。";
    wrongListEl.appendChild(item);
  } else {
    wrongAnswers.forEach((wrong) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <span class="wrong-name">${wrong.name}</span>
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
  updateScoreboard();
  updateQuestionCountOptions();
}

function handleNextButton() {
  if (answered >= questionPool.length && locked) {
    showResult();
  } else {
    nextQuestion();
  }
}

typeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateQuestionCountOptions);
});

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextButton);
backToSetupButton.addEventListener("click", backToSetup);
retryButton.addEventListener("click", startQuiz);
resultSetupButton.addEventListener("click", backToSetup);

renderRegionOptions();
updateQuestionCountOptions();
updateScoreboard();
