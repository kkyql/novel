<template>
  <div>
    <HomeHeadercurr>
      <span
        slot="headercurrtitle"
        style="color: #fff; font-size: 14px; font-weight: 600"
        >搜索详情</span
      >
    </HomeHeadercurr>
    <div class="bookdetailimgkk"  v-for="(item,index) in search" :key="index" @click="$router.push('/book/' + item._id)">
      <van-card
        :thumb="`http://statics.zhuishushenqi.com${item.cover}`"
      />
      <div class="bookdetailtitlekk">
        <span>{{item.title}}</span>
      </div>
      <div class="bookdetailbottomkk">
        <p class="detailauthorkk">{{item.author}}<span>&nbsp;&nbsp;|</span></p>
        <span class="detailcatkk">&nbsp;&nbsp;{{item.cat}}</span>

        <div><p class="detailupdatedkk">{{item.shortIntro}}</p></div>

        
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeadercurr from "../components/HomeHeadercurr.vue";
export default {
  props: ["search"],
  components: {
    HomeHeadercurr,
  },
};
</script>

<style lang="less">
.bookdetailimgkk {
  position: relative;
  background:#f5f2ed;
//   border-bottom: 1px solid #ccc;
  .van-image {
    img {
      width: 65px;
      height: 88px;
      border: none;
      border-radius: 0px;
    }
  }
  .bookdetailtitlekk {
    width: 70%;
    // background: red;
    position: absolute;
    top: 8px;
    left: 90px;
    span {
      font-size: 16px;
    }
  }
  .bookdetailbottomkk {
    // float: left;
    width: 70%;

    // background: red;
    position: absolute;
    top: 34px;
    left: 90px;

    .detailauthorkk {
      font-size: 12px;
      color: #999;
      float: left;
      margin-right: 5px;
      margin: 0px 0px;
      padding-right: 13px;
      span {
        padding-left: 8px;
        color: #999;
      }
    }
    .detailcatkk {
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
    .detailwordcountkk {
      margin: 0px 0px;
      font-size: 12px;
      color: #999;
    }
    .detailupdatedkk {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
      margin-bottom: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

    }
  }
}
</style>