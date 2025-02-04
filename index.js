/* Global Variables */
let allItems = [];
let userInput = '';

/* Dynamically displays items from allItems array */
const displayItems = () => {
  let allItemsList = document.querySelector('#all-items-list');
  let listContents = allItems.map((elm) => `<div><button class="item">${elm}</button><button class='x'>x</button></div>`)
  .reduce((acc, elm) => acc += elm, '');
  allItemsList.innerHTML = listContents;
};

/* On button click, grabs input box value, adds to allItems array, and displays */
const getInputValue = () => {
  let inputBox = document.querySelector('#input-box');
  let addBtn = document.querySelector('#add-item-btn');

  inputBox.addEventListener('input', (eventObj) => {
    userInput = eventObj.target.value;
  });

  addBtn.addEventListener('click', () => {
    allItems.push(userInput);
    inputBox.value = '';
    displayItems();
  });
};

getInputValue();

/* Changes '.item' button class when clicked */
const changeButtonStyle = () => {
  let allItemList = document.querySelector('#all-items-list');
  allItemList.addEventListener('click', (eventObj) => {
    if (eventObj.target.tagName === 'BUTTON' && eventObj.target.className !== 'x'){
      let newClass = eventObj.target.className === 'item' ? 'item-crossed' : 'item';
      eventObj.target.className = newClass;
    }
  });
};

changeButtonStyle();

/* Removes '.item' from allItems when corresponding '.x' button clicked */

//click x, find childElementCount
//remove corresponding item from allItems
//hopefully display contents will adjust dynamically :D