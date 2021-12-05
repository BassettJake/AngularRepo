var mongoose = require('mongoose');
const Word = require('../models/Word');
const Wordschema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  plainText: {
    type: String,
    required: true
  },
  ipaText: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Word', Wordschema);
