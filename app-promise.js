const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;


    var encodedURI = encodeURIComponent(argv.address);
    var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`

    axios.get(geocodeURL).then( (response) => 
    {   if(response.data.status === 'ZERO_RESULTS')
        {
            throw new Error('Unable to find that address');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherURL = `https://api.darksky.net/forecast/5de845b1ba3c367e030394522f11c012/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`Feels like ${apparentTemperature}, but actually is ${apparentTemperature}`);
    }).catch((e)=> {
        if(e.code==='ENOTFOUND')
        {
        console.log('Unable to connect to API');
        }
        else {
            console.log(e.message);
        }
    });
