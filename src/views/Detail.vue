<template>
  <div>
    <van-skeleton title :row="6" :loading="loading">
      <div v-if="bookreviews">
        <HomeHeadercurr>
          <span
            slot="headercurrtitle"
            style="color: #fff; font-size: 14px; font-weight: 600"
            >书籍详情</span
          >
          <van-icon
            slot="headericon"
            name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAKlBMVEVHcEz///////////////////////////////////////////////////+LBpLMAAAADXRSTlMApSzS4boSaI048EtBf5mWRgAAANhJREFUOMvV0z0KwjAYxvGItVqK4AWEro6CqyDSVRB3wQsI7iLoAQQv4OxBvIDgt/DexTchjX3gOYDN8ELz69D+Q4ypwornIicqLdG1YFKzkv2F9H57ySDPZ17S3VA6Qeq6dffS1TEK0tanq5eJjgcVTSRvKnsdTyobHS8qR/c1TJY6blQiOIuyNOw8MHHnt2LStHPLJLFzyiSWcriyGAgHAuFAIBwIhAOBcCAQDgTCgUA4EAgHAuFAIBwIhANx4S5eIvdzxZ3TcJ/iC1J9bRzu6bm/zkxl1xfJoE8h5ybMjAAAAABJRU5ErkJggg=="
            size="22"
            @click="$router.push('/bookshelf')"
          />
        </HomeHeadercurr>

        <div v-if="bookInfo">
          <div class="bookdatailkk">
            <div class="bookdetailimg">
              <van-card
                :thumb="`http://statics.zhuishushenqi.com${bookInfo.cover}`"
              />
              <div class="bookdetailtitle">
                <span>{{ bookInfo.title }}</span>
              </div>
              <div class="bookdetailbottom">
                <p class="detailauthor">
                  {{ bookInfo.author }}<span>&nbsp;&nbsp;|</span>
                </p>
                <span class="detailcat"
                  >&nbsp;&nbsp;{{ bookInfo.cat
                  }}<span>&nbsp;&nbsp;|</span></span
                >
                <p class="detailwordcount">{{ formattingNum }}</p>
                <p class="detailupdated">{{ getnowtime }}更新</p>
              </div>
            </div>
            <div class="detailBtn">
              <!-- <van-button type="default">加入书架</van-button> -->
              <!-- <van-button
                type="danger"
                @click="removeBookrack($route.params.id)"
                v-if="findsuccess"
                >撤出书架</van-button
              >
              <van-button
                type="default"
                @click="addBookrack($route.params.id)"
                v-else
                >加入书架</van-button
              > -->
              <van-button
                type="danger"
                @click="removeBookrack(bookInfo)"
                v-if="bool"
                >撤出书架</van-button
              >
              <van-button type="default" @click="addBookrack(bookInfo)" v-else
                >加入书架</van-button
              >
              <van-button
                type="info"
                @click="$router.push(`/book/${$route.params.id}/read`)"
                >开始阅读</van-button
              >
            </div>
            <div class="detailfans">
              <div class="fansleft">
                <p>追人气</p>
                <span>{{ formatfolloewe }}</span>
              </div>
              <div class="fansmiddle">
                <p>读者留存率</p>
                <span>{{ bookInfo.retentionRatio }}%</span>
              </div>
              <div class="fansright">
                <p>日更字数/天</p>
                <span>{{ bookInfo.serializeWordCount }}</span>
              </div>
            </div>
            <div class="bookintroduce">
              <div class="desc" :class="{ short: isShort }">
                {{ bookInfo.longIntro }}
              </div>
              <div class="arrow">
                <van-icon
                  name="arrow-down"
                  @click="isShort = false"
                  v-if="isShort"
                />
                <van-icon name="arrow-up" @click="isShort = true" v-else />
              </div>
            </div>
            <!-- <p @click="$router.push(`/book/${$route.params.id}/chapter`)">
          {{ bookInfo.lastChapter }}
        </p> -->
            <!-- 这里要做点击跳转目录详情路由 -->
            <div
              class="bookcatalog"
              @click="$router.push(`/book/${$route.params.id}/chapter`)"
            >
              <span class="bookcatalogtitle">目录</span>
              <div class="catalogright">
                <span>[{{ getnowtime }}更新]</span
                ><span>{{ bookInfo.lastChapter }}</span>
              </div>
              <van-icon class="vanicon" name="arrow" size="14px" />
            </div>
            <div class="hot-comment-top">
              <h2>热门书评</h2>
            </div>
            <div
              class="bookhotcomment"
              v-for="(item, index) in bookreviews.slice(0, 5)"
              :key="index"
            >
              <div class="commentimg">
                <img
                  :src="`http://statics.zhuishushenqi.com/${item.author.avatar}`"
                  alt=""
                />
              </div>
              <div class="commentinfo">
                <div class="infouser">
                  <p class="name">{{ item.author.nickname }}</p>
                  <p class="title">{{ item.title }}</p>

                  <div class="score">
                    <van-rate
                      v-model="item.rating"
                      readonly
                      size="12px"
                      gutter="0"
                      color="#f19047"
                      void-color="#f19047"
                    />
                  </div>
                  <p class="content">{{ item.content }}</p>
                  <p class="love">
                    <span class="left">{{
                      userinfofoemattime(item.updated)
                    }}</span>
                    <span class="right">{{ item.likeCount }}人觉得有用</span>
                    
                  </p>
                </div>
              </div>
            </div>
            <div class="bottomList">
              <router-link to="/category">分类</router-link>
              <span>|</span>
              <!-- <router-link to="/ranking">排行</router-link> -->
              <router-link to="/bookshelf">书架</router-link>
              <span>|</span>
              <router-link to="/contactus">联系我们</router-link>
            </div>
            <div class="copyright">
              <span
                ><img src="../assets/copyright.png" alt="" />粤公网安备
                88888888888888号</span
              >
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomeHeadercurr from "../components/HomeHeadercurr.vue";
export default {
  components: {
    HomeHeadercurr,
  },

  data() {
    return {
      // bookInfo: null,
      isShort: true,
      bookreviews: null,
      loading: true,
    };
  },
  created() {
    this.axios
      .get(
        "http://novel.kele8.cn/book/reviews?book=" +
          this.$route.params.id +
          "&limit=10"
      )
      .then((res) => {
        console.log(this.$route);
        console.log(res);
        this.bookreviews = res.data.reviews;
        console.log(this.bookreviews);
      });
  },

  computed: {
    ...mapState(["bookInfo", "bookrack"]),
    formattingNum: function () {
      if (this.bookInfo.wordCount > 10000) {
        return (this.bookInfo.wordCount / 10000).toFixed(0) + "万字";
      } else {
        console.log(12123)
        return this.bookInfo.wordCount / 10000;
      }
    },
    getnowtime: function () {
      let timenow =
        this.bookInfo.updated.split(/[T.]/)[0] +
        " " +
        this.bookInfo.updated.split(/[T.]/)[1];
      var timenow2 = timenow.split(" ");
      var result = timenow2[0].split("-");
      result.push(timenow2[1].slice(0, 2));
      result[1] = result[1] - 1;
      console.log(result);
      return this.$moment(result).fromNow();
    },
    formatfolloewe: function () {
      return (this.bookInfo.latelyFollower / 10000).toFixed(1) + "万";
    },

    // abc:function () {
    //   return this.userinfofoemattime(this.bookreviews.updated)
    // }

    bool() {
      //小说是否已经收藏
      var b = false;
      if (this.bookrack.length) {
        this.bookrack.forEach((element) => {
          if (element._id == this.$route.params.id) {
            b = true;
          }
        });
      }
      return b;
    },

  },
  methods: {
    ...mapMutations(["addBookrack", "removeBookrack"]),
    userinfofoemattime: function (time) {
      let timenow = time.split(/[T.]/)[0] + " " + time.split(/[T.]/)[1];
      var timenow2 = timenow.split(" ");
      var result = timenow2[0].split("-");
      result.push(timenow2[1].slice(0, 2));
      result[1] = result[1] - 1;
      console.log(result);
      return this.$moment(result).fromNow();
    },
  },

  beforeRouteEnter(to, from, next) {
    // ...
    // setTimeout(() => {
    //   next((vm) => {vm});
    // }, 3000);

    window.axios
      .get("http://novel.kele8.cn/book-info/" + to.params.id)
      .then((res) => {
        next((vm) => {
          vm.$store.commit("updateBookinfo", res.data);
          // vm.bookInfo = res.data;
          console.log(vm);
        });
      });
  },
  watch: {
    bookreviews: function () {
      this.loading = false;
    },
  },

  // beforeRouteUpdate: function (to, from, next) {
  //   // http://novel.kele8.cn/book-info/:id
  //   console.log(to);
  //   next();
  // },

  // beforeRouteLeave(to, from, next) {
  //   console.log("likai")
  //   // ...

  //   if (to.name == "Read" || to.name == "Chapter") {
  //     console.log("获取章节");

  //     // 获取书籍源
  //     this.axios
  //       .get(
  //         "http://novel.kele8.cn/book-sources?view=summary&book=" +
  //           this.bookInfo._id
  //       )
  //       .then((res) => {
  //         // 根据书籍源获取 章节
  //         console.log(res.data[0]._id);
  //         this.axios
  //           .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
  //           .then((res) => {
  //             console.log(res.data);
  //             this.$store.commit("updateChapter", res.data);
  //             next();
  //           });
  //       });
  //   } else {
  //     next();
  //   }
  // },
};
</script>

