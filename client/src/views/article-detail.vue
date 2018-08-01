<template>
    <div class="detail">
        <detail></detail>
    </div>
</template>

<script>
import detail from '../components/article-detail.vue'
export default {
    components: {
        detail
    },
    created() {
        console.log("id", this.$route.params.id)
    },
}
</script>

<style scoped>

</style>
