# Advanced Flipbook Application

A sophisticated web-based flipbook application built with vanilla JavaScript, featuring audio controls, smooth navigation, mobile support, and slide preview functionality.

## Architecture Overview

The application follows a modular architecture with separate classes handling different aspects of functionality:

## Core Files

### 1. FlipbookMain.js
**Main Application Entry Point**

The central orchestrator that initializes and coordinates all other modules.

**Key Features:**
- Initializes all core components (Core, Audio, Navigation, Preview)
- Provides a unified API for external access
- Sets up method overrides for enhanced functionality
- Handles application-wide state management

**Main Class:** `AdvancedFlipbook`

**Public Methods:**
- `nextPage()` - Navigate to next page
- `prevPage()` - Navigate to previous page
- `goToPage(pageNumber)` - Jump to specific page
- `toggleSound()` - Toggle audio on/off
- `showSlidePreview(slideNumber)` - Display slide preview modal
- `closeSlidePreview()` - Close preview modal

**Properties:**
- `currentPage` - Current page number (getter)
- `totalPages` - Total number of pages (getter) 
- `soundEnabled` - Audio state (getter)

### 2. FlipbookCore.js
**Core Flipbook Logic**

Handles the fundamental flipbook functionality including page creation, layout, and basic navigation.

**Key Features:**
- Dynamic page creation and layout management
- Special handling for first page (single page display)
- Smart page pairing (left/right page logic)
- Image loading with error handling and placeholders
- Page numbering and UI updates

**Main Class:** `FlipbookCore`

**Key Methods:**
- `createSlides()` - Generates current page layout
- `createPageElement()` - Creates individual page elements
- `createImageElement()` - Handles image creation with fallback
- `createPlaceholderImage()` - Generates placeholder for missing images
- `goToPage()` - Core navigation method
- `updateUI()` - Updates page indicators and progress

**Configuration:**
- Total pages: 92
- Image path: `compressed_slides/fintegrate-images-{index}-min.jpg`
- Supports both single and double-page layouts

### 3. FlipbookNavigation.js
**Navigation and Controls**

Manages all navigation functionality including buttons, keyboard shortcuts, touch gestures, and navigation dots.

**Key Features:**
- Button-based navigation (Next, Previous, First, Last)
- Keyboard navigation (Arrow keys, Spacebar)
- Touch/swipe gestures for mobile devices
- Dynamic navigation dots with smart pagination
- Navigation state management (disabled states)

**Main Class:** `FlipbookNavigation`

**Navigation Methods:**
- `nextPage()` - Navigate forward (by 2 pages)
- `prevPage()` - Navigate backward (by 2 pages)
- `createNavigationDots()` - Generates navigation dots
- `updateNavigationState()` - Updates button states and dots

**Supported Inputs:**
- **Keyboard:** Arrow keys, Spacebar
- **Touch:** Horizontal swipe gestures
- **Mouse:** Navigation buttons and dots

### 4. FlipbookAudio.js
**Audio Functionality**

Provides sound effects and audio control features.

**Key Features:**
- Web Audio API-based flip sound generation
- Sound toggle functionality with visual feedback
- LocalStorage preference persistence
- Graceful degradation for unsupported browsers

**Main Class:** `FlipbookAudio`

**Audio Methods:**
- `playFlipSound()` - Generates page flip sound effect
- `toggleSound()` - Toggle audio on/off
- `loadSoundPreference()` - Load saved audio preference
- `updateSoundButton()` - Update sound button UI

**Sound Characteristics:**
- Frequency sweep: 800Hz → 200Hz
- Duration: 0.1 seconds
- Volume: Controlled gain envelope

### 5. FlipbookPreview.js
**Slide Preview Modal**

Handles the full-screen preview functionality for individual slides.

**Key Features:**
- Modal-based slide preview
- Full-screen image display
- Keyboard and click-based closing
- Body scroll prevention during preview
- Smooth animation transitions

**Main Class:** `FlipbookPreview`

**Preview Methods:**
- `showSlidePreview(slideNumber)` - Display slide in modal
- `closeSlidePreview()` - Close preview modal
- `bindPreviewEvents()` - Set up event listeners

**Controls:**
- **Click:** Close button or overlay
- **Keyboard:** Escape key
- **Image:** Click on any slide to preview

## File Dependencies

```
FlipbookMain.js (Entry Point)
├── FlipbookCore.js (Core Logic)
├── FlipbookAudio.js (Audio Features)
├── FlipbookNavigation.js (Navigation)
└── FlipbookPreview.js (Preview Modal)
```

## Initialization Order

1. **FlipbookCore** - Sets up basic structure and page logic
2. **FlipbookAudio** - Initializes audio context and controls
3. **FlipbookNavigation** - Binds navigation events and creates dots
4. **FlipbookPreview** - Sets up modal functionality
5. **FlipbookMain** - Orchestrates everything and provides unified API

## Features Summary

- **92 pages** with optimized compressed images
- **Responsive design** with mobile touch support
- **Audio feedback** with user-controllable sound effects
- **Keyboard navigation** for accessibility
- **Full-screen preview** for detailed slide viewing
- **Progress tracking** with visual indicators
- **Smart pagination** with efficient navigation dots
- **Error handling** with placeholder images
- **Local storage** for user preferences
