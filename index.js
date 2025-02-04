/* Global Variables */
let allItems = [];
let userInput = '';

/* Dynamically displays items from allItems array */
const displayItems = () => {
  let allItemsList = document.querySelector('#all-items-list');
  let listContents = allItems.map((elm) => `<div id="${allItems.indexOf(elm)}"><button class="item">${elm}</button><button class='x'>x</button></div>`)
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

/* Removes '.item' from allItems when corresponding '.x' button clicked, then re-displays content*/

const removeItem = () => {
  let allItemList = document.querySelector('#all-items-list');
  allItemList.addEventListener('click', (eventObj) => {
    if (eventObj.target.tagName === 'BUTTON' && eventObj.target.className == 'x'){
      let itemIndex = eventObj.target.parentElement.id;
      allItems.splice(itemIndex, 1);
      displayItems();
    }
  });
};

removeItem();

/* Adds allItems list to local storage prior to refreshing, and calls it back when reloaded! */

addEventListener('beforeunload', () => {
  localStorage.setItem('currentItems', allItems);
});

if(allItems.length == 0){
  const storedItems = localStorage.getItem('currentItems');
  if (storedItems !== ''){
    allItems = storedItems.split(',');
    displayItems();
  }
}
