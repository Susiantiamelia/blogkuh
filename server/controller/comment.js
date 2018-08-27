const Article = require('../models/article.js')
const Comments = require('../models/comment.js')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY;


class Commentar{
    static create(req,res){
        let token = req.headers.token
        let user = jwt.verify(token, key)

        Comments.create({
            articleID: req.params.id,
            user: user.id,
            content: req.body.content
        })
        .then(comment => {
            Article.update({_id: req.params.id},{$push: {comment: comment._id}})
            .then(result => {
                res.status(200).json({msg: 'successfully post comment', comment: comment})
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
    }

    static delete(req,res){
        Comments.deleteOne({_id: req.params.CommentId})
        .then(success => {
            Article.update({_id: req.params.ArticleId},{$pull: {comment: req.params.CommentId}})
            .then(result => {
                Article.find({_id: req.params.ArticleId})
                .populate('comment')
                .then(article => {
                    res.status(200).json({msg:'succesfully delete comment', article: article})
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

    static all(req,res){
        Comments.find({articleID: req.params.id}).populate('user')
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = Commentar
