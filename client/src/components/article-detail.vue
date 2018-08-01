<template>
    <div class="art-detail">
        <navbar></navbar>
        <v-container>
            <v-layout justify-center>
                <v-flex>
                    <v-avatar
                size="200px"
                >
                <i class="fas fa-paw fa-6x"></i>
                
                </v-avatar>
                <br><br>
                <h1>{{ detail.title }}</h1>
                <br><br>
                <p>{{ detail.article }}</p>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout justify-center>
                <v-flex xs5>
                    <v-card>
                        <v-card-title>
                            <h3>Comment Here</h3>
                        </v-card-title>
                        <v-container>
                            <v-flex >
                            <v-text-field
                                label="Email"
                                v-model="comment_email"
                            ></v-text-field>
                            </v-flex>
                        </v-container>
                        <v-container>
                            <v-flex>
                                <v-textarea
                                box
                                name="input-7-4"
                                label=" Write your comment here"
                                v-model="comment_content"
                                ></v-textarea>
                            </v-flex>
                        </v-container>
                        <v-btn outline color="black" @click="comment( detail._id )">Submit</v-btn>
                        <br><br>
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
                                    </v-card>
                                    
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <Footer></Footer>
    </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import {mapState, mapActions} from 'vuex'
export default {
    components: {
        navbar,
        Footer
    },
    methods: {
        ...mapActions([
            'article','comment'
        ])
    },
    created() {
        this.article(this.$route.params.id)
    },
    computed: {
        ...mapState([
            'detail'
        ]),
        comment_email: {
            get () {
                return this.$store.state.comment_email
            },
            set (value) {
                this.$store.commit('setCommentEmail', value)
            }
        },
        comment_content: {
            get () {
                return this.$store.state.comment_content
            },
            set (value) {
                this.$store.commit('setCommentContent', value)
            }
        }
    }
}
</script>

<style scoped>
p{
    font-size: 17px
}

#comment{
    text-align: left !important;
    font-size: 15px !important;
    margin-left: 15px
}

#comment-cont{
    border-bottom: 1px solid grey !important
}
</style>
