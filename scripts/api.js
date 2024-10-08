// This file makes the API requests.

export async function makeRequest(location) {
  const data = fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HRTUZPM6L2TNX2ZC9XJJPL7EB&contentType=json`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      return data;
    })
    .catch(function (err) {
      console.log("There was an error");
    });
  return data;
}

export async function getCurrentConditionsData(location) {
  const reqData = await makeRequest(location);
  return {
    address: reqData.resolvedAddress,
    currentTime: getCurrentTime(reqData.timezone),
    desc: reqData.description,
    temp: reqData.currentConditions.temp,
    sunrise: reqData.currentConditions.sunrise,
    sunset: reqData.currentConditions.sunset,
    cloudcover: reqData.currentConditions.cloudcover,
    humidity: reqData.currentConditions.humidity,
    icon: reqData.currentConditions.icon,
  };
}

// Get the upcoming days data
export async function getUpcomingDaysData(location) {
  const reqData = await makeRequest(location); 
  const days = [];

  for (let i = 0; i < 10; i++) {
    days.push({
      date: reqData.days[i].datetime,
      icon: reqData.days[i].icon,
      tempmax: reqData.days[i].tempmax,
      tempmin: reqData.days[i].tempmin,
      sunrise: reqData.days[i].sunrise,
      sunset: reqData.days[i].sunset,
      cloudcover: reqData.days[i].cloudcover,
      humidity: reqData.days[i].humidity,
    });
  }

  return days;
}

// Get current time of request address
function getCurrentTime(address) {
  const currentTime = new Date().toLocaleString("en-GB", {
    temeStyle: "short",
    timeZone: address,
  });
  console.log(currentTime);
  return currentTime.substring(12, 20);
}
