<template>
    <div id="result">
        <img alt="Trivia" src="@/assets/images/logo.jpg" />
        <p>You scored:</p>
        <p class="message">{{result.score}}</p>
        <p v-if="result.win">And won {{ result.prize }}!</p>
        <p v-if="result.win && result.prizeType == 'CASH'">You will be contacted shortly with instructions to collect your cash gift. Congratulations!</p>
        <p v-if="result.win && result.prizeType != 'CASH'">You will receive your {{ result.prizeType }} shortly.</p>
        <p v-if="!result.win">You can try again tommorow and stand a chance to win exiting prizes.</p>
        <a @click="backToHome" class="button">Thank You</a>
    </div>
</template>

<script>
import store from '@/store';
import router from '@/router';
export default {
    name: "Result",
    data: function() {
        return {
            result : {}
        }
    },
    created: function() {
        //read result from state
        this.result = store.state.result;
        console.log(this.result)
    },
    methods : {
        backToHome : function() {
            this.$router.replace('/')
        }
    },
    beforeRouteEnter(){
        if(!store.state.result){
            router.replace('/')
        }
    }
}
</script>

<style scoped>
.message{
    font-size: 30px;
}
#result{
    padding-top: 30px;
}
</style>