export const dateCardTemplate = ({ monthDay, weekDay, highlightCurrentDay }) =>
  `
<div class="card date-card">
    <button class="btn-weekday ${highlightCurrentDay}">
    <h2 class="month-day">${monthDay}</h2>
    <p class="week-day">${weekDay}</p>
    </button>
</div>  
`;

export const consumptionReportLog = `
<div class="consumption-log">
                <div class="consumption-log-row">
                  <div class="meal-col">
                    <div class="card meal-card">
                      <button class="btn-add-meal breakfast">
                        Breakfast<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add food here</div>
                  </div>
                  <div class="meal-col">
                    <div class="card meal-card">
                      <button class="btn-add-meal lunch">
                        Lunch<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add food here</div>
                  </div>
                </div>
                <div class="consumption-log-row">
                  <div class="meal-col">
                    <div class="card meal-card">
                      <button class="btn-add-meal dinner">
                        Dinner<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add food here</div>
                  </div>
                  <div class="meal-col">
                    <div class="card meal-card">
                      <button class="btn-add-meal snack">
                        Snack<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add food here</div>
                  </div>
                </div>
              </div>
`;

export const mealLogPage = `
<div class="meal-log-page">
<h2>Meal Planner</h2>
  <div class="meal-log-page-container">
    <div class="search-wrapper">
      <div class="search-container">
        <input class="food-input" type="text" placeholder="Search for foods"/>
        <button class="btn-search-foods">Search Foods</button>
      </div>
      <div class="food-basket">
      <button class="btn-food-basket"><span class="basket-items">0</span>
        <i class="fa fa-shopping-basket" aria-hidden="true"></i>
      </button>
      </div>
      <div class="btn-browse-all-foods-container">
        <button class="btn-browse-all-foods">Browse all Foods</button>
      </div>
    </div>
    <div class="food-log-display"></div>
  </div>
</div>
`;

export const foodRow = (food) => `
<div class="food-row">
  <div class="card food-card">
    <div class="food-details">
      <h3 class="food-name">${food.name}</h3>
      <p class="food-serving">${food.serving_size}</p>
      <p class="food-calories"><span>${food.calories}</span> calories</p>
    </div>
    <div class="btn-log-food-container">
      <button class="btn-add-food" data-food='${JSON.stringify(
        food
      )}'>Add Food</button>
    </div>
  </div> 
</div>
`;

export const basket = `
<div class="basket-container">
  <div class="basket-content"></div>
  <button class="btn-log-food">Log Food</button>
</div>
`;
