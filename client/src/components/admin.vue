<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs5>
                <v-card color="white">
                    <v-avatar
                    size="150px"
                    >
                    <i class="fab fa-wolf-pack-battalion fa-5x"></i>
                    </v-avatar>
                    <h3>Welcome Amel</h3>
                    <br><br><br>
                    <v-container>
                        <v-layout >
                            <v-flex >
                                <v-text-field
                                    label="Email"
                                    v-model="admin_email"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                     <v-container>
                        <v-layout >
                            <v-flex >
                                <v-text-field
                                    label="Password"
                                    v-model="admin_pass"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                          <v-btn outline color="black" @click="adminLogin">Submit</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions} from'vuex'
export default {
    computed: {
        admin_email: {
            get () {
                return this.$store.state.admin_email
            },
            set (value) {
                this.$store.commit('setAdminEmail', value)
            }
        },
        admin_pass: {
            get () {
                return this.$store.state.admin_pass
            },
            set (value) {
                this.$store.commit('setAdminPass', value)
            }
        }
    },
    methods: {
        ...mapActions([
            'adminLogin'
        ])
    }
}
</script>

<style scoped>
h3 {
    font-family: 'Merienda', cursive;
}

.v-card{
    margin-top: 70px;
    border-radius: 7px !important;
    padding-bottom: 20px
}
</style>


