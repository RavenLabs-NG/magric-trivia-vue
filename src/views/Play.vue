<template>
  <div class="play">
    <div class="top-bar">
      <div class="timer">
        Timer: <span>{{ counter }}</span>
      </div>
    </div>
    <Question
      :total="questions.length"
      @next="showNext"
      :class="{ hide: currentQuestion != index }"
      v-for="(question, index) in questions"
      :index="question.id"
      :key="question.id"
      :question="question"
    />
  </div>
</template>

<script>
import Question from '../components/Question.vue';
import store from "@/store";
export default {
  name: "Play",
  components: {
    Question,
  },
  data: () => {
    return {
      questions: [],
      triviaId : "",
      currentQuestion: 0,
      answers: [],
      counter: 20,
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
    this.startCountdown();
  },
  methods: {
    showNext: async function (questionId, answer, index) {
      let next = index + 1;
      // store answer
      this.answers.push({ questionId: questionId, answer : `${answer}` });
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
      console.log(this.answers)
      const requestOptions = {
        method: "POST",
        headers: this.requestHeaders(),
        body: JSON.stringify({
          triviaId : this.triviaId,
          answers : this.answers
        })
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
          }
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        return data;
      });
    },
  },
};
</script>

<style >
.play {
  /* padding: 20px 100px; */
}
.timer {
  font-size: 1.3em;
}

.hide {
  display: none;
}
</style>
