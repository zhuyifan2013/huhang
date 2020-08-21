const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchoolSchema = new Schema({
    _id:String,
    school_code: Number,
    school_name: String,
    school_description: String,
    school_logo: String,
    school_country: String
});

mongoose.model('School', SchoolSchema);