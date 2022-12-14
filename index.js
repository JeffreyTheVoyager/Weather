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

// Router

/* Home */
const homeRouterPath = path.join(__dirname, '/routers/home/home.js')
app.use('/', require(homeRouterPath))

app.listen(process.env.PORT, ()=>{
    console.log("Server Successful");
})