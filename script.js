// ========== WORD LISTS  ==========
const primaryWords = [
  "apple","school","friend","happy","water","house","flower","animal","family","teacher",
  "garden","window","summer","brother","sister","yellow","orange","purple","castle","dragon",
  "about","after","again","air","all","am","and","animal","another","answer","any","are",
  "as","ask","at","away","back","ball","be","because","bed","been","before","big","bird",
  "black","blue","boat","book","both","box","boy","bring","brother","brown","but","by",
  "call","came","can","car","cat","come","could","cow","day","did","do","dog","down",
  "each","eat","egg","end","even","every","eye","face","fall","far","farm","fast","father",
  "feet","find","first","fish","five","fly","for","four","from","full","fun","get","girl",
  "give","go","good","got","green","grow","had","hand","has","have","he","head","help",
  "her","here","high","him","his","home","hot","house","how","I","if","in","into","is",
  "it","its","jump","just","keep","kind","know","land","large","last","left","leg","let",
  "letter","light","like","line","little","live","long","look","made","make","man","many",
  "may","me","men","might","mile","milk","more","morning","most","mother","move","much",
  "must","my","name","near","need","never","new","next","night","no","not","now","number",
  "of","off","old","on","once","one","only","open","or","other","our","out","over","own",
  "page","paper","part","people","picture","place","play","point","put","rain","ran","read",
  "red","right","round","run","said","same","saw","say","school","sea","see","seem","she",
  "ship","show","side","small","so","some","soon","sound","spell","start","still","stop",
  "story","sun","take","tell","than","that","the","their","them","then","there","these",
  "they","thing","think","this","those","three","through","time","to","too","top","tree",
  "two","under","up","us","use","very","walk","want","was","watch","water","way","we",
  "well","went","were","what","when","where","which","while","white","who","why","will",
  "with","word","work","world","would","write","year","you","your"
];

const secondaryWords = [
  "necessary","accommodation","definitely","separate","embarrass","occurrence","recommend",
  "conscience","privilege","rhythm","weird","guarantee","foreign","knowledge","queue",
  "receipt","successful","temperature","unfortunately","vocabulary","accommodate","accompany",
  "according","achieve","aggressive","amateur","ancient","apparent","appreciate","attached",
  "available","average","awkward","bargain","bruise","category","cemetery","committee",
  "communicate","community","competition","conscious","controversy","convenience","correspond",
  "criticise","curiosity","definite","desperate","determined","develop","dictionary",
  "disastrous","environment","equip","especially","exaggerate","excellent","existence",
  "explanation","familiar","forty","frequently","government","harass","hindrance","identity",
  "immediately","individual","interfere","interrupt","language","leisure","lightning",
  "marvellous","mischievous","muscle","neighbour","nuisance","occupy","occur","opportunity",
  "parliament","persuade","physical","prejudice","profession","programme","pronunciation",
  "recognise","relevant","restaurant","rhyme","sacrifice","secretary","shoulder","signature",
  "sincere","soldier","stomach","sufficient","suggest","symbol","system","thorough",
  "twelfth","variety","vegetable","vehicle","yacht","absence","accidentally","acceptable",
  "acknowledge","acquire","across","address","advice","affect","almost","already","although",
  "always","among","analyse","analysis","argument","arrangement","athlete","atmosphere",
  "attendance","beautiful","because","beginning","believe","beneficial","benefit","breathe",
  "brilliant","building","business","calendar","careful","carefully","caught","ceiling",
  "certain","changeable","character","choose","chose","clothes","coming","commitment",
  "committed","completely","concentration","conclusion","consequence","continuous","decision",
  "describe","description","difference","different","difficult","disappear","disappoint",
  "during","easily","eighth","either","embarrassed","emphasise","encourage","engagement",
  "enough","entirely","equipment","especially","evidence","example","except","exercise",
  "experience","experiment","explanation","extremely","familiar","fascinating","favourite",
  "February","finally","financial","finished","foreign","forty","forward","friend","fulfil",
  "further","generally","government","grammar","grateful","great","guard","happened",
  "happiness","health","heard","height","heroes","herself","himself","history","hoping",
  "humorous","immediately","important","impossible","independent","information","interesting",
  "interrupt","island","jealous","jewellery","judgement","knowledge","laboratory","language",
  "later","leisure","length","library","lightning","listening","loneliness","loose","lose",
  "lovely","lying","marriage","material","mathematics","meant","medicine","mention","minute",
  "mysterious","naturally","necessary","neighbour","neither","noticeable","occasion",
  "occasionally","occurred","occurrence","offered","official","often","omission","opportunity",
  "opposite","ordinary","original","ourselves","paid","parallel","particular","passed","past",
  "people","perhaps","permanent","personal","physical","piece","planned","pleasant","possible",
  "potatoes","practical","preferred","presence","pressure","probably","profession","professor",
  "promise","pronunciation","properly","psychology","publicly","quietly","quite","really",
  "receive","recognise","recommend","reference","referred","relevant","religious","remember",
  "repetition","restaurant","rhythm","ridiculous","said","scene","schedule","science",
  "scissors","secretary","sense","sentence","separate","seriously","several","should",
  "similar","sincerely","skilful","soldier","something","sometimes","special","speech",
  "stopped","straight","strength","studying","success","successful","suddenly","sufficient",
  "surely","surprise","surprising","temperature","themselves","therefore","thorough","though",
  "thought","through","throughout","tired","together","tomorrow","tongue","too","truly",
  "twelfth","unfortunately","until","unusual","usually","valuable","various","vegetable",
  "vehicle","view","violence","weather","Wednesday","weight","weird","welcome","whether",
  "which","while","whole","whose","woman","women","wonderful","writing","written","wrote","yacht"
];

