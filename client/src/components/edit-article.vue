<template>
    <div class="edit">
        <v-container>
            <v-layout justify-center>
                <v-container>
                <v-flex>
                    
                        <v-card flat>
                                <v-avatar
                            size="200px"
                            >
                            <i class="fas fa-paw fa-6x"></i>
                            
                            </v-avatar>
                            <br><br>
                                <v-text-field
                                    label="Regular"
                                    v-model="article_title"
                                ></v-text-field>
                            <br><br>
                                <v-textarea
                                name="input-7-1"
                                label="Default style"
                                v-model="article_content"
                                ></v-textarea>
                            <v-btn outline color="black" @click="editArticle(detail._id)">Edit</v-btn>
                        </v-card>
                    
                </v-flex>
                </v-container>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout justify-center>
                <v-flex>
                    <v-card>
                        <v-card-title>
                            <h4>Comment:</h4>
                        </v-card-title>
                        <v-container v-for="(comment,index) in detail.comment" :key="index">
                            <v-layout id="comment-cont">
                                <v-flex xs12>
                                    <v-card flat>
                                        <v-card-title>
                                            <h4>{{ comment.email }}</h4>
                                            
                                        </v-card-title>
                                        <p id="comment">{{ comment.content}}</p>
                                        <v-btn fab small @click="deleteComment({article: detail._id, comment: comment._id})">
                                            <v-icon>far fa-trash-alt</v-icon>
                                        </v-btn>
                                    </v-card>
                                    
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'article','editArticle', 'deleteComment'
        ])
    },
    computed: {
        ...mapState([
            'comment','detail'
        ]),
        article_title: {
            get () {
                return this.$store.state.article_title
            },
            set (value) {
                this.$store.commit('setArticleTitle', value)
            }
        },
        article_content: {
            get () {
                return this.$store.state.article_content
            },
            set (value) {
                this.$store.commit('setArticleContent', value)
            }
        }
    },
    created() {
        this.article(this.$route.params.id)
    }
}
</script>

<style scoped>
#comment{
    text-align: left !important;
    font-size: 15px !important;
    margin-left: 15px
}

#comment-cont{
    border-bottom: 1px solid grey !important
}
</style>
