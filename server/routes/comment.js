var express = require('express');
var router = express.Router();
var commentController = require('../controller/comment.js')

router.post('/post/:id', commentController.create) // article ID

router.delete('/delete/:ArticleId/:CommentId', commentController.delete)

module.exports = router