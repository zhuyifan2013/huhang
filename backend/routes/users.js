var express = require('express');
const mongoose = require('mongoose');
const {buildSuccessResponse} = require("../response");
var router = express.Router();

const Users = mongoose.model('Users');

/* GET users listing. */
router.get('/', function(req, res) {
  Users.find({}, function (err, docs) {
    console.log(docs)
    res.json(buildSuccessResponse(JSON.stringify(docs)))
  })
});

router.post('/create', function(req, res){
  const { body: { user } } = req;

  Users.findOne({ wechat_openid: user.wechat_openid }, function (err,doc) {
    if(doc != null) {
      console.log(" Not null : " + doc)
      res.json(buildSuccessResponse(JSON.stringify({user: doc.toMyJson()})))
    } else {
      console.log(" Null")
      const finalUser = new Users({_id: mongoose.Types.ObjectId(), ...user});
      finalUser.save(function(err, obj){
        console.log(obj)
        res.json(buildSuccessResponse(JSON.stringify({user: obj.toMyJson()})))
      })
    }
  })
});

module.exports = router;
