/**
 * FlipbookPreview.js - Slide preview modal functionality
 * Handles the preview modal for individual slides
 */

class FlipbookPreview {
    constructor(core) {
        this.core = core;
        this.bindPreviewEvents();
    }

    bindPreviewEvents() {
        // Preview modal events
        document.getElementById("closePreview")
            .addEventListener("click", () => this.closeSlidePreview());
        document.getElementById("overlay")
            .addEventListener("click", () => this.closeSlidePreview());

        // Close preview on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeSlidePreview();
            }
        });
    }

    showSlidePreview(slideNumber) {
        const previewImage = document.getElementById("previewImage");
        const slidePreview = document.getElementById("slidePreview");
        const overlay = document.getElementById("overlay");

        // Use the same images from the slides/ directory
        previewImage.src = `compressed_slides/fintegrate-images-${slideNumber-1}-min.jpg`;
        previewImage.alt = `Slide ${slideNumber} Preview`;

        // Handle error if image is not found
        previewImage.onerror = () => {
            previewImage.src = this.core.createPlaceholderImage(slideNumber);
        };

        // Show preview with animation
        slidePreview.classList.add("active");
        overlay.classList.add("active");

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
    }

    closeSlidePreview() {
        const slidePreview = document.getElementById("slidePreview");
        const overlay = document.getElementById("overlay");

        slidePreview.classList.remove("active");
        overlay.classList.remove("active");

        // Restore body scroll
        document.body.style.overflow = "auto";
    }
}