<template>
    <button @click="select" class="border-2 border-green  drop-shadow-lg py-4 rounded-full">{{ text }}</button>
</template>

<script>
export default {
    name: "TriviaOption",
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