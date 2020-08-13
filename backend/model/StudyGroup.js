const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudyGroupSchema = new Schema({
    _id:String,
    group_name: String,
    wechat_openid: String,
    user_name: String,
    user_email: String,
    user_phone: String
});

mongoose.model('StudyGroup', StudyGroupSchema);