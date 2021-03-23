const request = require("request");

const temp = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=665a119faa8dee32b3d42951b610c97c&query=' + lat + ',' + long;
    request({url: url, json: true}, (error, response, { current }) => {
        if(error){
            callback("Unable to Connect to WeatherStack.", undefined);
        }
        else{
            callback(undefined, {
                temperature: current.temperature,
                feelslike: current.feelslike
            })
        }
    })
}

module.exports = temp;