/**
 * FlipbookCore.js - Core flipbook functionality
 * Contains the basic logic and page creation functionality
 */

class FlipbookCore {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 92;
        this.flipbook = document.getElementById("flipbook");
        
        this.init();
    }

    init() {
        // Update total pages display
        document.getElementById("totalPages").textContent = this.totalPages;
        document.getElementById("currentPage").textContent = this.currentPage;
    }

    createSlides() {
        this.flipbook.innerHTML = "";

        // Special case for first page - show only one page
        if (this.currentPage === 1) {
            this.createSinglePage(1, 'right');
            return;
        }

        let leftPageNum, rightPageNum;

        if (this.currentPage % 2 === 0) {
            // Even page number (2, 4, 6, 8...)
            leftPageNum = this.currentPage;
            rightPageNum = this.currentPage + 1;
        } else {
            // Odd page number (3, 5, 7, 9...)
            leftPageNum = this.currentPage - 1;
            rightPageNum = this.currentPage;
        }

        // Create left page
        const leftPage = this.createPageElement(leftPageNum, 'left', 2);
        
        // Create right page (only if it exists)
        if (rightPageNum <= this.totalPages) {
            const rightPage = this.createPageElement(rightPageNum, 'right', 1);
            this.flipbook.appendChild(leftPage);
            this.flipbook.appendChild(rightPage);
        } else {
            // Last page is odd, show only left page
            leftPage.style.margin = "0 auto";
            leftPage.style.transform = "translateX(50%)";
            this.flipbook.appendChild(leftPage);
        }
    }

    createSinglePage(pageNum, position) {
        const page = document.createElement("div");
        page.className = `page ${position}`;
        page.style.zIndex = 1;
        page.style.margin = "0 auto";
        page.style.transform = "translateX(-50%)";

        const img = this.createImageElement(pageNum);
        const pageNumber = this.createPageNumberElement(pageNum);

        page.appendChild(img);
        page.appendChild(pageNumber);

        page.addEventListener("click", (e) => {
            if (e.target.tagName === "IMG") {
                this.showSlidePreview(pageNum);
            }
        });

        this.flipbook.appendChild(page);
    }

    createPageElement(pageNum, position, zIndex) {
        const page = document.createElement("div");
        page.className = `page ${position}`;
        page.style.zIndex = zIndex;

        const img = this.createImageElement(pageNum);
        const pageNumber = this.createPageNumberElement(pageNum);

        page.appendChild(img);
        page.appendChild(pageNumber);

        page.addEventListener("click", (e) => {
            if (e.target.tagName === "IMG") {
                this.showSlidePreview(pageNum);
            }
        });

        return page;
    }

    createImageElement(pageNum) {
        const img = document.createElement("img");
        img.src = `slides/fintegrate-images-${pageNum-1}.jpg`;
        img.alt = `Slide ${pageNum}`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        img.onload = () => {
            img.style.opacity = "1";
        };
        
        img.onerror = () => {
            img.src = this.createPlaceholderImage(pageNum);
        };

        return img;
    }

    createPageNumberElement(pageNum) {
        const pageNumber = document.createElement("div");
        pageNumber.className = "page-number";
        pageNumber.textContent = pageNum;
        return pageNumber;
    }

    createPlaceholderImage(pageNum) {
        // Create a data URL for placeholder image
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 400, 600);
        
        // Text
        ctx.fillStyle = '#666';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Slide ${pageNum}`, 200, 300);
        
        return canvas.toDataURL();
    }

    goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;

        this.currentPage = pageNumber;
        this.createSlides();
        this.updateUI();
    }

    updateUI() {
        document.getElementById("currentPage").textContent = this.currentPage;
        this.updateProgress();
    }

    updateProgress() {
        const progress = (this.currentPage / this.totalPages) * 100;
        document.getElementById("progressFill").style.width = `${progress}%`;
    }
}