<template>
  <div class="about">
    <navbar></navbar>
    <Jumbotron></Jumbotron>
    <Article></Article>
    <Footer></Footer>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import Jumbotron from '../components/jumbotron.vue'
import Article from '../components/article.vue'
import Footer from '../components/footer.vue'
export default {
  components: {
    navbar,
    Jumbotron,
    Article,
    Footer
  }
}
</script>

