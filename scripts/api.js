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

async function getData() {
  const data = await makeRequest("swansea");
  console.log(data)
}

