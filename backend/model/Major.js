const mongoose = require('mongoose');

const { Schema } = mongoose;

const MajorSchema = new Schema({
    _id:String,
    major_code: Number,
    major_name_level_1: String,
    major_name_level_2: String,
});

mongoose.model('Major', MajorSchema);