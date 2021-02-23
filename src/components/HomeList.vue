<template>
  <div class="homelist">
    <h3><slot></slot></h3>
    <ListItem
      v-for="book in booklists.books.slice(0, 4)"
      :key="book._id"
      :book="book"
    />
     <div class="listitemMore">
      <!-- <p >查看更多&nbsp;&nbsp;></p> -->
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  props: ["booklists"],
  components: {
    ListItem,
  },
};
</script>

<style lang='less'>
.homelist {
  height: 470px;
  background-color: #ffffff;
  margin-top: 20px;
  
  position: relative;
  padding-top: 36px;
  h3 {
    border-left: 2px solid #be4332;
    font-size: 13px;
    margin: 15px 0 10px 0;
    line-height: 1em;
    padding-left: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .listitemMore{
    width: 100%;
   
    margin-top: 6px;
   p{
    //  width: 100%;
    width: 100px;
  
     margin: 0 auto;
     text-align: center;
     font-size: 12px;
     color: #b93321;
   }
  }
}
</style>