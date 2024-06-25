<template>
    <button @click="select" class="button">{{text}}</button>
</template>

<script>
export default {
    name: "Option",
    props: {
        id : Number,
        text: null
    },
    methods: {
        select: function(){
            this.$emit('doSelect',this.id);
        }
    }
}
</script>

<style scoped>

</style>