const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() { if (!audioCtx) audioCtx = new AudioContext(); }

function playTone(freq, duration, type = 'sine') {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playClick() { playTone(600, 0.03, 'square'); }

function playCorrect() {
  playTone(800, 0.08, 'sine');
  setTimeout(() => playTone(1050, 0.12, 'sine'), 80);
}

function playWrong() {
  playTone(150, 0.25, 'sawtooth');
}

function playRoundChange() {
  playTone(400, 0.12, 'triangle');
  setTimeout(() => playTone(600, 0.15, 'triangle'), 120);
  setTimeout(() => playTone(800, 0.2, 'triangle'), 260);
}

function playVictory() {
  playTone(660, 0.15);
  setTimeout(() => playTone(880, 0.15), 150);
  setTimeout(() => playTone(1100, 0.35), 300);
}