var mongoose = require('mongoose');
const Word = require('../models/Word');
const Wordschema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  children: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word'
  }
});

module.exports = mongoose.model('Word', Wordschema);
