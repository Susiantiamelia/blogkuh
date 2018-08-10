const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.should();
chai.use(chaiHTTP)


var User = require('../models/user.js')
let userId = ''

let url = 'http://localhost:3000'

beforeEach(function() {
    User.createOne({
        fullname: 'fullname',
        username: 'username',
        email: 'email@mail.com',
        password: 'password',
        article_list: []
    })
    .then(result => {
        userId = result._id
    })
    .catch(err => {
        console.log(err);
        
    })
});

afterEach(function(){
    User.deleteOne({_id: userId})
    .then(result => {
        console.log('successs');
        
    })
    .catch(err => {
        console.log(err);
        
    })
})

describe('blog testing', function(){


    it('POST /register should return user data', function(done){
        chai.request(url)
        .post('/users/register')
        .send({fullname: 'Sprite', username: 'sprite', email: 'sprite@mail.com', password: 'sprt'})
        .end(function(err, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.user.should.have.property('_id')
            res.body.user.should.have.property('fullname')
            res.body.user.should.have.property('username')
            res.body.user.should.have.property('email')
            res.body.user.should.have.property('password')
            done()
        })
    })
    it('POST /login should return token', function(done){
        chai.request(url)
        .post('/users/login')
        .send({uname_email: 'sprite', password: 'sprt'})
        .end(function(err,res) {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('msg')
            res.body.should.have.property('token')
            done()
        })
    })
    it('PUT /edit should return updated profile', function(done){
        chai.request(url)
        .put('/users/edit')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTU4MjI2NzI3YWFkNjFmZWY2ODM5OCIsImZ1bGxuYW1lIjoiU3ByaXRlIiwiZW1haWwiOiJzcHJpdGVAbWFpbC5jb20iLCJhcnRpY2xlX2xpc3QiOltdLCJpYXQiOjE1MzIzMzM3OTR9.LXNN_S4Fd5vVubAE27yauxzLrxs6eVMyJGpQgEzl9a0')
        .send({fullname: 'apa aja deh', username: 'apaaa', email: 'apaaja@mail.com'})
        .end(function(err,res){
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('msg')
            done()
        })
    })
    it('POST /add-article should return article data', function(done){
        chai.request(url)
        .post('/article/add-article')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTU4MjI2NzI3YWFkNjFmZWY2ODM5OCIsImZ1bGxuYW1lIjoiU3ByaXRlIiwiZW1haWwiOiJzcHJpdGVAbWFpbC5jb20iLCJhcnRpY2xlX2xpc3QiOltdLCJpYXQiOjE1MzIzMzM3OTR9.LXNN_S4Fd5vVubAE27yauxzLrxs6eVMyJGpQgEzl9a0')
        .send({article: 'something'})
        .end(function(err, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('msg')
            done()
        })
    })
    it('GET /all-article should return all article', function(done){
        chai.request(url)
        .get('/article/all-article')
        .end(function(err, res){
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body[0].should.have.property('_id')
            res.body[0].should.have.property('article')
            done()
        })
    })
    it('DELETE /delete-article should return message succes', function(done){
        chai.request(url)
        .del('/article/delete-article/5b5591b8bfe7ff7ed5394db5')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTU4MjI2NzI3YWFkNjFmZWY2ODM5OCIsImZ1bGxuYW1lIjoiU3ByaXRlIiwiZW1haWwiOiJzcHJpdGVAbWFpbC5jb20iLCJhcnRpY2xlX2xpc3QiOltdLCJpYXQiOjE1MzIzMzM3OTR9.LXNN_S4Fd5vVubAE27yauxzLrxs6eVMyJGpQgEzl9a0')
        .end(function(err, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('msg')
            done()
        })
    })
    it('PUT /edit-article should return updated article', function(done){
        chai.request(url)
        .put('/article/edit-article/5b55904d0a45ee7b1c1ad00f')
        .send({article: 'some blablabla'})
        .end(function(err, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('msg')
            res.body.should.have.property('article')
            done()
        })

    })
})