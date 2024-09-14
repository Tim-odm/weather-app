// This file makes the API requests.

export async function makeRequest(location) {
  const data = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HRTUZPM6L2TNX2ZC9XJJPL7EB&contentType=json`, {mode: "cors"})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      return data;
    })
    .catch(function(err) {
      console.log("There was an error");
    })
   return data; 
}

export async function getCurrentConditionsData(location) {
  const reqData = await makeRequest(location);
  return {
    address: reqData.resolvedAddress,
    desc: reqData.description,
    temp: reqData.currentConditions.temp,
    sunrise: reqData.currentConditions.sunrise,
    sunset: reqData.currentConditions.sunset,
    cloudcover: reqData.currentConditions.cloudcover,
    humidity: reqData.currentConditions.humidity,
  }
}

