// Import necessary templates and data
import {
  dateCardTemplate,
  consumptionReportLog,
  mealPlanner,
  foodRow,
  basket,
  basketFoodRow,
} from "./templates.js";

import { foodData } from "./data.js";

// Selectors for main components
const mainContainer = document.querySelector(".row-three");
const dateContainer = document.querySelector(".date");
const menuPlanner = document.querySelector(".btn-menu-planner");

// Food data
const data = foodData["meal-data"];

// Basket items
let foodBasket = [];
let basketItemsCount = 0;
let foodServingQty = 1;

// Initialize the application
function onInit() {
  const today = new Date();

  // Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;
  handleMenuPlannerButton();
  // Create the week calendar
  createWeeklyCalendar();

  // Render meal log and enable buttons
  renderConsumptionLog();
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
  onSelectDate();
}

/*Render the consumption log for the selected date */
function onSelectDate() {
  const weekdayButons = document.querySelectorAll(".btn-weekday");

  weekdayButons.forEach((button) => {
    button.addEventListener("click", () => {
      /* TODO: render the historical consumption log for the actual
      selected date as for now it's only rendering the generic log.
      HINT: might need to disable the add food buttons for the
      historical data since it's already in the past and there is no
      point on altering the data
      */
      renderConsumptionLog();
    });
  });
}

// Render Meal Log Function
function renderConsumptionLog() {
  mainContainer.innerHTML = "";
  mainContainer.innerHTML += consumptionReportLog;

  /* Attach event listeners to add meal buttons through 
  event delegation. */
  mainContainer.addEventListener("click", handleAddMealButtons);
}

//Handle AddMealButtons click event
function handleAddMealButtons(event) {
  if (event.target.classList.contains("btn-add-meal")) {
    renderMealPlanner();
  }
}

//Render the Meal log Page component
function renderMealPlanner() {
  const mealPlannerElement = document.querySelector(".meal-log-page");
  const componentToHide = document.querySelector(".consumption-log");

  if (componentToHide) {
    componentToHide.style.display = "none";
  }

  if (!mealPlannerElement) {
    mainContainer.innerHTML += mealPlanner;
    //Browse all foods button click event through event delegation
    mainContainer.addEventListener("click", handleBrowseAllFoodsButton);

    //Search foods button click event through event delegation
    mainContainer.addEventListener("click", handleSearchFoodsButton);

    //basket button click event through event delegation
    mainContainer.addEventListener("click", handleButtonBasket);

    //Clear button click event through event delegation
    mainContainer.addEventListener("click", handleButtonClearContent);

    //Home button click event through event delegation
    mainContainer.addEventListener("click", handleButtonBackToHome);
  } else {
    toggleComponent(".meal-log-page", ".consumption-log");
  }
}

//Handle BrowseAllFoodsButton click event
function handleBrowseAllFoodsButton(event) {
  if (event.target.classList.contains("btn-browse-all-foods")) {
    displayAllFoods();
  }
}

//Display all food items
function displayAllFoods() {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  //TODO: need to sort the data alphabetically

  data.forEach((food) => {
    foodLogDisplay.innerHTML += foodRow({
      name: food.name,
      serving_size: food.serving_size,
      calories: food.calories_per_serving,
    });
  });
  handleAddFoodButtons();
}

//Handle SearchFoodsButton click event
function handleSearchFoodsButton(event) {
  if (event.target.classList.contains("btn-search-foods")) {
    displaySearchedFoods();
  }
}

//Display the searched foods
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
  handleAddFoodButtons();
}

//search for requested foods inside the data array
function searchFoods(query) {
  if (!query) {
    return data;
  } else {
    return data.filter((food) => food.name.toLowerCase().includes(query));
  }
}

//Handle AddFoodButtons to basket click event
function handleAddFoodButtons() {
  const btnAddFood = document.querySelectorAll(".btn-add-food");

  btnAddFood.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      onAddFoodToBasket(food);
    });
  });
}

/* Add food items to the basket component */
function onAddFoodToBasket(food) {
  if (food != null) {
    foodBasket.push(food);
    basketItemsCount = foodBasket.length;

    const basketItemCounter = document.querySelector(".basket-items");
    if (basketItemCounter) {
      basketItemCounter.textContent = basketItemsCount;
    }

    console.log("Food added to basket:", foodBasket);
    console.log(basketItemsCount);
  }
}

//Handle ButtonCancel click event in Basket component
function handleButtonBasket(event) {
  if (event.target.classList.contains("btn-food-basket")) {
    displayBasket();
  }
}

//display Basket component
function displayBasket() {
  const basketContainer = document.querySelector(".basket-container");
  const componentToHide = document.querySelector(".meal-log-page");

  if (componentToHide) {
    componentToHide.style.display = "none";
  }

  if (!basketContainer) {
    mainContainer.innerHTML += basket;
    renderBasketItems();
    mainContainer.addEventListener("click", handleButtonCancel);
  } else {
    toggleComponent(".basket-container", ".meal-log-page");
    renderBasketItems();
  }
}

//render the basket items to the basket component
function renderBasketItems() {
  const basketContent = document.querySelector(".basket-content");
  basketContent.innerHTML = "";

  if (foodBasket.length === 0) {
    basketContent.innerHTML = "Basket is empty";
  }

  foodBasket.forEach((food) => {
    basketContent.innerHTML += basketFoodRow(food, foodServingQty);
  });

  handleQuantityInputs();
  handleRemoveItemButton();
}

/* handle the inputs for the serving quantity for each food item
and perform operations to update the Kcal amount and dusplay it.
*/
function handleQuantityInputs() {
  const quantities = document.querySelectorAll(".input-qty");
  quantities.forEach((quantity, index) => {
    quantity.addEventListener("input", (event) => {
      const newQty = event.target.value;
      foodServingQty = newQty;

      const food = foodBasket[index];
      const kcalQty = quantity
        .closest("tr")
        .querySelector(".basket-food-calories span");
      kcalQty.textContent = food.calories * newQty;
    });
  });
}

//Clear the food display contents
function handleButtonClearContent(event) {
  if (event.target.classList.contains("btn-clear-content")) {
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
  }
}

//Cancel food logging and return to home
function handleButtonBackToHome(event) {
  if (event.target.classList.contains("btn-back-to-home")) {
    toggleComponent(".consumption-log", ".meal-log-page");
  }
}

function handleButtonCancel(event) {
  if (event.target.classList.contains("btn-cancel")) {
    toggleComponent(".meal-log-page", ".basket-container");
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
  }
}

function handleRemoveItemButton() {
  const removeItemButtons = document.querySelectorAll(".btn-remove-item");
  removeItemButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      removeFoodItemFromBasket(food);
    });
  });
}

//remove food item from the basket
function removeFoodItemFromBasket(food) {
  if (food != null) {
    foodBasket = foodBasket.filter((item) => item.name !== food.name);
    console.log(foodBasket);
    renderBasketItems(); //update the basket

    //update the basket item counter
    const basketItemCounter = document.querySelector(".basket-items");
    basketItemCounter.textContent = foodBasket.length;
  }
}

/* toggle between components */
function toggleComponent(showComponent, hideComponent) {
  //togle selected component
  const componentToShow = document.querySelector(showComponent);
  if (componentToShow) {
    componentToShow.style.display = "block";
  }

  //Hide current component
  const componentToHide = document.querySelector(hideComponent);
  if (componentToHide) {
    componentToHide.style.display = "none";
  }
}

//#region navigation menu
function handleMenuPlannerButton() {
  menuPlanner.addEventListener("click", () => {
    renderMealPlanner();
  });
}
//#endregion
