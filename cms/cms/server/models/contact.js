var mongoose = require('mongoose');
const Contact = require('../models/contact');
const contactSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true  },
    email: { type: String, required: true },
    phone: { type: Number},
    imageUrl: { type: String},
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
 });
 
 module.exports = mongoose.model('Contact', contactSchema);