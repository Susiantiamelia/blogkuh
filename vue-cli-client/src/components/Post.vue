<template>
  <v-flex xs7 style="padding-left: 20px">
    <v-card color="white">
      <br><br><br>
      <h3>Post on blog</h3>
      <br>
      <v-container>
        <v-flex>
          <v-text-field v-model="article_title" label="Title"></v-text-field>
        </v-flex>
      </v-container>
      <v-container>
        <v-textarea v-model="article_content" name="input-7-1" label="Your Idea"></v-textarea>
      </v-container>
      <v-container>
        <v-btn block color="black" dark @click="post">Submit</v-btn>
      </v-container>
      <br><br>
    </v-card>
 </v-flex>
</template>

<script>
export default {
  data(){
    return {
      article_title: '',
      article_content: ''
    }
  },
  methods: {
    post(){
      this.$emit('post', {
        title: this.article_title,
        article: this.article_content
      })
      this.article_title = ''
      this.article_content = ''
    }
  }
}
</script>

<style scoped>

</style>
