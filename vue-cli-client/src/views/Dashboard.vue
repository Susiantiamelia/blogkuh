<template>
  <div id="dashboard">
   <Navbar :token="token"></Navbar>
     <v-container>
      <v-layout row>
        <profile :user="user" @edit="edit"></profile>
        <Post @post="post"></Post>
      </v-layout>
     </v-container>
     <v-container>
       <v-layout>
          <articlelist :articles="articles" :route="route"></articlelist>
          <router-view></router-view>
       </v-layout>
     </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import profile from '@/components/profile.vue'
import Post from '@/components/Post.vue'
import  articlelist from '@/components/list-article.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  components: {
    Navbar,
    profile,
    Post,
    articlelist
  },
  watch: {
    $route(to, from) {
      this.profile()
    }
  },
  data(){
    return {
      token: localStorage.getItem('token') || false,
      user: {},
      articles: [],
      route: '/my-article/'
    }
  },
  methods: {
    profile(){
      axios.get('http://localhost:3000/users/profile', {
        headers: {
          token: this.token
        }
      })
      .then(profile => {
        console.log(profile)
        this.user = profile.data
        this.articles = profile.data.article_list
      })
      .catch(err => {
        swal({
          title: `${err.message}`,
          type: "error",
        });

      })
    },
    edit(value){
      console.log(value);
      axios.put('http://localhost:3000/users/edit',value,{
        headers: {
          token: this.token
        }
      })
      .then(result => {
        console.log(result)
        
        swal({
          title: result.data.msg,
          type: "success",
        });
      })
      .catch(err => {
        swal({
          title: `${err.message}`,
          type: "error",
        });
      })
    },
    post(value){
      console.log(value);
      axios.post('http://localhost:3000/article/add-article', value, {
        headers: {
          token: this.token
        }
      })
      .then(post => {
        this.profile()
        swal({
          title: post.data.msg,
          type: "success",
        });
      })
      .catch(err => {
        swal({
          title: `${err.message}`,
          type: "error",
        });

      })
    }
  },
  created() {
    this.profile()
  },
}
</script>

<style scoped>

</style>
