export const dateCardTemplate = ({ monthDay, weekDay }) =>
  `
<div class="card date-card">
    <button class="btn-weekday">
    <h2 class="month-day">${monthDay}</h2>
    <p class="week-day">${weekDay}</p>
    </button>
</div>  
`;
