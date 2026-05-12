const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const refreshBtn = document.getElementById('refresh-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const strengthBars = document.querySelectorAll('.bar');
const strengthText = document.getElementById('strength-text');

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function init() {
    setupEventListeners();
    generatePassword();
}

function setupEventListeners() {
    generateBtn.addEventListener('click', generatePassword);
    refreshBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', copyToClipboard);

    lengthSlider.addEventListener('input', updateLengthValue);

    [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox]
        .forEach(checkbox => {
            checkbox.addEventListener('change', generatePassword);
        });

    document.addEventListener('keydown', handleKeyboard);
}

function updateLengthValue() {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
}

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charPool = '';

    if (uppercaseCheckbox.checked) charPool += charSets.uppercase;
    if (lowercaseCheckbox.checked) charPool += charSets.lowercase;
    if (numbersCheckbox.checked) charPool += charSets.numbers;
    if (symbolsCheckbox.checked) charPool += charSets.symbols;

    if (charPool === '') {
        showNotification('Please select at least one character type', 'error');
        passwordInput.value = '';
        updateStrengthIndicator(0);
        return;
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    password = ensureCharacterRequirements(password, length);

    passwordInput.value = password;
    updateStrengthIndicator(calculateStrength(password));

    passwordInput.parentElement.classList.add('shake');
    setTimeout(() => {
        passwordInput.parentElement.classList.remove('shake');
    }, 500);
}

function ensureCharacterRequirements(password, length) {
    const requirements = [];
    if (uppercaseCheckbox.checked) requirements.push(charSets.uppercase);
    if (lowercaseCheckbox.checked) requirements.push(charSets.lowercase);
    if (numbersCheckbox.checked) requirements.push(charSets.numbers);
    if (symbolsCheckbox.checked) requirements.push(charSets.symbols);

    let passwordArray = password.split('');

    requirements.forEach(charSet => {
        const hasRequiredChar = passwordArray.some(char => charSet.includes(char));
        if (!hasRequiredChar) {
            const randomIndex = Math.floor(Math.random() * passwordArray.length);
            const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
            passwordArray[randomIndex] = randomChar;
        }
    });

    return passwordArray.join('');
}

function calculateStrength(password) {
    let score = 0;
    const length = password.length;

    if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

    const varietyCount = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;
    score += varietyCount;

    if (length >= 16) score += 1;

    return Math.min(score, 4);
}

function updateStrengthIndicator(strength) {
    strengthBars.forEach(bar => {
        bar.className = 'bar';
    });

    strengthText.className = 'strength-text';

    let strengthClass = '';
    let strengthLabel = '';

    switch (strength) {
        case 0:
            strengthLabel = 'Very Weak';
            strengthClass = 'weak';
            break;
        case 1:
            strengthLabel = 'Weak';
            strengthClass = 'weak';
            strengthBars[0].classList.add('active-weak');
            break;
        case 2:
            strengthLabel = 'Fair';
            strengthClass = 'fair';
            strengthBars[0].classList.add('active-fair');
            strengthBars[1].classList.add('active-fair');
            break;
        case 3:
            strengthLabel = 'Good';
            strengthClass = 'good';
            strengthBars[0].classList.add('active-good');
            strengthBars[1].classList.add('active-good');
            strengthBars[2].classList.add('active-good');
            break;
        case 4:
            strengthLabel = 'Strong';
            strengthClass = 'strong';
            strengthBars.forEach(bar => bar.classList.add('active-strong'));
            break;
    }

    strengthText.textContent = strengthLabel;
    strengthText.classList.add(strengthClass);
}

async function copyToClipboard() {
    if (!passwordInput.value) {
        showNotification('No password to copy', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        showNotification('Password copied to clipboard!', 'success');

        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);

    } catch (err) {
        passwordInput.select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard!', 'success');

        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
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

function handleKeyboard(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                generatePassword();
                break;
            case 'c':
                if (passwordInput.value) {
                    event.preventDefault();
                    copyToClipboard();
                }
                break;
        }
    }
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