# Learn Indian Scripts - Interactive Language Learning Platform

A comprehensive browser-based platform designed to help children and adults learn Indian scripts through two engaging game modes. The platform supports Hindi, Gujarati, Punjabi, and Malayalam with professional-quality speech synthesis.

---

## 🎮 Game Modes

### 1. Script Flashcards Game (`game.html`)
Interactive flashcard system for learning individual letters and characters.

**Features:**
- **Progressive difficulty** with 3 levels (vowels → matras → conjuncts)
- **Voice recognition** for pronunciation practice
- **Speech synthesis** with browser TTS and Google Cloud TTS fallback
- **Real-time timer** tracking average response time
- **Adaptive progression** - advance when meeting speed targets
- **Personalized greeting** with editable username
- **Comprehensive reference guide** modal with all scripts

**Gameplay:**
1. A random letter appears in large print
2. Player pronounces the letter (voice recognition or multiple choice)
3. Game tracks response time and accuracy
4. Auto-progression through difficulty levels
5. Pause/resume functionality with keyboard shortcuts

### 2. Learn Words in Context (`sentence-game.html`)
Contextual learning through entertaining sentences with foreign word integration.

**Features:**
- **1000+ varied sentences** including funny stories, riddles, famous quotes, and proverbs
- **Enhanced randomization** using crypto-based random seed for true randomness
- **API-based noun detection** with NLP service and pattern-based fallbacks
- **Position-independent word selection** - nouns selected from anywhere in sentences
- **Google Cloud Text-to-Speech** for professional audio quality with zero artificial delays
- **Google Translate API** integration for accurate translations
- **Multiple choice answers** with keyboard shortcuts (1, 2, 3)
- **Production-ready interface** with all debug code removed
- **Modular architecture** with separate service classes
- **Comprehensive fallback systems** for reliability

**Gameplay:**
1. Random sentence appears from database of 1000+ varied content
2. Random noun is selected from any position in the sentence using API detection
3. Audio plays sentence mixing English and foreign language with no delays
4. Player selects correct English meaning from 3 options
5. Immediate feedback with correct pronunciation
6. Automatic progression to new sentences with enhanced randomization

---

## 🌍 Supported Languages

- **Hindi** (हिन्दी) - Devanagari script
- **Gujarati** (ગુજરાતી) - Gujarati script  
- **Punjabi** (ਪੰਜਾਬੀ) - Gurmukhi script
- **Malayalam** (മലയാളം) - Malayalam script

Each language includes:
- Native Google Cloud TTS voices (Wavenet quality)
- Comprehensive character sets (vowels, consonants, matras)
- Cultural context and proper pronunciation

---

## ✨ Key Features

### User Experience
- **Clean, modern UI** with responsive design
- **Distraction-free interface** optimized for learning
- **Professional color scheme** with accessibility considerations
- **Mobile-friendly** design for tablets and phones
- **Real-time feedback** with visual and audio cues

### Technical Features
- **Google Cloud Integration**:
  - Text-to-Speech API with Wavenet voices
  - Translate API for accurate word translations
  - Fallback to browser APIs when cloud services unavailable
- **Advanced Randomization**:
  - Crypto-based random seed using `window.crypto.getRandomValues()`
  - Enhanced randomization for sentence selection and noun detection
  - True random distribution eliminating patterns and biases
- **API-Based NLP**:
  - Natural Language Processing API for intelligent noun detection
  - Position-independent word selection from entire sentences
  - Multiple API fallbacks with pattern-based detection as backup
- **Modular Architecture**:
  - Separate service classes for APIs, speech, sentence processing, and randomization
  - Clean separation of concerns with `RandomSeed` and `NounDetectionService` classes
  - Extensible design for additional languages and features
- **Robust Error Handling**:
  - Multiple API fallback chains
  - Graceful degradation when services fail
  - Production-ready with all debug code removed
- **Performance Optimized**:
  - Zero artificial delays between speech segments for smooth audio experience
  - Efficient caching and state management
  - Lightweight vanilla JavaScript implementation

### Educational Features
- **Progressive Difficulty**: Automatic advancement based on performance
- **Voice Recognition**: Browser-based speech recognition for pronunciation
- **Contextual Learning**: Words learned through entertaining stories
- **Multiple Learning Modes**: Visual, auditory, and interactive elements
- **Real-time Progress Tracking**: Statistics and performance metrics

---

## 🚀 Getting Started

### Basic Setup
1. **Clone or download** this repository
2. Open `index.html` in any modern web browser
3. Choose between "Script Flashcards" or "Learn Words in Context"
4. Select your target language and start learning!

### Google Cloud Setup (Optional but Recommended)
For professional-quality speech synthesis:

1. **Create Google Cloud Project**:
   - Enable Text-to-Speech API
   - Enable Translation API
   - Create API key with appropriate restrictions

2. **Configure API Key**:
   - Edit `assets/sentence-game.js`
   - Replace `GOOGLE_TTS_CONFIG.apiKey` with your key
   - Consider security restrictions for production use

3. **API Security** (Production):
   - Restrict API key to specific domains
   - Implement backend proxy for key protection
   - Monitor usage and set quotas

---

## 🕹️ Controls & Shortcuts

### Script Flashcards Game
| Action | Method |
|--------|--------|
| Next letter | Click anywhere / Space bar |
| Pause/Resume | Pause button / Space bar |
| Voice answer | Microphone button |
| Multiple choice | Click option / Number keys (1-3) |
| Reset progress | Reset button |
| Reference guide | Reference button |

### Sentence Game
| Action | Method |
|--------|--------|
| Select answer | Click option / Number keys (1-3) |
| Speak sentence | Speak button |
| Next sentence | Next button |
| Change language | Language dropdown |

---

## 🏗️ Architecture

### File Structure
```
├── index.html              # Main navigation page
├── game.html               # Script flashcards game
├── sentence-game.html      # Contextual learning game
├── assets/
│   ├── styles.css          # Shared styles
│   ├── game-*.js          # Flashcard game modules
│   ├── sentence-game.js    # Complete sentence game logic with enhanced features
│   └── sentences.json      # Database of 1000+ varied sentences
└── get-started/           # Informational pages
```

### Key Classes
- **RandomSeed**: Crypto-based randomization using `window.crypto.getRandomValues()`
- **NounDetectionService**: API-based noun detection with pattern fallbacks
- **GoogleTTSService**: Google Cloud Text-to-Speech integration
- **SpeechService**: Unified speech synthesis with fallbacks
- **APIService**: Translation and sentence fetching
- **SentenceProcessor**: Sentence parsing and word replacement
- **GameController**: Main game logic and state management

---

## 🔧 Recent Updates

### Major Feature Enhancements (Latest)
- **1000+ Sentence Database**: Created comprehensive JSON database with varied content including funny stories, riddles, famous quotes, and proverbs
- **Enhanced Randomization**: Implemented crypto-based random seed using `window.crypto.getRandomValues()` for true random distribution
- **API-Based Noun Detection**: Added NLP service for intelligent noun detection with multiple API fallbacks
- **Position-Independent Selection**: Nouns now selected from anywhere in sentences, not just the end
- **Zero Speech Delays**: Completely removed artificial pauses for smooth, natural audio experience
- **Production-Ready**: Removed all debug code, panels, and console logs for clean user interface

### Performance Improvements
- **Eliminated speech delays**: Removed 100ms pauses between language segments for seamless audio
- **True randomization**: Crypto-based seed prevents patterns in sentence and noun selection
- **Optimized API calls** with concurrent requests and intelligent fallbacks
- **Enhanced caching** for repeated translations and noun detection results

### User Experience Enhancements
- **Varied content**: 1000+ sentences spanning multiple genres and complexity levels
- **Improved randomization**: Each session feels unique with unpredictable sentence and noun selection
- **Clean interface**: Removed all debug information for distraction-free learning
- **Better navigation**: Clear separation between Script Flashcards and Context Game modes

### Technical Improvements
- **Modular NLP Architecture**: `NounDetectionService` class with API-based detection and pattern fallbacks
- **Advanced Randomization**: `RandomSeed` class implementing Fisher-Yates shuffle and crypto-based random generation
- **Production-grade code**: All debug tracking, console logs, and development artifacts removed
- **Robust error handling**: Multiple API chains with graceful degradation
- **Enhanced sentence processing**: Position-independent noun detection across entire sentence content

---

## 🗺️ Future Enhancements

### Planned Features
- **Additional Scripts**: Tamil, Telugu, Kannada, Bengali support
- **Offline Mode**: PWA with cached content for learning without internet
- **Progress Tracking**: User accounts with learning statistics and achievements
- **Adaptive AI**: Personalized difficulty adjustment based on individual progress
- **Social Features**: Leaderboards and sharing achievements

### Technical Roadmap
- **Backend Integration**: User authentication and progress persistence
- **Advanced Analytics**: Learning pattern analysis and recommendations
- **Mobile Apps**: Native iOS/Android applications
- **Teacher Dashboard**: Classroom management and student progress monitoring

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork the repository** & create your feature branch
2. **Follow the modular architecture** when adding new features
3. **Test thoroughly** across different browsers and devices
4. **Document your changes** in both code and README
5. **Submit a Pull Request** with clear description

### Development Guidelines
- Use vanilla JavaScript for maximum compatibility
- Follow existing code style and naming conventions
- Include error handling and fallback mechanisms
- Test with and without Google Cloud API access
- Ensure responsive design across device sizes

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Cloud Platform** for Text-to-Speech and Translation APIs
- **Font Awesome** for iconography
- **Google Fonts** for typography (Poppins font family)
- **Community contributors** for testing and feedback

---

*Happy Learning! 🌟*