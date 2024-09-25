import {
  dateCardTemplate,
  consumptionReportLog,
  mealLogPage,
  foodRow,
} from "./templates.js";

import { foodData } from "./data.js";

const dateContainer = document.querySelector(".date");
const foodLogWrapper = document.querySelector(".row-three");

const data = foodData["meal-data"];

function onInit() {
  const today = new Date();

  //Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;
  //Create the week calendar
  createWeeklyCalendar();
  /* renderMealLog(); */
  renderMealLog();
  onHandleAddMealButtons();
}

onInit();

function createWeeklyCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();

  const weekRow = daysOfWeek
    .map((day, index) => {
      const dayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        index - currentDayOfWeek + currentDay
      ).getDate();

      //Highlight current date
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
  onSelectDate();
}

function renderMealLog() {
  let logContainer = document.querySelector(".row-three");
  logContainer.innerHTML = "";
  logContainer.innerHTML = consumptionReportLog;
}

function onSelectDate() {
  const weekdayButons = document.querySelectorAll(".btn-weekday");

  weekdayButons.forEach((button) => {
    button.addEventListener("click", (event) => {
      renderMealLog();
      onHandleAddMealButtons();
    });
  });
}

function onHandleAddMealButtons() {
  const addMealButtons = document.querySelectorAll(".btn-add-meal");
  console.log("Add Meal Buttons:", addMealButtons); // Check if buttons are selected
  addMealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderMealPlanner();
      onHandleBrowseAllFoodsButton(foodData);
    });
  });
}

function renderMealPlanner() {
  foodLogWrapper.innerHTML = "";
  foodLogWrapper.innerHTML = mealLogPage;
}

//TODO revise food row displaying logic because is
//displaying undefined instead of the food details

function onHandleBrowseAllFoodsButton(data) {
  document
    .querySelector(".btn-browse-all-foods")
    .addEventListener("click", () => {
      displayAllFoods(foodData);
    });
}

function displayAllFoods(data) {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  data["meal-data"].forEach((food) => {
    foodLogDisplay.innerHTML += foodRow(
      food.name,
      food.serving_size,
      food.calories_per_serving
    );
  });
}

/* const appId = "2cd5c344";
const appKey = "0b682d95ce4b253040eb6ff752ea0665"; 

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-app-id": appId,
    "x-app-key": appKey,
  },
  body: JSON.stringify({
    query: query,
  }),
};

fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Handle the response data
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
 */
