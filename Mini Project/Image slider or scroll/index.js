const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const speedSelect = document.getElementById('speed');
const progressFill = document.querySelector('.progress-fill');

let currentSlide = 0;
let isAutoPlaying = false;
let autoPlayInterval;
let progressInterval;
let autoPlaySpeed = 1500;
let progressStartTime;

let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

function init() {
    setupEventListeners();
    updateSlider();
    preloadImages();
}

function setupEventListeners() {
    prevBtn.addEventListener('click', () => navigateSlide('prev'));
    nextBtn.addEventListener('click', () => navigateSlide('next'));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    playBtn.addEventListener('click', startAutoPlay);
    pauseBtn.addEventListener('click', stopAutoPlay);

    speedSelect.addEventListener('change', updateSpeed);

    document.addEventListener('keydown', handleKeyboard);

    setupTouchEvents();

    window.addEventListener('resize', handleResize);

    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function navigateSlide(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % slideElements.length;
    } else {
        currentSlide = (currentSlide - 1 + slideElements.length) % slideElements.length;
    }
    updateSlider();
    resetAutoPlayTimer();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    resetAutoPlayTimer();
}

function updateSlider() {
    const translateX = -currentSlide * 20;
    slides.style.transform = `translateX(${translateX}%)`;

    slideElements.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    updateAriaLabels();
}

function updateAriaLabels() {
    dots.forEach((dot, index) => {
        const isActive = index === currentSlide;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}${isActive ? ' (current)' : ''}`);
        dot.setAttribute('aria-pressed', isActive);
    });
}

function startAutoPlay() {
    if (isAutoPlaying) return;

    isAutoPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';

    autoPlayInterval = setInterval(() => {
        navigateSlide('next');
    }, autoPlaySpeed);

    startProgressBar();
    showNotification('Auto-play started', 'info');
}

function stopAutoPlay() {
    if (!isAutoPlaying) return;

    isAutoPlaying = false;
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';

    clearInterval(autoPlayInterval);
    clearInterval(progressInterval);
    resetProgressBar();

    showNotification('Auto-play stopped', 'info');
}

function resetAutoPlayTimer() {
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        clearInterval(progressInterval);
        resetProgressBar();
        autoPlayInterval = setInterval(() => {
            navigateSlide('next');
        }, autoPlaySpeed);
        startProgressBar();
    }
}

function startProgressBar() {
    progressStartTime = Date.now();
    progressFill.style.width = '0%';

    progressInterval = setInterval(() => {
        const elapsed = Date.now() - progressStartTime;
        const progress = (elapsed / autoPlaySpeed) * 100;
        progressFill.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 50);
}

function resetProgressBar() {
    progressFill.style.width = '0%';
}

function updateSpeed() {
    autoPlaySpeed = parseInt(speedSelect.value);
    if (isAutoPlaying) {
        resetAutoPlayTimer();
    }
    showNotification(`Speed changed to ${speedSelect.options[speedSelect.selectedIndex].text}`, 'info');
}

function handleKeyboard(event) {
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            navigateSlide('prev');
            break;
        case 'ArrowRight':
            event.preventDefault();
            navigateSlide('next');
            break;
        case ' ':
            event.preventDefault();
            if (isAutoPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(slideElements.length - 1);
            break;
    }

    const num = parseInt(event.key);
    if (num >= 1 && num <= slideElements.length) {
        event.preventDefault();
        goToSlide(num - 1);
    }
}

function setupTouchEvents() {
    const slider = document.querySelector('.slider');

    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd, { passive: false });

    slider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
}

function handleTouchMove(event) {
    if (!isDragging) return;
    event.preventDefault();
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    if (!isDragging) return;
    isDragging = false;

    const deltaX = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            navigateSlide('next');
        } else {
            navigateSlide('prev');
        }
    }
}

function handleMouseDown(event) {
    touchStartX = event.clientX;
    isDragging = true;
    stopAutoPlay();
    event.preventDefault();
}

function handleMouseMove(event) {
    if (!isDragging) return;
    touchEndX = event.clientX;
}

function handleMouseUp(event) {
    if (!isDragging) return;
    isDragging = false;

    const deltaX = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            navigateSlide('next');
        } else {
            navigateSlide('prev');
        }
    }
}

function preloadImages() {
    slideElements.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            img.classList.add('loading');
            img.onload = () => {
                img.classList.remove('loading');
            };
        }
    });
}

function handleResize() {
    updateSlider();
}

function handleVisibilityChange() {
    if (document.hidden && isAutoPlaying) {
        stopAutoPlay();
    }
}

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);