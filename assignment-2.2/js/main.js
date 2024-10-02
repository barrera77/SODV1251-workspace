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
const remainingCalories = document.querySelector(".remaining-calories");
const calorieIntake = document.querySelector(".calorie-intake");
const progressBar = document.querySelector(".inner-bar");
const proteinAmount = document.querySelector(".protein-amount");
const fatAmount = document.querySelector(".fat-amount");
const carbsAmount = document.querySelector(".carbs-amount");

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
let totalCalories = 0;
let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;

/**
 * Initialize the application and required initial logic
 */
function onInit() {
  const today = new Date();

  currentLocation = "Home";
  console.log(currentLocation);

  // Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;

  // Create the week calendar
  createWeeklyCalendar();

  // Render meal log and enable buttons
  renderConsumptionLog();
}

onInit();

/**
 * Create weekly calendar
 */
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

/**
 * Sort/shuffle the food data array using the
 * Fisher-Yates (Knuth) Shuffle algorithm,
 * @param {*} array
 * @returns
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/**
 * Get the random items to display
 * @param {*} data
 * @param {*} mealCount
 * @returns
 */
function getRandomMeals(data, mealCount) {
  const randomizedData = shuffleArray([...data]);
  return randomizedData.slice(0, mealCount);
}

function generateDailyRandomMeals() {
  //get the containers
  const breakfastMealContainer = document.querySelector(
    ".breakfast-meal-container"
  );
  const lunchMealContainer = document.querySelector(".lunch-meal-container");
  const dinnerMealContainer = document.querySelector(".dinner-meal-container");
  const snacksMealContainer = document.querySelector(".snack-meal-container");
  //prepare data
  const randomMeals = {
    breakfast: getRandomMeals(data, 4),
    lunch: getRandomMeals(data, 4),
    dinner: getRandomMeals(data, 4),
    snack: getRandomMeals(data, 3),
  };

  breakfastMealContainer.innerHTML = "";
  randomMeals.breakfast.forEach((breakfastItem) => {
    breakfastMealContainer.innerHTML += loggedFoodRow(breakfastItem);
  });

  lunchMealContainer.innerHTML = "";
  randomMeals.lunch.forEach((lunchItem) => {
    lunchMealContainer.innerHTML += loggedFoodRow(lunchItem);
  });

  dinnerMealContainer.innerHTML = "";
  randomMeals.dinner.forEach((dinnerItem) => {
    dinnerMealContainer.innerHTML += loggedFoodRow(dinnerItem);
  });

  snacksMealContainer.innerHTML = "";
  randomMeals.snack.forEach((snackItem) => {
    snacksMealContainer.innerHTML += loggedFoodRow(snackItem);
  });

  updateCalories(randomMeals);
}

/**
 * update the totals for the random data
 * @param {*} randomMeals
 */
function updateCalories(randomMeals) {
  let mealCalories = 0;
  for (const mealType in randomMeals) {
    let proteins = 0;
    let fat = 0;
    let carbs = 0;
    let totalCals = 0;

    randomMeals[mealType].forEach((meal) => {
      mealCalories += parseInt(meal.calories_per_serving) * parseInt(meal.qty);
      proteins += parseFloat(meal.protein_per_serving);
      fat += parseFloat(meal.fat_per_serving);
      carbs += parseFloat(meal.carbs_per_serving);
      totalCals += mealCalories;
    });

    proteinAmount.textContent = Math.round(proteins * 100) / 100;
    fatAmount.textContent = Math.round(fat * 100) / 100;
    carbsAmount.textContent = Math.round(carbs * 100) / 100;

    const calorieDisplayElement = document.querySelector(
      `.${mealType}-log-cals-display span`
    );
    if (calorieDisplayElement) {
      calorieDisplayElement.textContent = `${mealCalories} `;
    }

    calorieIntake.textContent = totalCals;
    updateProgressBar(totalCals);
  }
}

/**
 * Render the consumption log for the selected date
 */