// ========== GAME STATE ==========
let currentMode = "primary";
let words = [];
let currentWord = null;
let score = 0;
let level = 1;
let streak = 0;
let bestStreak = 0;
let lives = 3;
let wordsCompleted = 0;
let isChecking = false;          // prevents holding Enter

const wordsPerLevel = 10;
const goalScore = 100;

// ========== DOM ELEMENTS ==========
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const levelCompleteScreen = document.getElementById("level-complete");
const gameOverScreen = document.getElementById("game-over");
const howToPlay = document.getElementById("how-to-play");

const scrambledEl = document.getElementById("scrambled");
const answerInput = document.getElementById("answer-input");
const feedbackEl = document.getElementById("feedback");
const wordInfo = document.getElementById("word-info");
const meaningEl = document.getElementById("meaning");
const exampleEl = document.getElementById("example");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const streakEl = document.getElementById("streak");
const livesEl = document.getElementById("lives");
const progressBar = document.getElementById("progress-bar");

// ========== HELPERS ==========
function scramble(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join("");
  return scrambled === word ? scramble(word) : scrambled;
}

function updateUI() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  streakEl.textContent = streak;
  livesEl.textContent = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
  const progress = Math.min((wordsCompleted / wordsPerLevel) * 100, 100);
  progressBar.style.width = progress + "%";
}

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function pickNewWord() {
  if (words.length === 0) {
    words = currentMode === "primary" ? [...primaryWords] : [...secondaryWords];
  }

  if (words.length === 0) {
    scrambledEl.innerHTML = "<p style='color:red'>No words loaded</p>";
    return;
  }

  const index = Math.floor(Math.random() * words.length);
  currentWord = words.splice(index, 1)[0];

  // Create individual letter tiles
  const scrambled = scramble(currentWord).toUpperCase();
  scrambledEl.innerHTML = ""; // clear previous tiles

  scrambled.split("").forEach(letter => {
    const tile = document.createElement("div");
    tile.className = "letter-tile";
    tile.textContent = letter;
    scrambledEl.appendChild(tile);
  });

  answerInput.value = "";
  answerInput.disabled = false;
  document.getElementById("check-btn").disabled = false;
  document.getElementById("skip-btn").disabled = false;
  answerInput.focus();

  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  wordInfo.classList.add("hidden");
  isChecking = false;
}
function checkAnswer() {
  if (isChecking) return;

  const userAnswer = answerInput.value.trim().toLowerCase();
  if (!userAnswer) return;

  isChecking = true;
  answerInput.disabled = true;
  document.getElementById("check-btn").disabled = true;
  document.getElementById("skip-btn").disabled = true;

  if (userAnswer === currentWord.toLowerCase()) {
    const points = 10 + (streak * 2);
    score += points;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    wordsCompleted++;

    feedbackEl.textContent = `Correct! +${points} points`;
    feedbackEl.className = "feedback correct";
    meaningEl.textContent = "Great spelling!";
    exampleEl.textContent = `You spelled "${currentWord}" correctly.`;
    wordInfo.classList.remove("hidden");

    updateUI();

    if (wordsCompleted >= wordsPerLevel || score >= goalScore * level) {
      setTimeout(() => {
        isChecking = false;
        showLevelComplete();
      }, 1200);
    } else {
      setTimeout(() => {
        isChecking = false;
        pickNewWord();
      }, 1500);
    }
  } else {
    lives--;
    streak = 0;
    feedbackEl.textContent = `Oops! The word was "${currentWord}"`;
    feedbackEl.className = "feedback wrong";
    meaningEl.textContent = "Keep practising!";
    exampleEl.textContent = `Correct spelling: ${currentWord}`;
    wordInfo.classList.remove("hidden");

    updateUI();

    if (lives <= 0) {
      setTimeout(() => {
        isChecking = false;
        showGameOver();
      }, 1500);
    } else {
      setTimeout(() => {
        isChecking = false;
        pickNewWord();
      }, 1800);
    }
  }
}

