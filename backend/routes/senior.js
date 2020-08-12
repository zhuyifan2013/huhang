var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse} = require("../response");
const {buildErrorResponse} = require("../response");

var router = express.Router();

const Users = mongoose.model('Users');
/* GET home page. */
router.post('/apply', function (req, res) {
    const {body: {wechat_openid}} = req;
    Users.findOneAndUpdate({wechat_openid: wechat_openid}, {user_role: "senior_unverified"}, {new: true}, function (err, doc) {
        if (err) {
            res.json(buildErrorResponse(-1, err))
        }
        if (doc == null) {
            res.json(buildErrorResponse(-1, "No user"))
        } else {
            res.json(buildSuccessResponse(JSON.stringify({user: doc.toMyJson()})))
        }
    })

});

router.get('/apply_status', function (req, res) {
    const {query: {wechat_openid}} = req;
    Users.findOne({wechat_openid: wechat_openid}, function (err, doc) {
        if (err) {
            res.json(buildErrorResponse(-1, err))
        }

        if (doc == null) {
            res.json(buildErrorResponse(-1, "No user"))
        } else {
            res.json(buildSuccessResponse(JSON.stringify({user: doc.toSeniorStatusJson()})))
        }
    })
})

router.get('/unverified', function (req, res) {
    Users.find({user_role: "senior_unverified"}, function (err, docs) {
        if (err) {
            res.json(buildErrorResponse(-1, err))
        }

        if (docs == null) {
            res.json(buildErrorResponse(JSON.stringify([])))
        } else {
            res.json(buildSuccessResponse(JSON.stringify(docs)))
        }
    })
})

router.post('/pass', function (req, res) {
    const {body: {wechat_openid, school_code, major_code}} = req

    Users.findOneAndUpdate({wechat_openid: wechat_openid}, {
        school_code: school_code,
        major_code: major_code,
        user_role: "senior_verified"
    }, {new: true}, function (err, doc) {
        if (err) {
            res.json(buildErrorResponse(-1, err))
        }

        if (doc == null) {
            res.json(buildErrorResponse(-1, "No user"))
        } else {
            res.json(buildSuccessResponse(JSON.stringify({user: doc})))
        }
    })
})

module.exports = router;
