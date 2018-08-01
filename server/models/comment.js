const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let commentSchema = new Schema({
    articleID: Schema.Types.ObjectId,
    email: {
        type: String,
        required: 'PLease input your email for leaving a comment'
    },
    content: String
})

let Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments