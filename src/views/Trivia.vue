<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-green px-5">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md"  v-if="questions.length > 0">
      <div v-if="usePoints" class="flex justify-between items-center mb-4">
        <div>
          <p class="text-gray-600">Points Scored</p>
          <p class="text-2xl font-bold">650</p>
        </div>
        <div>
          <p class="text-gray-600">Earned Discount</p>
          <p class="text-2xl font-bold">$24.00</p>
        </div>
      </div>
      <div class="w-full flex justify-between">
        <p class="text-gray-600 font-bold">Question {{ currentQuestion + 1 }}</p>
        <p class="text-gray-600 font-bold">Time : <span>{{ counter }}</span></p>
      </div>
      <div class="w-full h-2.5 bg-gray-200 mt-4 mb-4 rounded-full">
        <div
          class="bg-green w-full h-2.5 rounded-full"
          :style="{ width: `${(counter / duration) * 100}%` }"
        ></div>
      </div>
      <TriviaQuestion
        :total="questions.length"
        @next="showNext"
        :class="{ hidden: currentQuestion != index }"
        v-for="(question, index) in questions"
        :index="question.id"
        :key="question.id"
        :question="question"
      />
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center" v-else>
      <p class="text-gray-600 text-2xl mb-4">Loading...</p>
    </div>
  </div>
</template>

<script>
import TriviaQuestion from "../components/TriviaQuestion.vue";
import store from "@/store";
export default {
  name: "Trivia",
  components: {
    TriviaQuestion,
  },
  data() {
    return {
      questions: [],
      usePoints: false,
      triviaId: "",
      currentQuestion: 0,
      answers: [],
      counter: 20,
      duration: 10,
      routeFlag: true,
    };
  },
  created: async function () {
    const requestOptions = {
      method: "GET",
      headers: this.requestHeaders(),
    };
    // load questions
    let response = await fetch(
      import.meta.env.VITE_API_BASE_URL + "/start-trivia",
      requestOptions
    ).then(this.handleResponse);
    console.log(response);
    this.questions = response.data.questions;
    this.triviaId = response.data.triviaId;
    this.counter = response.data.timer ? response.data.timer : this.counter;
    this.duration = response.data.timer ? response.data.timer : this.duration;
    this.startCountdown();
  },
  methods: {
    showNext: async function (questionId, answer, index) {
      let next = index + 1;
      // store answer
      this.answers.push({ questionId: questionId, answer: `${answer}` });
      if (next < this.questions.length) {
        this.currentQuestion = next;
      }
      //test is done
      else if (next == this.questions.length) {
        // submit answers to server
        this.submitAnswers();
      }
    },
    startCountdown: async function () {
      if (this.counter > 0) {
        setTimeout(() => {
          this.counter--;
          this.startCountdown();
        }, 1000);
      } else {
        // end session
        if (this.routeFlag) {
          this.submitAnswers();
        }
      }
    },
    requestHeaders: function () {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        return {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        };
      } else {
        this.$router.replace("/");
        return {};
      }
    },
    submitAnswers: async function () {
      console.log(this.answers);
      const requestOptions = {
        method: "POST",
        headers: this.requestHeaders(),
        body: JSON.stringify({
          triviaId: this.triviaId,
          answers: this.answers,
        }),
      };
      // load questions
      let response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/submit",
        requestOptions
      ).then(this.handleResponse);

      console.log(response);
      await store.dispatch("setResult", response);
      this.routeFlag = false;
      // //route to the result
      this.$router.replace("/result");
      // console.log("Test is done");
    },
    handleResponse: function (response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            var msg;

            // auto logout if 401 response returned from api
            if (response.status === 401) {
              msg = "Session expired";
              localStorage.removeItem("user");
              setTimeout(() => {
                this.$router.replace("/");
              }, 12000);
            } else
              msg =
                "You are not authorized to perform this action or view page";

            alert(msg);
            return Promise.reject(error);
          }
          const error = (data && data.message) || response.statusText;
        }
        return data;
      });
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
