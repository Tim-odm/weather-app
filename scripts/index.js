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
  const currentConditions = document.querySelectorAll("#current-conditions p");
  const data = await api.getCurrentConditionsData(location);

  currentConditions[0].innerHTML = data.address;
  currentConditions[1].innerHTML = formatTime(data.currentTime);
  currentConditions[2].innerHTML = data.desc;
  currentConditions[3].innerHTML = `${data.temp}&degC`;
  currentConditions[4].innerHTML = formatTime(data.sunrise);
  currentConditions[5].innerHTML = formatTime(data.sunset);
  currentConditions[6].innerHTML = data.cloudcover;
  currentConditions[7].innerHTML = `${data.humidity}%`;

  const img = document.getElementById("current-conditions-icon");
  img.src = `./assets/${data.icon}.svg`;
  img.alt = `${data.icon} icon`;
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
    <td>${formatDate(day.date)}</td>
    <td>${setIcon(day.icon)}</td>
    <td>${day.tempmax}&degC</td>
    <td>${day.tempmin}&degC</td>
    <td>${formatTime(day.sunrise)}</td>
    <td>${formatTime(day.sunset)}</td>
    <td>${day.cloudcover}</td>
    <td>${day.humidity}%</td>
    `
    tableBody.appendChild(row);
  })
}

function formatTime(time) {
  return time.substring(0, 5);
}

function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toDateString().substring(0, 10);
}

function setIcon(icon) {
  const src = `./assets/${icon}.svg`;
  const alt = `${icon} icon`;
 
  return `<img src=\"${src}\" alt=\"${alt}\">`
}
