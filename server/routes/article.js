var express = require('express');
var router = express.Router();
var articleController = require('../controller/article.js')

router.post('/add-article', articleController.add)

router.get('/all-article', articleController.all)

router.put('/edit-article/:id', articleController.edit)

router.delete('/delete-article/:id', articleController.delete)

router.get('/:id', articleController.article)

module.exports = router