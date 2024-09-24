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
                    <div class="card">
                      <button class="btn-add-meal">
                        Breakfast<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add the meal here</div>
                  </div>
                  <div class="meal-col">
                    <div class="card">
                      <button class="btn-add-meal">
                        Lunch<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add the meal here</div>
                  </div>
                </div>
                <div class="consumption-log-row">
                  <div class="meal-col">
                    <div class="card">
                      <button class="btn-add-meal">
                        Dinner<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add the meal here</div>
                  </div>
                  <div class="meal-col">
                    <div class="card">
                      <button class="btn-add-meal">
                        Snack<span><i class="fa fa-plus"></i></span>
                      </button>
                      <p>Cals</p>
                    </div>
                    <div class="meal-container">Add the meal here</div>
                  </div>
                </div>
              </div>
`;

export const mealLogPage = `
<div class="meal-log-page">
  <div class="meal-log-page-container">
    <div class="search-container">
      <button><i class="fas fa-search"></i></button
      ><input type="text" placeholder="Search for foods" />
    </div>
    <div class="food-log-display">
      <h3>Food Name</h3>
      <div class="food-display">
        <div class="card">
          <img src="" alt="food" />
          <p class="food-description">Food Description</p>
          <button>Log Food</button>
        </div>
      </div>
      <button>Browse all Foods</button>
    </div>
  </div>
</div>
`;
