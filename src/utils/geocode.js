const postmanrequest = require('postman-request')


//const mapurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/newyork.json?access_token=pk.eyJ1IjoiZGVlcGlrYWJvbmR1IiwiYSI6ImNsenV4Y3J5MzAxZnMycXNmMGlkMmliMTUifQ.uIUQuMkFEgeahro-hlMyKQ&limit=1"



const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZGVlcGlrYWJvbmR1IiwiYSI6ImNsenV4Y3J5MzAxZnMycXNmMGlkMmliMTUifQ.uIUQuMkFEgeahro-hlMyKQ&limit=1"



    postmanrequest({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode