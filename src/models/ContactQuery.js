// models/ContactQuery.js
const mongoose = require('mongoose');

const contactQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    default: '',
  },
});

const ContactQuery = mongoose.model('ContactQuery', contactQuerySchema);
module.exports = ContactQuery;
