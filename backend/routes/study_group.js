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
    const {body: {wechat_openid, user_name, user_email, user_phone, group_name}} = req;
    let studyGroup = {
        group_name: group_name,
        wechat_openid: wechat_openid,
        user_name: user_name,
            user_email: user_email,
        user_phone: user_phone
    }
    const finalStudyGroup = new StudyGroup({_id: mongoose.Types.ObjectId(), ...studyGroup})
    finalStudyGroup.save(function (err, obj) {
        if (err) {
            console.log('Fail to save request: ' + err)
            res.json(buildErrorResponse(-1, 'Fail to save request'))
        } else {
            res.json(buildSuccessResponse({}))
        }
    })
});

module.exports = router;
