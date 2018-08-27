var express = require('express');
var router = express.Router();
var userController = require('../controller/users.js')
var middle = require('../middleware/cek-user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/profile', middle, userController.profile)

router.put('/edit', middle, userController.edit)

module.exports = router;
