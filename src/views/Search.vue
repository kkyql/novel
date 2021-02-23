<template>
  <div>
    <HomeHeadercurr>
      <span
        slot="headercurrtitle"
        style="color: #fff; font-size: 14px; font-weight: 600"
        >搜索</span
      >
      <van-icon
        slot="headericon"
        name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAKlBMVEVHcEz///////////////////////////////////////////////////+LBpLMAAAADXRSTlMApSzS4boSaI048EtBf5mWRgAAANhJREFUOMvV0z0KwjAYxvGItVqK4AWEro6CqyDSVRB3wQsI7iLoAQQv4OxBvIDgt/DexTchjX3gOYDN8ELz69D+Q4ypwornIicqLdG1YFKzkv2F9H57ySDPZ17S3VA6Qeq6dffS1TEK0tanq5eJjgcVTSRvKnsdTyobHS8qR/c1TJY6blQiOIuyNOw8MHHnt2LStHPLJLFzyiSWcriyGAgHAuFAIBwIhAOBcCAQDgTCgUA4EAgHAuFAIBwIhANx4S5eIvdzxZ3TcJ/iC1J9bRzu6bm/zkxl1xfJoE8h5ybMjAAAAABJRU5ErkJggg=="
        size="22"
        @click="$router.push('/bookshelf')"
      />
    </HomeHeadercurr>
    <div class="header">
      <van-search
        v-model="msg"
        shape="round"
        show-action
        placeholder="搜索功能太卡了不推荐使用"
        @input="searchfocus"
      >
        <template #action>
          <div @click="onSearch">确定</div>
        </template>
      </van-search>
    </div>
    <div class="searchcommendbox" v-if="!msg">
      <div class="searchcommend">
        <div class="title">
          <span class="recomtitle">热门推荐</span>
          <span class="changeother" @click="changeit"
            >换一批<img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAMAAABUv8o5AAAAjVBMVEX////8/P77+/34+Pr6+vz29viUlJaFhYf09PaIiIqPj5GKiozy8vSMjI6RkZPs7O7o6Ori4uTKysynp6mampyXl5nCwsTv7/Hl5ee7u72wsLKhoaOCgoTb293R0dPGxsienqDf3+HV1de4uLqtra+kpKbq6uy/v8G0tLapqaucnJ5/f4HNzc/W1ti9vb9Qf31QAAACK0lEQVQ4y+WU6bKbMAyFJeMF25gdQoDse3Lb93+8yr6X0LnJtNPf1QwMjD9LOgdh+A+Dicjf6RICAQEQ8T0ZcQAeVlH4Z2DsOxLTOoFZvFhQMgIj9g6jJZGt2qpJ5eladpy2eBxfMLHvG6eNVkrL4yZjxL1irLvUajT3YdjWRptmWVA+9oKJjVRpddjsimLfHuVDXgvmNX2LclDpdb2AiArFxc+7lsuMdMwApWawatx4OAt65ZzkLcrmUZcQ4YwhcuAHl95W7MvTCDBbprbKGYhZIiaQG1X/CM6Dx4gvbm5bwIz5XqAcbUV9UV66eZjhUtlLjr8lQ8ZutjlwSBh7YrCWuj/DjPmlRt4/Pr2cikJ3UkMC8dNXRrtTU+8gxCSB5ce03s1SYwQBcmxyakzg0xDrFPmdniYsoc1x5eQKWJidiFH+bONS87DSVhMmCAOSVYbxYV/t5SdnjVHyx4QFbXtlr3kY2TgKI5x81No43c9KOVKRrduuI7/lUxWLklY+dF/MGFWNcGNcX/gswGPBff3zUg4rwAlDwmI4D9r2+8XXR026XEBXrpMnxsJXAP5RjerUrrwlLG9vxx3wRPC5/yCBfFjXo5HDst20h8qq+xp4GKuXX2t/dKOWJpWpVrIS0ac33ynGu3ZrtNJW6+bSkax3GGCEmJV97ez2souBIbxiM/yXd2/WdGhw/qejxo+utzcOs/Q+iAnHQTKdMO8DQzYUVD7hfgop4F/jF16jG+TevfgUAAAAAElFTkSuQmCC"
              alt=""
          /></span>
        </div>
      </div>
      <div class="hotbox">
        <ul class="hot">
          <li
            v-for="(item, index) in searchHotWords.slice(0, 8)"
            :key="index"
            @click="clicksearch(item.word)"
          >
            {{ item.word }}
          </li>
        </ul>
      </div>
    </div>
    <div class="tips" v-else>
      <div class="ulbox">
        <ul>
          <li
            v-for="(item, index) in searchtips"
            :key="index"
            @click="$router.push('/book/' + item._id)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import HomeHeadercurr from "../components/HomeHeadercurr.vue";
export default {
  data() {
    return {
      msg: "",
      searchHotWords: [],
      
      searchtips: [],
    };
  },
  components: {
    HomeHeadercurr,
  },
  created() {
    this.axios.get("http://novel.kele8.cn/search-hotwords").then((res) => {
      this.searchHotWords = res.data.searchHotWords.slice(0, 50);
    });
  },
  methods: {
    onSearch() {
        console.log(123123213123)
      this.$emit("update:search",this.searchtips)
      if(this.msg!=""){
          this.$router.push('/searchinfo')

      }
    },
    clicksearch(word) {
        this.msg=word
      this.axios
        .get(`http://novel.kele8.cn/search?keyword=${word}`)
        .then((res) => {
          this.searchtips = res.data.books.slice(0, 10);
        });
    },
    searchfocus() {
      console.log(123123);
      this.axios
        .get(`http://novel.kele8.cn/search?keyword=${this.msg}`)
        .then((res) => {
          this.searchtips = res.data.books.slice(0, 10);
        });
    },
    changeit() {
      console.log(this.searchHotWords);
      this.searchHotWords.sort(function () {
        return Math.random() - 0.5;
      });
    },
  },
  watch: {
    msg: function (n) {
      if (n == "") {
        this.searchtips = [];
      }
    },
  },
};
</script>

<style lang="less">
.van-search__action {
  margin-right: 5px;
  color: #748389;
  font-size: 15px;
}
.van-search__action:active {
  background: transparent;
}
.searchcommendbox {
  width: 100%;
  background: #fff;
  .searchcommend {
    width: 90%;
    height: 30px;
    background: #ffffff;
    margin: 0 auto;

    .title {
      .recomtitle {
        float: left;
        line-height: 30px;
        font-size: 22px;
        color: #797b79;
      }
      .changeother {
        float: right;
        line-height: 30px;
        font-size: 12px;
        color: #8a8a8f;
        img {
          width: 15px;
          vertical-align: -3px;
        }
      }
    }
  }
  .hotbox {
    width: 90%;
    margin: 0 auto;
    .hot {
      li {
        font-size: 13px;
        border-radius: 12px;
        margin: 8px 0;
        margin-left: 10px;
        padding: 3px 10px;
        display: inline-block;
        background: #eee;
        &:nth-child(1) {
          margin-left: 0px;
        }
      }
    }
  }
}
.tips {
  width: 100%;
  background: #ffffff;
  .ulbox {
    width: 90%;
    margin: 0 auto;
    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>