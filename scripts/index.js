import * as api from "./api.js";

const searchSubmitBtn = document.querySelector("input[type=submit]");
searchSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location-search").value;
  const data = await api.makeRequest(location);
  console.log(data);
  updateCurrentConditions(location);
})

// Update the current conditions section
async function updateCurrentConditions(location) {
  const currentCoditions = document.querySelectorAll("#current-conditions p");
  const data = await api.getCurrentConditionsData(location);
  Object.keys(data).forEach((i, index) => {
    currentCoditions[index].innerText = data[i];
  })
}
