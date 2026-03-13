const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jensen Huang",
  "Bernard Arnault",
  "Rob Walton",
  "Warren Buffett"
];

let listItems = [];
let dragStartIndex;

createList();

function createList() {

  const randomList = [...richestPeople]
    .map(person => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(person => person.value);

  draggable_list.innerHTML = "";

  randomList.forEach((person, index) => {

    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
      </div>
    `;

    draggable_list.appendChild(listItem);
  });

  listItems = document.querySelectorAll("#draggable-list li");

  addEventListeners();
}

function dragStart() {
  dragStartIndex = [...listItems].indexOf(this.closest("li"));
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop() {

  const dragEndIndex = [...listItems].indexOf(this);

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");

  checkOrder();
}

function swapItems(fromIndex, toIndex) {

  const itemOne = listItems[fromIndex];
  const itemTwo = listItems[toIndex];

  const temp = document.createElement("div");

  draggable_list.replaceChild(temp, itemOne);
  draggable_list.replaceChild(itemOne, itemTwo);
  draggable_list.replaceChild(itemTwo, temp);

  listItems = document.querySelectorAll("#draggable-list li");
}

function checkOrder() {

  listItems.forEach((listItem, index) => {

    const personName = listItem
      .querySelector(".person-name")
      .innerText
      .trim();

    if (personName !== richestPeople[index]) {

      listItem.classList.add("wrong");
      listItem.classList.remove("right");

    } else {

      listItem.classList.add("right");
      listItem.classList.remove("wrong");

    }

  });

}

function addEventListeners() {

  const draggables = document.querySelectorAll(".draggable");

  listItems.forEach(item => {

    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);

  });

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  });

}

check.addEventListener("click", checkOrder);