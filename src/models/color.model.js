const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// create object and attributes
var ColorSchema = mongoose.Schema({
    
    _id : Number,
    name: String,
    year: Number,
    color: String,
    pantone_value: String
});
ColorSchema.plugin(autoIncrement, {inc_field: '_id'});
module.exports = mongoose.model('Color', ColorSchema);
