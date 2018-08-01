const Article = require('../models/article.js')
const Comments = require('../models/comment.js')

class Commentar{
    static create(req,res){
        Comments.create({
            articleID: req.params.id,
            email: req.body.email,
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
}

module.exports = Commentar