function onSelectDate() {
  const logContainer = document.querySelector(".row-three");
  const weekdayButtons = document.querySelectorAll(".btn-weekday");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();

  weekdayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedDayOfTheWeek =
        button.querySelector(".week-day").textContent;
      const dateIndex = daysOfWeek.indexOf(selectedDayOfTheWeek);

      navigateCalendar();
      console.log(
        `Selected Day of Week: ${selectedDayOfTheWeek}, ${dateIndex}`
      );

      if (dateIndex < currentDayOfWeek) {
        generateDailyRandomMeals();
      } else {
        logContainer.innerHTML = "";
        renderConsumptionLog();
      }
    });
  });
}

/**
 * Render Meal Log Function
 */
function renderConsumptionLog() {
  mainContainer.innerHTML = "";
  mainContainer.innerHTML += consumptionReportLog;

  /* Attach event listeners to add meal buttons through 
  event delegation. */
  mainContainer.addEventListener("click", handleAddMealButtons);

  const calorieDisplayElements = document.querySelectorAll(".log-cals-display");

  calorieDisplayElements.forEach((display) => {
    display.textContent = 0;
  });
}

/**
 * Handle AddMealButtons click event
 * @param {*} event
 */
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
    const foodLogDisplay = document.querySelector(".food-log-display");
    foodLogDisplay.innerHTML = "";
  }
}

/**
 * Render the Meal log Page component
 */
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

/**
 * Handle BrowseAllFoodsButton click event
 * @param {*} event
 */
function handleBrowseAllFoodsButton(event) {
  if (event.target.classList.contains("btn-browse-all-foods")) {
    displayAllFoods();
  }
}

/**
 * Display all food items
 */
function displayAllFoods() {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

  sortedData.forEach((food) => {
    foodLogDisplay.innerHTML += foodRow({
      name: food.name,
      serving_size: food.serving_size,
      calories_per_serving: food.calories_per_serving,
    });
  });
  handleAddFoodButtons();
}

/**
 * Handle SearchFoodsButton click event
 * @param {*} event
 */
function handleSearchFoodsButton(event) {
  if (event.target.classList.contains("btn-search-foods")) {
    displaySearchedFoods();
  }
}

/**
 * Display the searched foods
 */
function displaySearchedFoods() {
  const foodLogDisplay = document.querySelector(".food-log-display");
  foodLogDisplay.innerHTML = "";

  let query = document.querySelector(".food-input").value;

  let search = searchFoods(query);

  search.forEach((food) => {
    foodLogDisplay.innerHTML += foodRow({
      name: food.name,
      serving_size: food.serving_size,
      calories_per_serving: food.calories_per_serving,
    });
  });
  handleAddFoodButtons();
}

/**
 * search for requested foods inside the data array
 * @param {*} query
 * @returns the results of the search(filtered items)
 * based on the search criteria
 */
function searchFoods(query) {
  if (!query) {
    return data;
  } else {
    return data.filter((food) => food.name.toLowerCase().includes(query));
  }
}

/**
 * Handle AddFoodButtons to basket click event
 */
function handleAddFoodButtons() {
  const btnAddFood = document.querySelectorAll(".btn-add-food");

  btnAddFood.forEach((button) => {
    button.addEventListener("click", (event) => {
      const food = JSON.parse(event.target.dataset.food);
      onAddFoodToBasket(food);
    });
  });
}

/**
 * Add food items to the basket component
 * @param {*} food
 */
function onAddFoodToBasket(food) {
  if (food != null) {
    let duplicatedFoodItem = foodBasket.find((item) => item.name === food.name);
    if (!duplicatedFoodItem) {
      food.qty = 1;
      foodBasket.push(food);
    } else {
      duplicatedFoodItem.qty += 1;
      duplicatedFoodItem.calories_per_serving =
        duplicatedFoodItem.calories_per_serving * duplicatedFoodItem.qty;
    }

    basketItemsCount = foodBasket.length;

    const basketItemCounter = document.querySelector(".basket-items");
    if (basketItemCounter) {
      basketItemCounter.textContent = basketItemsCount;
    }
  }
}

