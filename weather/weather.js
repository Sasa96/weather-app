const request = require('request');

var getWeather = (longitude, latitude, callback) => {

request({
    url:`https://api.darksky.net/forecast/5de845b1ba3c367e030394522f11c012/${latitude},${longitude}`,
    json:true
}, (error, response, body) => {
    if(!error && response.statusCode === 200) {
        callback(undefined, {
            temp: body.currently.apparentTemperature,
            currentTemp: body.currently.temperature
        }
         );
    }
    else {
       callback('Unable to fetch weather!');
    }

});
}

module.exports = 
{
    getWeather
}



