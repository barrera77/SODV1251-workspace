export const dateCardTemplate = ({ monthDay, weekDay, highlightCurrentDay }) =>
  `
<div class="card date-card">
    <button class="btn-weekday ${highlightCurrentDay}">
    <h2 class="month-day">${monthDay}</h2>
    <p class="week-day">${weekDay}</p>
    </button>
</div>  
`;
