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
        <LoaderBtn :text="`${total == index + 1 ? 'Submit Answers' : 'Next Question'}`" :loading="isDone" @click="showNext" class="w-full mt-4 mb-4" />
    </div>
  </div>
</template>

<script>
import TriviaOption from "./TriviaOption.vue";
import LoaderBtn from "../components/LoaderBtn.vue";
export default {
  name: "TriviaQuestion",
  components: {
    TriviaOption,
    LoaderBtn,
  },
  props: {
    question: Object,
    index: Number,
    total: null,
    isDone: {
      type: Boolean,
      default: false,
    }
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
      if(this.answer != null){
        this.$emit("next", this.question.id, this.answer, this.index);
      }else{
        alert('Please select an option')
      }
    },
  },
};
</script>

<style scoped></style>
