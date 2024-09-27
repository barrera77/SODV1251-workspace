import {
  dateCardTemplate,
  consumptionReportLog,
  mealPlanner,
  foodRow,
  basket,
} from "./templates.js";

import { foodData } from "./data.js";

const dateContainer = document.querySelector(".date");
const foodLogWrapper = document.querySelector(".row-three");
const menuPlanner = document.querySelector(".menu-planner");

//Food data
const data = foodData["meal-data"];

//basket items
let foodBasket = [];
let basketItemsCount = 0;

function onInit() {
  const today = new Date();

  //Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;
  //Create the week calendar
  createWeeklyCalendar();
  /* renderMealLog(); */
  renderConsumptionLog();
  onHandleAddMealButtons();

  /* enable nav menu buttons */
  onHandleMenuPlannerButton();
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

function renderConsumptionLog() {
  let logContainer = document.querySelector(".row-three");
  logContainer.innerHTML = "";
  logContainer.innerHTML = consumptionReportLog;
}

function onSelectDate() {
  const weekdayButons = document.querySelectorAll(".btn-weekday");

  weekdayButons.forEach((button) => {
    button.addEventListener("click", () => {
      renderConsumptionLog();
    });
  });
}

function onHandleAddMealButtons() {
  const addMealButtons = document.querySelectorAll(".btn-add-meal");
  addMealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderMealPlanner();
      onHandleBrowseAllFoodsButton();
      onHandleSearchFoodsButton();
      onHandleButtonBasket();
      renderBasketItems();
    });
  });
}

function renderMealPlanner() {
  foodLogWrapper.innerHTML = "";
  foodLogWrapper.innerHTML = mealPlanner;
}

function onHandleBrowseAllFoodsButton() {
  document
    .querySelector(".btn-browse-all-foods")
    .addEventListener("click", () => {
      displayAllFoods();
    });
}

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
  onHandleAddFoodButtons();
}

function searchFoods(query) {
  if (!query) {
    return data;
  } else {
    return data.filter((food) => food.name.toLowerCase().includes(query));
  }
}

function onHandleSearchFoodsButton() {
  document.querySelector(".btn-search-foods").addEventListener("click", () => {
    displaySearchedFoods();
  });
}

function displaySearchedFoods() {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  let query = document.querySelector(".food-input").value;

  let search = searchFoods(query);

  search.forEach((food) => {
    foodLogDisplay.innerHTML += foodRow({
      name: food.name,
      serving_size: food.serving_size,
      calories: food.calories_per_serving,
    });
  });
  onHandleAddFoodButtons();
}

function onHandleAddFoodButtons() {
  const btnAddFood = document.querySelectorAll(".btn-add-food");

  btnAddFood.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      onAddFoodToBasket(food);
    });
  });
}

function onAddFoodToBasket(food) {
  if (food != null) {
    foodBasket.push(food);
    basketItemsCount += 1;
    const basketItemCounter = document.querySelector(".basket-items");
    if (basketItemCounter) {
      basketItemCounter.textContent = basketItemsCount;
    }
    console.log("Food added to basket:", foodBasket);
    console.log(basketItemsCount);
  }
}

function onHandleButtonBasket() {
  document.querySelector(".btn-food-basket").addEventListener("click", () => {
    displayBasket();
  });
}

function displayBasket() {
  // const foodLogDisplay = document.querySelector(".food-log-display");
  basketContainerWrapper.innerHTML = "";
  basketContainerWrapper.innerHTML = basket;

  //foodLogDisplay.innerHTML = basket;
  renderBasketItems();
}

/* TODO: fix renderBasketItems. gives a null reference error on line 206
  have to disable/hide add food buttons. Suggestion create a whole new component
  to display calorie count and item counts with option to add/remove 
  quantities*/
function renderBasketItems() {
  const basketContent = document.querySelector(".basket-content");
  basketContent.innerHTML = "";

  if (foodBasket.length === 0) {
    basketContent.innerHTML = "Basket is empty";
    /* TODO: disable Log Food button */
  }

  foodBasket.forEach((food) => {
    basketContent.innerHTML += foodRow(food);
  });
}

/* menu navigation */
function onHandleMenuPlannerButton() {
  menuPlanner.addEventListener("click", () => {
    renderMealPlanner();
    onHandleBrowseAllFoodsButton();
    onHandleSearchFoodsButton();
    onHandleButtonBasket();
    renderBasketItems();
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
