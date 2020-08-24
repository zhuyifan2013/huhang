const express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse, buildErrorResponse} = require("../response");
const router = express.Router();
const constants = require('../constants')

const Users = mongoose.model('Users');

/* GET users listing. */
router.get('/', function (req, res) {
    const {query: {wechat_openids}} = req;
    let findObj = {}
    if (wechat_openids) {
        findObj = {wechat_openid: {$in: wechat_openids.split(',')}}
    }
    console.log(findObj)
    Users.find(findObj, function (err, docs) {
        console.log(docs)
        res.json(buildSuccessResponse(JSON.stringify(docs)))
    })
});

router.get('/wechat_openid', function (req, res) {
    const {query: {wechat_openids}} = req;
    let findObj = {}
    if (wechat_openids) {
        findObj = {wechat_openid: {$in: wechat_openids.split(',')}}
    }
    console.log(findObj)
    Users.find(findObj, function (err, docs) {
        let result = {}
        docs.forEach(doc => {
            result[doc["wechat_openid"]] = {"user_info" : doc}
        })
        console.log(result)
        res.json(buildSuccessResponse(JSON.stringify(result)))
    })
});

router.post('/update', function (req, res) {
    const {body: {user}} = req;
    Users.findOne({wechat_openid: user.wechat_openid}, function (err, doc) {
        if (doc != null) {
            console.log("Find a user with openID:" + user.wechat_openid)
            for (const [key, value] of Object.entries(user)) {
                doc[key] = value
            }
            doc.save(function (err, newDoc) {
                if (err) {
                    console.log('Fail to save user: ' + err)
                    res.json(buildErrorResponse(-1, 'Fail to save user'))
                }
                res.json(buildSuccessResponse(JSON.stringify({user: newDoc})))
            })
        } else {
            console.log("Create a new user with openID: " + user.wechat_openid)
            const finalUser = new Users({
                _id: mongoose.Types.ObjectId(),
                user_role: constants.USER_ROLE_STUDENT, ...user
            });
            finalUser.save(function (err, doc) {
                if (err) {
                    console.log('Fail to save user: ' + err)
                    res.json(buildErrorResponse(-1, 'Fail to save user'))
                } else {
                    console.log(doc)
                    res.json(buildSuccessResponse(JSON.stringify({user: doc})))
                }
            })
        }
    })
});

module.exports = router;
