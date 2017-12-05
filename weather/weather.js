const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/b961764b3b160646eb039184f71b6268/${lat},${lng} `,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forcast API');
        } else if (response.statusCode === 400) {
            callback('Unable to featch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temp: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature,
            });
        }

    });

};

module.exports = {
    getWeather
};