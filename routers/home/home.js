const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('index'))

router.post('/', (req, res)=>{
    const {city} = req.body;
    console.log(city);
    res.json({
        msg: "Success"
    })
})

module.exports = router