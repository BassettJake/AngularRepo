var mongoose = require('mongoose');
const Message = require('../models/message');
const Contact = require('../models/contact');
const messageSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  msgText: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.String,
    ref: 'Contact'
  }
},{versionKey: false});

module.exports = mongoose.model('Message', messageSchema);
