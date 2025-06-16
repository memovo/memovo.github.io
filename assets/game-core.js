/* =========================
   Core Gameplay Functions
   ========================= */

function displayRandomLetter() {
    if (isPaused) return;

    lastLetter = getRandomLetter();
    const letterElement = document.getElementById('letter');

    letterElement.style.opacity = '0';
    letterElement.style.transform = 'translateY(5px)';

    // Fade-in animation
    setTimeout(() => {
        letterElement.textContent = lastLetter;
        letterElement.style.opacity = '1';
        letterElement.style.transform = 'translateY(0)';
    }, 50);

    // Reset feedback
    const feedbackElem = document.getElementById('feedback');
    feedbackElem.textContent = '';
    feedbackElem.className = '';

    // Prepare options UI
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(btn => {
        btn.className = 'option-button';
        btn.disabled = false;
    });

    currentOptions = getRandomOptions(lastLetter);
    optionButtons.forEach((btn, idx) => {
        btn.textContent = currentOptions[idx];
    });

    resetTimer();
    startTime = new Date();
    updateProgressBar();
}

/* =========================
   Timing & Progress Helpers
   ========================= */
function resetTimer() {
    const now = new Date();
    if (startTime && !isPaused) {
        timeSpent = (now - startTime) / 1000;
        totalTime += timeSpent;
        totalLetters++;
        levelLetterCount++;
        levelTotalTime += timeSpent;  // Add to level-specific time
        levelTotalLetters++;  // Add to level-specific letters
        updateAverageTime();
        checkPromotion();
    }
    document.getElementById('timer').textContent = '0.00';
}

function updateAverageTime() {
    const averageTime = levelTotalLetters ? (levelTotalTime / levelTotalLetters) : 0;  // Use level-specific counters
    document.getElementById('averageTime').textContent = averageTime.toFixed(2);
}

function checkPromotion() {
    const averageTime = levelTotalLetters ? (levelTotalTime / levelTotalLetters) : 0;  // Use level-specific counters
    if (levelLetterCount >= levelThreshold && averageTime < promotionTime) {
        promoteLevel();
    }
}

function promoteLevel() {
    if (currentLevel >= 3) return;

    currentLevel++;
    levelLetterCount = 0;
    levelTotalTime = 0;  // Reset level-specific time
    levelTotalLetters = 0;  // Reset level-specific letters

    document.getElementById('level').textContent = `Level ${currentLevel}`;
    document.getElementById('targetTime').textContent = currentLevel < 3 ? '5.00' : 'N/A';
    changeBackground();

    // Persist
    saveLevel(currentLanguage, currentLevel);
    updateLevelDisplay();
}

function changeBackground() {
    if (currentLevel === 2) {
        document.body.style.backgroundColor = '#d1f0f0';
    } else if (currentLevel === 3) {
        document.body.style.backgroundColor = '#f0d1d1';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
    }
}

function updateProgressBar() {
    const progress = (levelLetterCount / levelThreshold) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
}

/* =========================
   Pause / Resume
   ========================= */
function togglePause() {
    isPaused = !isPaused;
    const pauseBtn = document.getElementById('pauseButton');
    const letterElem = document.getElementById('letter');

    if (isPaused) {
        letterElem.textContent = '';
        pauseBtn.textContent = 'Unpause';
    } else {
        letterElem.textContent = lastLetter;
        pauseBtn.textContent = 'Pause';
        startTime = new Date();
    }
}

/* =========================
   Answer Checking
   ========================= */
function checkAnswer(selectedOption) {
    const optionButtons = document.querySelectorAll('.option-button');
    const feedback = document.getElementById('feedback');

    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    if (selectedOption === lastLetterTrans) {
        feedback.textContent = `Correct! ${lastLetter} is pronounced as "${lastLetterTrans}"`;
        feedback.className = 'correct-text';
        correctCount++;
        optionButtons[currentOptions.indexOf(selectedOption)].classList.add('correct');
    } else {
        feedback.textContent = `Incorrect. ${lastLetter} is pronounced as "${lastLetterTrans}"`;
        feedback.className = 'incorrect-text';
        incorrectCount++;
        optionButtons[currentOptions.indexOf(selectedOption)].classList.add('incorrect');
        optionButtons[currentOptions.indexOf(lastLetterTrans)].classList.add('correct');
    }

    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;

    setTimeout(displayRandomLetter, 800);
}

/* =========================
   Voice Answer Checking
   ========================= */
function checkVoiceAnswer(spokenText) {
    const correctTrans = lastLetterTrans.toLowerCase();
    const feedback = document.getElementById('feedback');
    const optionButtons = document.querySelectorAll('.option-button');

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (spokenText === correctTrans) {
        feedback.textContent = `Correct! ${lastLetter} is pronounced as "${lastLetterTrans}"`;
        feedback.className = 'correct-text';
        correctCount++;
        optionButtons[currentOptions.indexOf(correctTrans)].classList.add('correct');
    } else {
        feedback.textContent = `Incorrect. ${lastLetter} is pronounced as "${lastLetterTrans}"`;
        feedback.className = 'incorrect-text';
        incorrectCount++;
        optionButtons[currentOptions.indexOf(correctTrans)].classList.add('correct');
    }

    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;

    setTimeout(displayRandomLetter, 800);
}