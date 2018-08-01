const Article = require('../models/article.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Comment = require('../models/comment.js')
const key = process.env.SECRET_KEY;

class Articles{
    static article(req,res){
        Article.find({_id: req.params.id})
        .populate('comment')
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
    static add(req,res){
        let token = req.headers.token
        let user = jwt.verify(token, key)

        Article.create({
            title: req.body.title,
            article: req.body.article,
            comment: []
        })
        .then(article => {
            User.update({_id: user.id}, {$push: {article_list: article._id}})
            .then(result => {
                res.status(200).json({msg: 'Succesfully added article', article: article})
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static all(req,res){
        Article.find({})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            console.log('err disini')
            res.status(500).json(err)
        })
    }

    static edit(req,res){
        
        Article.update({_id: req.params.id}, {
            title: req.body.title,
            article: req.body.article
        })
        .then(article => {
            res.status(200).json({msg: 'article updated', article: article})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static delete(req,res){
        let token = req.headers.token
        let user = jwt.verify(token, key)

        Article.deleteOne({_id: req.params.id})
        .then(result => {
            User.update({_id: user.id}, {$pull: {article_list: req.params.id}})
            .then(user => {
                Comment.deleteOne({articleID: req.params.id})
                .then(result => {
                    res.status(200).json({msg: 'Article deleted'})
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
                
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Articles