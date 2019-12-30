const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
// checks for items in localStorage first, or defaults to empty array
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  // grab item using attr selector
  const newItem = this.querySelector("[name=item]");
  // grab value from newItem:
  const text = newItem.value;
  console.log(text);
  const item = {
    text, // set newItem value as text
    done: false
  };
  console.log(item);
  // reset using the default form reset method
  this.reset();
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  // takes in the [items] as plates and the itemsList as plateList
  platesList.innerHTML = plates // adds all plates to DOM
    .map((plate, i) => {
      // map each plate and return a label element for each plate:
      return `
  <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        // adds checked attribute based on the done state
        plate.done ? "checked" : ""
      } />
    <label for="item${i}">${plate.text}</label>
  </li>
`;
    })
    .join("");
  // join takes the array, and concats it into a single string
}

function loadingText() {}

function targetItem(target, arr = [], toggle = false) {
  const el = target; // grab a reference to the input
  const index = el.dataset.index; // grab index off data-index attr
  // passes in the "done" property as toggle, used to toggle item:
  if (toggle && arr[index]) {
    function toggleItemState(arr, index, toggle) {
      console.log("run toggle");
      return (arr[index][toggle] = !arr[index][toggle]);
    }

    console.log("toggling", arr[index][toggle]);
    toggleItemState(arr, index, toggle);
  }

  // if no toggle property is provided, returns the target item
  console.log("not toggled returning", arr[index]);
  return arr[index];
}

function toggleDone(e) {
  const currentItem = targetItem(e.target, items);
  // console.log("currentItem", currentItem);
  const isCurrentItemDone = currentItem.done || false;
  // console.log("isCurrentItemDone", isCurrentItemDone);
  // if (isCurrentItemDone) {
  //   console.log("matched done");
  //   return; // skip this unless it's an input
  // }

  if (e.target.matches("label") && isCurrentItemDone) {
    return console.log("machedLabel & done");
  }
  if (!e.target.matches("input")) {
    console.log("target doesnt match input");
    return;
  }

  // gets the current item and toggles the done property
  targetItem(e.target, items, "done");

  // stringify items and set them to localstorage
  localStorage.setItem("items", JSON.stringify(items));

  // call populate list to populate list on page load:
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);

// NOTE:  listening for click on the <ul class="plates">,
// IMPORTANT: because the <ul> exists on-page-load and the items may not.
itemsList.addEventListener("click", toggleDone); // toggle item done state on click:
// toggle done will determine which item was clicked and toggle that item

// call populateList
populateList(items, itemsList);
