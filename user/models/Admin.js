const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  role: String,
  email: String,
  password: String
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;