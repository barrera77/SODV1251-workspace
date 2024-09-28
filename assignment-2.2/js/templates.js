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
        <p class="log-cals-display">Cals</p>
      </div>
      <div class="meal-container breakfast-meal-container">Add food here</div>
    </div>
    <div class="meal-col">
      <div class="card meal-card">
        <button class="btn-add-meal lunch">
          Lunch<span><i class="fa fa-plus"></i></span>
        </button>
        <p class="log-cals-display">Cals</p>
      </div>
      <div class="meal-container lunch-meal-container">Add food here</div>
    </div>
  </div>
  <div class="consumption-log-row">
    <div class="meal-col">
      <div class="card meal-card">
        <button class="btn-add-meal dinner">
          Dinner<span><i class="fa fa-plus"></i></span>
        </button>
        <p class="log-cals-display">Cals</p>
      </div>
      <div class="meal-container dinner-meal-container">Add food here</div>
    </div>
    <div class="meal-col">
      <div class="card meal-card">
        <button class="btn-add-meal snack">
          Snack<span><i class="fa fa-plus"></i></span>
        </button>
        <p class="log-cals-display">Cals</p>
      </div>
      <div class="meal-container snack-meal-container">Add food here</div>
    </div>
  </div>
</div>
`;

export const mealPlanner = `
<div class="meal-log-page">
  <div class="meal-log-page-header">
    <button class="fa fa-home btn-back-to-home">
    </button>
    
    <h2>Meal Planner</h2>

    <button class="btn-clear-content">Clear</button>
  </div>
  <div class="meal-log-page-container">
    <div class="search-wrapper">
      <div class="search-container">
        <input class="food-input" type="text" placeholder="Search for foods"/>
        <button class="btn-search-foods">Search Foods</button>
      </div>
      <div class="food-basket">
      <span class="basket-items">0</span>
      <button class="fa fa-shopping-basket btn-food-basket">
    
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
    <div class="basket-container-header">
      <button class="fa fa-home btn-back-to-home">
      </button>
    <h2>Food Basket</h2>
    </div>

    <div class="food-table-wrapper">
      <table class="food-basket-table">
        <thead >
          <tr >
            <th>Serving</th>
            <th>Quantity</th>
            <th>Food</th>
            <th>Kcal</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody class="basket-content"></tbody>
      </table>
    </div>
    <div class="basket-actions-container">
      <div class="nutritional-info">
        <div class="calorie-total">
          <p>Total Calories:</p>
          <span class="total-calories">0</span>
        </div>
        <div class="nutritional-info-totals">
          <div class="nutritional-value"><span class="protein-count">0</span><p>Proteins</p></div>
          <div class="nutritional-value"><span class="fat-count">0</span><p>Fat</p></div>
          <div class="nutritional-value"><span class="carb-count">0</span><p>Carbs</p></div>
        </div>
      </div>
      <div class="basket-actions">
        <button class="btn-log-all-food">Log All Food</button>
        <button class="btn-cancel">Back</button>
      </div>
    </div>
  </div>
`;

export const basketFoodRow = (food) => `
  <tr class="basket-food-row">
    <td>${food.serving_size}</td>
    <td><input class="input-qty" type="number" value="${food.qty}" /></td >
    <td><h3 class="food-name"><strong>${food.name}</strong></h3></td>
    <td><p class="basket-food-calories"><span>${
      food.calories * food.qty
    }</span></p></td>
    <td>
      <div class="action-buttons-container">
        <button class="btn-log-food" data-food='${JSON.stringify(
          food
        )}'>Log Food</button>
        <button class="btn-remove-item" data-food='${JSON.stringify(
          food
        )}'>Remove</button>
      </div>
    </td>
  </tr>
`;

export const loggedFoodRow = (food) => `
 <div class="looged-food-row">
    <div class="logged-food-card">
      <div class="logged-food-details">
        <p class="col-one">${food.serving_size} x ${food.qty}</p>
        <p class="col-two"><strong>${food.name}</strong></p>
        <p class="col-three">${food.calories * food.qty}</p>
      </div>
    </div>
  </div>
`;