<style lang='less'>
.van-skeleton--animate {
  background: #fff;
  .van-skeleton__content {
    margin-top: 40px;
  }
}
.shujititle {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}
.bookdatailkk {
  background: #fff;
  .van-card {
    background: #fff;
  }
  .bookdetailimg {
    position: relative;
    .van-image {
      img {
        width: 65px;
        height: 88px;
        border: none;
        border-radius: 0px;
      }
    }
    .bookdetailtitle {
      width: 70%;
      // background: red;
      position: absolute;
      top: 8px;
      left: 90px;
      span {
        font-size: 16px;
      }
    }
    .bookdetailbottom {
      // float: left;
      width: 70%;

      // background: red;
      position: absolute;
      top: 34px;
      left: 90px;
      .detailauthor {
        font-size: 12px;
        color: #b93321;
        float: left;
        margin-right: 5px;
        margin: 0px 0px;
        padding-right: 13px;
        span {
          padding-left: 8px;
          color: #999;
        }
      }
      .detailcat {
        float: left;
        font-size: 12px;
        color: #999;
        span {
          padding-left: 8px;
          padding-right: 8px;
          font-size: 12px;
          color: #999;
        }
      }
      .detailwordcount {
        margin: 0px 0px;
        font-size: 12px;
        color: #999;
      }
      .detailupdated {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .detailBtn {
    display: flex;
    width: 92%;
    margin: 0 auto;
    margin-top: 12px;

    button {
      text-align: center;
      width: 150px;
    }
    .van-button--default {
      float: left;
      margin-right: 35px;
      border-color: #b93321;
      color: #b93321;
    }
    .van-button--danger {
      margin-right: 35px;
      background: #999999;
      border: none;
    }
    .van-button--info {
      float: right;
      background: #b93321;
      border-color: transparent;
    }
  }
  .detailfans {
    width: 100%;
    height: 85px;
    margin-top: 20px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    div {
      flex: 1;
      width: 33.333%;
      height: 90%;
      // background: red;
      margin: 5px;
      align-items: center;
      justify-items: center;
      text-align: center;
      // float: left;
    }
    p {
      font-size: 12px;
      color: #999;
    }
    span {
      font-size: 16px;
      color: #222222;
    }
  }
  .bookintroduce {
    // height: 115px;
    // background: red;
    border-bottom: 1px solid #ebebeb;
    font-size: 13px;
    padding: 20px;

    .arrow {
      // display: inline-block;
      top: 140px;
      right: 30px;
      float: right;
    }
    p {
      text-align: center;
      margin: 0 0;
    }
    .short {
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .bookcatalog {
    height: 60px;
    // background: red;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bookcatalogtitle {
      font-size: 14px;
      margin-left: 20px;
      line-height: 60px;
    }
    .van-icon-arrow::before {
      margin-right: 20px;
    }
    .catalogright {
      height: 100%;
      font-size: 12px;
      float: right;
      max-width: 55%;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: -90px;
      span:nth-child(1) {
        margin-right: 5px;
      }
      .vanicon {
        vertical-align: -2px;
        margin-right: 20px;
      }

      span {
        color: #999999;
        line-height: 60px;
      }
    }
  }
  .hot-comment-top {
    width: 100%;
    height: 40px;
    // background: red;
    h2 {
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 0;
      font-weight: 400;
      color: #222222;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
    }
  }
  .bookhotcomment {
    height: 130px;
    // background: red;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 10px;
    .commentimg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-left: 20px;
      // background: green;
      // display: inline-block;
      float: left;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .commentinfo {
      box-sizing: border-box;
      // background: blue;
      max-width: 78%;
      margin-left: 8px;
      float: left;
      .infouser {
        .name {
          margin-top: 0px;
          margin-bottom: 0px;
          font-size: 12px;
          color: #a58d5e;
          margin-bottom: 2px;
        }
        .title {
          margin-top: 0px;
          margin-bottom: 0px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          font-weight: 700;
          color: #000;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-bottom: 2px;
        }
        .content {
          margin-top: 0;
          margin-bottom: 0;
          height: 30px;
          font-size: 12px;
          overflow: hidden;
          color: #999999;
        }
        .love {
          height: 19px;
          // background: red;
          padding-top: 2px;
          font-size: 12px;
          color: #999;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
      }
    }
  }
  .bottomList {
    display: flex;
    width: 90%;
    // height: 50px;
    // background-color: red;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    a {
      flex: 1;

      text-align: center;
      font-size: 12px;
      color: #333333;
      font-weight: 600;
    }
    span {
      color: #cccccc;
    }
  }
  .copyright {
    // display: flex;
    margin-top: 20px;
    font-size: 12px;
    color: #999999;
    width: 90%;
    margin: 0 auto;
    height: 100px;
    // background-color: green;
    // flex: 1;
    text-align: center;
    span {
      position: relative;
      top: 5px;
      img {
        position: absolute;
        //  float: left;
        display: inline-block;
        top: -4px;
        left: -24px;
      }
    }
  }
}
</style>