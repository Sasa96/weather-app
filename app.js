const yargs = require('yargs');


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

  

     geocode.geocodeAddress(argv.address , (errorMessage, results) => {
        if(errorMessage)
        {
            console.log(errorMessage);
        } else {
            console.log(results.address);
            weather.getWeather(results.longitude,results.latitude, (errorMessage, weatherResult)=>
             {
        if(errorMessage)
        {
            console.log(errorMessage);
        }
        else
        {
            console.log(`Feels like ${weatherResult.temp}, but actually is ${weatherResult.currentTemp}`);
        }
             });
        }
    });  

    
    


