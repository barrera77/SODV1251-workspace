// Import necessary templates and data
import {
  dateCardTemplate,
  consumptionReportLog,
  mealPlanner,
  foodRow,
  basket,
  basketFoodRow,
  loggedFoodRow,
} from "./templates.js";

import { foodData } from "./data.js";

// Selectors for main components
const mainContainer = document.querySelector(".row-three");
const dateContainer = document.querySelector(".date");
const menuPlanner = document.querySelector(".btn-menu-planner");
const remainingCalories = document.querySelector(".remaining-calories");
const calorieIntake = document.querySelector(".calorie-intake");
const progressBar = document.querySelector(".inner-bar");

// Food data
const data = foodData["meal-data"];

//Variables
let foodBasket = [];
let basketItemsCount = 0;
let foodServingQty = 1;
let calorieCount = 0;
let loggedFood = [];
let currentLocation = ""; //track current location
let selectedMeal = ""; //track selected meal
const meals = {
  //Store the food items for the selected meal for later process
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};

/**
 * Initialize the application and required initial logic
 */
function onInit() {
  const today = new Date();

  currentLocation = "Home";
  console.log(currentLocation);

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
    selectedMeal = event.target.classList.contains("lunch")
      ? "lunch"
      : event.target.classList.contains("dinner")
      ? "dinner"
      : event.target.classList.contains("snack")
      ? "snack"
      : "breakfast";
    renderMealPlanner();
    console.log(selectedMeal);
  }
}

//Render the Meal log Page component
function renderMealPlanner() {
  currentLocation = "Meal Planner";
  console.log(currentLocation);

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

//TODO: revise btn-add-food as it does not display the information correctly

//Handle AddFoodButtons to basket click event
function handleAddFoodButtons() {
  const btnAddFood = document.querySelectorAll(".btn-add-food");

  btnAddFood.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      onAddFoodToBasket(food);
    });
  });

  /* document.querySelectorAll('.add-food-button').forEach(button => {
    button.addEventListener('click', function() {
      const foodId = this.dataset.foodId; // Assuming the button has a data attribute for food ID
      const foodToAdd = foodItems.find(item => item.id === parseInt(foodId));
      onAddFoodToBasket(foodToAdd);
    });
  }); */
}

/* Add food items to the basket component */
function onAddFoodToBasket(food) {
  if (food != null) {
    let duplicatedFoodItem = foodBasket.find((item) => item.id === food.id);
    if (!duplicatedFoodItem) {
      food.qty = 1;
      foodBasket.push(food);
    } else {
      duplicatedFoodItem.qty += 1;
      duplicatedFoodItem.calories_per_serving =
        duplicatedFoodItem.calories_per_serving * duplicatedFoodItem.qty;

      console.log(
        `Updated qty for ${duplicatedFoodItem.name}: ${duplicatedFoodItem.qty}`
      );
    }

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
  currentLocation = "Basket";
  console.log(currentLocation);
  const basketContainer = document.querySelector(".basket-container");
  const componentToHide = document.querySelector(".meal-log-page");

  if (componentToHide) {
    componentToHide.style.display = "none";
  }

  if (!basketContainer) {
    mainContainer.innerHTML += basket;
    renderBasketItems();
    mainContainer.addEventListener("click", handleButtonCancel);
    mainContainer.addEventListener("click", handleLogAllFoodButtons);
  } else {
    toggleComponent(".basket-container", ".meal-log-page");
    renderBasketItems();
  }
}

/**
 * render the basket items to the basket component
 */
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
  handleLogFoodButtons();
  countTotalCalories();
  updateProgressBar();
}

/**
 * handle the inputs for the serving quantity for each food item
 * and perform operations to update the Kcal amount and dusplay it.
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
      countTotalCalories();
      updateProgressBar();
    });
  });
}

/**
 * handle claer button and add event listener through event delegation
 * to clear the food display contents
 * @param {*} event
 */
function handleButtonClearContent(event) {
  if (event.target.classList.contains("btn-clear-content")) {
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
  }
}

/**
 * Cancel food logging and return to home
 * @param {*} event
 */
