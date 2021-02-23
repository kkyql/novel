<template>
  <div class="ranking">
    <home-headercurr>
      <div class="rangingtitile"><child> 排行榜</child></div>
    </home-headercurr>
    <ul class="tabbar">
      <li
        :class="{ active: type == 'epub' }"
        @click="$router.push('/ranking?type=epub')"
      >
        出版
      </li>
      <li
        :class="{ active: type == 'female' }"
        @click="$router.push('/ranking?type=female')"
      >
        女频
      </li>
      <li
        :class="{ active: type == 'male' }"
        @click="$router.push('/ranking?type=male')"
      >
        男频
      </li>
    </ul>

    <div class="tab-content">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(cat, index) in rankCategory[type]"
          :key="index"
          :title="cat.shortTitle"
        />
      </van-sidebar>

      <ul class="right">
        <van-skeleton title avatar :row="3" :loading="loading">
          <template v-if="ranking">
            <ListItem
              v-for="book in ranking.books"
              :key="book._id"
              :book="book"
            />
          </template>
        </van-skeleton>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListItem from "@/components/ListItem.vue";
import HomeHeadercurr from "../components/HomeHeadercurr.vue";
("@/components/HomeHeadercurr.vue");
export default {
  components: {
    ListItem,
    HomeHeadercurr,
  },
  data() {
    return {
      loading: false,
      type: "male",
      activeKey: 0,
      ranking: null,
    };
  },
  computed: {
    ...mapState(["rankCategory"]),
  },

  methods: {
    getRanking: function (id) {
      this.loading = true;
      this.axios.get("http://novel.kele8.cn/rank/" + id).then((response) => {
        // console.log(response.data.ranking);

        // todo  缓存不同id 列表
        this.ranking = response.data.ranking;
        // console.log(this[id]);
        // response.data.ranking

        this.loading = false;
      });
    },
    getLists: function () {
      this.getRanking(this.rankCategory[this.type][this.activeKey]._id);
    },
  },

  created() {
    this.getLists();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      vm.type = to.query.type || "male";
    });
  },
  beforeRouteUpdate(to, from, next) {
    // ...
    this.type = to.query.type || "male";
    next();
  },

  watch: {
    type: function () {
      this.activeKey = 0;
      this.getLists();
    },
    activeKey: function () {
      this.getLists();
    },
  },
};
</script>

<style lang="less">
.ranking {
  .rangingtitile{
     color:#ffffff;
  font-size: 14px;
  font-weight: 600;
  }
  .tabbar {
    display: flex;
    li {
      list-style: none;
      flex: 1;
      text-align: center;
      line-height: 40px;
      &.active {
        color: red;
      }
    }
  }
  .tab-content {
    display: flex;
    .van-sidebar {
      height: calc(100vh - 40px);
      overflow-y: scroll;
    }
    .right {
      flex: 1;
      height: calc(100vh - 40px);
      overflow-y: scroll;
    }
  }
}
</style>