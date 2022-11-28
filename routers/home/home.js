const express = require('express')
const router = express.Router()
const axios = require('axios')
const url = require('url')
const dateTime = require('date-and-time')

router.get('/', (req, res) =>{
    res.render('index',{
        city: req.query.city,
        temp: req.query.temp,
        description: req.query.description,
        date: req.query.date,
        icon: req.query.icon
    })
})

router.post('/', (req, res)=>{
    const {city} = req.body;
    try {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_ID}`)
            .then((response)=>{

                const data = response.data;
                let {name:city, main:{temp}} = data;
                const {description, icon} = data.weather[0]
                
                // Convert Kelvin to Fahrenheit
                temp = Math.round((temp - 273.15) * 9/5 + 32)

                // Date
                const now = new Date()
                const pattern = dateTime.compile('DD MMM')
                const date = dateTime.format(now, pattern)

                res.redirect(url.format({
                    pathname: '/',
                    query:{
                        city,
                        temp,
                        description,
                        date,
                        icon
                    }
                }))
            })

    } catch (error) {
       res.status(400)  
    }
})

module.exports = router         