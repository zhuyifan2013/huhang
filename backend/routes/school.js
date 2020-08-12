var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse, buildErrorResponse} = require("../response");
var router = express.Router();

const School = mongoose.model('School');

/* GET users listing. */
router.get('/', function (req, res) {
    School.find({}, function (err, docs) {
        res.json(buildSuccessResponse(JSON.stringify(docs)))
    })
});

router.post('/create', function (req, res) {
    const {body: {school}} = req;
    const finalSchool = new School({_id: mongoose.Types.ObjectId(), ...school})
    finalSchool.save(function (err, obj) {
        if (err) {
            console.log('err : ' + err)
            res.json(buildErrorResponse(-1, err))
        } else {
            res.json(buildSuccessResponse({school: finalSchool}))
        }
    })
});

module.exports = router;
