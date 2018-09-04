<template>
  <v-flex xs7>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card flat>
            <v-avatar size="200px">
              <i class="fas fa-paw fa-6x"></i>
            </v-avatar>
            <br><br>
            <v-text-field label="Title" v-model="article.title"></v-text-field>
            <br><br>
            <v-textarea
              name="input-7-1"
              label="Content"
              v-model="article.article"
            ></v-textarea>
            <v-btn outline color="black" @click="editArticle">Edit</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title>
              <h4>Comment:</h4>
            </v-card-title>
            <v-container v-for="(comment,index) in comments" :key="index">
              <v-layout id="comment-cont">
                <v-flex xs12>
                  <v-card flat>
                    <v-card-title>
                      <h4>{{ comment.user.fullname }}</h4>
                    </v-card-title>
                    <p id="comment">{{ comment.content}}</p>
                    <v-btn fab small @click="deleteComment(comment._id)">
                      <v-icon>far fa-trash-alt</v-icon>
                    </v-btn>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <br><br><br>
          <v-container>
            <v-btn fab small @click="deleteArticle">
              <v-icon>far fa-trash-alt</v-icon>
            </v-btn>
          </v-container>
          
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
      comments: ''
    };
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.allarticle(this.id)
      this.allcomment(this.id)
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.allarticle(this.$route.params.id)
    this.allcomment(this.$route.params.id)
  },
  methods: {
    allarticle(id){
      axios
        .get(`http://35.197.142.60/article/${id}`)
        .then(article => {
          this.article = article.data[0];
          console.log(this.article);
          
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
    },
    deleteComment(id){
       
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then(confirm => {
        if(confirm.value){
          axios.delete(`http://35.197.142.60/comment/delete/${this.id}/${id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(result => {
            this.allcomment(this.id)
            swal({
              title: 'succesfully delete comment!',
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
      })

    },
    deleteArticle(){

      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then(confirm => {
        if(confirm.value){
          axios.delete(`http://35.197.142.60/article/delete-article/${this.id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(result => {
              swal({
                title: 'succesfully delete article!',
                type: "success",
              });
              this.$router.push('/dashboard')
            })
            .catch(err => {
              swal({
                title: `${err.message}`,
                type: "error",
              });
            })
        }
      })
      
    },
    editArticle(){
      let article = {
        title: this.article.title,
        article: this.article.article
      }
      axios.put(`http://35.197.142.60/article/edit-article/${this.id}`,article, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result => {
        swal({
          title: 'succesfully edit article!',
          type: "success",
        });
        this.$router.push('/dashboard')
      })
      .catch(err => {
        swal({
          title: `${err.message}`,
          type: "error",
        });
      })
    },
  }
};
</script>

<style scoped>

</style>
