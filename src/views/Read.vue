<template>
  <div @click="ClickShowtohide">
    <!-- Read {{ $route.params.id }} -->
    <v-touch v-on:swipeleft="addnext" v-on:swiperight="redback" class="wrapper">
      <div class="readbox" v-if="content">
        <div class="Spaceoccupying"></div>
        <h1 class="htitle">{{ content.title }}</h1>
        <div
          style="white-space: pre-wrap"
          class="readcontent"
          v-if="!content.isVip"
        >
          {{ content.cpContent }}
        </div>
        <div v-else class="bookvipinfo">
          <div style="height: 150px"></div>
          <p>温馨提示</p>
          <p>
            由于格式问题，该书籍暂不提供网页阅读，扫描如下二维码打开APP进行阅读~
          </p>
          <p>如已安装，直接启动应用即可</p>
          <img
            src="http://statics.zhuishushenqi.com/msite/qrcode2app.png"
            alt=""
          />
          <div style="height: 160px"></div>
        </div>
      </div>
    </v-touch>
    <!-- 头部弹出 -->
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '7%' }"
      :close-on-click-overlay="false"
      :overlay="false"
    >
      <div class="backTop" @click="$router.back()">
        <van-icon name="arrow-left" /><span>返回</span>
      </div>
      <div class="titleoption">
        <span class="title" v-if="bookInfo">{{ bookInfo.title }}</span>
        <span v-else></span>
      </div>
      <div class="jumpoption">
        <van-popover
          v-model="showPopover"
          theme="dark"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-button type="primary"
              ><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAcElEQVRIS+3UwQ2AMAxDUZspmArGgJFgQiqVA2SABiEkTpydA+kCVl+rz2o2oPlKoIfoOFDQcWI9zk05/N6PLLHju9mI5guE7HjYZ4qe+XMmx0P0kz2GPfMqd7/bnnmVswPIyESo/5k98yr/cdF5vQD65koTkcw9oAAAAABJRU5ErkJggg=="
                alt=""
            /></van-button>
          </template>
        </van-popover>
      </div>
    </van-popup>
    <!-- 底部弹出 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '25%' }"
      :close-on-click-overlay="false"
      :overlay="false"
    >
      <div class="font-btn">
        <span class="font-btn-w">Aa-</span>
        <div class="fontstep">
          <van-slider v-model="value" :step="10" @change="onChange" />
        </div>
        <span class="font-btn-w">Aa+</span>
      </div>
      <div class="backcolorchange">
        <van-button plain hairline type="primary" @click="moren"
          >默认</van-button
        >
        <van-button plain hairline type="primary" @click="yejian"
          >夜间</van-button
        >
        <van-button plain hairline type="primary" @click="huyan"
          >护眼</van-button
        >
      </div>
      <div class="bottomcontrol">
        <span @click="redback">上一章</span>
        <span @click="$router.push(`/book/${$route.params.id}/chapter`)"
          >目录</span
        >
        <span @click="addnext">下一章</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      content: null,
      readchapter: null,
      show: false,
      value: 40,
      showPopover: false,
      actions: [
        { text: "首页", shouye: "/" },
        { text: "书架", shujia: "/bookshelf" },
      ],
      // chapter:null,
    };
  },
  computed: {
    ...mapState(["chapter", "a", "bookInfo"]),
  },

  created() {
    console.log(JSON.parse(window.localStorage.getItem(this.$route.params.id)));
    
    if (!JSON.parse(window.localStorage.getItem(this.$route.params.id))) {
      let pageid = this.$route.params.id;
      window.localStorage.setItem(pageid, 0);
    }else{
      this.$store.commit("updateA", Number( window.localStorage.getItem(this.$route.params.id)));
    }
    // this.axios
    //   .get(
    //     "http://novel.kele8.cn/chapters/" +
    //       encodeURIComponent(this.chapter.chapters[0].link)
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     this.content = res.data.chapter;
    //   });
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 10000,
    });
    this.axios
      .get(
        "http://novel.kele8.cn/book-sources?view=summary&book=" +
          this.$route.params.id
      )
      .then((res) => {
        this.axios
          .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
          .then((res) => {
            let urlbook = JSON.parse(window.localStorage.getItem(this.$route.params.id))

            this.readchapter = res.data;
            this.axios
              .get(
                "http://novel.kele8.cn/chapters/" +
                  encodeURIComponent(res.data.chapters[urlbook].link)
              )
              .then((res) => {
                this.content = res.data.chapter;
              });
          });
      });
  },
  methods: {
    abccc() {
      console.log(123123);
    },

    addnext() {
      var add = this.a + 1;
      console.log(this.readchapter.chapters.length);
      if (add >= this.readchapter.chapters.length) {
        Toast.fail("超过最大章节数了");
        add = this.readchapter.chapters.length - 1;
        this.$store.commit("updateA", add);
      } else {
        this.$store.commit("updateA", add);

        this.axios
          .get(
            "http://novel.kele8.cn/book-sources?view=summary&book=" +
              this.$route.params.id
          )
          .then((res) => {
            this.axios
              .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
              .then((res) => {
                let pageid = this.$route.params.id;
                let pageobj = add;
                window.localStorage.setItem(pageid, JSON.stringify(pageobj));
                
                let urlbook =
                  JSON.parse(
                    window.localStorage.getItem(this.$route.params.id)
                  ) || this.a;
                console.log(urlbook);
                this.axios
                  .get(
                    "http://novel.kele8.cn/chapters/" +
                      encodeURIComponent(res.data.chapters[urlbook].link)
                  )
                  .then((res) => {
                    this.content = res.data.chapter;
                  });
              });
          });
        this.$toast.loading({
          message: "下一章...",
          forbidClick: true,
          duration: 10000,
        });
      }
    },
    redback() {
      var red = this.a - 1;
      if (red < 0) {
        red = 0;
        this.$store.commit("updateA", red);

        Toast.fail("小于章节数");
      } else {
        this.$store.commit("updateA", red);

        this.axios
          .get(
            "http://novel.kele8.cn/book-sources?view=summary&book=" +
              this.$route.params.id
          )
          .then((res) => {
            this.axios
              .get("http://novel.kele8.cn/book-chapters/" + res.data[0]._id)
              .then((res) => {
                let pageid = this.$route.params.id;
                let pageobj = red;
                window.localStorage.setItem(pageid, JSON.stringify(pageobj));

                let urlbook =
                  JSON.parse(
                    window.localStorage.getItem(this.$route.params.id)
                  ) || this.a;
                console.log(urlbook);
                this.axios
                  .get(
                    "http://novel.kele8.cn/chapters/" +
                      encodeURIComponent(res.data.chapters[urlbook].link)
                  )
                  .then((res) => {
                    this.content = res.data.chapter;
                  });
              });
          });
        this.$toast.loading({
          message: "上一章...",
          forbidClick: true,
          duration: 10000,
        });
      }
    },
    ClickShowtohide: function () {
      this.show = !this.show;
    },
    onSelect(action) {
      console.log(action);

      this.$router.push(action.shouye);
      this.$router.push(action.shujia);
    },
    onChange(value) {
      console.log(value);
      // Toast("当前值：" + value);
      document.querySelector(".htitle").style.fontSize = 26 + value / 10 + "px";
      document.querySelector(".readcontent").style.fontSize =
        22 + value / 10 + "px";
    },
    moren() {
      document.querySelector(".readbox").style.background = "#eee6dd";
    },
    yejian() {
      document.querySelector(".readbox").style.background = "#0c0c0c";
      document.querySelector(".htitle").style.color = "#807e80";
      document.querySelector(".readcontent").style.color = "#666666";
    },
    huyan() {
      document.querySelector(".readbox").style.background = "#b8cd8d";
      document.querySelector(".htitle").style.color = "#0c2e10";
      document.querySelector(".readcontent").style.color = "#2f4e29";
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("updateA", 0);

    next();
  },
  watch: {
    content: function () {
      this.$toast.clear();
    },
  },
};
</script>

