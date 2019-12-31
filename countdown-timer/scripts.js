let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const cancelButton = document.querySelector('.cancel');

function timer(seconds) {
  // clear any previously set timers
  clearInterval(countdown);

  const now = Date.now(); // get current timestamp
  const then = now + seconds * 1000; // set ms
  displayTimeLeft(seconds); // runs twice to make sure the displayed time gets updated first
  displayEndTime(then);
  countdown = setInterval(() => {
    // set interval based on current time
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check time at each interval
    // check if timer should be stopped
    if (secondsLeft < 0) {
      clearInterval(countdown); // clearInterval
      return;
    }
    // console.log(secondsLeft);
    displayTimeLeft(secondsLeft); // second run to make sure the correct time is displayed
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  // display timer with updates:
  timerDisplay.textContent = display;
  // console.log(minutes, remainderSeconds);
}

function displayEndTime(timestamp) {
  // displays actual time when timer will end
  const end = new Date(timestamp); // create new date object from end timestamp
  const hour = end.getHours();
  // adjust hours from 24hr to 12hr format
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();

  // display endTime output:
  endTime.textContent = `Ends At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  // console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function() {
  e.preventDefault(); // stop from running
  const mins = this.minutes.value; // grab mins from form
  // console.log(mins);
  timer(mins * 60);
  this.reset();
});

cancelButton.addEventListener('click', function() {
  return clearInterval(countdown);
});
