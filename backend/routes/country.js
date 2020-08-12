var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse, buildErrorResponse} = require("../response");
var router = express.Router();

const Country = mongoose.model('Country');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/create', function (req, res) {
    const {body: {country}} = req;
    const finalCountry = new Country({_id: mongoose.Types.ObjectId(), ...country})
    finalCountry.save(function (err, obj) {
        if (err) {
            console.log('err : ' + err)
            res.json(buildErrorResponse(-1, err))
        } else {
            res.json(buildSuccessResponse({country: finalCountry}))
        }
    })
});

module.exports = router;
