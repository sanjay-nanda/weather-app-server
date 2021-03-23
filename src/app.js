const express = require('express');
const path = require("path");
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const temp1 = require('./utils/temp')
const fetch = require('node-fetch')

const app = express();

//Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials");

//setup hbs engine and views and partials location
app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup express to use static files
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
        
    res.render('index', {
        title: 'Weather App',
        name: "Sanjay Nanda"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "Server unavailable try later",
        title: "Help",
        name: "Sanjay Nanda"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        msg: "Site created with love by me for me",
        title: "About",
        name: "Sanjay Nanda"
    })
})

app.get('/weather_json', (req, res) => {
    if(!req.query.address){
        return res.send(
            "Error! Address mandatory"
        )
    }

    geoCode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send(error);
        }
        
        temp1(lattitude, longitude, (error, data = {}) => {
            if(error)
                return res.send(error);
            
            res.send({
                temp: data.temperature,
                feelslike: data.feelslike,
                location: location
            })
        })

    })
})

app.get('/help/*', (req,res) => {
    res.render('help_error')
})

app.get('*', (req, res) => {
    res.render('error');
})

app.listen(3000, console.log("Running at port 3000"))