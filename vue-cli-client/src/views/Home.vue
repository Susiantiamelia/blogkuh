<template>
  <div class="home">
    <Navbar :token="token"/>
    <Jumbotron/>
    <v-container fluid>
      <v-layout row>
        <articlelist :articles="articles" :route="route"></articlelist>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Jumbotron from '@/components/Jumbotron.vue'
import articlelist from '@/components/list-article.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbar,
    Jumbotron,
    articlelist
  },
  data(){
    return {
      articles: '',
      token: localStorage.getItem('token') || false,
      route: '/article/'
    }
  },
  methods: {
    allArticle(){
      console.log('disini')
      axios.get('http://35.197.142.60/article/all-article')
      .then(article => {
        let post = article.data

        this.articles = post
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
    this.allArticle()
    console.log(this.articles);
    
  },
}
</script>
