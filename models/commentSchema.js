const UserCommentSchema = new mongoose.Schema({
    symbol: String,
    date: {type: String, unique: true},
    comment: String, 
    username: String,
}, );

const userComment = mongoose.model('userComment', UserCommentSchema);

module.exports = userComment;
