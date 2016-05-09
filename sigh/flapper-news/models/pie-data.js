var mongoose = require('mongoose');

var PieDataSchema = new mongoose.Schema({
  name: String,
  colors: String,
  types: String
}, 
{
  collection: 'Cards'
});

mongoose.model('PieData', PieDataSchema);