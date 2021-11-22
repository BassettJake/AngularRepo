var mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
  maxDocumentId: {
    type: String,
    required: true
  },
  maxMessageId: {
    type: String
  },
  maxContactId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sequence', messageSchema);
