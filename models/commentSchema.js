const mongoose = require('mongoose');

const UserCommentSchema = new mongoose.Schema({
    symbol: String,
    comment: String, 
    username: String,
},{timestamps: true} );

const userComment = mongoose.model('userComment', UserCommentSchema, 'UserComments');

module.exports = userComment;
