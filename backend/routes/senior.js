var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse} = require("../response");
const {buildErrorResponse} = require("../response");
var router = express.Router();
var multer = require('multer')
var upload = multer()
const axios = require('axios')
var FormData = require('form-data');
var fs = require('fs')

const Users = mongoose.model('Users');
/* GET home page. */
router.post('/apply', function (req, res) {
    const {
        body: {
            wechat_openid, user_name, user_school, user_grade, user_major, user_description, user_student_card
        }
    } = req;
    Users.findOneAndUpdate({wechat_openid: wechat_openid}, {
        user_role: "senior_unverified", user_name: user_name, user_school: user_school, user_grade: user_grade,
        user_major: user_major, user_description: user_description, user_student_card: user_student_card
    }, {new: true}, function (err, doc) {
        if (err) {
            res.json(buildErrorResponse(-1, 'Error when finding user'))
        }
        if (doc == null) {
            res.json(buildErrorResponse(-1, "No user with this openid: " + wechat_openid))
        } else {
            res.json(buildSuccessResponse(JSON.stringify({user: doc})))
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
            res.json(buildSuccessResponse(JSON.stringify({user: doc})))
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

router.post('/upload_card', upload.single('card'), function (req, res) {
    const formData = new FormData();
    formData.append("key", Date.now() + '_' + req.file.originalname);
    formData.append("file", req.file.buffer);
    formData.getLength(function (err, length) {
        if (err) {
            console.log("Get Length error:" + err);
            res.json(buildErrorResponse(-1, "Get Length error"))
        } else {
            axios.post('https://huhang-1256262308.cos.ap-nanjing.myqcloud.com', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary(),
                    'Content-Length': length
                }
            }).then(function (r) {
                res.json(buildSuccessResponse(JSON.stringify({url: r.headers.location})))
            }).catch(err => {
                console.log(err);
                res.json(buildErrorResponse(-1, "Upload error"))
            });
        }

    })
})

module.exports = router;
