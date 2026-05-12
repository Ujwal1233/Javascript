let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let isRunning = false;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
    hoursDisplay.innerText = hours < 10 ? "0" + hours : hours;
    minutesDisplay.innerText = minutes < 10 ? "0" + minutes : minutes;
    secondsDisplay.innerText = seconds < 10 ? "0" + seconds : seconds;
}

function updateButtonStates() {
    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
    resetBtn.disabled = false;

    startBtn.style.opacity = isRunning ? 0.6 : 1;
    stopBtn.style.opacity = !isRunning ? 0.6 : 1;
}

function stopwatch() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(stopwatch, 1000);
        updateButtonStates();
    }
});

stopBtn.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        updateButtonStates();
    }
});

resetBtn.addEventListener("click", () => {
    isRunning = false;
    clearInterval(timer);

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();
    updateButtonStates();
});

updateButtonStates();