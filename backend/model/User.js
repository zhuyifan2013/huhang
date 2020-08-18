const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    _id:String,
    wechat_openid: String,
    user_name:String,
    user_avatar: String,
    user_nickname:String,
    user_school_code: String,
    user_school: String,
    school_country_code: String,
    school_country: String,
    user_grade: String,
    user_major_code: String,
    user_major: String,
    user_role: String,
    user_description: String,
    senior_num: String,
    user_student_card: String,
    user_phone: String
});


UsersSchema.methods.toMyJson = function (){
    return {
        _id: this._id,
        wechat_openid: this.wechat_openid,
        user_name: this.user_name,
        user_school_code: this.user_school_code,
        user_school: this.user_school,
        user_grade: this.user_grade,
        user_major_code: this.user_major_code,
        user_major: this.user_major,
        user_role: this.user_role,
        user_description: this.user_description,
        senior_num: this.senior_num,
    }
}

UsersSchema.methods.toSeniorStatusJson = function (){
    return {
        _id: this._id,
        wechat_openid: this.wechat_openid,
        senior_num: this.senior_num,
        user_role: this.user_role
    }
}

mongoose.model('Users', UsersSchema);