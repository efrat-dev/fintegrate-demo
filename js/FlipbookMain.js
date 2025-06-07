/**
 * FlipbookMain.js - Main flipbook class and initialization
 * Combines all modules and initializes the flipbook application
 */

class AdvancedFlipbook {
    constructor() {
        // Initialize core components
        this.core = new FlipbookCore();
        this.audio = new FlipbookAudio();
        this.navigation = new FlipbookNavigation(this.core);
        this.preview = new FlipbookPreview(this.core);
        
        // Initialize the application
        this.init();
    }

    init() {
        // Create initial slides
        this.core.createSlides();
        
        // Load user preferences
        this.audio.loadSoundPreference();
        
        // Update initial UI state
        this.updateUI();
        
        // Add method references to core for compatibility
        this.core.showSlidePreview = (slideNumber) => {
            this.preview.showSlidePreview(slideNumber);
        };

        // Override core goToPage to include audio
        const originalGoToPage = this.core.goToPage.bind(this.core);
        this.core.goToPage = (pageNumber) => {
            originalGoToPage(pageNumber);
            this.audio.playFlipSound();
            this.navigation.updateNavigationState();
        };

        console.log("Advanced Flipbook initialized successfully");
    }

    updateUI() {
        this.navigation.updateNavigationState();
    }

    // Public methods for external access
    nextPage() {
        this.navigation.nextPage();
    }

    prevPage() {
        this.navigation.prevPage();
    }

    goToPage(pageNumber) {
        this.core.goToPage(pageNumber);
    }

    toggleSound() {
        this.audio.toggleSound();
    }

    showSlidePreview(slideNumber) {
        this.preview.showSlidePreview(slideNumber);
    }

    closeSlidePreview() {
        this.preview.closeSlidePreview();
    }

    // Getters for accessing properties
    get currentPage() {
        return this.core.currentPage;
    }

    get totalPages() {
        return this.core.totalPages;
    }

    get soundEnabled() {
        return this.audio.soundEnabled;
    }
}

// Initialize the flipbook when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    window.flipbook = new AdvancedFlipbook();
});