function handleButtonBackToHome(event) {
  if (
    event.target.classList.contains("btn-back-to-home") &&
    currentLocation === "Meal Planner"
  ) {
    toggleComponent(".consumption-log", ".meal-log-page");
    renderLooggedFoodItems();
    currentLocation = "Home";
  } else if (
    event.target.classList.contains("btn-back-to-home") &&
    currentLocation === "Basket"
  ) {
    toggleComponent(".consumption-log", ".basket-container");
    renderLooggedFoodItems();
    currentLocation = "Home";
  }
}
/**
 * cancel food logging without disposing current items and go back to the planner
 * @param {*} event
 */
function handleButtonCancel(event) {
  if (event.target.classList.contains("btn-cancel")) {
    toggleComponent(".meal-log-page", ".basket-container");
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
    currentLocation = "Meal Planner";
  }
}

/**
 * Handle remove item buttons logic to remove the selected food
 * items on click
 */
function handleRemoveItemButton() {
  const removeItemButtons = document.querySelectorAll(".btn-remove-item");
  removeItemButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      removeFoodItemFromBasket(food);
    });
  });
}

/**
 * Remove individual food items from the basket
 * @param {*} food
 */
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

/**
 * Update the calorie totals
 */
function countTotalCalories() {
  calorieCount = 0;
  const basketFoodCalories = document.querySelectorAll(".basket-food-calories");
  const totalCalories = document.querySelector(".total-calories");

  /* TODO: modify function to only update the basket totals and
  separate the logic that updates the totals for the cal tracker
  */
  basketFoodCalories.forEach((foodCalorie) => {
    const kcalTotal = foodCalorie
      .closest("tr")
      .querySelector(".basket-food-calories span");
    calorieCount += parseInt(kcalTotal.textContent);
    totalCalories.textContent = calorieCount;
    remainingCalories.textContent = 2400 - calorieCount;
    calorieIntake.textContent = calorieCount;
    console.log("Calorie count total ", calorieCount);
  });
}

/**
 * Handle the  food logging buttons logic process
 */
function handleLogFoodButtons() {
  const logFoodButtons = document.querySelectorAll(".btn-log-food");
  logFoodButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      addFoodToLog(food);
    });
  });
}

/**
 * Move the selected food individually to the food log array
 * @param {*} food
 */
function addFoodToLog(food) {
  if (food != null && selectedMeal) {
    meals[selectedMeal].push(food);

    //remove the food from the basket
    removeFoodItemFromBasket(food);
    console.log(
      `"Food added to ${selectedMeal}:  ${meals[selectedMeal].length}"`
    );
  }
}

/**
 * Handle the log all food buttons logic and add event listeners
 * through event delegation
 * @param {*} event
 */
function handleLogAllFoodButtons(event) {
  if (event.target.classList.contains("btn-log-all-food")) {
    //Transfer all item from the basket
    addAllfoodsToLog(foodBasket);

    //Empty the basket
    foodBasket = [];
    //Update basket
    renderBasketItems();
  }
}

/**
 * Display the logged food items in the consumption
 *  report log/home page
 */
function renderLooggedFoodItems() {
  const selectedMealContainer = document.querySelector(
    `.${selectedMeal}-meal-container`
  );
  if (selectedMealContainer) {
    selectedMealContainer.innerHTML = "";

    loggedFood = [...meals[selectedMeal]];

    loggedFood.forEach((foodItem) => {
      selectedMealContainer.innerHTML += loggedFoodRow(foodItem);
    });
  }
}

/**
 * Transfer all food items from the basket to the food log array
 * @param {*} foodArray
 */
function addAllfoodsToLog(foodArray) {
  const basketContent = document.querySelector(".basket-content");
  if (foodArray.length > 0 && selectedMeal) {
    meals[selectedMeal] = [...foodArray];

    console.log(meals[selectedMeal].length);
  } else {
    basketContent.innerHTML = "Basket is empty, no items to log";
  }
}

/**
 * Update the progress bar for the calorie tracker
 */
function updateProgressBar() {
  const progress = ((2400 - calorieCount) / 2400) * 100;
  progressBar.style.width = progress + "%";
}

/**
 * toggle between components simulating a SPA
 * @param {*} showComponent
 * @param {*} hideComponent
 */
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

/**
 * Handle the logic for the menu "Planner" button to render
 * the meal planner view
 */
function handleMenuPlannerButton() {
  menuPlanner.addEventListener("click", () => {
    renderMealPlanner();
    currentLocation = "Meal Planner";
  });
}
//#endregion
