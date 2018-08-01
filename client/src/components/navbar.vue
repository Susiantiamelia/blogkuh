<template>
    <v-toolbar>
        <v-toolbar-title style="margin-left:50px"><i class="fab fa-wolf-pack-battalion fa-2x"></i></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="nav-but" flat to="/">Home</v-btn>
        <v-btn class="nav-but" flat to="/about-me">About me</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    
}
</script>

<style>
.nav-but {
    color: black !important;
}
</style>

