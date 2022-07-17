"use strict";
const buttons = document.querySelectorAll(".calculator-button");
const btnReset = document.querySelector(".reset");
const billAmount = document.querySelector("#bill");
const numberOfPeople = document.querySelector("#people");
const customPercentage = document.querySelector(".custom-percentage");
const totalPerPerson = document.querySelector(".output-total");
const tipPerPerson = document.querySelector(".output-tip");
const errorMessageB = document.querySelector(".error-b");
const errorMessageP = document.querySelector(".error-p");
let totalBill;
let percentage;
let totalPerson;
let timer;
let activeButton;
//****************/ FUNCTIONS FOR CALCULATION **************//

const calculateBill = function (amount, perc, personN) {
  //Calculate total bill per person
  const amountPerson = Number(amount) / Number(personN);
  const tipPerson = (Number(amount) * perc) / Number(personN);
  console.log(amountPerson + tipPerson);
  return amountPerson + tipPerson;
};

const calculateTip = function (amount, perc, personN) {
  //Calculate Tip per person
  console.log((Number(amount) * perc) / Number(personN));
  return (Number(amount) * perc) / Number(personN);
};

const getValue = function (value) {
  return value;
};
const calculate = function () {
  if (
    (numberOfPeople.value == 0 || numberOfPeople.value === "") &&
    billAmount.value > 0
  ) {
    errorMessageP.textContent = "  can't be zero!";
    errorMessageP.classList.add("invalid");
    numberOfPeople.classList.add("invalid-input");
    tipPerPerson.innerText = "$0.00";
    totalPerPerson.innerText = "$0.00";
  } else if (
    (billAmount.value == 0 || billAmount.value === "") &&
    numberOfPeople.value > 0
  ) {
    billAmount.classList.add("invalid-input");
    errorMessageB.innerText = "  can't be zero!";
    errorMessageB.classList.add("invalid");
    tipPerPerson.innerText = "$0.00";
    totalPerPerson.innerText = "$0.00";
  } else {
    resetMessage();
  }
  console.log(totalPerson);
  if (totalBill > 0 && percentage > 0 && totalPerson > 0) {
    totalPerPerson.textContent =
      "$" + calculateBill(totalBill, percentage, totalPerson).toFixed(2);
    tipPerPerson.textContent =
      "$" + calculateTip(totalBill, percentage, totalPerson).toFixed(2);
    btnReset.disabled = false;
    btnReset.classList.add("btn-active-calc");
  }
};

//handling active classes
function handleActiveClass(e) {
  if (activeButton != null && activeButton != e.currentTarget) {
    activeButton.classList.remove("btn-active");
    activeButton.classList.remove("btn-active-calc");
    activeButton = e.currentTarget;
  }
  activeButton = e.currentTarget;
  if (billAmount.value > 0 && percentage > 0 && totalPerson > 0) {
    // calculate();
    if (e.currentTarget.classList.contains("btn")) {
      e.currentTarget.classList.add("btn-active-calc");
      e.currentTarget.classList.remove("btn-active");
    }
  }
}
//Click handling
const handleClick = (e) => {
  e.preventDefault();
  e.currentTarget.classList.add("btn-active");
  percentage = getValue(e.currentTarget.value);
  handleActiveClass(e);
  calculate();
};
// number of people
const getNumberPersons = function () {
  numberOfPeople.addEventListener("input", (e) => {
    e.preventDefault();
    totalPerson = Number(getValue(numberOfPeople.value));
    if (billAmount.value > 0 && percentage > 0) {
      calculate();
    }
  });
  return totalPerson;
};
// total bill amount
const getBillAmount = function () {
  billAmount.addEventListener("input", (e) => {
    e.preventDefault();
    totalBill = Number(getValue(billAmount.value));
    if (numberOfPeople.value > 0 && percentage > 0) {
      calculate();
    }
  });
  return totalBill;
};

function start() {
  resetMessage();
  activeButton = null;
  getBillAmount();
  activeBtnReset();
  getNumberPersons();
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 || event.target.nodeName == "input") {
      event.preventDefault();
      numberOfPeople.focus();
    }
    if (event.keyCode === 13 || event.target.nodeName == "button") {
      event.target.disabled = "true";
      event.target.classList.remove("btn-active-calc");
      event.target.classList.remove("btn-active");
    }
  });
  // Add event listeners for percentage buttons
  buttons.forEach((btn) => {
    if (btn.classList.contains("btn")) {
      btn.addEventListener("click", handleClick);
      calculate();
    } else if (btn.classList.contains("custom-percentage")) {
      btn.addEventListener("input", (e) => {
        e.preventDefault();
        percentage = getValue(btn.value) / 100;
        btn.classList.remove("btn-active-calc");
        console.log(percentage);
        handleActiveClass(e);
        calculate();
      });
    }
  });
  if (billAmount.value > 0 && percentage > 0 && billAmount.value > 0) {
    calculate();
  }
}
start();
function activeBtnReset() {
  if (
    billAmount.value !== 0 ||
    billAmount.value !== "" ||
    billAmount.value > 0 ||
    numberOfPeople.value !== 0 ||
    numberOfPeople.value !== "" ||
    numberOfPeople.value > 0
  ) {
    btnReset.addEventListener("click", resetForm, true);
  }
}

function resetForm() {
  activeBtnReset();
  start();
  percentage = 0;
  totalBill = 0;
  totalPerson = 0;
  billAmount.value = "";
  numberOfPeople.value = "";
  customPercentage.value = "";
  billAmount.disabled = false;
  numberOfPeople.disabled = false;
  tipPerPerson.innerText = "$0.00";
  totalPerPerson.innerText = "$0.00";
  resetStyle();
}

function resetStyle() {
  resetMessage();
  btnReset.disabled = true;

  btnReset.classList.remove("btn-active-calc");
  buttons.forEach((btn) => {
    if (btn.classList.contains("calculator-button")) {
      btn.classList.remove("btn-active");
      btn.classList.remove("btn-active-calc");
    }
  });
}

function resetMessage() {
  errorMessageP.textContent = "";
  errorMessageP.classList.remove("invalid");
  numberOfPeople.classList.remove("invalid-input");
  errorMessageB.innerText = "";
  billAmount.classList.remove("invalid-input");
  errorMessageB.classList.remove("invalid");
}
