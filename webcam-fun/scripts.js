const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  // setup user webcam access & get user permissions:
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    // returns a promise with current video stream object
    .then(localMediaStream => {
      console.log(localMediaStream);

      // define the source (user's webcam stream)
      // video.src = window.URL.createObjectURL(localMediaStream); //not working in chome see below for fix:
      video.srcObject = localMediaStream;
      video.play();
    })
    // throw error if permission not granted or if error with stream
    .catch(err => console.error('oh Noooo!!', err));
}

function paintToCanvas() {
  // setup video feed, and add video to canvas
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // adds video to canvas at specified position
    let pixels = ctx.getImageData(0, 0, width, height); // grab reference to each pixel in image
    // warning there will be millions of pixels in each image.
    // console.log(pixels); // each pixel is mapped into the array with every 4 indexes 1 for each // color channel "rgba"
    // filter pixels

    // update ctx with edited pixels from redEffect

    // red filter Effect
    // pixels = redEffect(pixels);

    // ghost effect
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // greenScreen Effect
    pixels = greenScreen(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, 16); // refreshes ever 16ms
}

function takePhoto() {
  // snap provides the shutterclick audio feedback when a pic is taken.
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg'); // save photo as image
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome'); // create image download link
  link.innerHTML = `<img src=${data} alt="handsome man"/>`; // set image preview thumbnail
  strip.insertBefore(link, strip.firstChild); // append image to strip
}

function redEffect(pixels) {
  // creates red filter effect
  for (let i = 0; i < pixels.data.length; i += 4) {
    // increment by 4 (represents each color channel 'rgba')
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  // creates a ghost rgb effect
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  // allows for greenscreen background effect

  const levels = {}; // handles min/max green values

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    // loop over every pixel, determine color values
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      // determine if the colors are in the defined ranges
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // if so remove color
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

// listen for 'canplay' event emitted by the video element & call paintToCanvas()
video.addEventListener('canplay', paintToCanvas);
