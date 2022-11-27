const express = require('express')
const app = express()
require("dotenv").config()

app.get('/', (req, res)=>{
    res.json({
        message: "SUCCESS",
        statusCode: 201
    })
})

app.listen(process.env.PORT, ()=>{
    console.log("Server Successful")
})