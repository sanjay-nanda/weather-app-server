const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FuamF5bmFuZGEiLCJhIjoiY2ttaHgwMGV2MGJzMTJ2dG52amNnbzc3cCJ9.t2A5a9_4uRj4NYAST7fvfQ&limit=1`;
    request({url: url, json: true}, (error, response, {features}) => {
        if(error){
            callback('Unable to connect to location services', undefined);
        }
        else if(features.length === 0){
            callback('Unable to find the location', undefined);
        }
        else{
        callback(undefined, {
            lattitude: features[0].center[1],
            longitude: features[0].center[0],
            location: features[0].place_name
        });
        }
    })
}

module.exports = geoCode;