var mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
  maxWordId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sequence', messageSchema);
