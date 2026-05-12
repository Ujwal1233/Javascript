let display = document.getElementById('display');
let history = document.getElementById('history');
let memory = 0;
let lastResult = '';
let isNewCalculation = true;

function addToDisplay(value) {
    if (isNewCalculation && !isNaN(value)) {
        display.value = value;
        isNewCalculation = false;
    } else {
        display.value += value;
    }
    updateHistory();
}

function clearDisplay() {
    display.value = '';
    updateHistory();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    updateHistory();
}

function calculate() {
    try {
        let expression = display.value;

        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/e/g, Math.E);

        expression = expression.replace(/sin⁻¹\(/g, 'Math.asin(');
        expression = expression.replace(/cos⁻¹\(/g, 'Math.acos(');
        expression = expression.replace(/tan⁻¹\(/g, 'Math.atan(');

        expression = expression.replace(/\^/g, '**');

        let result = eval(expression);

        if (typeof result === 'number') {
            if (Number.isInteger(result)) {
                result = result.toString();
            } else {
                result = parseFloat(result.toFixed(10)).toString();
            }
        }

        history.textContent = display.value + ' =';
        display.value = result;
        lastResult = result;
        isNewCalculation = true;

    } catch (error) {
        display.value = 'Error';
        history.textContent = '';
        isNewCalculation = true;
    }
}

function trigFunction(func) {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }

    let result;
    switch (func) {
        case 'sin':
            result = Math.sin(value * Math.PI / 180); // Convert to radians
            break;
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(value * Math.PI / 180);
            break;
        case 'asin':
            result = Math.asin(value) * 180 / Math.PI; // Convert to degrees
            break;
        case 'acos':
            result = Math.acos(value) * 180 / Math.PI;
            break;
        case 'atan':
            result = Math.atan(value) * 180 / Math.PI;
            break;
    }

    display.value = parseFloat(result.toFixed(10));
    history.textContent = `${func}(${value}) =`;
    isNewCalculation = true;
}

function calculateFunction(func) {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error';
        return;
    }

    let result;
    switch (func) {
        case 'sqrt':
            if (value < 0) {
                display.value = 'Error';
                return;
            }
            result = Math.sqrt(value);
            break;
        case 'log':
            if (value <= 0) {
                display.value = 'Error';
                return;
            }
            result = Math.log10(value);
            break;
        case 'ln':
            if (value <= 0) {
                display.value = 'Error';
                return;
            }
            result = Math.log(value);
            break;
        case 'pow':

            display.value += '^';
            return;
    }

    display.value = parseFloat(result.toFixed(10));
    history.textContent = `${func}(${value}) =`;
    isNewCalculation = true;
}


function memoryStore() {
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory = value;
        history.textContent = 'Stored in memory';
    }
}

function memoryRecall() {
    display.value = memory.toString();
    updateHistory();
}

function memoryAdd() {
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory += value;
        history.textContent = `Added to memory: ${value}`;
    }
}

function memoryClear() {
    memory = 0;
    history.textContent = 'Memory cleared';
}

function updateHistory() {
    if (display.value === '') {
        history.textContent = '';
    }
}


document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        addToDisplay(key);
    } else if (key === '.') {
        addToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        addToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        addToDisplay(key);
    }
});

document.addEventListener('keydown', function(event) {
    if (['Enter', 'Backspace', 'Escape'].includes(event.key)) {
        event.preventDefault();
    }
});