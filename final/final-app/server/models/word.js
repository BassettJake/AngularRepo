var mongoose = require('mongoose');
const Word = require('../models/word');
const wordSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  plainText: {
    type: String,
    required: true
  },
  ipaText: {
    type: String
  }
});

module.exports = mongoose.model('Word', wordSchema);
