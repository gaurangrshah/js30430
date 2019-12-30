/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build out functions */
function togglePlay() {
  // sets up player state toggle
  const method = video.paused ? "play" : "pause";
  // calls player state toggle
  video[method]();
}

function updateButton() {
  // udpates button icon when paused is toggled
  const icon = this.paused ? "►" : "❚ ❚";
  // console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  // used to skip any element with a data-skip property
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // listens for the change event on volume and playback rate range sliders:
  // console.log(this.name, this.value)
  video[this.name] = this.value;
}

function handleProgress() {
  // updates progress bar when scrubbed, and updates the video
  const percent = (video.currentTime / video.duration) * 100;
  // uses flexBasis to update the time in the progress bar:
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // handles progress bar scrubbing to sync with video current time fires when clicked at a certain time in the progress bar.
  // console.log(e)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  // update the current video time to the time cicked on:
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// timeUpdate fires each time the progress of the video occurs, we use it to sync the progress bar to the correct time each second: -- instead of setting up a setInterval to do it, we are using the built in emitted event: "timeupdate"
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

// adds a listener on each skip button:
skipButtons.forEach(button => button.addEventListener("click", skip));

// sets up the volume slider and playback speed listeners.
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

// setup scrub event handling:
progress.addEventListener("click", scrub);

let mousedown = false; // used as a flag to help track when a drag event occurs on progress bar
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

/*
TODO:

* add current time marker / scrub drag handle element
* update


*/
