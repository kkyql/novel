import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    rankCategory: null,
    chapter: null,
    a:0,
    bookInfo:null,
    bookrack:JSON.parse(window.localStorage.getItem("bookrack"))||[],
    // bookpage:JSON.parse(window.localStorage.getItem("5d020a2e035a4416960fd2f1"))
  },
  mutations: {
    updateRankCategory: function (state,payload) {
      state.rankCategory = payload
      // console.log(state.rankCategory)
    },
    updateChapter: function (state,payload) {
      state.chapter = payload
    },
    updateA:function(state,payload) {
      state.a = payload
      // console.log(state.rankCategory)
    },
    updateBookinfo:function(state,payload){
        state.bookInfo = payload
    },
    addBookrack:function(state,payload){
        state.bookrack.push(payload)
        
    },
    removeBookrack: function(state, payload) {
      // console.log(state, payload);
      state.bookrack = state.bookrack.filter((item) => item._id !== payload._id);
    },
    // updatePage:function(state,payload){

    // }
  },
  actions: {
  },
  modules: {
  }
})
