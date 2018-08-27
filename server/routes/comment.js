var express = require('express');
var router = express.Router();
var commentController = require('../controller/comment.js')
var middle = require('../middleware/cek-user.js')

router.get('/comment/:id', commentController.all)

router.post('/post/:id', middle, commentController.create) // article ID

router.delete('/delete/:ArticleId/:CommentId', middle, commentController.delete)

module.exports = router