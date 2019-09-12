var express          = require('express');
var router           = express.Router();
var models           = require('../models');

router.get('/sayHi',(req, res)=>{
    res.send("Hello world")
})

module.exports = router;