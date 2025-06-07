class AdvancedFlipbook {
    constructor() {
      this.currentPage = 1;
      this.totalPages = 65;
      this.soundEnabled = true;
      this.flipbook = document.getElementById("flipbook");

      this.init();
      this.createSlides();
      this.bindEvents();
      this.createNavigationDots();
      this.updateProgress();
      this.createFlipSound();
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
        const rightPage = document.createElement("div");
        rightPage.className = "page right";
        rightPage.style.zIndex = 1;
        rightPage.style.margin = "0 auto";
        rightPage.style.transform = "translateX(-50%)";

        const rightImg = document.createElement("img");
        rightImg.src = `slides/slide1.jpg`;
        rightImg.alt = `Slide 1`;
        rightImg.style.width = "100%";
        rightImg.style.height = "100%";
        rightImg.style.objectFit = "cover";

        rightImg.onload = () => {
          rightImg.style.opacity = "1";
        };
        rightImg.onerror = () => {
          rightImg.src = this.createPlaceholderImage(1);
        };

        const rightPageNumber = document.createElement("div");
        rightPageNumber.className = "page-number";
        rightPageNumber.textContent = "1";

        rightPage.appendChild(rightImg);
        rightPage.appendChild(rightPageNumber);

        rightPage.addEventListener("click", (e) => {
          if (e.target.tagName === "IMG") {
            this.showSlidePreview(1);
          }
        });

        this.flipbook.appendChild(rightPage);
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
      const leftPage = document.createElement("div");
      leftPage.className = "page left";
      leftPage.style.zIndex = 2;

      const leftImg = document.createElement("img");
      leftImg.src = `slides/slide${leftPageNum}.jpg`;
      leftImg.alt = `Slide ${leftPageNum}`;
      leftImg.style.width = "100%";
      leftImg.style.height = "100%";
      leftImg.style.objectFit = "cover";

      leftImg.onload = () => {
        leftImg.style.opacity = "1";
      };
      leftImg.onerror = () => {
        leftImg.src = this.createPlaceholderImage(leftPageNum);
      };

      const leftPageNumber = document.createElement("div");
      leftPageNumber.className = "page-number";
      leftPageNumber.textContent = leftPageNum;

      leftPage.appendChild(leftImg);
      leftPage.appendChild(leftPageNumber);

      leftPage.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
          this.showSlidePreview(leftPageNum);
        }
      });

      // Create right page (only if it exists)
      if (rightPageNum <= this.totalPages) {
        const rightPage = document.createElement("div");
        rightPage.className = "page right";
        rightPage.style.zIndex = 1;

        const rightImg = document.createElement("img");
        rightImg.src = `slides/slide${rightPageNum}.jpg`;
        rightImg.alt = `Slide ${rightPageNum}`;
        rightImg.style.width = "100%";
        rightImg.style.height = "100%";
        rightImg.style.objectFit = "cover";

        rightImg.onload = () => {
          rightImg.style.opacity = "1";
        };
        rightImg.onerror = () => {
          rightImg.src = this.createPlaceholderImage(rightPageNum);
        };

        const rightPageNumber = document.createElement("div");
        rightPageNumber.className = "page-number";
        rightPageNumber.textContent = rightPageNum;

        rightPage.appendChild(rightImg);
        rightPage.appendChild(rightPageNumber);

        rightPage.addEventListener("click", (e) => {
          if (e.target.tagName === "IMG") {
            this.showSlidePreview(rightPageNum);
          }
        });

        this.flipbook.appendChild(leftPage);
        this.flipbook.appendChild(rightPage);
      } else {
        // Last page is odd, show only left page
        leftPage.style.margin = "0 auto";
        leftPage.style.transform = "translateX(50%)";
        this.flipbook.appendChild(leftPage);
      }
    }

    showSlidePreview(slideNumber) {
      const previewImage = document.getElementById("previewImage");
      const slidePreview = document.getElementById("slidePreview");
      const overlay = document.getElementById("overlay");

      // שימוש באותן תמונות מהספרייה slides/
      previewImage.src = `slides/slide${slideNumber}.jpg`;
      previewImage.alt = `Slide ${slideNumber} Preview`;

      // הוספת טיפול בשגיאה אם התמונה לא נמצאת
      previewImage.onerror = () => {
        previewImage.src = this.createPlaceholderImage(slideNumber);
      };

      slidePreview.classList.add("active");
      overlay.classList.add("active");
    }

    closeSlidePreview() {
      const slidePreview = document.getElementById("slidePreview");
      const overlay = document.getElementById("overlay");

      slidePreview.classList.remove("active");
      overlay.classList.remove("active");
    }
    createNavigationDots() {
      const dotsContainer = document.getElementById("navigationDots");
      const maxDots = Math.min(15, this.totalPages);
      const step = Math.ceil(this.totalPages / maxDots);

      for (let i = 1; i <= this.totalPages; i += step) {
        const dot = document.createElement("div");
        dot.className = "dot";
        if (i === 1) dot.classList.add("active");

        dot.addEventListener("click", () => {
          this.goToPage(i);
        });

        dotsContainer.appendChild(dot);
      }
    }

    createFlipSound() {
      // Create audio context for flip sound
      try {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      } catch (e) {
        console.log("Audio not supported");
      }
    }

    playFlipSound() {
      if (!this.soundEnabled || !this.audioContext) return;

      try {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(
          800,
          this.audioContext.currentTime
        );
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
    }

    bindEvents() {
      // Navigation buttons
      document
        .getElementById("nextPage")
        .addEventListener("click", () => this.nextPage());
      document
        .getElementById("prevPage")
        .addEventListener("click", () => this.prevPage());
      document
        .getElementById("firstPage")
        .addEventListener("click", () => this.goToPage(1));
      document
        .getElementById("lastPage")
        .addEventListener("click", () => this.goToPage(this.totalPages));

      // Sound toggle
      document
        .getElementById("soundToggle")
        .addEventListener("click", () => this.toggleSound());

      // Preview modal events
      document
        .getElementById("closePreview")
        .addEventListener("click", () => this.closeSlidePreview());
      document
        .getElementById("overlay")
        .addEventListener("click", () => this.closeSlidePreview());

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

      this.flipbook.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      });

      this.flipbook.addEventListener("touchend", (e) => {
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
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 2);
      }
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 2);
      }
    }

    goToPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return;

      this.currentPage = pageNumber;
      this.createSlides();
      this.updateUI();
      this.playFlipSound();
    }

    updateUI() {
      document.getElementById("currentPage").textContent = this.currentPage;

      // Update navigation buttons
      document.getElementById("prevPage").disabled = this.currentPage === 1;
      document.getElementById("firstPage").disabled =
        this.currentPage === 1;
      document.getElementById("nextPage").disabled =
        this.currentPage === this.totalPages;
      document.getElementById("lastPage").disabled =
        this.currentPage === this.totalPages;

      // Update progress bar
      this.updateProgress();

      // Update navigation dots
      this.updateNavigationDots();
    }

    updateProgress() {
      const progress = (this.currentPage / this.totalPages) * 100;
      document.getElementById("progressFill").style.width = `${progress}%`;
    }

    updateNavigationDots() {
      const dots = document.querySelectorAll(".dot");
      const maxDots = dots.length;
      const step = Math.ceil(this.totalPages / maxDots);

      dots.forEach((dot, index) => {
        const pageForDot = index * step + 1;
        dot.classList.toggle(
          "active",
          this.currentPage >= pageForDot &&
            this.currentPage < pageForDot + step
        );
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new AdvancedFlipbook();
  });