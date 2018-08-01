<template>
    <div class="dashboard">
        <dash></dash>
    </div>
</template>

<script>
import dash from '../components/dashboard.vue'
export default {
    components: {
        dash
    }
}
</script>

<style scoped>
.dashboard{
    height: 100vh;
    background-image: linear-gradient(#bdc3c7,#2c3e50)
}
</style>
