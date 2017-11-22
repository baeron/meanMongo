var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
  title: String,
  date_create: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);