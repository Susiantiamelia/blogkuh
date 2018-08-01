import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    icons: ["fab fa-instagram", "fab fa-twitter", "fab fa-facebook-f", "fab fa-github", "fab fa-google-plus-g"],
    article: [],
    detail: '',
    comment_email: '',
    comment_content: '',
    admin_email: '',
    admin_pass: '',
    profile: '',
    adm_fullname: '',
    adm_username: '',
    article_title: '',
    article_content: ''
  },
  mutations: {
    setArticle(state, payload){
      state.article.push(payload)
    },
    setDetail(state, payload){
      state.detail = payload
    },
    setCommentEmail(state, payload){
      state.comment_email = payload
    },
    setCommentContent(state, payload){
      state.comment_content = payload
    },
    addComment(state, payload){
      state.detail.comment.push(payload)
    },
    setAdminEmail(state, payload){
      state.admin_email= payload
    },
    setAdminPass(state, payload){
      state.admin_pass= payload
    },
    setProfile(state, payload){
      state.profile = payload
    },
    setFullname(state, payload){
      state.adm_fullname = payload
    },
    setUsername(state, payload){
      state.adm_username = payload
    },
    setArticleTitle(state, payload){
      state.article_title = payload
    },
    setArticleContent(state, payload){
      state.article_content = payload
    }
  },
  actions: {
    allArticle(context){
      console.log('disini')
      axios.get('http://localhost:3000/article/all-article')
      .then(article => {
        console.log(article.data);
        let post = article.data

        for(let i = 0; i < post.length; i++){
          context.commit('setArticle', post[i])
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    article({ commit }, id){
      console.log('ini data',id)

      axios.get(`http://localhost:3000/article/${id}`)
      .then(article => {
        console.log(article.data[0])
        commit('setDetail', article.data[0])
        console.log('detail', this.state.detail)
        commit('setArticleTitle', article.data[0].title)
        commit('setArticleContent', article.data[0].article)
      })
      .catch(err => {
        console.log(err)
      })
    },

    comment({ commit }, id){

      axios.post(`http://localhost:3000/comment/post/${id}`,{
        email: this.state.comment_email,
        content: this.state.comment_content
      })
      .then(comment => {
        commit('addComment',comment.data.comment)
        this.state.comment_email = ''
        this.state.comment_content = ''
      })
      
    },

    adminLogin({commit}){
      axios.post('http://localhost:3000/users/login',{
        uname_email: this.state.admin_email,
        password: this.state.admin_pass
      })
      .then(admin => {
        console.log(admin)
        localStorage.setItem('admToken', admin.data.token)
        router.push('/dashboard')
      })
    },

    getAdmin({ commit }) {
      console.log('alive')
      let token = localStorage.getItem('admToken')
      axios.get('http://localhost:3000/users/profile', {
        headers: {
          token: token
        }
      })
      .then(profile => {
        console.log(profile)
        commit('setProfile', profile.data)
        commit('setFullname', profile.data.fullname)
        commit('setUsername', profile.data.username)
        commit('setAdminEmail', profile.data.email)
      })
    },

    editAdmin({ commit }){
      let profile = {
        fullname: this.state.adm_fullname,
        username: this.state.adm_username,
        email: this.state.admin_email
      }
      let token = localStorage.getItem('admToken')
      axios.put('http://localhost:3000/users/edit',profile,{
        headers: {
          token: token
        }
      })
      .then(result => {
        console.log(result)
        commit('setProfile', profile)
      })
    },

    postArticle({ commit }){
      let token = localStorage.getItem('admToken')

      let article = {
        title: this.state.article_title,
        article: this.state.article_content
      }

      axios.post('http://localhost:3000/article/add-article', article, {
        headers: {
          token: token
        }
      })
      .then(post => {
        commit('setArticle', post.data.article)
        this.state.article_title = ''
        this.state.article_content = ''
      })
    },

    editArticle({ commit }, id){
      console.log(id)

      let article = {
        title: this.state.article_title,
        article: this.state.article_content
      }
      axios.put(`http://localhost:3000/article/edit-article/${id}`,article)
      .then(result => {
        console.log(result)
      })
    },

    deleteComment({commit},id){
      console.log(id.article, 'dan', id.comment)   

      axios.delete(`http://localhost:3000/comment/delete/${id.article}/${id.comment}`)
      .then(result => {
        commit('setDetail', result.data.article[0])
      })
    },

    logout(){
      localStorage.removeItem('admToken')
      router.push('/admin')
    }
  }
})
