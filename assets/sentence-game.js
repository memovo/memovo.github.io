/* =========================
   API Configuration Module
   ========================= */

// Google Cloud Text-to-Speech API Configuration
const GOOGLE_TTS_CONFIG = {
    apiKey: 'AIzaSyATHAEIvVHiE5h49pdIgnkYbM4GZVucRqE',
    url: 'https://texttospeech.googleapis.com/v1/text:synthesize'
};

// Natural Language Processing API for noun detection
const NLP_CONFIG = {
    // Using a free part-of-speech tagging API
    url: 'https://api.textrazor.com/v1/',
    // Fallback to multiple APIs for reliability
    fallbackUrls: [
        'https://api.meaningcloud.com/parser-2.0',
        'https://textanalysis.p.rapidapi.com/parts-of-speech'
    ]
};

// Simple, reliable randomization
class RandomSeed {
    static getEnhancedRandom() {
        // Just use crypto when available
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / 4294967296;
        }
        return Math.random();
    }
    
    static getRandomIndex(arrayLength) {
        return Math.floor(this.getEnhancedRandom() * arrayLength);
    }
    
    static shuffleArray(array) {
        const shuffled = [...array];
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = this.getRandomIndex(i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

const API_CONFIG = {
    quotes: [
        {
            name: 'LocalSentenceDatabase',
            url: 'assets/sentences.json',
            parser: (data) => {
                // Enhanced random selection using crypto randomization
                if (data.sentences && data.sentences.length > 0) {
                    const randomIndex = RandomSeed.getRandomIndex(data.sentences.length);
                    return data.sentences[randomIndex];
                }
                throw new Error('No sentences found in local database');
            }
        },
        {
            name: 'BackupSentences',
            url: 'local',
            parser: (data) => {
                // Emergency backup sentences
                const backupSentences = [
                    "The purple elephant wore tiny rainbow socks to the party.",
                    "A singing toothbrush taught the grumpy hippo how to dance.",
                    "The invisible cat left muddy pawprints on the ceiling.",
                    "Happy marshmallows bounced around the chocolate castle.",
                    "The sneezing dinosaur accidentally blew away all the clouds.",
                    "A polite dragon asked permission before roasting marshmallows.",
                    "The laughing banana told jokes to the serious apple.",
                    "Tiny robots built a magnificent fort out of cheese.",
                    "The backwards penguin walked to the North Pole for vacation.",
                    "A magical spoon stirred soup that tasted like adventure."
                ];
                return backupSentences[RandomSeed.getRandomIndex(backupSentences.length)];
            }
        }
    ],
    translation: {
        // Using Google Translate (unofficial endpoint)
        url: 'https://translate.googleapis.com/translate_a/single',
        params: {
            client: 'gtx',
            dt: 't',
            ie: 'UTF-8',
            oe: 'UTF-8'
        }
    }
};

/* =========================
   Language Configuration
   ========================= */
const LANGUAGE_CONFIG = {
    english: {
        code: 'en',
        name: 'English',
        voice: 'en-US',
        fallbackVoice: 'en-US',
        googleTTS: {
            languageCode: 'en-US',
            name: 'en-US-Wavenet-F',
            ssmlGender: 'FEMALE'
        }
    },
    hindi: {
        code: 'hi',
        name: 'Hindi',
        voice: 'hi-IN',
        fallbackVoice: 'hi',
        googleTTS: {
            languageCode: 'hi-IN',
            name: 'hi-IN-Wavenet-A',
            ssmlGender: 'FEMALE'
        }
    },
    gujarati: {
        code: 'gu', 
        name: 'Gujarati',
        voice: 'gu-IN',
        fallbackVoice: 'hi-IN',
        googleTTS: {
            languageCode: 'gu-IN',
            name: 'gu-IN-Wavenet-A',
            ssmlGender: 'FEMALE'
        }
    },
    punjabi: {
        code: 'pa',
        name: 'Punjabi', 
        voice: 'pa-IN',
        fallbackVoice: 'hi-IN',
        googleTTS: {
            languageCode: 'pa-IN',
            name: 'pa-IN-Wavenet-A',
            ssmlGender: 'FEMALE'
        }
    },
    malayalam: {
        code: 'ml',
        name: 'Malayalam',
        voice: 'ml-IN',
        fallbackVoice: 'hi-IN',
        googleTTS: {
            languageCode: 'ml-IN',
            name: 'ml-IN-Wavenet-A',
            ssmlGender: 'FEMALE'
        }
    }
};

/* =========================
   Game State Management
   ========================= */
class GameState {
    constructor() {
        this.currentLanguage = 'hindi';
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.streakCount = 0;
        this.currentSentence = null;
        this.currentWord = null;
        this.currentOptions = [];
        this.isAnswered = false;
    }

    incrementCorrect() {
        this.correctCount++;
        this.streakCount++;
        this.updateScoreDisplay();
    }

    incrementIncorrect() {
        this.incorrectCount++;
        this.streakCount = 0;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        document.getElementById('correctCount').textContent = this.correctCount;
        document.getElementById('incorrectCount').textContent = this.incorrectCount;
        document.getElementById('streakCount').textContent = this.streakCount;
    }

    setLanguage(language) {
        this.currentLanguage = language;
    }
}

/* =========================
   API Service Module
   ========================= */
class APIService {
    static async fetchRandomQuote() {
        // Try each API in order
        for (let i = 0; i < API_CONFIG.quotes.length; i++) {
            const apiConfig = API_CONFIG.quotes[i];
            
            try {
                let sentence;
                
                if (apiConfig.url === 'local') {
                    sentence = apiConfig.parser(null);
                } else {
                    let url = apiConfig.url;
                    if (apiConfig.params) {
                        const params = new URLSearchParams(apiConfig.params);
                        url += `?${params}`;
                    }
                    
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`${apiConfig.name} responded with status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    sentence = apiConfig.parser(data);
                }
                
                if (this.isValidEnglishSentence(sentence)) {
                    return sentence;
                } else {
                    throw new Error(`${apiConfig.name} returned invalid sentence: "${sentence}"`);
                }
                
            } catch (error) {
                // Continue to next API
            }
        }
        
        // All APIs failed, use fallback
        return this.getFallbackSentence();
    }

    static async translateText(text, targetLanguage) {
        try {
            const params = new URLSearchParams({
                ...API_CONFIG.translation.params,
                sl: 'en',
                tl: LANGUAGE_CONFIG[targetLanguage].code,
                q: text
            });
            
            const response = await fetch(`${API_CONFIG.translation.url}?${params}`);
            
            if (!response.ok) {
                throw new Error(`Google Translate responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                const translatedText = data[0][0][0];
                
                if (this.isValidTranslation(text, translatedText, targetLanguage)) {
                    return translatedText;
                } else {
                    throw new Error(`Google Translate returned invalid translation: "${translatedText}"`);
                }
            } else {
                throw new Error('Google Translate returned unexpected response format');
            }
        } catch (error) {
            return this.getFallbackTranslation(text, targetLanguage);
        }
    }

    static isValidTranslation(originalText, translatedText, targetLanguage) {
        if (!translatedText || translatedText.length === 0) {
            return false;
        }

        // Check if translation is the same as original (failed translation)
        if (translatedText.toLowerCase() === originalText.toLowerCase()) {
            return false;
        }
        
        // Check if translation looks like English (likely failed)
        const englishPattern = /^[a-zA-Z\s.,!?]+$/;
        if (englishPattern.test(translatedText)) {
            return false;
        }
        
        // Check if translation contains expected script patterns
        const scriptPatterns = {
            hindi: /[\u0900-\u097F]/,
            gujarati: /[\u0A80-\u0AFF]/,
            punjabi: /[\u0A00-\u0A7F]/,
            malayalam: /[\u0D00-\u0D7F]/
        };
        
        const expectedPattern = scriptPatterns[targetLanguage];
        if (expectedPattern && !expectedPattern.test(translatedText)) {
            return false;
        }
        
        return true;
    }

    static isValidEnglishSentence(sentence) {
        if (!sentence || typeof sentence !== 'string') {
            return false;
        }

        // Check length
        if (sentence.length < 15 || sentence.length > 150) {
            return false;
        }

        // Check if it's mostly English characters
        const englishPattern = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
        if (!englishPattern.test(sentence)) {
            return false;
        }

        // Check for Latin words that indicate it's not proper English
        const latinWords = /\b(lorem|ipsum|dolor|sit|amet|consectetur|adipiscing|elit|sed|eiusmod|tempor|incididunt|labore|dolore|magna|aliqua|enim|minim|veniam|quis|nostrud|exercitation|ullamco|laboris|nisi|aliquip|commodo|consequat|duis|aute|irure|reprehenderit|voluptate|velit|esse|cillum|fugiat|nulla|pariatur|excepteur|sint|occaecat|cupidatat|non|proident|sunt|culpa|qui|officia|deserunt|mollit|anim|est|et|quia|aut|dicta|sunt|explicabo|nemo|ipsam|voluptatem|quia|voluptas|aspernatur|aut|odit|aut|fugit)\b/i;
        if (latinWords.test(sentence)) {
            return false;
        }

        // Must contain at least a few common English words
        const commonEnglishWords = /\b(the|and|or|but|in|on|at|to|for|of|with|by|from|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|must|can|this|that|these|those|a|an|all|any|some|many|much|more|most|people|time|way|day|man|thing|world|life|hand|part|child|place|work|week|case|point|government|company|number|group|problem|fact)\b/i;
        if (!commonEnglishWords.test(sentence)) {
            return false;
        }

        return true;
    }

    static getFallbackSentence() {
        const fallbackSentences = [
            "The sun rises in the east every morning.",
            "Books are windows to different worlds.",
            "Music speaks where words fail completely.",
            "Time heals all wounds gradually.",
            "Knowledge is power in all situations.",
            "Dreams are the seeds of reality.",
            "Patience is a virtue worth cultivating.",
            "Love conquers all obstacles eventually.",
            "The ocean waves crash against the shore.",
            "Mountains stand tall against the sky.",
            "Children play happily in the garden.",
            "Birds sing beautiful songs at dawn.",
            "Flowers bloom brightly in spring weather.",
            "Stars shine brilliantly in the darkness.",
            "Rivers flow peacefully through the valley.",
            "Trees provide shade during hot summer.",
            "Fire burns warmly in the fireplace.",
            "Snow falls gently on the ground.",
            "Wind carries the scent of roses.",
            "Houses line the quiet village street.",
            "Cars drive slowly through the city.",
            "People walk together in the park.",
            "Dogs run freely across the field.",
            "Cats sleep peacefully by the window."
        ];
        const selected = fallbackSentences[RandomSeed.getRandomIndex(fallbackSentences.length)];
        return selected;
    }

    static getFallbackTranslation(word, language) {
        // Extended fallback translations for common words
        const translations = {
            hindi: {
                'sun': 'सूर्य', 'book': 'किताब', 'music': 'संगीत', 'time': 'समय',
                'love': 'प्रेम', 'water': 'पानी', 'house': 'घर', 'tree': 'पेड़',
                'life': 'जीवन', 'world': 'संसार', 'heart': 'दिल', 'mind': 'मन',
                'dream': 'सपना', 'hope': 'आशा', 'peace': 'शांति', 'story': 'कहानी',
                'moment': 'पल', 'person': 'व्यक्ति', 'place': 'जगह', 'work': 'काम',
                'day': 'दिन', 'night': 'रात', 'year': 'साल', 'country': 'देश',
                'ocean': 'समुद्र', 'mountain': 'पहाड़', 'children': 'बच्चे', 'birds': 'पक्षी',
                'flowers': 'फूल', 'stars': 'तारे', 'rivers': 'नदियां', 'fire': 'आग',
                'snow': 'बर्फ', 'wind': 'हवा', 'cars': 'गाड़ियां', 'people': 'लोग',
                'dogs': 'कुत्ते', 'cats': 'बिल्लियां', 'books': 'किताबें', 'waves': 'लहरें',
                'elephant': 'हाथी', 'dragon': 'अजगर', 'robot': 'यंत्र', 'castle': 'महल',
                'party': 'पार्टी', 'pizza': 'पिज्जा', 'toothbrush': 'टूथब्रश', 'banana': 'केला',
                'monkey': 'बंदर', 'rocket': 'रॉकेट', 'clouds': 'बादल', 'apple': 'सेब',
                'cheese': 'पनीर', 'spoon': 'चम्मच', 'adventure': 'रोमांच', 'magic': 'जादू',
                'city': 'शहर', 'park': 'पार्क', 'field': 'खेत', 'window': 'खिड़की'
            },
            gujarati: {
                'sun': 'સૂર્ય', 'book': 'પુસ્તક', 'music': 'સંગીત', 'time': 'સમય',
                'love': 'પ્રેમ', 'water': 'પાણી', 'house': 'ઘર', 'tree': 'વૃક્ષ',
                'life': 'જીવન', 'world': 'દુનિયા', 'heart': 'હૃદય', 'mind': 'મન',
                'dream': 'સ્વપ્ન', 'hope': 'આશા', 'peace': 'શાંતિ', 'story': 'વાર્તા',
                'moment': 'ક્ષણ', 'person': 'વ્યક્તિ', 'place': 'સ્થળ', 'work': 'કામ',
                'day': 'દિવસ', 'night': 'રાત', 'year': 'વર્ષ', 'country': 'દેશ',
                'ocean': 'સમુદ્ર', 'mountain': 'પર્વત', 'children': 'બાળકો', 'birds': 'પક્ષીઓ',
                'flowers': 'ફૂલો', 'stars': 'તારાઓ', 'rivers': 'નદીઓ', 'fire': 'અગ્નિ',
                'snow': 'બરફ', 'wind': 'પવન', 'cars': 'ગાડીઓ', 'people': 'લોકો',
                'dogs': 'કૂતરાઓ', 'cats': 'બિલાડીઓ', 'books': 'પુસ્તકો', 'waves': 'મોજાં'
            },
            punjabi: {
                'sun': 'ਸੂਰਜ', 'book': 'ਕਿਤਾਬ', 'music': 'ਸੰਗੀਤ', 'time': 'ਸਮਾਂ',
                'love': 'ਪਿਆਰ', 'water': 'ਪਾਣੀ', 'house': 'ਘਰ', 'tree': 'ਰੁੱਖ',
                'life': 'ਜ਼ਿੰਦਗੀ', 'world': 'ਸੰਸਾਰ', 'heart': 'ਦਿਲ', 'mind': 'ਦਿਮਾਗ',
                'dream': 'ਸੁਪਨਾ', 'hope': 'ਉਮੀਦ', 'peace': 'ਸ਼ਾਂਤੀ', 'story': 'ਕਹਾਣੀ',
                'moment': 'ਪਲ', 'person': 'ਵਿਅਕਤੀ', 'place': 'ਜਗ੍ਹਾ', 'work': 'ਕੰਮ',
                'day': 'ਦਿਨ', 'night': 'ਰਾਤ', 'year': 'ਸਾਲ', 'country': 'ਦੇਸ਼',
                'ocean': 'ਸਮੁੰਦਰ', 'mountain': 'ਪਹਾੜ', 'children': 'ਬੱਚੇ', 'birds': 'ਪੰਛੀ',
                'flowers': 'ਫੁੱਲ', 'stars': 'ਤਾਰੇ', 'rivers': 'ਨਦੀਆਂ', 'fire': 'ਅੱਗ',
                'snow': 'ਬਰਫ਼', 'wind': 'ਹਵਾ', 'cars': 'ਗੱਡੀਆਂ', 'people': 'ਲੋਕ',
                'dogs': 'ਕੁੱਤੇ', 'cats': 'ਬਿੱਲੇ', 'books': 'ਕਿਤਾਬਾਂ', 'waves': 'ਲਹਿਰਾਂ'
            },
            malayalam: {
                'sun': 'സൂര്യൻ', 'book': 'പുസ്തകം', 'music': 'സംഗീതം', 'time': 'സമയം',
                'love': 'സ്നേഹം', 'water': 'വെള്ളം', 'house': 'വീട്', 'tree': 'മരം',
                'life': 'ജീവിതം', 'world': 'ലോകം', 'heart': 'ഹൃദയം', 'mind': 'മനസ്സ്',
                'dream': 'സ്വപ്നം', 'hope': 'പ്രതീക്ഷ', 'peace': 'സമാധാനം', 'story': 'കഥ',
                'moment': 'നിമിഷം', 'person': 'വ്യക്തി', 'place': 'സ്ഥലം', 'work': 'ജോലി',
                'day': 'ദിവസം', 'night': 'രാത്രി', 'year': 'വർഷം', 'country': 'രാജ്യം',
                'ocean': 'സമുദ്രം', 'mountain': 'മല', 'children': 'കുട്ടികൾ', 'birds': 'പക്ഷികൾ',
                'flowers': 'പൂക്കൾ', 'stars': 'നക്ഷത്രങ്ങൾ', 'rivers': 'നദികൾ', 'fire': 'തീ',
                'snow': 'മഞ്ഞ്', 'wind': 'കാറ്റ്', 'cars': 'കാറുകൾ', 'people': 'ആളുകൾ',
                'dogs': 'നായ്ക്കൾ', 'cats': 'പൂച്ചകൾ', 'books': 'പുസ്തകങ്ങൾ', 'waves': 'തിരമാലകൾ'
            }
        };
        
        const translation = translations[language]?.[word.toLowerCase()];
        return translation || word;
    }
}

/* =========================
   Google Cloud Text-to-Speech Service
   ========================= */
class GoogleTTSService {
    static async synthesizeSpeech(text, languageConfig) {
        try {
            const requestBody = {
                input: { text: text },
                voice: {
                    languageCode: languageConfig.languageCode,
                    name: languageConfig.name,
                    ssmlGender: languageConfig.ssmlGender
                },
                audioConfig: {
                    audioEncoding: 'MP3',
                    speakingRate: 0.8,
                    pitch: 0.0,
                    volumeGainDb: 0.0
                }
            };

            const response = await fetch(`${GOOGLE_TTS_CONFIG.url}?key=${GOOGLE_TTS_CONFIG.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Google TTS API responded with status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.audioContent) {
                return data.audioContent;
            } else {
                throw new Error('No audio content in response');
            }
        } catch (error) {
            throw error;
        }
    }

    static async playAudioContent(base64Audio) {
        return new Promise((resolve, reject) => {
            try {
                const audioBlob = this.base64ToBlob(base64Audio, 'audio/mpeg');
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };
                
                audio.onerror = (error) => {
                    URL.revokeObjectURL(audioUrl);
                    reject(error);
                };
                
                audio.play();
            } catch (error) {
                reject(error);
            }
        });
    }

    static base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }
}

/* =========================
   Speech Synthesis Module
   ========================= */
class SpeechService {
    static async speak(text, language = 'en-US', rate = 0.8, fallbackLanguage = null) {
        // Try Google TTS first for ALL languages if API key is configured
        if (GOOGLE_TTS_CONFIG.apiKey !== 'AIzaSyATHAEIvVHiE5h49pdIgnkYbM4GZVucRqE') {
            let targetLang = null;
            
            // Find matching language config
            if (language === 'en-US' || language === 'en') {
                targetLang = 'english';
            } else {
                targetLang = Object.keys(LANGUAGE_CONFIG).find(lang => 
                    LANGUAGE_CONFIG[lang].voice === language || 
                    LANGUAGE_CONFIG[lang].fallbackVoice === language ||
                    language.startsWith(LANGUAGE_CONFIG[lang].code)
                );
            }
            
            if (targetLang && LANGUAGE_CONFIG[targetLang].googleTTS) {
                try {
                    const audioContent = await GoogleTTSService.synthesizeSpeech(
                        text, 
                        LANGUAGE_CONFIG[targetLang].googleTTS
                    );
                    await GoogleTTSService.playAudioContent(audioContent);
                    return;
                } catch (error) {
                    // Continue to browser TTS fallback below
                }
            }
        }

        // Fallback to browser TTS
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }

            speechSynthesis.cancel();

            const voices = speechSynthesis.getVoices();
            
            const availableVoice = voices.find(voice => 
                voice.lang.startsWith(language.split('-')[0]) || 
                voice.lang === language
            );
            
            if (!availableVoice) {
                if (fallbackLanguage && fallbackLanguage !== language) {
                    return this.speak(text, fallbackLanguage, rate).then(resolve);
                }
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.rate = rate;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            if (availableVoice) {
                utterance.voice = availableVoice;
            }

            let resolved = false;
            
            utterance.onend = () => {
                if (!resolved) {
                    resolved = true;
                    resolve();
                }
            };
            
            utterance.onerror = (event) => {
                if (!resolved) {
                    resolved = true;
                    if (fallbackLanguage && fallbackLanguage !== language) {
                        this.speak(text, fallbackLanguage, rate).then(resolve);
                    } else {
                        resolve();
                    }
                }
            };

            speechSynthesis.speak(utterance);
            
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    resolve();
                }
            }, 5000);
        });
    }

    static async speakSentenceWithWord(htmlSentence, foreignWord, targetLanguage) {
        try {
            const englishSentence = htmlSentence
                .replace(/<span class="foreign-word">.*?<\/span>/g, '[FOREIGN_WORD]')
                .replace(/<[^>]*>/g, '');
            
            const parts = englishSentence.split('[FOREIGN_WORD]');
            
            // Speak first part in English
            if (parts[0].trim()) {
                await this.speak(parts[0].trim(), 'en-US', 0.7);
            }
            
            // Speak the foreign word in target language with fallback
            const langConfig = LANGUAGE_CONFIG[targetLanguage];
            const voiceCode = langConfig.voice;
            const fallbackVoice = langConfig.fallbackVoice;
            
            await this.speak(foreignWord, voiceCode, 0.6, fallbackVoice);
            
            // Speak remaining part in English
            if (parts[1] && parts[1].trim()) {
                await this.speak(parts[1].trim(), 'en-US', 0.7);
            }
            
        } catch (error) {
            // Silent error handling
        }
    }

    static async speakEnglishSentence(htmlSentence, correctEnglishWord) {
        const englishSentence = htmlSentence
            .replace(/<span class="foreign-word">.*?<\/span>/g, correctEnglishWord)
            .replace(/<[^>]*>/g, '');
        
        await this.speak(englishSentence, 'en-US', 0.7);
    }
}

/* =========================
   API-Based Noun Detection Service
   ========================= */
class NounDetectionService {
    static async detectNouns(sentence) {
        // Try API-based noun detection first
        try {
            const nouns = await this.apiBasedNounDetection(sentence);
            if (nouns && nouns.length > 0) {
                return nouns;
            }
        } catch (error) {
            // Fallback to pattern-based detection
        }
        
        // Enhanced pattern-based detection as fallback
        return this.patternBasedNounDetection(sentence);
    }

    static async apiBasedNounDetection(sentence) {
        // Using a simple POS tagging approach with multiple APIs
        const apis = [
            {
                name: 'compromise',
                detect: this.compromiseNounDetection.bind(this)
            }
        ];

        for (const api of apis) {
            try {
                const result = await api.detect(sentence);
                if (result && result.length > 0) {
                    return result;
                }
            } catch (error) {
                continue;
            }
        }
        
        return null;
    }

    static compromiseNounDetection(sentence) {
        // Simple pattern-based noun detection inspired by compromise.js
        const words = sentence.split(/\s+/);
        const nouns = [];
        
        words.forEach((word, index) => {
            const cleanWord = word.replace(/[.,!?;:'"()]*$/g, '').replace(/^[.,!?;:'"()]*/g, '');
            
            if (this.isLikelyNoun(cleanWord, words, index)) {
                nouns.push({
                    word: word,
                    cleanWord: cleanWord,
                    position: index,
                    confidence: this.getNounConfidence(cleanWord, words, index)
                });
            }
        });
        
        return nouns;
    }

    static isLikelyNoun(word, words, position) {
        const cleanWord = word.toLowerCase();
        
        // Skip common words
        if (this.isCommonWord(cleanWord)) {
            return false;
        }
        
        // Must be alphabetic and reasonable length
        if (!/^[a-zA-Z]+$/.test(cleanWord) || cleanWord.length < 3) {
            return false;
        }
        
        // Check for noun patterns
        if (this.hasNounPattern(cleanWord)) {
            return true;
        }
        
        // Check context clues
        if (this.hasNounContext(words, position)) {
            return true;
        }
        
        // Check if it's in our concrete noun list
        if (this.isConcreteNoun(cleanWord)) {
            return true;
        }
        
        return false;
    }

    static hasNounPattern(word) {
        // Common noun endings
        const nounEndings = [
            /.*tion$/, /.*sion$/, /.*ment$/, /.*ness$/, /.*ity$/, 
            /.*ence$/, /.*ance$/, /.*er$/, /.*or$/, /.*ist$/,
            /.*dom$/, /.*ship$/, /.*hood$/, /.*age$/
        ];
        
        return nounEndings.some(pattern => pattern.test(word));
    }

    static hasNounContext(words, position) {
        // Check for determiner before the word
        const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their'];
        if (position > 0 && determiners.includes(words[position - 1].toLowerCase())) {
            return true;
        }
        
        // Check for adjective before the word
        const commonAdjectives = ['big', 'small', 'good', 'bad', 'new', 'old', 'young', 'beautiful', 'ugly', 'happy', 'sad', 'red', 'blue', 'green'];
        if (position > 0 && commonAdjectives.includes(words[position - 1].toLowerCase())) {
            return true;
        }
        
        return false;
    }

    static isConcreteNoun(word) {
        const concreteNouns = [
            // Animals
            'elephant', 'giraffe', 'penguin', 'dolphin', 'whale', 'tiger', 'lion', 'zebra',
            'kangaroo', 'panda', 'monkey', 'hippo', 'crocodile', 'snake', 'turtle', 'frog',
            'butterfly', 'bee', 'ant', 'spider', 'bird', 'cat', 'dog', 'fish', 'horse',
            
            // Food items
            'pizza', 'sandwich', 'cake', 'cookie', 'bread', 'cheese', 'milk', 'coffee',
            'tea', 'juice', 'soup', 'apple', 'banana', 'orange', 'carrot', 'potato',
            
            // Objects
            'computer', 'phone', 'television', 'car', 'bicycle', 'house', 'door', 'window',
            'table', 'chair', 'book', 'pencil', 'pen', 'paper', 'mirror', 'clock',
            
            // Places
            'school', 'park', 'library', 'restaurant', 'hospital', 'store', 'beach', 'mountain',
            'forest', 'desert', 'city', 'village', 'country', 'planet', 'moon', 'sun',
            
            // Fantasy/Fun
            'dragon', 'unicorn', 'wizard', 'fairy', 'robot', 'alien', 'monster', 'ghost',
            'castle', 'treasure', 'magic', 'portal', 'spaceship', 'rocket'
        ];
        
        return concreteNouns.includes(word.toLowerCase());
    }

    static getNounConfidence(word, words, position) {
        let confidence = 0;
        
        if (this.isConcreteNoun(word)) confidence += 0.8;
        if (this.hasNounPattern(word)) confidence += 0.6;
        if (this.hasNounContext(words, position)) confidence += 0.7;
        
        // Reduce confidence for verb-like words
        const verbEndings = [/.*ing$/, /.*ed$/, /.*ly$/];
        if (verbEndings.some(pattern => pattern.test(word.toLowerCase()))) {
            confidence -= 0.4;
        }
        
        return Math.max(0, Math.min(1, confidence));
    }

    static isCommonWord(word) {
        const commonWords = [
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
            'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
            'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
            'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
            'this', 'that', 'these', 'those', 'a', 'an', 'all', 'any', 'some', 'many',
            'what', 'which', 'who', 'when', 'where', 'why', 'how', 'very', 'too', 'quite',
            'good', 'bad', 'big', 'small', 'new', 'old', 'right', 'left', 'first', 'last'
        ];
        return commonWords.includes(word.toLowerCase());
    }

    static patternBasedNounDetection(sentence) {
        // Enhanced fallback detection
        const words = sentence.split(/\s+/);
        const nouns = [];
        
        words.forEach((word, index) => {
            const cleanWord = word.replace(/[.,!?;:'"()]*$/g, '').replace(/^[.,!?;:'"()]*/g, '');
            
            if (cleanWord.length >= 3 && 
                /^[a-zA-Z]+$/.test(cleanWord) && 
                !this.isCommonWord(cleanWord.toLowerCase())) {
                
                if (this.isLikelyNoun(cleanWord, words, index)) {
                    nouns.push({
                        word: word,
                        cleanWord: cleanWord,
                        position: index,
                        confidence: this.getNounConfidence(cleanWord, words, index)
                    });
                }
            }
        });
        
        return nouns;
    }
}

/* =========================
   Sentence Processing Module
   ========================= */
class SentenceProcessor {
    static async createGameSentence(originalSentence, targetLanguage) {
        // Use API-based noun detection for better accuracy
        const nounsWithPositions = await NounDetectionService.detectNouns(originalSentence);
        
        let selectedWord = null;
        
        if (nounsWithPositions.length > 0) {
            // Enhanced randomization - select from ALL detected nouns
            const randomIndex = RandomSeed.getRandomIndex(nounsWithPositions.length);
            selectedWord = nounsWithPositions[randomIndex].word;
        } else {
            // Enhanced fallback selection
            const words = originalSentence.split(/\s+/);
            const fallbackWords = words.filter(word => {
                const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                return cleanWord.length >= 4 && 
                       !NounDetectionService.isCommonWord(cleanWord.toLowerCase()) &&
                       /^[a-zA-Z]+$/.test(cleanWord);
            });
            
            if (fallbackWords.length > 0) {
                selectedWord = fallbackWords[RandomSeed.getRandomIndex(fallbackWords.length)];
            } else {
                throw new Error('No suitable words found for translation in sentence');
            }
        }

        const cleanWord = selectedWord.replace(/[^a-zA-Z]/g, '');
        
        // Translate the word
        let translatedWord;
        try {
            translatedWord = await APIService.translateText(cleanWord, targetLanguage);
            if (!translatedWord || translatedWord === cleanWord) {
                translatedWord = APIService.getFallbackTranslation(cleanWord, targetLanguage);
            }
        } catch (error) {
            translatedWord = APIService.getFallbackTranslation(cleanWord, targetLanguage);
        }
        
        // Enhanced word replacement with multiple strategies
        let modifiedSentence = null;
        let replacementWorked = false;
        
        // Strategy 1: Exact word boundary matching
        const wordPattern = new RegExp(`\\b${this.escapeRegex(selectedWord)}\\b`, 'gi');
        modifiedSentence = originalSentence.replace(
            wordPattern,
            `<span class="foreign-word">${translatedWord}</span>`
        );
        
        if (modifiedSentence.includes('<span class="foreign-word">')) {
            replacementWorked = true;
        } else {
            // Strategy 2: Case-insensitive exact match
            const simplePattern = new RegExp(this.escapeRegex(selectedWord), 'gi');
            modifiedSentence = originalSentence.replace(
                simplePattern,
                `<span class="foreign-word">${translatedWord}</span>`
            );
            
            if (modifiedSentence.includes('<span class="foreign-word">')) {
                replacementWorked = true;
            } else {
                // Strategy 3: Clean word replacement
                const cleanWordPattern = new RegExp(`\\b${this.escapeRegex(cleanWord)}\\b`, 'gi');
                modifiedSentence = originalSentence.replace(
                    cleanWordPattern,
                    `<span class="foreign-word">${translatedWord}</span>`
                );
                
                if (modifiedSentence.includes('<span class="foreign-word">')) {
                    replacementWorked = true;
                }
            }
        }

        return {
            sentence: modifiedSentence,
            originalWord: cleanWord,
            translatedWord: translatedWord,
            correctAnswer: cleanWord
        };
    }

    static escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    static async generateWrongAnswers(correctAnswer) {
        const wrongAnswers = [];
        const correctLower = correctAnswer.toLowerCase();
        
        // Method 1: Generate semantically related words
        const relatedWords = await this.getRelatedWords(correctLower);
        wrongAnswers.push(...relatedWords.slice(0, 1));
        
        // Method 2: Generate random words with similar characteristics  
        const randomWords = this.getRandomWords(correctLower.length);
        wrongAnswers.push(...randomWords.slice(0, 1));
        
        // Ensure we have exactly 2 wrong answers
        while (wrongAnswers.length < 2) {
            wrongAnswers.push(this.generateSimilarWord(correctLower));
        }
        
        // Ensure all answers are lowercase and properly randomized
        return RandomSeed.shuffleArray(wrongAnswers.slice(0, 2).map(w => w.toLowerCase()));
    }

    static async getRelatedWords(word) {
        const wordCategories = {
            'dragon': ['wizard', 'castle', 'magic'],
            'pirates': ['treasure', 'ship', 'ocean'],
            'unicorn': ['rainbow', 'fairy', 'magic'],
            'monkey': ['banana', 'jungle', 'tree'],
            'rocket': ['astronaut', 'space', 'stars'],
            'robot': ['computer', 'machine', 'helper'],
            'kitten': ['puppy', 'bunny', 'hamster'],
            'butterfly': ['flower', 'garden', 'rainbow'],
            'elephant': ['jungle', 'peanut', 'trunk'],
            'castle': ['knight', 'princess', 'tower']
        };
        
        return wordCategories[word.toLowerCase()] || ['object', 'thing', 'item'];
    }

    static getRandomWords(length) {
        const commonNouns = [
            'robot', 'castle', 'kitten', 'puppy', 'wizard', 'fairy', 'tiger',
            'elephant', 'butterfly', 'rainbow', 'treasure', 'magic', 'adventure',
            'balloon', 'cookie', 'sandwich', 'bicycle', 'playground', 'puzzle'
        ];
        
        // Filter by similar length and use enhanced randomization
        const similarLength = commonNouns.filter(word => 
            Math.abs(word.length - length) <= 2
        );
        
        return RandomSeed.shuffleArray(similarLength).slice(0, 3);
    }

    static generateSimilarWord(word) {
        const alternatives = ['friend', 'helper', 'buddy', 'pal', 'companion'];
        return alternatives[RandomSeed.getRandomIndex(alternatives.length)];
    }

    static shuffleArray(array) {
        return RandomSeed.shuffleArray(array);
    }
}

/* =========================
   Game Controller Module
   ========================= */
class GameController {
    constructor() {
        this.gameState = new GameState();
        this.init();
    }

    init() {
        this.initializeSpeechVoices();
        this.setupEventListeners();
        this.loadNewSentence();
    }

    initializeSpeechVoices() {
        if ('speechSynthesis' in window) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                // Voices loaded
            });
        }
    }

    setupEventListeners() {
        // Language selector
        document.getElementById('languageSelector').addEventListener('change', (e) => {
            this.gameState.setLanguage(e.target.value);
            this.loadNewSentence();
        });

        // Option buttons
        document.querySelectorAll('.option-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                if (!this.gameState.isAnswered) {
                    this.checkAnswer(index);
                }
            });
        });

        // Keyboard shortcuts (1, 2, 3)
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '3' && !this.gameState.isAnswered) {
                const index = parseInt(e.key) - 1;
                this.checkAnswer(index);
            }
        });

        // Control buttons
        document.getElementById('speakButton').addEventListener('click', () => {
            this.speakCurrentSentence();
        });

        document.getElementById('nextSentenceButton').addEventListener('click', () => {
            this.loadNewSentence();
        });
    }

    async loadNewSentence() {
        let retries = 3;
        
        while (retries > 0) {
            try {
                this.showLoading();
                
                // Fetch a fresh sentence with enhanced randomization
                const originalSentence = await APIService.fetchRandomQuote();
                
                // Process it for the game
                const gameData = await SentenceProcessor.createGameSentence(
                    originalSentence, 
                    this.gameState.currentLanguage
                );
                
                // Verify we got a valid result
                if (!gameData.sentence.includes('<span class="foreign-word">')) {
                    throw new Error('Failed to create proper game sentence');
                }
                
                // Generate wrong answers
                const wrongAnswers = await SentenceProcessor.generateWrongAnswers(
                    gameData.correctAnswer
                );
                
                // Store game state with enhanced randomization
                this.gameState.currentSentence = gameData;
                this.gameState.currentOptions = RandomSeed.shuffleArray([
                    gameData.correctAnswer.toLowerCase(),
                    ...wrongAnswers
                ]);
                this.gameState.isAnswered = false;
                
                // Update UI
                this.updateSentenceDisplay(gameData.sentence);
                this.updateOptionsDisplay();
                this.clearFeedback();
                
                // Success - break out of retry loop
                return;
                
            } catch (error) {
                retries--;
                
                if (retries === 0) {
                    // All retries failed, show error and create a fallback sentence
                    this.createFallbackSentence();
                } else {
                    // Wait a bit before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    }

    createFallbackSentence() {
        try {
            const fallbackSentences = [
                { text: "The friendly dragon loves to eat chocolate cookies.", word: "dragon" },
                { text: "Brave pirates found a treasure chest full of golden coins.", word: "pirates" },
                { text: "The magical unicorn danced through the rainbow forest.", word: "unicorn" },
                { text: "A curious monkey swung from tree to tree in the jungle.", word: "monkey" },
                { text: "The space rocket zoomed past twinkling stars.", word: "rocket" }
            ];
            
            const selected = fallbackSentences[RandomSeed.getRandomIndex(fallbackSentences.length)];
            const translation = APIService.getFallbackTranslation(selected.word, this.gameState.currentLanguage);
            
            const gameData = {
                sentence: selected.text.replace(selected.word, `<span class="foreign-word">${translation}</span>`),
                originalWord: selected.word,
                translatedWord: translation,
                correctAnswer: selected.word
            };
            
            const wrongAnswers = ['castle', 'robot', 'kitten'].filter(w => w !== selected.word).slice(0, 2);
            
            this.gameState.currentSentence = gameData;
            this.gameState.currentOptions = RandomSeed.shuffleArray([
                gameData.correctAnswer.toLowerCase(),
                ...wrongAnswers
            ]);
            this.gameState.isAnswered = false;
            
            this.updateSentenceDisplay(gameData.sentence);
            this.updateOptionsDisplay();
            this.clearFeedback();
            
        } catch (error) {
            this.showError('Unable to load content. Please refresh the page.');
        }
    }

    showLoading() {
        document.getElementById('sentence').innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i> Loading new sentence...';
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.disabled = true;
            btn.querySelector('.option-text').textContent = '...';
        });
    }

    updateSentenceDisplay(sentence) {
        document.getElementById('sentence').innerHTML = sentence;
    }

    updateOptionsDisplay() {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach((button, index) => {
            button.disabled = false;
            button.className = 'option-button';
            button.querySelector('.option-text').textContent = this.gameState.currentOptions[index];
        });
    }

    clearFeedback() {
        const feedback = document.getElementById('feedback');
        feedback.textContent = '';
        feedback.className = '';
    }

    checkAnswer(optionIndex) {
        const selectedAnswer = this.gameState.currentOptions[optionIndex];
        const correctAnswer = this.gameState.currentSentence.correctAnswer;
        const feedback = document.getElementById('feedback');
        const buttons = document.querySelectorAll('.option-button');
        
        this.gameState.isAnswered = true;
        
        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);
        
        if (selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            // Correct answer
            buttons[optionIndex].classList.add('correct');
            feedback.textContent = `Correct! "${this.gameState.currentSentence.translatedWord}" means "${correctAnswer}"`;
            feedback.className = 'correct-text';
            this.gameState.incrementCorrect();
        } else {
            // Wrong answer
            buttons[optionIndex].classList.add('incorrect');
            
            // Highlight correct answer
            const correctIndex = this.gameState.currentOptions.findIndex(opt => 
                opt.toLowerCase() === correctAnswer.toLowerCase()
            );
            if (correctIndex !== -1) {
                buttons[correctIndex].classList.add('correct');
            }
            
            feedback.textContent = `Incorrect. "${this.gameState.currentSentence.translatedWord}" means "${correctAnswer}"`;
            feedback.className = 'incorrect-text';
            this.gameState.incrementIncorrect();
        }
        
        // Auto-advance after delay
        setTimeout(() => {
            this.loadNewSentence();
        }, 2500);
    }

    speakCurrentSentence() {
        if (this.gameState.currentSentence) {
            SpeechService.speakSentenceWithWord(
                this.gameState.currentSentence.sentence,
                this.gameState.currentSentence.translatedWord,
                this.gameState.currentLanguage
            );
        }
    }

    showError(message) {
        document.getElementById('sentence').innerHTML = 
            `<div style="color: var(--error-color);">${message}</div>`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
});