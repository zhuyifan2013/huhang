const mongoose = require('mongoose');

const { Schema } = mongoose;

const CountrySchema = new Schema({
    _id:String,
    country_code: Number,
    country_name: String,
    country_logo: String
});

mongoose.model('Country', CountrySchema);