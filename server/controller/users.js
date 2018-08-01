const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY;


class Users{
    static register(req,res){
        let salt = bcrypt.genSaltSync(8);
        let password = bcrypt.hashSync(req.body.password, salt);
        User.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: password,
            article_list: []
        })
        .then(user => {
            res.status(200).json({msg: 'Successfully register', user: user})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req,res){
        User.find({$or: [{email: req.body.uname_email}, {username: req.body.uname_email}]})
        .then(user => {
            if(user.length !== 0){
                let checkPass = bcrypt.compareSync(req.body.password, user[0].password);
                if(checkPass){
                    let token = jwt.sign({ id: user[0]._id, fullname: user[0].fullname , email: user[0].email, article_list: user[0].article_list}, key);
                    res.status(200).json({msg: `Happy to see you again ${user[0].fullname}`, token: token})
                } else {
                    console.log('salah password')
                    res.status(400).json({error: 'Wrong password'})
                }
            } else {
                res.status(400).json({error: 'Your email/username is wrong'})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static edit(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        User.updateOne({_id: user.id},{
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email
        })
        .then(result => {
            res.status(200).json({msg: 'User updated'})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static profile(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)
        console.log()
        User.find({_id: user.id})
        .then(profile => {
            res.status(200).json(profile[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

}

module.exports = Users