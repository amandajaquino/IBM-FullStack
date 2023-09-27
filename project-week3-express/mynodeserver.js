const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Import the API key from the config file
const { apiKey } = require('./config');

app.get('/temperature/:location_code', function (request, response) {
    const location = request.params.location_code;

    // Make a GET request to OpenWeatherMap API
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
        )
        .then((weatherResponse) => {
            const temperature = weatherResponse.data.main.temp;
            response.send(`Current temperature in ${location}: ${temperature}°F`);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Internal Server Error');
        });
});

let server = app.listen(port, function () {
    console.log(`Listening on URL http://localhost:${port}`);
});


