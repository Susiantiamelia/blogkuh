<template>
    <v-toolbar>
        <v-toolbar-title style="margin-left:50px"><i class="fab fa-wolf-pack-battalion fa-2x"></i></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="nav-but" flat to="/">Home</v-btn>
        <v-btn class="nav-but" v-if="!token" flat to="/register">SIGN IN</v-btn>
        <v-btn class="nav-but" flat to="/dashboard" v-if="token">
            <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn class="nav-but" v-if="token" flat @click="logout">LOGOUT</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    props: ['token'],
    methods: {
        logout(){
            localStorage.removeItem('token')
            this.token = false
            this.$router.push('/')
        }
    }
}
</script>

<style>
.nav-but {
    color: black !important;
}
</style>

