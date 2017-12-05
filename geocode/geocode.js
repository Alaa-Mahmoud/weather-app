const request = require('request');

var geocodeAddress = (address, callback) => {
    let encodedValue = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedValue}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('unable to connect to the server');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('unable to find that loacation');
        } else {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latituid: body.results[0].geometry.location.lat,
                longtuid: body.results[0].geometry.location.lng
            });

        }
    });

};






module.exports = {
    geocodeAddress,
};