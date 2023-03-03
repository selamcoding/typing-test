const testWrapper = document.querySelector(".test-wrapper"); // text area where a user types in
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let timer = [0, 0, 0, 0]; //m,s,centi socond, mili second
let interval; // to clear a  setInterval
let timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function addZeroOnTheFront(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time; // add zero on the front for single digit of numbers as a string
}

// Run a standard minute/second/hundredths timer:
function runtimer() {
    let currentTime = addZeroOnTheFront(timer[0]) + ":" + addZeroOnTheFront(timer[1]) + ":" + addZeroOnTheFront(timer[2]); // format to display
    theTimer.innerHTML = currentTime;
    timer[3]++; // timer[3] is the last value (index 3)
  
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
  }

// Match the text entered with the provided text on the page:
function spellCheck() {
  let userTextEnterd = testArea.value; // typing speed with accuracy
  //susbtring(start, how many characters) is an array method to extract characters from a string and returns substring. It does not change the original.
  let originTextMatch = originText.substring(0, userTextEnterd.length);
  if (userTextEnterd == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "green"; // if the string matches exactly
  } else {
    if (userTextEnterd == originTextMatch) {
      testWrapper.style.borderColor = "yellow"; // if a string that matches
    } else {
      testWrapper.style.borderColor = "red"; // if there is a mistake
    }
  }
}

// Start the timer:
function startTimer() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runtimer, 10); //every thousands of a second
  }
  console.log(textEnterdLength);
}
// Reset everything:
function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00"
  testWrapper.style.borderColor = "#060606"
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTimer, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", resetTimer, false);
