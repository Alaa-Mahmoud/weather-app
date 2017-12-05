const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to featch weather for',
        string: true,
    }
}).help().argv;

geocode.geocodeAddress(argv.a, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(result.latituid, result.longtuid, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`you want to know the weather for the address: ${result.address}`);
                console.log(`the current temperature is ${weatherResult.temp} and the apparently tempreature is ${weatherResult.apparentTemp}`);
            }
        });
    }
});