// Get DOM elements
const billAmount = document.getElementById('bill-amount');
const tipPercentage = document.getElementById('tip-percentage');
const numPeople = document.getElementById('num-people');
const tipButtons = document.querySelectorAll('.tip-btn');
const resetBtn = document.getElementById('reset-btn');

// Result elements
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const perPerson = document.getElementById('per-person');
const tipPerPerson = document.getElementById('tip-per-person');

// Initialize calculator
function init() {
    calculateTip();
    setupEventListeners();
}

function setupEventListeners() {
    // Input event listeners for real-time calculation
    billAmount.addEventListener('input', calculateTip);
    tipPercentage.addEventListener('input', calculateTip);
    numPeople.addEventListener('input', calculateTip);

    // Tip button event listeners
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tipButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Set tip percentage
            tipPercentage.value = button.dataset.tip;
            calculateTip();
        });
    });

    // Reset button
    resetBtn.addEventListener('click', resetCalculator);

    // Input validation
    billAmount.addEventListener('blur', validateBillAmount);
    tipPercentage.addEventListener('blur', validateTipPercentage);
    numPeople.addEventListener('blur', validateNumPeople);
}

function calculateTip() {
    const bill = parseFloat(billAmount.value) || 0;
    const tipPercent = parseFloat(tipPercentage.value) || 0;
    const people = parseInt(numPeople.value) || 1;

    // Calculate tip and total
    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;

    // Calculate per person amounts
    const tipPerPersonAmount = tip / people;
    const totalPerPerson = total / people;

    // Update display with formatted currency
    tipAmount.textContent = formatCurrency(tip);
    totalAmount.textContent = formatCurrency(total);
    perPerson.textContent = formatCurrency(totalPerPerson);
    tipPerPerson.textContent = formatCurrency(tipPerPersonAmount);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function validateBillAmount() {
    const value = parseFloat(billAmount.value);
    if (value < 0 || isNaN(value)) {
        billAmount.value = '';
        showError('Please enter a valid bill amount');
    }
}

function validateTipPercentage() {
    const value = parseFloat(tipPercentage.value);
    if (value < 0 || value > 100 || isNaN(value)) {
        tipPercentage.value = '15';
        showError('Please enter a tip percentage between 0 and 100');
    }
    // Remove active class from tip buttons when custom percentage is entered
    tipButtons.forEach(btn => btn.classList.remove('active'));
}

function validateNumPeople() {
    const value = parseInt(numPeople.value);
    if (value < 1 || isNaN(value)) {
        numPeople.value = '1';
        showError('Number of people must be at least 1');
    }
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b9d;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 3000);
}

function resetCalculator() {
    // Clear all inputs
    billAmount.value = '';
    tipPercentage.value = '';
    numPeople.value = '1';

    // Remove active class from tip buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));

    // Reset results
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    perPerson.textContent = '$0.00';
    tipPerPerson.textContent = '$0.00';

    // Focus on bill amount input
    billAmount.focus();
}

// Add CSS animations for error messages
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


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateTip();
    } else if (event.key === 'Escape') {
        resetCalculator();
    }
});

document.addEventListener('DOMContentLoaded', init);