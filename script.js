const displayData = [
  {
    id: 1,
    title: "DrumKit",
    link: "./drumkit/index.html"
  },
  {
    id: 2,
    title: "Clock",
    link: "./analog-clock/index.html"
  },
  {
    id: 3,
    title: "Css Vars",
    link: "./css-vars.html"
  },
  {
    id: 4,
    title: "Array Cardio 1",
    link: "./array-cardio1.html"
  },
  {
    id: 5,
    title: "Flex Gallery",
    link: "./flex-panel-gallery.html"
  },
  {
    id: 6,
    title: "Type Ahead",
    link: "./type-ahead/index.html"
  },
  {
    id: 7,
    title: "Array Cardio 2",
    link: "./array-cardio2.html"
  },
  {
    id: 8,
    title: "Canvas Draw",
    link: "./draw-canvas.html"
  },
  {
    id: 9,
    title: "Dev Tools Tips",
    link: "./dev-tools.html"
  },
  {
    id: 10,
    title: "CheckBoxes",
    link: "./checkboxes.html"
  },
  {
    id: 11,
    title: "Video Player",
    link: "./video-player/index.html"
  },
  {
    id: 12,
    title: "Key Sequence",
    link: "./key-sequence.html"
  },
  {
    id: 13,
    title: "Slide On Scroll",
    link: "./slide-on-scroll.html"
  },
  {
    id: 14,
    title: "Refernce vs Copy",
    link: "./ref-vs-copy.html"
  },
  {
    id: 15,
    title: "Local Storage",
    link: "./local-storage/index.html"
  },
  {
    id: 16,
    title: "Mouse Text",
    link: "./mouse-move-shadow.html"
  },
  {
    id: 17,
    title: "Array Sort",
    link: "./array-band-sort.html"
  },
  {
    id: 18,
    title: "Array Reduce",
    link: "./array-reduce.html"
  },
  {
    id: 19,
    title: "Webcam Fun",
    link: "./webcam-fun/index.html"
  },
  {
    id: 20,
    title: "Speech Detection",
    link: "./speech-detect/index.html"
  },
  {
    id: 21,
    title: "Geolocation",
    link: "./geolocation/index.html"
  },
  {
    id: 22,
    title: "Link Highlighter",
    link: "./link-highlight/index.html"
  },
  {
    id: 23,
    title: "Speech Synthesis",
    link: "./speech-synthesis/index.html"
  },
  {
    id: 24,
    title: "Sticky Nav",
    link: "./sticky-nav/index.html"
  },
  {
    id: 25,
    title: "Event Phases",
    link: "./event-phases.html"
  },
  {
    id: 26,
    title: "Stripe Nav",
    link: "./stripe-nav.html"
  },
  {
    id: 27,
    title: "Click n Drag",
    link: "./click-n-drag/index.html"
  },
  {
    id: 28,
    title: "Video Controller",
    link: "./video-controller/index.html"
  },
  {
    id: 29,
    title: "Countdown Timer",
    link: "./countdown-timer/index.html"
  },
  {
    id: 30,
    title: "Whack A Mole",
    link: "./whack-a-mole/index.html"
  }
];

function setupList(list, data) {
  function renderList(arr, numItems) {
    let newArr = [];
    while (arr.length) {
      // console.log(arr.length, numItems);
      newArr.push(arr.splice(0, numItems));
    }
    // console.log(newArr);

    function renderListItems(items) {
      // console.log(items);
      return items
        .map(item => {
          return `
            <div>
            ${item.id}
            <a class="day" href="#" data-id=${item.id} data-link=${item.link}>
              ${item.title}
            </a>
          </div>
          `;
        })
        .join("");
    }

    // ${renderRow()}
    return newArr
      .map(col => {
        return `
          <div class="flexRow" style="flex-direction: row;">
            ${renderListItems(col)}
          </div>
        `;
      })
      .join("");
  }
  list.innerHTML = renderList(data, 4);
}
const filesList = document.getElementById("nav-list");
function loadFile(e) {
  // console.log(e.target);
  e.preventDefault();
  document.getElementById("loader").data = e.target.dataset.link;
}

filesList.addEventListener("click", loadFile);

setupList(filesList, displayData);
