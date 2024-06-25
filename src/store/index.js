import { createStore } from 'vuex'

export default createStore({
  state: {
    result : null,
    questions: null
  },
  mutations: {
    SET_RESULT(state,result){
      state.result = result;
    }
  },
  actions: {
    setResult({commit},result){
      commit('SET_RESULT',result);
    }
  },
  modules: {
  }
})
