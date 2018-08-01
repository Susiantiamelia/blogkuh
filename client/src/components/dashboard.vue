<template>
<v-container>
    <v-container>
        <v-layout row wrap>
            <v-flex xs4>
                <v-card color="white">
                    <br><br><br>
                    <h3>About Me</h3>
                    <br><br><br>
                    <v-container>
                        <v-flex>
                            <v-text-field
                                label="Name"
                                v-model="adm_fullname"
                                box
                            ></v-text-field>
                        </v-flex>
                    </v-container>
                    <v-container>
                        <v-flex>
                            <v-text-field
                                label="Email"
            
                              v-model="admin_email"
                                box
                            ></v-text-field>
                        </v-flex>
                    </v-container>
                    <v-container>
                        <v-flex>
                            <v-text-field
                                label="Username"
                                v-model="adm_username"
                                box
                            ></v-text-field>
                        </v-flex>
                    </v-container>
                          <v-btn outline color="black" @click="editAdmin">Edit</v-btn>
                    <br><br><br><br><br>
                </v-card>
            </v-flex>
             <v-flex xs7 style="padding-left: 20px">
                <v-card color="white">
                    <br><br>
                    <h3>Post on blog</h3>
                    <v-container>
                        <v-flex>
                        <v-text-field
                            label="Title"
                        ></v-text-field>
                        </v-flex>
                    </v-container>
                    <v-container>
                        <v-textarea
                        name="input-7-1"
                        label="Your Idea"
                        ></v-textarea>
                    </v-container>
                          <v-btn outline color="black" >Submit</v-btn>
                    <br><br>
                </v-card>
            </v-flex>
            <v-flex xs1>
                <v-card flat>
                    <v-btn color="white" @click="logout">Logout</v-btn>
                </v-card>
            </v-flex>
            <v-container>
        <v-container  v-for="(post, index) in article" :key="index" style="border-bottom: 1px solid grey">
            <v-layout row wrap>
                <v-flex xs2 style="padding-left: 20px">
                    <i class="fas fa-paw fa-6x"></i>
                </v-flex>
                <v-flex xs8>
                    <v-card flat>
                            <div class="content">
                                <router-link :to="`/article/edit/${post._id}`" style="color: black"><h3 class="headline mb-0">{{ post.title }}</h3></router-link>
                                <br>
                                <div>{{ post.article }}</div>
                            </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
        </v-layout>
    </v-container>
</v-container>
    
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'getAdmin', 'editAdmin', 'postArticle', 'allArticle', 'logout'
        ])
    },
    computed: {
        ...mapState([
            'profile','article'
        ]),
        adm_fullname: {
            get () {
                return this.$store.state.adm_fullname
            },
            set (value) {
                this.$store.commit('setFullname', value)
            }
        },
        adm_username: {
            get () {
                return this.$store.state.adm_username
            },
            set (value) {
                this.$store.commit('setUsername', value)
            }
        },
        admin_email: {
            get () {
                return this.$store.state.admin_email
            },
            set (value) {
                this.$store.commit('setAdminEmail', value)
            }
        },
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
        if(localStorage.getItem('admToken')){
            this.getAdmin(),
            this.allArticle()
        } else {
            this.$router.push('/admin')
        }
        
    }
}
</script>

<style scoped>
.v-card{
    border-radius: 5px
}

.content{
    text-align: left !important
}
</style>

