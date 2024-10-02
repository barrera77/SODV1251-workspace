import { menuItems } from "./menu-items.js";
import { suggestionsFoodCard } from "./templates.js";

// Selectors for main components
const rowFoodSuggestions = document.querySelector(".row-food-suggestions");

const foodCategories = {
  foods: [],
  drinks: [],
  desserts: [],
};

let foodCategory = "";
const taxRate = 0.05;

//get data
const foodData = menuItems[foodCategory];

function onInit() {
  generateRandomFoodItems();
}
onInit();

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
 * Get the random items to display for the suggestions
 * @param {*} data
 * @param {*} mealCount
 * @returns
 */
function getRandomFoodItems(data, mealCount) {
  const randomizedData = shuffleArray([...data]);
  return randomizedData.slice(0, mealCount);
}

function generateRandomFoodItems() {
  rowFoodSuggestions.innerHTML = "";

  const randomFoodCategories = {
    foods: getRandomFoodItems(menuItems.foods, 6),
    drinks: getRandomFoodItems(menuItems.drinks, 3),
    desserts: getRandomFoodItems(menuItems.desserts, 3),
  };
  console.log("Foods: ", randomFoodCategories.foods);

  randomFoodCategories.foods.forEach((item) => {
    rowFoodSuggestions.innerHTML += suggestionsFoodCard(item);
  });
}
