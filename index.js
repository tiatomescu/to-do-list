/* Global Variables */
let userInput = '';
  //Document queries
let allItemsList = document.querySelector('#all-items-list');
let inputBox = document.querySelector('#input-box');
let addBtn = document.querySelector('#add-item-btn');
  //Audio
let clickAudio = new Audio('/retro-click.mp3');


/* On button click, grabs input box value and adds to allItemsList */
const getInputValue = () => {

  inputBox.addEventListener('input', (eventObj) => {
    let keyAudio = new Audio('/keyboard-click.mp3');
    keyAudio.play();
    userInput = eventObj.target.value;
  });

  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clickAudio.play();
    allItemsList.innerHTML += `<span id="${allItemsList.childElementCount}"><button class="item">${userInput}</button><button class='x'>x</button></span>`;
    inputBox.value = '';
  });
};

getInputValue();

/* Changes '.item' button class when clicked */
const changeButtonStyle = () => {
  allItemsList.addEventListener('click', (eventObj) => {
    if (eventObj.target.tagName === 'BUTTON' && eventObj.target.className !== 'x'){
      clickAudio.play();
      let newClass = eventObj.target.className === 'item' ? 'item-crossed' : 'item';
      eventObj.target.className = newClass;
    }
  });
};

changeButtonStyle();

/* Removes '.item' from allItemsList when corresponding '.x' button clicked*/

const removeItem = () => {
  let allItemList = document.querySelector('#all-items-list');
  allItemList.addEventListener('click', (eventObj) => {
    if (eventObj.target.tagName === 'BUTTON' && eventObj.target.className == 'x'){
      clickAudio.play();
      allItemsList.removeChild(eventObj.target.parentNode);
    }
  });
};

removeItem();

/* Adds allItemsList to local storage prior to refreshing, and calls it back when reloaded! */

addEventListener('beforeunload', () => {
  localStorage.setItem('currentItems', allItemsList.innerHTML);
});

if(localStorage.getItem('currentItems')){
  const storedItems = localStorage.getItem('currentItems');
  if (allItemsList.childElementCount == 0){
    allItemsList.innerHTML = storedItems;
  }
}
