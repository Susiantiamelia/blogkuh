<template>
    <v-container>
        <v-container v-for="(post, index) in article" :key="index" style="border-bottom: 1px solid grey">
            <v-layout row wrap>
                <v-flex xs2 style="padding-left: 20px">
                    <i class="fas fa-paw fa-6x"></i>
                </v-flex>
                <v-flex xs8>
                    <v-card flat>
                            <div class="content">
                                <router-link :to="`/article/${post._id}`" style="color: black"><h3 class="headline mb-0">{{ post.title }}</h3></router-link>
                                <br>
                                <div>{{ post.article }}</div>
                            </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState([
            'article'
        ])
    },
    methods: {
        ...mapActions([
            'allArticle'
        ])
    },
    created(){
        this.allArticle()
    }
}
</script>

<style scoped>
.content{
    text-align: left !important
}
</style>
