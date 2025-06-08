/* =========================
   Utility Functions
   ========================= */

// === Level persistence helpers ===
function getSavedLevel(language) {
    const saved = parseInt(localStorage.getItem(`level_${language}`), 10);
    return (saved && saved >= 1 && saved <= 3) ? saved : 1;
}

function saveLevel(language, level) {
    localStorage.setItem(`level_${language}`, level);
}

function updateLevelDisplay() {
    const levelElem = document.getElementById('level');
    if (levelElem) {
        levelElem.textContent = `Level ${currentLevel}`;
    }
    const targetElem = document.getElementById('targetTime');
    if (targetElem) {
        targetElem.textContent = currentLevel < 3 ? '0.50' : 'N/A';
    }
}

/* =========================
   Random Generators
   ========================= */
function getRandomLetter() {
    if (currentLevel === 1) {
        if (currentLanguage === 'hindi') {
            const randomVowel = hindiVowels[Math.floor(Math.random() * hindiVowels.length)];
            const randomConsonant = hindiConsonants[Math.floor(Math.random() * hindiConsonants.length)];
            return Math.random() > 0.5 ? randomVowel : randomConsonant;
        } else if (currentLanguage === 'gujarati') {
            const randomVowel = gujaratiVowels[Math.floor(Math.random() * gujaratiVowels.length)];
            const randomConsonant = gujaratiConsonants[Math.floor(Math.random() * gujaratiConsonants.length)];
            return Math.random() > 0.5 ? randomVowel : randomConsonant;
        } else if (currentLanguage === 'punjabi') {
            const randomVowel = punjabiVowels[Math.floor(Math.random() * punjabiVowels.length)];
            const randomConsonant = punjabiConsonants[Math.floor(Math.random() * punjabiConsonants.length)];
            return Math.random() > 0.5 ? randomVowel : randomConsonant;
        }
    } else if (currentLevel === 2) {
        if (currentLanguage === 'hindi') {
            const randomConsonant = hindiConsonants[Math.floor(Math.random() * hindiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * hindiVowels.length);
            const matra = hindiVowelMatras[randomVowelIndex];
            return Math.random() > 0.5 ? randomConsonant + matra : hindiVowels[randomVowelIndex];
        } else if (currentLanguage === 'gujarati') {
            const randomConsonant = gujaratiConsonants[Math.floor(Math.random() * gujaratiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * gujaratiVowels.length);
            const matra = gujaratiVowelMatras[randomVowelIndex];
            return Math.random() > 0.5 ? randomConsonant + matra : gujaratiVowels[randomVowelIndex];
        } else if (currentLanguage === 'punjabi') {
            const randomConsonant = punjabiConsonants[Math.floor(Math.random() * punjabiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * punjabiVowels.length);
            const matra = punjabiVowelMatras[randomVowelIndex];
            return Math.random() > 0.5 ? randomConsonant + matra : punjabiVowels[randomVowelIndex];
        }
    } else if (currentLevel === 3) {
        if (currentLanguage === 'hindi') {
            const randomConsonant = hindiConsonants[Math.floor(Math.random() * hindiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * hindiVowels.length);
            const matra = hindiVowelMatras[randomVowelIndex];
            if (Math.random() > 0.7) {
                const randomConjunct = hindiConjuncts[Math.floor(Math.random() * hindiConjuncts.length)];
                return randomConjunct + matra;
            }
            return randomConsonant + matra;
        } else if (currentLanguage === 'gujarati') {
            const randomConsonant = gujaratiConsonants[Math.floor(Math.random() * gujaratiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * gujaratiVowels.length);
            const matra = gujaratiVowelMatras[randomVowelIndex];
            if (Math.random() > 0.7) {
                const randomConjunct = gujaratiConjuncts[Math.floor(Math.random() * gujaratiConjuncts.length)];
                return randomConjunct + matra;
            }
            return randomConsonant + matra;
        } else if (currentLanguage === 'punjabi') {
            const randomConsonant = punjabiConsonants[Math.floor(Math.random() * punjabiConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * punjabiVowels.length);
            const matra = punjabiVowelMatras[randomVowelIndex];
            if (Math.random() > 0.7) {
                const randomConjunct = punjabiConjuncts[Math.floor(Math.random() * punjabiConjuncts.length)];
                return randomConjunct + matra;
            }
            return randomConsonant + matra;
        }
    }
    return '';
}

function getTransliteration(letter) {
    if (currentLanguage === 'hindi') {
        const vowelIndex = hindiVowels.indexOf(letter);
        if (vowelIndex !== -1) return hindiVowelTrans[vowelIndex];

        const consonantIndex = hindiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return hindiConsonantTrans[consonantIndex];

        const conjunctIndex = hindiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return hindiConjunctTrans[conjunctIndex];
    } else if (currentLanguage === 'gujarati') {
        const vowelIndex = gujaratiVowels.indexOf(letter);
        if (vowelIndex !== -1) return gujaratiVowelTrans[vowelIndex];

        const consonantIndex = gujaratiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return gujaratiConsonantTrans[consonantIndex];

        const conjunctIndex = gujaratiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return gujaratiConjunctTrans[conjunctIndex];
    } else if (currentLanguage === 'punjabi') {
        const vowelIndex = punjabiVowels.indexOf(letter);
        if (vowelIndex !== -1) return punjabiVowelTrans[vowelIndex];

        const consonantIndex = punjabiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return punjabiConsonantTrans[consonantIndex];

        const conjunctIndex = punjabiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return punjabiConjunctTrans[conjunctIndex];
    }
    return '';
}

function getRandomOptions(correctLetter) {
    const correctTrans = getTransliteration(correctLetter);
    lastLetterTrans = correctTrans;

    // Build pool of all transliterations
    let allTrans = [];
    if (currentLanguage === 'hindi') {
        allTrans = [...hindiVowelTrans, ...hindiConsonantTrans, ...hindiConjunctTrans];
    } else if (currentLanguage === 'gujarati') {
        allTrans = [...gujaratiVowelTrans, ...gujaratiConsonantTrans, ...gujaratiConjunctTrans];
    } else if (currentLanguage === 'punjabi') {
        allTrans = [...punjabiVowelTrans, ...punjabiConsonantTrans, ...punjabiConjunctTrans];
    }

    // Remove correct answer from pool
    const transPool = allTrans.filter(t => t !== correctTrans);

    // Select two wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 2) {
        const candidate = transPool[Math.floor(Math.random() * transPool.length)];
        if (!wrongOptions.includes(candidate)) wrongOptions.push(candidate);
    }

    // Combine & shuffle
    return [correctTrans, ...wrongOptions].sort(() => Math.random() - 0.5);
}