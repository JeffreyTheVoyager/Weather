const express = require('express')
const app = express()
const path = require('path')
require("dotenv").config()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// View Engine
const viewPath = path.join(__dirname, '/view')
app.set('views', viewPath)
app.set('view engine', 'pug')
app.use(express.static(viewPath))


app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(process.env.PORT, ()=>{
    console.log("Server Successful");
})