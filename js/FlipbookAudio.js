/**
 * FlipbookAudio.js - Audio functionality
 * Handles sound effects and audio controls
 */

class FlipbookAudio {
    constructor() {
        this.soundEnabled = true;
        this.audioContext = null;
        this.createAudioContext();
        this.bindAudioEvents();
    }

    createAudioContext() {
        // Create audio context for flip sound
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log("Audio not supported");
        }
    }

    bindAudioEvents() {
        // Sound toggle button
        document.getElementById("soundToggle")
            .addEventListener("click", () => this.toggleSound());
    }

    playFlipSound() {
        if (!this.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Create flip sound effect
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(
                200,
                this.audioContext.currentTime + 0.1
            );

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                this.audioContext.currentTime + 0.1
            );

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (e) {
            console.log("Sound play failed");
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById("soundToggle");

        if (this.soundEnabled) {
            soundBtn.innerHTML = "🔊 Sound";
            soundBtn.classList.remove("muted");
        } else {
            soundBtn.innerHTML = "🔇 Muted";
            soundBtn.classList.add("muted");
        }

        // Save preference to localStorage if available
        try {
            localStorage.setItem('flipbook-sound', this.soundEnabled);
        } catch (e) {
            // localStorage not available
        }
    }

    loadSoundPreference() {
        try {
            const savedPreference = localStorage.getItem('flipbook-sound');
            if (savedPreference !== null) {
                this.soundEnabled = savedPreference === 'true';
                this.updateSoundButton();
            }
        } catch (e) {
            // localStorage not available
        }
    }

    updateSoundButton() {
        const soundBtn = document.getElementById("soundToggle");
        if (this.soundEnabled) {
            soundBtn.innerHTML = "🔊 Sound";
            soundBtn.classList.remove("muted");
        } else {
            soundBtn.innerHTML = "🔇 Muted";
            soundBtn.classList.add("muted");
        }
    }
}