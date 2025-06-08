/* =========================
   Character Sets & Globals
   ========================= */

// Hindi characters with their English transliterations
const hindiVowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'];
const hindiVowelTrans = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const hindiConsonants = ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'];
const hindiConsonantTrans = ['ka', 'kha', 'ga', 'gha', 'cha', 'chha', 'ja', 'jha', 'ta', 'tha', 'da', 'dha', 'na', 'ta', 'tha', 'da', 'dha', 'na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'la', 'va', 'sha', 'sha', 'sa', 'ha'];
const hindiVowelMatras = ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ'];
const hindiVowelMatraTrans = ['', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const hindiConjuncts = ['त्र', 'प्र', 'ग्र', 'क्र', 'ब्र', 'ध्र', 'श्र', 'क्ष', 'ज्ञ', 'द्व', 'स्व', 'स्त्र', 'श्व', 'त्म', 'न्य', 'द्य', 'ज्ञ्य', 'ह्र', 'स्र', 'त्व', 'थ्र', 'द्र', 'व्र', 'स्म'];
const hindiConjunctTrans = ['tra', 'pra', 'gra', 'kra', 'bra', 'dhra', 'shra', 'ksha', 'gya', 'dva', 'sva', 'stra', 'shva', 'tma', 'nya', 'dya', 'gnya', 'hra', 'sra', 'tva', 'thra', 'dra', 'vra', 'sma'];

// Gujarati characters with their English transliterations
const gujaratiVowels = ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ', 'ઐ', 'ઓ', 'ઔ'];
const gujaratiVowelTrans = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const gujaratiConsonants = ['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ', 'ષ', 'સ', 'હ'];
const gujaratiConsonantTrans = ['ka', 'kha', 'ga', 'gha', 'nga', 'cha', 'chha', 'ja', 'jha', 'nya', 'ta', 'tha', 'da', 'dha', 'na', 'ta', 'tha', 'da', 'dha', 'na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'la', 'va', 'sha', 'sha', 'sa', 'ha'];
const gujaratiVowelMatras = ['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ે', 'ૈ', 'ો', 'ૌ'];
const gujaratiVowelMatraTrans = ['', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const gujaratiConjuncts = ['ક્ષ', 'ત્ર', 'જ્ઞ', 'શ્ર', 'દ્વ', 'દ્ધ', 'દ્મ', 'શ્વ', 'સ્વ', 'સ્ત્ર', 'શ્ચ', 'શ્વ', 'શ્મ', 'શ્ન', 'શ્વ', 'શ્વ', 'શ્વ', 'શ્વ', 'શ્વ', 'શ્વ'];
const gujaratiConjunctTrans = ['ksha', 'tra', 'gya', 'shra', 'dva', 'ddha', 'dma', 'shva', 'sva', 'stra', 'shcha', 'shva', 'shma', 'shna', 'shva', 'shva', 'shva', 'shva', 'shva', 'shva'];

// Punjabi (Gurmukhi) characters with their English transliterations
const punjabiVowels = ['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'];
const punjabiVowelTrans = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const punjabiConsonants = ['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ਸ', 'ਹ', 'ੜ'];
const punjabiConsonantTrans = ['ka', 'kha', 'ga', 'gha', 'nga', 'cha', 'chha', 'ja', 'jha', 'nya', 'ta', 'tha', 'da', 'dha', 'na', 'ta', 'tha', 'da', 'dha', 'na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'la', 'va', 'sa', 'ha', 'rra'];
const punjabiVowelMatras = ['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'];
const punjabiVowelMatraTrans = ['', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
const punjabiConjuncts = ['ਕ੍ਰ', 'ਗ੍ਰ', 'ਜ੍ਞ', 'ਟ੍ਰ', 'ਡ੍ਰ', 'ਤ੍ਰ', 'ਦ੍ਰ', 'ਨ੍ਰ', 'ਪ੍ਰ', 'ਬ੍ਰ', 'ਮ੍ਰ', 'ਯ੍ਰ', 'ਲ੍ਰ', 'ਵ੍ਰ', 'ਸ੍ਰ', 'ਹ੍ਰ', 'ਕ੍ਵ', 'ਗ੍ਵ', 'ਜ੍ਵ', 'ਟ੍ਵ', 'ਡ੍ਵ', 'ਤ੍ਵ', 'ਦ੍ਵ', 'ਨ੍ਵ', 'ਪ੍ਵ', 'ਬ੍ਵ', 'ਮ੍ਵ', 'ਯ੍ਵ', 'ਲ੍ਵ', 'ਵ੍ਵ', 'ਸ੍ਵ', 'ਹ੍ਵ'];
const punjabiConjunctTrans = ['kra', 'gra', 'gya', 'tra', 'dra', 'tra', 'dra', 'nra', 'pra', 'bra', 'mra', 'yra', 'lra', 'vra', 'sra', 'hra', 'kva', 'gva', 'jva', 'tva', 'dva', 'tva', 'dva', 'nva', 'pva', 'bva', 'mva', 'yva', 'lva', 'vva', 'sva', 'hva'];

/* =========================
   Game State Variables
   ========================= */
let currentLevel = 1;
let startTime, timeSpent = 0, totalLetters = 0, totalTime = 0, levelLetterCount = 0;
let isPaused = false;
let lastLetter = '';
let currentLanguage = 'hindi';
let correctCount = 0;
let incorrectCount = 0;
let currentOptions = [];
let lastLetterTrans = '';

const levelThreshold = 20;
const promotionTime = 0.5;