<style lang="less">
.wrapper {
  touch-action: pan-y !important;
  .van-skeleton--animate {
    background: #fff;
    .van-skeleton__content {
      margin-top: 40px;
    }
  }
}
.readbox {
  background: #eee6dd;
  height: 100%;
  .Spaceoccupying {
    width: 100%;
    height: 25px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 26px;
    font-weight: 400;
    color: #333;
    margin-left: 20px;
    max-width: 90%;
    margin-bottom: 20px;
  }
  .readcontent {
    font-size: 22px;
    margin-left: 20px;
    max-width: 90%;
  }
  .bookvipinfo {
    text-align: center;

    p {
      font-size: 14px;
      color: #999;
      margin-top: 20px;
      max-width: 90%;
      margin-left: 20px;
    }
    img {
      width: 150px;
    }
  }
}
.van-popup--top {
  background-color: rgba(50, 51, 52, 0.9);
  .van-icon {
    vertical-align: -2px;
  }
  .backTop {
    color: #fff;
    height: 100%;

    line-height: 45px;
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .titleoption {
    width: 60%;
    // height: 100%;
    color: #fff;

    margin: 0 auto;
    text-align: center;
    display: inline-block;
    .title {
      font-size: 12px;
    }
  }
  .jumpoption {
    display: inline-block;
    line-height: 45px;
    .van-button--normal {
      width: 15px;
      height: 15px;
      background: transparent;
      border: none;
      img {
        display: inline-block;
        width: 15px;
        height: 15px;
        vertical-align: 6px;
      }
    }
  }
}
.van-popup--bottom {
  background-color: rgba(50, 51, 52, 0.9);
  .font-btn {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    .font-btn-w {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      margin: 0 10px;
      padding-top: 3px;
    }
    .fontstep {
      display: inline-block;
      width: 70%;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
.backcolorchange {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  .van-button--plain.van-button--primary {
    color: #fff;
    background: transparent;
    border: #ccc;
  }
  button {
    // flex: 1;
    color: #ffffff;
    text-align: center;
    width: 100px;
    height: 27px;

    margin-right: 10px;
  }
}
.bottomcontrol {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  span {
    color: #fff;
    &:nth-child(1) {
      float: left;
    }
    &:nth-child(2) {
      color: #a8a8a8;
    }
    &:nth-child(3) {
      float: right;
    }
  }
}
</style>