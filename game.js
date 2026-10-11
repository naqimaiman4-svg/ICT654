let currentQ = 0;
let score = 0;
let streak = 0;
let correct = 0;
let total = 0;
let selectedHero = null;
let currentRound = "";
let currentCase = null;
let cluesFound = 0;

// ---- RANDOM DETECTIVE NAMES (SET A) ----
const DETECTIVES = [
  { name: "Sherlock", icon: "🕵️", title: "Consulting Detective" },
  { name: "Watson",   icon: "🔍", title: "Medical Examiner" },
  { name: "Poirot",   icon: "🧠", title: "Belgian Sleuth" },
  { name: "Marple",   icon: "👜", title: "Village Detective" },
  { name: "Lupin",    icon: "🎩", title: "Gentleman Thief" }
];

// ---- SCREEN SWITCHER ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---- PICK 5 RANDOM DETECTIVES ----
function pickRandomDetectives() {
  const shuffled = [...DETECTIVES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

// ---- RENDER DETECTIVE CARDS ----
function renderHeroCards() {
  const container = document.getElementById('hero-select');
  container.innerHTML = '';
  const heroes = pickRandomDetectives();
  heroes.forEach(hero => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.dataset.hero = hero.name;
    card.dataset.icon = hero.icon;
    card.innerHTML = `
      <h3>${hero.icon} ${hero.name}</h3>
      <p>${hero.title}</p>
    `;
    card.addEventListener('click', function () {
      selectedHero = this.dataset.hero;
      document.querySelectorAll('.hero-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      playClick();
    });
    container.appendChild(card);
  });
}

// ---- INTRO BUTTON ----
document.getElementById('intro-btn').addEventListener('click', () => {
  playClick();
  showScreen('select-screen');
  renderHeroCards();
});

// ---- START BUTTON ----
document.getElementById('start-btn').addEventListener('click', () => {
  if (!selectedHero) { alert("Please choose your detective badge first!"); return; }
  playClick();
  showCaseBrief();
});

// ---- CASE BRIEF ----
function showCaseBrief() {
  const caseData = cases[Math.floor(currentQ / 6)] || cases[0];
  currentCase = caseData;
  document.getElementById('case-title').textContent = caseData.title;
  document.getElementById('case-desc').textContent = caseData.desc;
  showScreen('case-screen');
}

document.getElementById('case-btn').addEventListener('click', () => {
  playClick();
  showScreen('battle-screen');
  loadQuestion();
});

document.getElementById('restart-btn').addEventListener('click', () => location.reload());

// ---- LOAD QUESTION ----
function loadQuestion() {
  if (currentQ >= questions.length) { endGame(); return; }
  const q = questions[currentQ];

  if (q.round !== currentRound) {
    currentRound = q.round;
    document.getElementById('round-banner').textContent = q.round;
    if (currentCase) {
      document.getElementById('suspect-label').textContent = `🔍 Suspect: ${currentCase.suspect}`;
    }
    playRoundChange();
  }

  document.getElementById('question-text').textContent = q.q;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = `${String.fromCharCode(65 + i)}) ${opt}`;
    btn.addEventListener('click', () => checkAnswer(i, btn));
    optionsDiv.appendChild(btn);
  });

  document.getElementById('q-counter').textContent = `${currentQ + 1}/${questions.length}`;
  document.getElementById('progress-fill').style.width = ((currentQ / questions.length) * 100) + '%';
  document.getElementById('feedback').textContent = '';
}

// ---- CHECK ANSWER ----
function checkAnswer(selected, btn) {
  const q = questions[currentQ];
  const allBtns = document.querySelectorAll('.option');
  allBtns.forEach(b => b.disabled = true);

  total++;
  if (selected === q.answer) {
    btn.classList.add('correct');
    correct++;
    streak++;
    cluesFound++;
    score += 10 + (streak * 2);
    document.getElementById('feedback').textContent = `🔍 Clue found! The trail grows warmer...`;
    playCorrect();
  } else {
    btn.classList.add('wrong');
    allBtns[q.answer].classList.add('correct');
    streak = 0;
    document.getElementById('feedback').textContent =
      `❌ False lead! Correct answer: ${String.fromCharCode(65 + q.answer)}.`;
    playWrong();
  }

  document.getElementById('score').textContent = score;
  document.getElementById('streak').textContent = streak;
  document.getElementById('accuracy').textContent = Math.round((correct / total) * 100) + '%';

  currentQ++;
  const nextQ = questions[currentQ];
  const isNewCase = nextQ && nextQ.caseNum !== q.caseNum;

  if (currentQ >= questions.length) {
    setTimeout(endGame, 1800);
  } else if (isNewCase) {
    setTimeout(showCaseBrief, 1800);
  } else {
    setTimeout(loadQuestion, 1800);
  }
}

// ---- END GAME ----
function endGame() {
  document.getElementById('question-text').textContent = '';
  document.getElementById('options').innerHTML = '';
  document.getElementById('q-counter').textContent = 'Done';
  document.getElementById('progress-fill').style.width = '100%';

  let rank = "";
  if (correct >= 10) rank = "🏆 MASTER DETECTIVE — Every case solved!";
  else if (correct >= 7) rank = "🥇 SENIOR DETECTIVE — Most cases closed.";
  else if (correct >= 5) rank = "🥈 JUNIOR DETECTIVE — Some clues missed.";
  else rank = "📁 TRAINEE — More investigation needed.";

  document.getElementById('winner').textContent =
    `${rank}\n\nClues Found: ${cluesFound}\nFinal Score: ${score}\nAccuracy: ${Math.round((correct/total)*100)}%`;
  document.getElementById('restart-btn').style.display = 'inline-block';
  playVictory();
}