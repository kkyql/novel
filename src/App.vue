<template>
  <div id="app">
    <router-view :search.sync="search" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
      return{
        search:[]
      }
  },
  computed:{
    ...mapState(["bookrack"]),
  },
  created() {
    this.axios.get("http://novel.kele8.cn/rank-category").then((response) => {
      // this.category = response.data;
      this.$store.commit("updateRankCategory", response.data);
    });
  },
  watch:{
    bookrack: function (n) {
      console.log(n);
      window.localStorage.setItem("bookrack", JSON.stringify(n))
      
    },
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #f4f4f4;
}
</style>
