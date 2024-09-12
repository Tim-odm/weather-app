import * as api from "./api.js";

const searchSubmitBtn = document.querySelector("input[type=submit]");
searchSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location-search").value;
  const data = await api.makeRequest(location);
  console.log(data);
  updateCurrentConditions();
})

// Update the current conditions section
async function updateCurrentConditions() {
  const currentCoditions = document.querySelectorAll("#current-conditions > p");
  const data = await api.getCurrentConditionsData();
  Object.keys(data).forEach((i, index) => {
    currentCoditions[index].innerText = data[i];
  })
}
