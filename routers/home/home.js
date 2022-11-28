const express = require('express')
const router = express.Router()
const axios = require('axios')
const url = require('url')

router.get('/', (req, res) =>{
    res.render('index',{
        city: req.query.city,
        temp: req.query.temp,
        description: req.query.description
    })
})

router.post('/', (req, res)=>{
    const {city} = req.body;
    try {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_ID}`)
            .then((response)=>{

                const data = response.data;
                let {name:city, main:{temp}} = data;
                const {description} = data.weather[0]
                
                // Convert Kelvin to Fahrenheit
                temp = Math.round((temp - 273.15) * 9/5 + 32)

                res.redirect(url.format({
                    pathname: '/',
                    query:{
                        city,
                        temp,
                        description
                    }
                }))
            })

    } catch (error) {
       res.status(400).json({
            msg: "Bad Request",
            error
       })
    }
})

module.exports = router         