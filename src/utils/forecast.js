const postmanrequest = require('postman-request')

const forecast= ((latitude,longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=79aabddc1316c2d828648341dcb7e1af&query=" + latitude +',' + longitude

    postmanrequest({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
            callback(undefined, body.current[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. ' + body.current.humidity + '% humidity' )
        }
    })
})
    
module.exports = forecast    