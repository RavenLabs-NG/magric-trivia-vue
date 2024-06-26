<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-green px-5">
        <img
      src="@/assets/images/logo.jpg"
      alt="Total Trivia Logo"
      class="w-full mb-8 rounded"
    />
        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p class="text-gray-600 text-2xl mb-4">You scored:</p>
        <p class="text-3xl font-bold mb-4">{{result.score}}</p>
        <p v-if="result.win">and won<br><span class="text-green text-5xl mt-2 mb-2"> {{ result.prize }}</span></p>
        <p v-if="result.win && result.prizeType == 'CASH'" class="text-gray-600 text-1xl mt-2 mb-8">You will be contacted shortly with instructions to collect your cash gift. Congratulations!</p>
        <p v-if="result.win && result.prizeType != 'CASH'" class="text-gray-600 text-1xl mt-2 mb-8">You will receive your {{ result.prizeType.toLowerCase() }} on your registered phone number shortly.</p>
        <p v-if="!result.win" class="text-gray-600 text-1xl mt-2 mb-6">You can try again tommorow and stand a chance to win exiting prizes.</p>
        <a @click="backToHome" class="btn mt-4 cursor-pointer">CLOSE</a>
        </div>
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