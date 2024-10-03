import * as api from "./api.js";

const searchSubmitBtn = document.querySelector("input[type=submit]");
searchSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location-search").value;
  const data = await api.makeRequest(location);
  console.log(data);
  updateCurrentConditions(location);
  updateUpcomingDays(location);
})

// Update the current conditions section
async function updateCurrentConditions(location) {
  const currentCoditions = document.querySelectorAll("#current-conditions p");
  const data = await api.getCurrentConditionsData(location);
  Object.keys(data).forEach((i, index) => {
    currentCoditions[index].innerText = data[i];
  })
}

async function updateUpcomingDays(location) {
  const tableBody = document.getElementById("upcoming-days-table");
  tableBody.innerHTML = "";
  const data = await api.getUpcomingDaysData(location);
  
  data.forEach((day) => {
    // create row
    // fill innerhtml on row
    // add row to table body
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${day.date}</td>
    <td>${day.conditions}</td>
    <td>${day.tempmax}&degC</td>
    <td>${day.tempmin}&degC</td>
    <td>${day.sunrise}am</td>
    <td>${day.sunset}pm</td>
    <td>${day.cloudcover}</td>
    <td>${day.humidity}%</td>
    `
    tableBody.appendChild(row);
  })
}
