<template>
  <div>
    <!-- Chapter {{$route.params.id}} -->
    <HomeHeadercurr>
      <span
        slot="headercurrtitle"
        style="color: #fff; font-size: 14px; font-weight: 600"
        >优质书源</span
      >
    </HomeHeadercurr>

    <van-skeleton title :row="6" :loading="loading">
      <div class="bookChapterBox" v-if="chapter">
        <div class="ChapterTitle">
          <span class="title">目录</span>
          <span class="num">共{{ chapter.chapters.length }}章</span>
          <span class="right" @click="reverseorder">倒序</span>
        </div>
        <div
          class="Chapterinfo"
          v-for="(item, index) in chapter.chapters"
          :key="index"
        >
        <div @click="Precisejump(item.order)">
          <!-- $router.push(`/book/${$route.params.id}/read`) -->
          <span class="order">{{ item.order }}</span>
          <span class="content">{{ item.title }}</span>
        </div>
          
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HomeHeadercurr from "../components/HomeHeadercurr.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    HomeHeadercurr,
  },
  created() {
    console.log(this.$route.params.id);
    this.getCatalog();
  },
  watch: {
    chapter: function () {
      this.loading = false;
    },
  },
  methods: {
    getCatalog: function () {
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
            this.$route.params.id
        )
        .then((res) => {
          this.axios
            .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
            .then((res) => {
              console.log(res.data);
              this.$store.commit("updateChapter", res.data);
            });
        });
    },
    reverseorder: function () {
      let invertedarr = [];
      let a = this.chapter.chapters.reverse();
      console.log(a);
      invertedarr.push(a);
      this.chapter.chapters = a;
    },
    Precisejump:function (order) {
      console.log(order)
      this.$store.commit('updateA',order-1)
      let pageid = this.$route.params.id;
                window.localStorage.setItem(pageid, order-1);
      this.$router.push(`/book/${this.$route.params.id}/read`)
    }
  },
  computed: {
    ...mapState(["chapter","a"]),
  },
};
</script>

<style lang="less">
.van-skeleton--animate{
  background: #fff;
  .van-skeleton__content{
    margin-top: 40px;
  }
}
.bookChapterBox {
  background: #ffffff;
  .ChapterTitle {
    width: 100%;
    height: 45px;
    // background: red;
    line-height: 45px;
    border-bottom: 1px solid #f8f8f8;
    .title {
      color: #222;
      font-size: 14px;
      margin-left: 20px;
      font-weight: 600;
    }
    .num {
      font-size: 12px;
      color: #999;
      margin-left: 5px;
    }
    .right {
      float: right;
      font-size: 14px;
      color: #222;
      margin-right: 20px;
    }
  }
  .Chapterinfo {
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #f8f8f8;
    // background: red;
    font-size: 12px;
    color: #999;
    .order {
      margin-left: 20px;
      margin-right: 5px;
    }
  }
}
</style>