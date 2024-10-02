# README: Assignment 2.2 Meal Planner Application

This application helps users manage their daily meal planning by allowing them to log meals, track calories, and monitor their intake of macronutrients (proteins, fats, and carbohydrates). Users can browse food items, add them to a basket, and log their meals. The app dynamically updates calorie and nutrient totals as meals are logged and consumed.

## Features

Weekly Calendar: Displays the current day and allows users to select different days of the week to log meals.
Random Meal Suggestions: Generates random meal options for breakfast, lunch, dinner, and snacks.
Calorie and Nutrient Tracking: Automatically calculates and displays total calories, proteins, fats, and carbs based on the meals consumed.
Meal Logging: Users can add meals to a basket and log them for different times of the day (breakfast, lunch, dinner, snacks).
Search and Browse Foods: Users can browse all available foods or search for specific food items by name.
Progress Bar: Visually tracks calorie intake with a progress bar.

## Files

### templates.js

Contains HTML templates for various components in the application, such as:

dateCardTemplate: Template for displaying dates in the weekly calendar.
consumptionReportLog: Template for displaying the logged meals and consumption report.
mealPlanner: Template for the meal planner view.
foodRow, basketFoodRow, loggedFoodRow: Templates for rendering food items in different views.

### data.js

Contains the foodData object with meal data, including food names, calories, serving sizes, and macronutrient values.
Core Functions
Initialization (onInit)

Sets up the initial view by displaying today's date, rendering the weekly calendar, and showing the meal consumption log.
Calls helper functions like createWeeklyCalendar() and renderConsumptionLog().

**1. createWeeklyCalendar**

Generates a weekly calendar view, highlighting the current day.
Attaches event listeners to each day to allow users to select and log meals for that day.

**2. shuffleArray**

Utility function that randomizes an array using the Fisher-Yates Shuffle algorithm. It is used to generate random meal suggestions.

**3. generateDailyRandomMeals**

Generates random meal suggestions for breakfast, lunch, dinner, and snacks from the available food data.

**4. updateCalories**

Updates calorie, protein, fat, and carb totals based on the meals selected and logged.

**5. onSelectDate**

Allows users to select different days in the weekly calendar, and displays either random meal suggestions for past days or the consumption log for the current day.

**6. renderConsumptionLog**

Renders the main meal log view, showing the user's logged meals and nutrient totals for the selected day.

**7. renderMealPlanner**

Displays the meal planner view, where users can browse, search, and add foods to their basket.

**8. displayAllFoods and displaySearchedFoods**

Displays the full list of foods or the search results in the meal planner.

**9. handleAddFoodButtons**

Attaches event listeners to the "Add Food" buttons, allowing users to add foods to their basket.

**10. onAddFoodToBasket**

Adds selected food items to the basket, incrementing the quantity if the food is already present.

**11. displayBasket and renderBasketItems**

Displays the user's basket, where they can log all the food items and see the total quantities and calories for each.

## Event Handlers

handleAddMealButtons: Listens for clicks on meal type buttons (breakfast, lunch, etc.) and displays the meal planner view.
handleBrowseAllFoodsButton: Displays all food items when the "Browse All Foods" button is clicked.
handleSearchFoodsButton: Searches for and displays food items based on user input.
handleButtonBasket: Displays the basket where users can review and log their selected foods.
handleLogAllFoodButtons: Logs all foods in the basket to the selected meal.

## How to Use

View Today's Meal Log: The application starts by displaying the meal log for today. Click any day in the calendar to view or log meals for that day.
Random Meal Suggestions: For days in the past, random meal suggestions are generated. Select different days to view different meal suggestions.
Browse/Search Foods: Click the "Add Meal" button to open the meal planner. You can either browse all foods or search for specific items.
Add Foods to Basket: Click "Add Food" next to any food item to add it to your basket.
Log Meals: Once you have added items to your basket, click "Log Foods" to record the foods for the selected meal.
Track Calories and Nutrients: The app automatically calculates and displays the total calories, proteins, fats, and carbs for the day. The progress bar updates as you log more food.

## Future Enhancements

There is redudancy at some degree due to the lack of better understanding of JS functionalities, for example the functions that update the totals and when rendering components

```js
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
  ); //. . . Rest of the code
}

//and
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
    //... rest of the code
  }

```

## Dependencies

This project has no external dependencies beyond standard browser capabilities. All data is locally stored in the data.js file containing all necessary data for its functionality.
