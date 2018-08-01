const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let articleSchema = new Schema({
  title: String,
  article: {
    type: String,
    required: [true, 'Please write something']
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }]
}, { timestamps: true})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article