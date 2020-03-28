/* Global Variables */
const geonameKey = '&username=pallavisingh85';
const geonameURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
const darkskyURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2ebab29b8f4864e4b6f0527e3a46ff73/';
const url = 'http://localhost:8000/getAll?location=';
const pixelBayKey = '15730671-f4cd55786c82f5c3ccbe92579';
const pixelBay = 'https://pixabay.com/api?key=15730671-f4cd55786c82f5c3ccbe92579&q='

// Create a new date instance dynamically with JS
let today = new Date();

// Take location, trip start and End date as input and update weather, image and trip duration on UI
function performAction(e){
    console.log("performAction");
    const location =  document.getElementById('location').value;
    const dt = new Date(document.getElementById('dt').value);
    const enddt = new Date(document.getElementById('enddt').value);
    console.log(enddt)
    const difference = enddt.getTime() - dt.getTime();
    const days = difference / (1000 * 3600 * 24);
    console.log("days "+days)

    getLatLng(location)
    .then(function(data){
            console.log(data.address.lat);
            console.log(data.address.lng);
            let time = null;
            if(dateDiff(dt, today) > 7) {
                console.log('greater than seven');
                time = dt.getTime();
                console.log('time '+time);
            }
            getWeather(data.address.lat, data.address.lng, time)
            .then(function(data1){
                console.log(data1.currently.summary);
                updateUI(data1.currently.summary, location, dt, days, false);
            })
        });

    getImage(location)
    .then(function(data2){
        console.log(data2);
        updateUI(false, false, false, false, data2);
    });
}

//ASYNC GET
const getLatLng = async (location) => {
    const request = await fetch(geonameURL+location+geonameKey);
    try{
        const serverData = await request.json();
        console.log(serverData);
        return serverData;
    }catch(error){
        console.log("error", error);
    }
}

const getWeather = async (lat,lng,time) => {
    let url1 = darkskyURL+lat+','+lng;
    if (time != null){
        url1 = url1 +","+time;
    }
    const request = await fetch(url1);
    try{
        const serverData = await request.json();
        return serverData;
    }catch(error){
        console.log("error", error);
    }
}

const getImage = async (search) => {
    const request = await fetch(pixelBay+search);
    try{
        const serverData = await request.json();
        return serverData;
    }catch(error){
        console.log("error", error);
    }
}

const dateDiff = function ( date1, date2 ) {
      //Get 1 day in milliseconds
      const day=1000*60*60*24;
      let date1_ms = date1.getTime(),
        date2_ms = date2.getTime(),
        difference_ms = date2_ms - date1_ms;

      return Math.round(difference_ms/day);
    }

function updateUI(weather, location, dt, days, imageUrl){
    if (imageUrl) {
        document.getElementById('tripImg').setAttribute("src", imageUrl.hits[0].previewURL);
        return;
    }
    document.getElementById('loc').innerHTML = location;
    const formattedDate = dt.getDate()+'/'+dt.getMonth()+'/'+dt.getYear();
    document.getElementById('date').innerHTML = formattedDate;
    document.getElementById('days').innerHTML = days;
    document.getElementById('weatherInfo').innerHTML = weather;
}

function isFuture(dt){
            if(dateDiff(dt, today) > 7) {
                console.log('greater than seven');
                return true;
            }
            return false;
}

export {performAction, isFuture}