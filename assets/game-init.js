/* =========================
   UI Event Bindings & Init
   ========================= */

// Greeting name persistence
const usernameSpan = document.getElementById('username');

function loadUsername() {
    const savedName = localStorage.getItem('username') || 'user';
    usernameSpan.textContent = savedName;
}

// Inline editing of username
actionListeners();
function actionListeners(){
usernameSpan.addEventListener('click', function () {
    this.contentEditable = true;
    this.focus();
});

usernameSpan.addEventListener('blur', function () {
    this.contentEditable = false;
    let newName = this.textContent.trim();
    if (newName === '') newName = 'user';
    this.textContent = newName;
    localStorage.setItem('username', newName);
});

usernameSpan.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
    }
});
}

/* =========================
   Keyboard & Button Events
   ========================= */
// Space bar to toggle pause
document.body.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePause();
    }
});

document.getElementById('pauseButton').addEventListener('click', togglePause);

document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function () {
        if (!isPaused) {
            checkAnswer(this.textContent);
        }
    });
});

document.getElementById('languageSelector').addEventListener('change', function (e) {
    currentLanguage = e.target.value;

    // Load saved level for this language
    currentLevel = getSavedLevel(currentLanguage);
    levelLetterCount = 0;
    updateLevelDisplay();
    changeBackground();

    // Reset score counts
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('incorrectCount').textContent = '0';

    displayRandomLetter();
});

document.getElementById('resetButton').addEventListener('click', () => {
    totalTime = 0;
    totalLetters = 0;
    levelLetterCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('averageTime').textContent = '0.00';
    document.getElementById('correctCount').textContent = '0';
    document.getElementById('incorrectCount').textContent = '0';
});

/* =========================
   Initialisation
   ========================= */

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize voice recognition
    const voiceRecognition = new VoiceRecognition();
    
    // Set up the voice recognition callback
    voiceRecognition.setOnAnswerCallback(function(spokenText) {
        if (!voiceRecognition.isPaused()) {
            checkAnswer(spokenText);
        }
    });

loadUsername();
currentLevel = getSavedLevel(currentLanguage);
updateLevelDisplay();
changeBackground();
initKeyboardShortcuts();
addKeyboardHints();

    // Initialize other game components
    loadUsername();
    displayRandomLetter();
});