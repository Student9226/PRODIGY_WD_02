let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.00");
    elapsedTime = 0;
    lapsList.innerHTML = '';
    showButton('START');
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.innerText = lapTime;
    lapsList.appendChild(li);
}

function showButton(buttonKey) {
    const buttonToShow = buttonKey === 'START' ? startButton : pauseButton;
    const buttonToHide = buttonKey === 'START' ? pauseButton : startButton;
    buttonToShow.style.display = 'inline';
    buttonToHide.style.display = 'none';
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

showButton('START');