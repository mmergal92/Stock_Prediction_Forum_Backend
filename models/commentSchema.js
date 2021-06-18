const mongoose = require('mongoose');

const UserCommentSchema = new mongoose.Schema({
    symbol: String,
    date: {type: String, unique: true},
    comment: String, 
    username: String,
}, );

const userComment = mongoose.model('userComment', UserCommentSchema, 'UserComments');

module.exports = userComment;
