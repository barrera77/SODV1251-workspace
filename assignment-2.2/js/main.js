// Import necessary templates and data
import {
  dateCardTemplate,
  consumptionReportLog,
  mealLogPage,
  foodRow,
  basket,
} from "./templates.js";

import { foodData } from "./data.js";

// Selectors for DOM elements
const dateContainer = document.querySelector(".date");
const foodLogWrapper = document.querySelector(".row-three");
const menuPlanner = document.querySelector(".menu-planner");

// Food data
const data = foodData["meal-data"];

// Basket items
let foodBasket = [];
let basketItemsCount = 0;

// Initialize the application
function onInit() {
  const today = new Date();

  // Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;

  // Create the week calendar
  createWeeklyCalendar();

  // Render meal log and enable buttons
  renderMealLog();
}

onInit();

// Create weekly calendar
function createWeeklyCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();

  // Generate calendar HTML for the week
  const weekRow = daysOfWeek
    .map((day, index) => {
      const dayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        index - currentDayOfWeek + currentDay
      ).getDate();

      // Highlight current date
      const isToday = dayOfMonth === currentDay && index === currentDayOfWeek;
      const highlightCurrentDay = isToday ? "today" : "";

      return dateCardTemplate({
        monthDay: dayOfMonth === currentDay ? `${dayOfMonth}` : dayOfMonth,
        weekDay: day,
        highlightCurrentDay,
      });
    })
    .join("");

  document.querySelector(".week-days").innerHTML = weekRow;
  //onSelectDate();
}

// Render Meal Log Function
function renderMealLog() {
  let logContainer = document.querySelector(".row-three");
  logContainer.innerHTML = "";
  logContainer.innerHTML = consumptionReportLog;

  //Attach event listeners to add meal buttons
  onHandleAddMealButtons();
}

//Handle add meal buttons logic
function onHandleAddMealButtons() {
  const addMealButtons = document.querySelectorAll(".btn-add-meal");
  addMealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //Display meal planner page
      renderMealLogPage();
    });
  });
}

//Render the Meal log Page component
function renderMealLogPage() {
  foodLogWrapper.innerHTML = "";
  foodLogWrapper.innerHTML = mealLogPage;
  onHandleBrowseAllFoodsButton();
  clearFoodDisplay();
}

//handle browse all foods button logic
function onHandleBrowseAllFoodsButton() {
  document
    .querySelector(".btn-browse-all-foods")
    .addEventListener("click", () => {
      displayAllFoods();
      returnToHome();
    });
}

//Display all food items
function displayAllFoods() {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  //TODO need to sort the data

  data.forEach((food) => {
    foodLogDisplay.innerHTML += foodRow({
      name: food.name,
      serving_size: food.serving_size,
      calories: food.calories_per_serving,
    });
  });
  //onHandleAddFoodButtons();
}

//clear the food display contents
function clearFoodDisplay() {
  document.querySelector(".btn-clear-content").addEventListener("click", () => {
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
  });
}

//Cancel food logging and return to home page function
function returnToHome() {
  document.querySelector(".btn-back-to-home").addEventListener("click", () => {
    renderMealLog();
  });
}
