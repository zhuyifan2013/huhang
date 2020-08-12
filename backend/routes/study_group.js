var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse, buildErrorResponse} = require("../response");
var router = express.Router();

const StudyGroup = mongoose.model('StudyGroup');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/apply', function (req, res) {
    const {body: {studyGroup}} = req;
    const finalStudyGroup = new StudyGroup({_id: mongoose.Types.ObjectId(), ...studyGroup})
    finalStudyGroup.save(function (err, obj) {
        if (err) {
            console.log('err : ' + err)
            res.json(buildErrorResponse(-1, err))
        } else {
            res.json(buildSuccessResponse({studyGroup: finalStudyGroup}))
        }
    })
});

module.exports = router;
