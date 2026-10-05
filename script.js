// ========== WORD LISTS ==========
const primaryWords = [
  { word: "apple", meaning: "A round fruit that grows on trees", example: "I ate a red apple for lunch." },
  { word: "school", meaning: "A place where children go to learn", example: "We go to school every weekday." },
  { word: "friend", meaning: "A person you like and trust", example: "My best friend lives next door." },
  { word: "happy", meaning: "Feeling joy or pleasure", example: "She was happy to see her puppy." },
  { word: "water", meaning: "A clear liquid we drink", example: "Please drink more water every day." },
  { word: "house", meaning: "A building where people live", example: "Their house has a big garden." },
  { word: "flower", meaning: "The colorful part of a plant", example: "The flower smells very sweet." },
  { word: "animal", meaning: "A living creature that is not a plant", example: "A lion is a wild animal." },
  { word: "family", meaning: "A group of people related to each other", example: "I love spending time with my family." },
  { word: "teacher", meaning: "A person who helps students learn", example: "Our teacher is very kind." },
  { word: "garden", meaning: "A place where plants and flowers grow", example: "We planted tomatoes in the garden." },
  { word: "window", meaning: "An opening in a wall that lets in light", example: "Open the window for fresh air." },
  { word: "summer", meaning: "The warmest season of the year", example: "We go swimming in the summer." },
  { word: "brother", meaning: "A boy or man who has the same parents as you", example: "My brother is older than me." },
  { word: "sister", meaning: "A girl or woman who has the same parents as you", example: "My sister likes to draw." },
  { word: "yellow", meaning: "The color of the sun or a banana", example: "The sunflower is bright yellow." },
  { word: "orange", meaning: "A round citrus fruit or a color", example: "I peeled an orange for breakfast." },
  { word: "purple", meaning: "A color between blue and red", example: "She wore a purple dress." },
  { word: "castle", meaning: "A large strong building from long ago", example: "The king lived in a castle." },
  { word: "dragon", meaning: "A large imaginary creature that breathes fire", example: "The story was about a friendly dragon." }
];

const secondaryWords = [
  { word: "necessary", meaning: "Needed or required", example: "It is necessary to study for the test." },
  { word: "accommodation", meaning: "A place to stay or live", example: "We booked accommodation near the beach." },
  { word: "definitely", meaning: "Without any doubt", example: "I will definitely come to the party." },
  { word: "separate", meaning: "To divide or keep apart", example: "Please separate the recyclables." },
  { word: "embarrass", meaning: "To make someone feel awkward or ashamed", example: "Don't embarrass me in front of my friends." },
  { word: "occurrence", meaning: "Something that happens", example: "This is a rare occurrence." },
  { word: "recommend", meaning: "To suggest something as good", example: "I recommend this book to everyone." },
  { word: "conscience", meaning: "Your sense of right and wrong", example: "His conscience told him to tell the truth." },
  { word: "privilege", meaning: "A special right or advantage", example: "It is a privilege to attend this school." },
  { word: "rhythm", meaning: "A regular pattern of sound or movement", example: "The song has a catchy rhythm." },
  { word: "weird", meaning: "Strange or unusual", example: "That was a weird dream." },
  { word: "guarantee", meaning: "A promise that something will happen", example: "The shop gives a one-year guarantee." },
  { word: "foreign", meaning: "From another country", example: "She speaks three foreign languages." },
  { word: "knowledge", meaning: "Information and skills gained through experience", example: "Reading increases your knowledge." },
  { word: "queue", meaning: "A line of people waiting", example: "There was a long queue at the ticket office." },
  { word: "receipt", meaning: "A written statement that money has been paid", example: "Keep the receipt in case you need to return it." },
  { word: "successful", meaning: "Achieving what you wanted", example: "She had a successful career in science." },
  { word: "temperature", meaning: "How hot or cold something is", example: "The temperature dropped overnight." },
  { word: "unfortunately", meaning: "Sadly; used when something bad happens", example: "Unfortunately, the match was cancelled." },
  { word: "vocabulary", meaning: "All the words a person knows", example: "Reading helps improve your vocabulary." }
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
const wordsPerLevel = 8;
const goalScore = 80; // points needed to complete a level

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

// ========== HELPER FUNCTIONS ==========
function scramble(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Make sure it's not the same as original
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
    // Refill if somehow empty
    words = currentMode === "primary" ? [...primaryWords] : [...secondaryWords];
  }
  const index = Math.floor(Math.random() * words.length);
  currentWord = words.splice(index, 1)[0];
  scrambledEl.textContent = scramble(currentWord.word).toUpperCase();
  answerInput.value = "";
  answerInput.focus();
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  wordInfo.classList.add("hidden");
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  if (!userAnswer) return;

  if (userAnswer === currentWord.word) {
    // Correct
    const points = 10 + (streak * 2);
    score += points;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    wordsCompleted++;

    feedbackEl.textContent = `Correct! +${points} points`;
    feedbackEl.className = "feedback correct";

    meaningEl.textContent = currentWord.meaning;
    exampleEl.textContent = currentWord.example;
    wordInfo.classList.remove("hidden");

    updateUI();

    // Check level complete
    if (wordsCompleted >= wordsPerLevel || score >= goalScore * level) {
      setTimeout(showLevelComplete, 1200);
    } else {
      setTimeout(pickNewWord, 1800);
    }
  } else {
    // Wrong
    lives--;
    streak = 0;
    feedbackEl.textContent = `Oops! The word was "${currentWord.word}"`;
    feedbackEl.className = "feedback wrong";

    meaningEl.textContent = currentWord.meaning;
    exampleEl.textContent = currentWord.example;
    wordInfo.classList.remove("hidden");

    updateUI();

    if (lives <= 0) {
      setTimeout(showGameOver, 1500);
    } else {
      setTimeout(pickNewWord, 2000);
    }
  }
}

function showLevelComplete() {
  document.getElementById("final-score").textContent = score;
  const stars = score >= 120 ? "⭐⭐⭐" : score >= 80 ? "⭐⭐" : "⭐";
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
  updateUI();
  showScreen(gameScreen);
  pickNewWord();
}

function nextLevel() {
  level++;
  wordsCompleted = 0;
  lives = Math.min(lives + 1, 3); // Bonus life
  words = currentMode === "primary" ? [...primaryWords] : [...secondaryWords];
  updateUI();
  showScreen(gameScreen);
  pickNewWord();
}

// ========== EVENT LISTENERS ==========
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    startGame(btn.dataset.mode);
  });
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
  lives--;
  streak = 0;
  updateUI();
  if (lives <= 0) {
    showGameOver();
  } else {
    pickNewWord();
  }
});

document.getElementById("next-level-btn").addEventListener("click", nextLevel);

document.getElementById("menu-btn").addEventListener("click", () => {
  showScreen(startScreen);
});

document.getElementById("play-again-btn").addEventListener("click", () => {
  startGame(currentMode);
});

document.getElementById("menu-btn-2").addEventListener("click", () => {
  showScreen(startScreen);
});