/**
 * Handle ButtonCancel click event in Basket component
 * @param {*} event
 */
function handleButtonBasket(event) {
  if (event.target.classList.contains("btn-food-basket")) {
    displayBasket();
  }
}

/**
 * display Basket component
 */
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
      kcalQty.textContent = food.calories_per_serving * newQty;
      countTotalCalories();
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
    renderBasketItems(); //update the basket

    //update the basket item counter
    const basketItemCounter = document.querySelector(".basket-items");
    basketItemCounter.textContent = foodBasket.length;

    const totalCalories = document.querySelector(".total-calories");
    if (foodBasket.length === 0) {
      totalCalories.textContent = foodBasket.length;
    }
  }
}

/**
 * Update the calorie totals
 */
function countTotalCalories() {
  calorieCount = 0;
  const basketFoodCalories = document.querySelectorAll(".basket-food-calories");
  const totalCalories = document.querySelector(".total-calories");

  basketFoodCalories.forEach((foodCalorie) => {
    const kcalTotal = foodCalorie
      .closest("tr")
      .querySelector(".basket-food-calories span");
    calorieCount += parseInt(kcalTotal.textContent);
    totalCalories.textContent = calorieCount;

    if (foodBasket.length === 0) {
      calorieCount = 0;
    }
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

    updateMainCalorieCounters();
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
  } else {
    basketContent.innerHTML = "Basket is empty, no items to log";
  }
}

/**
 * Update nutrient totals for the main functionality
 */
function updateMainCalorieCounters() {
  let caloriesPerMeal = 0;
  let currentMeals = [];
  let proteins = 0;
  let fat = 0;
  let carbs = 0;
  meals[selectedMeal].forEach((meal) => {
    caloriesPerMeal += parseInt(meal.calories_per_serving) * parseInt(meal.qty);
    currentMeals.push(data.find((food) => food.name === meal.name));
  });

  const calorieDisplayElement = document.querySelector(
    `.${selectedMeal}-log-cals-display span`
  );

  if (calorieDisplayElement) {
    calorieDisplayElement.textContent = `${caloriesPerMeal} `;

    totalCalories += parseInt(calorieDisplayElement.textContent);

    calorieIntake.textContent = totalCalories;
    updateProgressBar(totalCalories);

    currentMeals.forEach((meal) => {
      proteins += parseFloat(meal.protein_per_serving);

      fat += parseFloat(meal.fat_per_serving);
      carbs += parseFloat(meal.carbs_per_serving);

      totalProtein += parseFloat(meal.protein_per_serving);
      proteinAmount.textContent = Math.round(totalProtein * 100) / 100;
      totalFat += parseFloat(meal.fat_per_serving);
      fatAmount.textContent = Math.round(totalFat * 100) / 100;

      totalCarbs += parseFloat(meal.carbs_per_serving);
      carbsAmount.textContent = totalCarbs;
    });
  } else {
    calorieDisplayElement.textContent = 0;
  }
}

/**
 * Hels navigating through the calendar days and display
 * the corresponding components
 */
function navigateCalendar() {
  if (currentLocation === "Meal Planner") {
    toggleComponent(".consumption-log", ".meal-log-page");
    currentLocation = "Home";
    console.log(currentLocation);
  }
  if (currentLocation === "Basket") {
    toggleComponent(".consumption-log", ".basket-container");
    currentLocation = "Home";
    console.log(currentLocation);
  }
}

/**
 * Update the progress bar for the calorie tracker
 */
function updateProgressBar(calories) {
  if (calories > 2400) {
    progressBar.style.width = 0 + "%";
    remainingCalories.textContent = 0;
  } else {
    const progress = ((2400 - calories) / 2400) * 100;

    progressBar.style.width = progress + "%";

    remainingCalories.textContent = 2400 - calories;
  }
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

//#endregion
