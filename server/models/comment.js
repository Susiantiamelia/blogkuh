const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let commentSchema = new Schema({
    articleID: {
        type:Schema.Types.ObjectId,
        ref: 'Article'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: String
})

let Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments