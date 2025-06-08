// Voice recognition functionality for the language learning game
class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.micButton = document.getElementById('micButton');
        this.voiceFeedback = document.getElementById('voiceFeedback');
        this.isListening = false;
        this.onAnswerCallback = null;
        this.hasPermission = false;
        
        this.init();
    }

    async init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.setupRecognition();
            this.setupEventListeners();
            await this.checkMicrophonePermission();
        } else {
            this.handleUnsupportedBrowser();
        }
    }

    async checkMicrophonePermission() {
        try {
            // Request microphone permission once
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.hasPermission = true;
            // Stop the stream immediately after getting permission
            stream.getTracks().forEach(track => track.stop());
            this.micButton.style.display = 'flex';
        } catch (error) {
            this.hasPermission = false;
            this.micButton.style.display = 'none';
            this.voiceFeedback.textContent = 'Microphone access is required for voice recognition';
        }
    }

    setupRecognition() {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
            this.isListening = true;
            this.micButton.classList.add('listening');
            this.voiceFeedback.textContent = 'Listening...';
        };

        this.recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript.toLowerCase().trim();
            this.voiceFeedback.textContent = `You said: "${spokenText}"`;
            if (this.onAnswerCallback) {
                this.onAnswerCallback(spokenText);
            }
        };

        this.recognition.onerror = (event) => {
            if (event.error === 'not-allowed') {
                this.hasPermission = false;
                this.voiceFeedback.textContent = 'Microphone access is required for voice recognition';
                this.micButton.style.display = 'none';
            } else {
                this.voiceFeedback.textContent = 'Error occurred in recognition: ' + event.error;
            }
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    }

    setupEventListeners() {
        this.micButton.addEventListener('click', async () => {
            if (!this.hasPermission) {
                await this.checkMicrophonePermission();
                return;
            }
            
            if (!this.isListening) {
                this.startListening();
            } else {
                this.stopListening();
            }
        });
    }

    startListening() {
        if (this.recognition && this.hasPermission) {
            this.recognition.start();
        }
    }

    stopListening() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isListening = false;
        this.micButton.classList.remove('listening');
    }

    handleUnsupportedBrowser() {
        this.voiceFeedback.textContent = 'Speech recognition not supported in this browser';
        this.micButton.style.display = 'none';
    }

    setOnAnswerCallback(callback) {
        this.onAnswerCallback = callback;
    }

    isPaused() {
        return document.getElementById('pauseButton').textContent === 'Unpause';
    }
}

// Export the VoiceRecognition class
window.VoiceRecognition = VoiceRecognition; 