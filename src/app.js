const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { error } = require('console')



// define paths for express configure
const app = express()
const pubilcDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pubilcDirectoryPath))




app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App!',
        name: 'Deepika'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About!',
        name: 'Deepika'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page!',
        name: 'Created by Deepika',
        message: "Welcome to the help Page, How can i help you"

})
})

app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{ latitude, longitude, location } ={})=>{
        if(error){
            return res.send({error})
        }

        
    
    forecast(latitude, longitude,(error, forecastdata)=>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastdata,
            location,
            address: req.query.address

        })
    })
    })

})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Deepika',
        message: 'help page not found!'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serch term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Deepika',
        message: 'my 404 page!'

})
})






app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})