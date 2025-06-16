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
        targetElem.textContent = currentLevel < 3 ? '5.00' : 'N/A';
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
        } else if (currentLanguage === 'malayalam') {
            const randomVowel = malayalamVowels[Math.floor(Math.random() * malayalamVowels.length)];
            const randomConsonant = malayalamConsonants[Math.floor(Math.random() * malayalamConsonants.length)];
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
        } else if (currentLanguage === 'malayalam') {
            const randomConsonant = malayalamConsonants[Math.floor(Math.random() * malayalamConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * malayalamVowels.length);
            const matra = malayalamVowelMatras[randomVowelIndex];
            return Math.random() > 0.5 ? randomConsonant + matra : malayalamVowels[randomVowelIndex];
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
        } else if (currentLanguage === 'malayalam') {
            const randomConsonant = malayalamConsonants[Math.floor(Math.random() * malayalamConsonants.length)];
            const randomVowelIndex = Math.floor(Math.random() * malayalamVowels.length);
            const matra = malayalamVowelMatras[randomVowelIndex];
            if (Math.random() > 0.7) {
                const randomConjunct = malayalamConjuncts[Math.floor(Math.random() * malayalamConjuncts.length)];
                return randomConjunct + matra;
            }
            return randomConsonant + matra;
        }
    }
    return '';
}

