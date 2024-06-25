<template>
  <div class="question">
    <div class="top-bar">
    <h3>Question: <em>#{{index + 1}}</em></h3>
    <div v-if="total == (index + 1)">
        <button @click="showNext" class="button">View Scores</button>
    </div>
    <div v-else>
        <button @click="showNext" class="button">Next ></button>
    </div>
    </div>
    <h2>{{question.question}}</h2>
    <div class="options">
      <Option v-for="option in question.options" 
      :key="option.id" :class="{selected: answer == option.id}" 
      :id="option.id" :text="option.content" @doSelect="doSelect" />
    </div>
  </div>
</template>

<script>
import Option from './Option.vue';
export default {
  name: 'Question',
  components: {
    Option
  },
  props: {
    question: Object,
    index: Number,
    total: null
  },
  data: () => {
    return {
      answer : null
    }
  },
  methods: {
    doSelect : function (number){
      this.answer = number
    },
    showNext: function() {
        this.$emit("next",this.question.id,this.answer,this.index);
    }
  }
}
</script>

<style scoped>
.question{
  /* padding: 5px; */
  text-align: left;
}

.selected{
  background: white;
  color: #ffcb05;
  transform: scale(1.018);
}

.options{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}


.top-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.top-bar button{
    font-size: 1em;
    border-radius: 0px;
}
</style>