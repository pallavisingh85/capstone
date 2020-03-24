/* Global Variables */
const geonameKey = '&username=pallavisingh85';
const geonameURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
const darkskyURL = 'https://api.darksky.net/forecast/2ebab29b8f4864e4b6f0527e3a46ff73/';
const url = 'http://localhost:8000/getAll?location=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



function performAction(e){
    console.log("performAction");
    const location =  document.getElementById('zip').value;
    console.log(location);
    retrieveFromServer(location)
    .then(function(data){
            //data["userResponse"] = feel;
            //data["date"] = newDate;
            console.log(data.address.lat);
            console.log(data.address.lng);
            getWeather(data.address.lat, data.address.lng, null)
            /*.then(function(data){
                updateUI(data)
            })*/
        })
}


//ASYNC GET
/*const retrieveData = async (baseURL, zipcode, apiKey) => {
    const request = await fetch(baseURL+zipcode+apiKey);
    try{
        const allData = await request.json();
        return allData;
    }catch(error){
        console.log("error", error);
    }
}*/

//ASYNC POST
/*const postToServer = async(url , data) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    try{
        const postResponse = await request.json();
        return postResponse;
    }catch(error){
       console.log("error", error);
    }
}*/

//ASYNC GET
const retrieveFromServer = async (location) => {
    const request = await fetch(geonameURL+location+geonameKey);
    try{
        const serverData = await request.json();
        console.log(serverData);
        //updateUI(serverData);
        return serverData;
    }catch(error){
        console.log("error", error);
    }
}

const getWeather = async (lat,lng,time) => {
    let url = darkskyURL+lat+','+lng;
    if (time != null){
        url = url +","+time;
    }
    const request = await fetch(url, {
    method: 'GET',
    mode: 'no-cors'
    });
    try{
        const serverData = await request.json();
        console.log(serverData);
        //updateUI(serverData);
        return serverData;
    }catch(error){
        console.log("error", error);
    }
}
/*function updateUI(serverData){
    document.getElementById('temp').innerHTML = serverData.temperature;
    document.getElementById('date').innerHTML = serverData.date;
    document.getElementById('content').innerHTML = serverData.userResponse;
}*/


export {performAction, retrieveFromServer}