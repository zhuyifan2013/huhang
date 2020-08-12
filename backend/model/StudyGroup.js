const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudyGroupSchema = new Schema({
    _id:String,
    study_group: String,
    wechat_openid: String,
    user_name: String,
    user_mail: String,
    user_phone: String
});

mongoose.model('StudyGroup', StudyGroupSchema);