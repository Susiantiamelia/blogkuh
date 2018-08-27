var express = require('express');
var router = express.Router();
var articleController = require('../controller/article.js')
var middle = require('../middleware/cek-user.js')

router.post('/add-article',middle, articleController.add)

router.get('/all-article', articleController.all)

router.put('/edit-article/:id',middle, articleController.edit)

router.delete('/delete-article/:id', middle, articleController.delete)

router.get('/:id', articleController.article)

module.exports = router