<template>
  <div class="question">
    <div class="text-center mb-6">
      <p class="text-lg font-medium">
        {{ question.question }}
      </p>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <TriviaOption
        v-for="option in question.options"
        :key="option.id"
        :class="{ ['bg-green text-white']: answer == option.id }"
        :id="option.id"
        :text="option.content"
        @doSelect="doSelect"
      />
    </div>

    <div class="text-center mt-4 border-t-2">
      <div v-if="total == index + 1">
        <button @click="showNext" class="w-full bg-white border-2 border-green text-green text-white py-4 rounded-full mt-4">SUBMIT ANSWERS</button>
      </div>
      <div v-else>
        <button @click="showNext" :disabled="answer == null" class="w-full bg-white border-2 border-green text-green text-white py-4 rounded-full mt-4">NEXT QUESTION</button>
      </div>
    </div>
  </div>
</template>

<script>
import TriviaOption from "./TriviaOption.vue";
export default {
  name: "TriviaQuestion",
  components: {
    TriviaOption,
  },
  props: {
    question: Object,
    index: Number,
    total: null,
  },
  data: () => {
    return {
      answer: null,
    };
  },
  methods: {
    doSelect: function (number) {
      this.answer = number;
    },
    showNext: function () {
      this.$emit("next", this.question.id, this.answer, this.index);
    },
  },
};
</script>

<style scoped></style>
