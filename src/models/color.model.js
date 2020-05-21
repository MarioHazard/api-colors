const mongoose = require('mongoose');

// create object and attributes
var ColorSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    year: Number,
    color: String,
    pantone_value: String
});
// export to use from other files
module.exports = mongoose.model('Color', ColorSchema);
