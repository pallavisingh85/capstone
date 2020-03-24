// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('./dist'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running  hard on ${port}`);
}

app.get('/', function (req, res) {
    console.log('hi!')
    res.sendFile('./dist/index.html')
})

//GET Route
app.get('/getAll', sendData);
function sendData(request, response){
    const location = request.query.location
    const latLng = getLatLng(location);
     const life = getWeather(latLng);
    response.send(life);
}

function getLatLng(location){
  const latLng = { lat:"171", lng:"243" } ;
  return latLng;
}

function getWeather(latLng){
  const life = {hi : "this too shall pass"};
  return life;
}

//POST Route
/*app.post('/setWeather', postData);
function postData(request, response){
    console.log('post request setWeather');
    let data = request.body;
    console.log(data);
    projectData["temperature"] = data.main.temp;
    projectData["date"] = data.date;
    projectData["userResponse"] = data.userResponse;
    response.send('POST received')
}*/