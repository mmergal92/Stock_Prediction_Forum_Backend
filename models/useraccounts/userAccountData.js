const mongoose = require('mongoose');
const { timeStamp } = require('node:console');

const UserAccountSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    lastName: String,
    firstName: String,
    imageUrl: String,
    fullName: String

},  {timestamps: true});

const userAccountCollection = mongoose.model('UserAcct', UserAccountSchema, 'UserAccounts');

module.exports = userAccountCollection;
