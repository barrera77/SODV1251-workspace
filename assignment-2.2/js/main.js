import { dateCardTemplate } from "./templates.js";

const dateContainer = document.querySelector(".date");

function onInit() {
  const today = new Date();

  //Display today's date
  dateContainer.textContent = `Today: ${today.toDateString()}`;
  //Create the week calendar
  createWeeklyCalendar();
}

onInit();

function createWeeklyCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();

  const weekRow = daysOfWeek
    .map((day, index) => {
      const dayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        index - currentDayOfWeek + currentDay
      ).getDate();

      return dateCardTemplate({
        monthDay: dayOfMonth === currentDay ? `${dayOfMonth}` : dayOfMonth,
        weekDay: day,
      });
    })
    .join("");

  document.querySelector(".week-days").innerHTML = weekRow;
}

/* const appId = "2cd5c344"; // Replace with your app ID
const appKey = "0b682d95ce4b253040eb6ff752ea0665"; // Replace with your app key
const query = "brisket"; // Your query string

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-app-id": appId,
    "x-app-key": appKey,
  },
  body: JSON.stringify({
    query: query,
  }),
};

fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Handle the response data
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
 */
