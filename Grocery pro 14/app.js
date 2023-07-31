// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********

// submit form

form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener("click", clearItems);

const deletBtn = document.querySelector(".delet-btn");
// load items
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString;
  if (value && !editFlag) {
    // display alert
    displayAlert("item added to list ", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to defult
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // edit local storage
    editLocalStorage(editId);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove("alert-danger");
  }, 1000);
}
// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  // localStorage.removeItem("list");
}
// delet function
function deletItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  // removeFromLocalStorage(id)
}
// edit function
function editItem() {
  const element = e.currentTarget.parentElement.parentElement;
  // set eeit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

// set back to defult
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
  // console.log("add to local storage");
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// localStorage.setItem("lists", JSON.stringify(["item", "item2"]));

// const lists = JSON.parse * localStorage.getItem("lists");

// localStorage.removeItem("lists");
// ****** SETUP ITEMS **********

function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItems(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItems(id, value) {
  const element = document.createElement("article");
  //  add class
  element.classList.add("grocery-item");
  // add id

  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = ` <p class="title">${value}</p>
            <div class="button-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

  const deletBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deletBtn.addEventListener("click", deletItem);
  editBtn.addEventListener("click", editItem);
  // append child

  list.appendChild(element);
}
