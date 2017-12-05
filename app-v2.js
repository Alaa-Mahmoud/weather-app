/* new version of the weather app using promises */

const axios = require('axios');
const yargs = require('yargs');
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to featch weather for',
        string: true,
    }
}).help().argv;

let encodedValue = encodeURIComponent(argv.address);
let geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedValue}`;


axios.get(geocodeURL).then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherURL = `https://api.darksky.net/forecast/b961764b3b160646eb039184f71b6268/${lat},${lng} `;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL);
    }).then((response) => {
        let temp = response.data.currently.temperature;
        let apparentTemp = response.data.currently.apparentTemperature;
        console.log(`the current temperature is ${temp} and the apparently tempreature is ${apparentTemp}`);
    })
    .catch(error => console.log(error.message));