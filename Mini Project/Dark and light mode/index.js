class ThemeManager {
    constructor() {
        this.themeSwitch = document.getElementById('theme-switch');
        this.body = document.body;
        this.currentTheme = 'light';

        this.init();
    }

    init() {
        this.loadSavedTheme();

        this.themeSwitch.addEventListener('change', () => {
            this.toggleTheme();
        });

        this.addKeyboardSupport();

        this.detectSystemTheme();

        this.addTransitionEffects();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
            this.themeSwitch.checked = savedTheme === 'dark';
        }
    }

    toggleTheme() {
        const newTheme = this.themeSwitch.checked ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);

        this.addToggleFeedback();
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
        } else {
            this.body.removeAttribute('data-theme');
        }

        this.updateMetaThemeColor(theme);
    }

    saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('Unable to save theme preference:', error);
        }
    }

    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = 'dark';
                this.applyTheme('dark');
                this.themeSwitch.checked = true;
            }
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.currentTheme = newTheme;
                this.applyTheme(newTheme);
                this.themeSwitch.checked = e.matches;
            }
        });
    }

    addKeyboardSupport() {
        this.themeSwitch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.themeSwitch.checked = !this.themeSwitch.checked;
                this.toggleTheme();
            }
        });
    }

    addTransitionEffects() {
        this.body.classList.add('theme-transition');

        setTimeout(() => {
            this.body.classList.remove('theme-transition');
        }, 300);
    }

    addToggleFeedback() {
        const label = this.themeSwitch.nextElementSibling;
        label.classList.add('toggle-feedback');

        setTimeout(() => {
            label.classList.remove('toggle-feedback');
        }, 300);
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
            document.head.appendChild(meta);
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme(theme);
            this.themeSwitch.checked = theme === 'dark';
        }
    }
}

class DemoManager {
    constructor() {
        this.init();
    }

    init() {
        this.addInteractiveDemo();
        this.addFormValidation();
        this.addProgressAnimation();
    }

    addInteractiveDemo() {
        const demoSwitches = document.querySelectorAll('.demo-switch input');
        demoSwitches.forEach(switchEl => {
            switchEl.addEventListener('change', () => {
                const slider = switchEl.nextElementSibling;
                slider.classList.add('switch-feedback');

                setTimeout(() => {
                    slider.classList.remove('switch-feedback');
                }, 200);
            });
        });

        const demoButton = document.querySelector('.demo-button');
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                demoButton.textContent = 'Clicked!';
                demoButton.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    demoButton.textContent = 'Action Button';
                    demoButton.style.transform = 'scale(1)';
                }, 200);
            });
        }
    }

    addFormValidation() {
        const demoInput = document.querySelector('.demo-input');
        const demoTextarea = document.querySelector('.demo-textarea');

        if (demoInput) {
            demoInput.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        }

        if (demoTextarea) {
            demoTextarea.addEventListener('input', (e) => {
                this.validateTextarea(e.target);
            });
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        if (value.length > 0) {
            input.classList.add('input-valid');
            input.classList.remove('input-invalid');
        } else {
            input.classList.remove('input-valid');
            input.classList.add('input-invalid');
        }
    }

    validateTextarea(textarea) {
        const value = textarea.value.trim();
        const lines = value.split('\n').length;

        if (value.length > 0 && lines <= 5) {
            textarea.classList.add('input-valid');
            textarea.classList.remove('input-invalid');
        } else if (lines > 5) {
            textarea.classList.remove('input-valid');
            textarea.classList.add('input-invalid');
        } else {
            textarea.classList.remove('input-valid', 'input-invalid');
        }
    }

    addProgressAnimation() {
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                progressBar.style.width = progress + '%';
            }, 500);
        }
    }
}

class PerformanceMonitor {
    constructor() {
        this.themeChanges = 0;
        this.init();
    }

    init() {
        document.addEventListener('themeChange', () => {
            this.themeChanges++;
            console.log(`Theme changed ${this.themeChanges} times`);
        });

        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();

    const demoManager = new DemoManager();

    const performanceMonitor = new PerformanceMonitor();

    const originalToggleTheme = themeManager.toggleTheme.bind(themeManager);
    themeManager.toggleTheme = function() {
        originalToggleTheme();
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: this.currentTheme }
        }));
    };

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeManager.themeSwitch.checked = !themeManager.themeSwitch.checked;
            themeManager.toggleTheme();
        }
    });

    if ('ontouchstart' in window) {
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaY) > 100 && Math.abs(deltaX) < 50 && deltaY > 0) {
                themeManager.themeSwitch.checked = !themeManager.themeSwitch.checked;
                themeManager.toggleTheme();
            }
        });
    }

    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
    });

    if ('serviceWorker' in navigator) {
    }

    console.log('Dark & Light Mode Toggle initialized successfully!');
});

window.ThemeManager = ThemeManager;
window.DemoManager = DemoManager;