function showLevelComplete() {
  document.getElementById("final-score").textContent = score;
  const stars = score >= 150 ? "⭐⭐⭐" : score >= 100 ? "⭐⭐" : "⭐";
  document.getElementById("stars").textContent = stars;
  showScreen(levelCompleteScreen);
}

function showGameOver() {
  document.getElementById("game-over-score").textContent = score;
  document.getElementById("best-streak").textContent = bestStreak;
  showScreen(gameOverScreen);
}

function startGame(mode) {
  currentMode = mode;
  words = mode === "primary" ? [...primaryWords] : [...secondaryWords];
  score = 0;
  level = 1;
  streak = 0;
  bestStreak = 0;
  lives = 3;
  wordsCompleted = 0;
  isChecking = false;
  updateUI();
  showScreen(gameScreen);
  pickNewWord();
}

function nextLevel() {
  level++;
  wordsCompleted = 0;
  lives = Math.min(lives + 1, 3);
  words = currentMode === "primary" ? [...primaryWords] : [...secondaryWords];
  isChecking = false;
  updateUI();
  showScreen(gameScreen);
  pickNewWord();
}

// ========== EVENT LISTENERS ==========
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => startGame(btn.dataset.mode));
});

document.getElementById("how-to-play-btn").addEventListener("click", () => {
  howToPlay.classList.remove("hidden");
});

document.getElementById("close-how-to").addEventListener("click", () => {
  howToPlay.classList.add("hidden");
});

document.getElementById("check-btn").addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});

document.getElementById("skip-btn").addEventListener("click", () => {
  if (isChecking) return;
  isChecking = true;
  answerInput.disabled = true;
  document.getElementById("check-btn").disabled = true;
  document.getElementById("skip-btn").disabled = true;

  lives--;
  streak = 0;
  updateUI();

  if (lives <= 0) {
    setTimeout(() => {
      isChecking = false;
      showGameOver();
    }, 800);
  } else {
    setTimeout(() => {
      isChecking = false;
      pickNewWord();
    }, 600);
  }
});

document.getElementById("next-level-btn").addEventListener("click", nextLevel);
document.getElementById("menu-btn").addEventListener("click", () => showScreen(startScreen));
document.getElementById("play-again-btn").addEventListener("click", () => startGame(currentMode));
document.getElementById("menu-btn-2").addEventListener("click", () => showScreen(startScreen));