function getTransliteration(letter) {
    if (currentLanguage === 'hindi') {
        // First check if it's a single character (vowel, consonant, or conjunct)
        const vowelIndex = hindiVowels.indexOf(letter);
        if (vowelIndex !== -1) return hindiVowelTrans[vowelIndex];

        const consonantIndex = hindiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return hindiConsonantTrans[consonantIndex];

        const conjunctIndex = hindiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return hindiConjunctTrans[conjunctIndex];

        // NEW: Handle compound letters (consonant + matra combinations)
        if (letter.length > 1) {
            // Try to break down compound letter
            for (let i = 0; i < hindiConsonants.length; i++) {
                const consonant = hindiConsonants[i];
                if (letter.startsWith(consonant)) {
                    const remainingPart = letter.substring(consonant.length);
                    
                    // Check if remaining part is a matra
                    const matraIndex = hindiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const consonantTrans = hindiConsonantTrans[i];
                        const matraTrans = hindiVowelMatraTrans[matraIndex];
                        
                        // Combine consonant + matra transliterations
                        if (matraIndex === 0) {
                            // Empty matra (inherent 'a' sound)
                            return consonantTrans;
                        } else {
                            // Replace the inherent 'a' with the matra sound
                            const baseTrans = consonantTrans.endsWith('a') ? 
                                consonantTrans.slice(0, -1) : consonantTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
            
            // Also try conjuncts + matras
            for (let i = 0; i < hindiConjuncts.length; i++) {
                const conjunct = hindiConjuncts[i];
                if (letter.startsWith(conjunct)) {
                    const remainingPart = letter.substring(conjunct.length);
                    
                    const matraIndex = hindiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const conjunctTrans = hindiConjunctTrans[i];
                        const matraTrans = hindiVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return conjunctTrans;
                        } else {
                            const baseTrans = conjunctTrans.endsWith('a') ? 
                                conjunctTrans.slice(0, -1) : conjunctTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
        }
    } else if (currentLanguage === 'gujarati') {
        // Similar logic for Gujarati...
        const vowelIndex = gujaratiVowels.indexOf(letter);
        if (vowelIndex !== -1) return gujaratiVowelTrans[vowelIndex];

        const consonantIndex = gujaratiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return gujaratiConsonantTrans[consonantIndex];

        const conjunctIndex = gujaratiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return gujaratiConjunctTrans[conjunctIndex];

        // Handle compound letters for Gujarati
        if (letter.length > 1) {
            for (let i = 0; i < gujaratiConsonants.length; i++) {
                const consonant = gujaratiConsonants[i];
                if (letter.startsWith(consonant)) {
                    const remainingPart = letter.substring(consonant.length);
                    
                    const matraIndex = gujaratiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const consonantTrans = gujaratiConsonantTrans[i];
                        const matraTrans = gujaratiVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return consonantTrans;
                        } else {
                            const baseTrans = consonantTrans.endsWith('a') ? 
                                consonantTrans.slice(0, -1) : consonantTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
            
            for (let i = 0; i < gujaratiConjuncts.length; i++) {
                const conjunct = gujaratiConjuncts[i];
                if (letter.startsWith(conjunct)) {
                    const remainingPart = letter.substring(conjunct.length);
                    
                    const matraIndex = gujaratiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const conjunctTrans = gujaratiConjunctTrans[i];
                        const matraTrans = gujaratiVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return conjunctTrans;
                        } else {
                            const baseTrans = conjunctTrans.endsWith('a') ? 
                                conjunctTrans.slice(0, -1) : conjunctTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
        }
    } else if (currentLanguage === 'punjabi') {
        // Similar logic for Punjabi...
        const vowelIndex = punjabiVowels.indexOf(letter);
        if (vowelIndex !== -1) return punjabiVowelTrans[vowelIndex];

        const consonantIndex = punjabiConsonants.indexOf(letter);
        if (consonantIndex !== -1) return punjabiConsonantTrans[consonantIndex];

        const conjunctIndex = punjabiConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return punjabiConjunctTrans[conjunctIndex];

        // Handle compound letters for Punjabi
        if (letter.length > 1) {
            for (let i = 0; i < punjabiConsonants.length; i++) {
                const consonant = punjabiConsonants[i];
                if (letter.startsWith(consonant)) {
                    const remainingPart = letter.substring(consonant.length);
                    
                    const matraIndex = punjabiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const consonantTrans = punjabiConsonantTrans[i];
                        const matraTrans = punjabiVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return consonantTrans;
                        } else {
                            const baseTrans = consonantTrans.endsWith('a') ? 
                                consonantTrans.slice(0, -1) : consonantTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
            
            for (let i = 0; i < punjabiConjuncts.length; i++) {
                const conjunct = punjabiConjuncts[i];
                if (letter.startsWith(conjunct)) {
                    const remainingPart = letter.substring(conjunct.length);
                    
                    const matraIndex = punjabiVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const conjunctTrans = punjabiConjunctTrans[i];
                        const matraTrans = punjabiVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return conjunctTrans;
                        } else {
                            const baseTrans = conjunctTrans.endsWith('a') ? 
                                conjunctTrans.slice(0, -1) : conjunctTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
        }
    } else if (currentLanguage === 'malayalam') {
        // Similar logic for Malayalam...
        const vowelIndex = malayalamVowels.indexOf(letter);
        if (vowelIndex !== -1) return malayalamVowelTrans[vowelIndex];

        const consonantIndex = malayalamConsonants.indexOf(letter);
        if (consonantIndex !== -1) return malayalamConsonantTrans[consonantIndex];

        const conjunctIndex = malayalamConjuncts.indexOf(letter);
        if (conjunctIndex !== -1) return malayalamConjunctTrans[conjunctIndex];

        // Handle compound letters for Malayalam
        if (letter.length > 1) {
            for (let i = 0; i < malayalamConsonants.length; i++) {
                const consonant = malayalamConsonants[i];
                if (letter.startsWith(consonant)) {
                    const remainingPart = letter.substring(consonant.length);
                    
                    const matraIndex = malayalamVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const consonantTrans = malayalamConsonantTrans[i];
                        const matraTrans = malayalamVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return consonantTrans;
                        } else {
                            const baseTrans = consonantTrans.endsWith('a') ? 
                                consonantTrans.slice(0, -1) : consonantTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
            
            for (let i = 0; i < malayalamConjuncts.length; i++) {
                const conjunct = malayalamConjuncts[i];
                if (letter.startsWith(conjunct)) {
                    const remainingPart = letter.substring(conjunct.length);
                    
                    const matraIndex = malayalamVowelMatras.indexOf(remainingPart);
                    if (matraIndex !== -1) {
                        const conjunctTrans = malayalamConjunctTrans[i];
                        const matraTrans = malayalamVowelMatraTrans[matraIndex];
                        
                        if (matraIndex === 0) {
                            return conjunctTrans;
                        } else {
                            const baseTrans = conjunctTrans.endsWith('a') ? 
                                conjunctTrans.slice(0, -1) : conjunctTrans;
                            return baseTrans + matraTrans;
                        }
                    }
                }
            }
        }
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
    } else if (currentLanguage === 'malayalam') {
        allTrans = [...malayalamVowelTrans, ...malayalamConsonantTrans, ...malayalamConjunctTrans];
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

// Reference Guide Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('referenceModal');
    const referenceButton = document.getElementById('referenceButton');
    const closeButton = document.querySelector('.close-button');
    const langTabs = document.querySelectorAll('.lang-tab');
    const languageContents = document.querySelectorAll('.language-content');

    // Open modal
    referenceButton.addEventListener('click', function() {
        modal.style.display = 'block';
        // Pause the game when reference guide is open
        if (typeof pauseGame === 'function') {
            pauseGame();
        }
    });

    // Close modal when clicking the X
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Handle language tab switching
    langTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            langTabs.forEach(t => t.classList.remove('active'));
            languageContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const lang = this.dataset.lang;
            document.getElementById(`${lang}-content`).classList.add('active');
        });
    });

    // Sync with main language selector
    const mainLanguageSelector = document.getElementById('languageSelector');
    if (mainLanguageSelector) {
        mainLanguageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            const correspondingTab = document.querySelector(`.lang-tab[data-lang="${selectedLang}"]`);
            if (correspondingTab) {
                correspondingTab.click();
            }
        });
    }
});