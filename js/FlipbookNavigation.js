/**
 * FlipbookNavigation.js - Navigation and control functionality
 * Handles page navigation, navigation dots, and UI controls
 */

class FlipbookNavigation {
    constructor(core) {
        this.core = core;
        this.bindNavigationEvents();
        this.createNavigationDots();
    }

    bindNavigationEvents() {
        // Navigation buttons
        document.getElementById("nextPage")
            .addEventListener("click", () => this.nextPage());
        document.getElementById("prevPage")
            .addEventListener("click", () => this.prevPage());
        document.getElementById("firstPage")
            .addEventListener("click", () => this.core.goToPage(1));
        document.getElementById("lastPage")
            .addEventListener("click", () => this.core.goToPage(this.core.totalPages));

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                this.nextPage();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                this.prevPage();
            }
        });

        // Swipe gestures for mobile
        this.addSwipeGestures();
    }

    addSwipeGestures() {
        let startX = 0;
        let startY = 0;

        this.core.flipbook.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.core.flipbook.addEventListener("touchend", (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextPage();
                } else {
                    this.prevPage();
                }
            }
        });
    }

    nextPage() {
        if (this.core.currentPage < this.core.totalPages) {
            this.core.goToPage(this.core.currentPage + 2);
            this.updateNavigationState();
        }
    }

    prevPage() {
        if (this.core.currentPage > 1) {
            this.core.goToPage(this.core.currentPage - 2);
            this.updateNavigationState();
        }
    }

    createNavigationDots() {
        const dotsContainer = document.getElementById("navigationDots");
        const maxDots = Math.min(15, this.core.totalPages);
        const step = Math.ceil(this.core.totalPages / maxDots);

        for (let i = 1; i <= this.core.totalPages; i += step) {
            const dot = document.createElement("div");
            dot.className = "dot";
            if (i === 1) dot.classList.add("active");

            dot.addEventListener("click", () => {
                this.core.goToPage(i);
                this.updateNavigationState();
            });

            dotsContainer.appendChild(dot);
        }
    }

    updateNavigationState() {
        // Update navigation buttons
        document.getElementById("prevPage").disabled = this.core.currentPage === 1;
        document.getElementById("firstPage").disabled = this.core.currentPage === 1;
        document.getElementById("nextPage").disabled = this.core.currentPage === this.core.totalPages;
        document.getElementById("lastPage").disabled = this.core.currentPage === this.core.totalPages;

        // Update navigation dots
        this.updateNavigationDots();
    }

    updateNavigationDots() {
        const dots = document.querySelectorAll(".dot");
        const maxDots = dots.length;
        const step = Math.ceil(this.core.totalPages / maxDots);

        dots.forEach((dot, index) => {
            const pageForDot = index * step + 1;
            dot.classList.toggle(
                "active",
                this.core.currentPage >= pageForDot &&
                this.core.currentPage < pageForDot + step
            );
        });
    }
}