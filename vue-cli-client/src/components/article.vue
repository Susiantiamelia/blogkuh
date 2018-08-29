<template>
  <v-flex xs7>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-avatar size="200px">
                <i class="fas fa-paw fa-6x"></i>
          </v-avatar>
          <br><br>
          <h1>{{ article.title }}</h1>
          <br><br>
          <p>{{ article.article }}</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout justify-center>
        <v-flex xs10>
          <v-card flat>
            <v-card-title>
              <h3>Comment Here</h3>
            </v-card-title>
            <v-container>
              <v-flex>
                <v-textarea box name="input-7-4" v-model="content" label=" Write your comment here"></v-textarea>
              </v-flex>
            </v-container>
            <v-container>
              <v-btn block color="black" dark @click="comment">Submit</v-btn>
            </v-container>
            <br><br>
            <v-card-title>
              <h4>Comment:</h4>
            </v-card-title>
            <v-container v-for="(comment,index) in comments" :key="index" style="border-bottom: 1px solid lightgrey">
              <v-layout id="comment-cont">
                <v-flex xs12>
                  <v-card flat>
                    <v-card-title>
                      <h4>{{ comment.user.fullname }}</h4>                                            
                    </v-card-title>
                    <p id="comment">{{ comment.content}}</p>
                  </v-card>                                    
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert2'

export default {
  props: ["id"],
  data() {
    return {
      article: "",
      comments: '',
      content: ''
    };
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      
      this.allarticle(this.id)
      this.allcomment(this.id)
    }
  },
  methods: {
    comment(){
      let token = localStorage.getItem('token') || false
      if(token){
        axios.post(`http://35.197.142.60/comment/post/${this.id}`,{
          content: this.content
        },{
          headers: {
            token: token
          }
        })
        .then(comment => {
          console.log('masuk');
          this.allcomment(this.id)
          this.content = ''
          swal({
          title: 'succesfully comment!',
          type: "success",
        });
        })
        .catch(err => {
          swal({
            title: `${err.message}`,
            type: "error",
          });
        })

      } else {
        swal({
          title: `Please login first`,
          type: "error",
        });
        this.$router.push('/register')
      }
      
    },
    allarticle(id){
      axios
        .get(`http://35.197.142.60/article/${id}`)
        .then(article => {
          this.article = article.data[0];
        })
        .catch(err => {
          swal({
            title: `${err.message}`,
            type: "error",
          });
        })
    },
    allcomment(id){
      axios
        .get(`http://35.197.142.60/comment/comment/${id}`)
        .then(comment => {
          this.comments = comment.data
        })
        .catch(err => {
          swal({
            title: `${err.message}`,
            type: "error",
          });
        })
    }
  }
};
</script>

<style scoped>

</style>


