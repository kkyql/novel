<template>
  
    <li class="list-item" @click="$router.push('/book/' + book._id)">
      <van-card
        :lazy-load="true"
        :thumb="`http://statics.zhuishushenqi.com${book.cover}`"
        title="123"
        :desc="book.shortIntro"
      />
      <div class="updateStatus">
        <span>{{ book.title }}</span>
        <p v-if="!book.allowMonthly" style="background-color: #b93321">连载</p>
        <p v-else style="background-color: green">完结</p>
      </div>
      <div class="listbottom">
        <p class="minorCate">{{ book.minorCate }}&nbsp;&nbsp;|</p>
        <span class="retentionRatio">{{ book.retentionRatio }}</span>
        <p class="renqi">人气</p>
        <span class="majorCate">{{ book.majorCate }}</span>
      </div>
      <hr class="linehr" />
    </li>
   
 
</template>

<script>
export default {
  props: ["book"],
};
</script>

<style lang="less">
.list-item {
  list-style: none;
  position: relative;
  .updateStatus {
    position: absolute;
    // width: 70%;
    // background: red;
    top: -4px;
    left: 85px;
    span {
      font-size: 14px;
      margin-right: 5px;
      max-width: 73%;
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    p {
      // position: absolute;
      //  float: left;
      display: inline-block;
      color: #fff;
      font-size: 11px;
      font-style: normal;
      padding: 0px 1px;
      border-radius: 4px;
    }
  }

  .listbottom {
    position: absolute;
    // background: red;
    top: 67px;
    left: 83px;
    width: 70%;

    // background: red;

    .minorCate {
      font-size: 11px;
      color: #666666;
      float: left;
      // margin-right: 5px;
      margin-top: 0;
      margin-bottom: 0;
    }
    .retentionRatio {
      float: left;
      font-size: 13px;
      //  margin-right: 5px;
      margin-left: 5px;
      margin-top: 1px;
      color: #b93321;
    }
    .renqi {
      font-size: 11px;
      color: #666666;
      float: left;
      margin-top: 0;
      margin-bottom: 0;
    }
    .majorCate {
      float: right;
      font-size: 9px;
      color: #ff8400;
      border: 1px solid #ff8400;
      border-radius: 3px;
      padding-left: 1px;
    }
  }
  .linehr {
    position: absolute;
    width: 70%;
    height: 1px;
    border: none;
    top: 90px;
    left: 85px;
    // color: #dddddd;
    background-color: #dddddd;
  }
  .van-card {
    background-color: #ffffff;
    .van-card__thumb {
      width: 60px;
      height: 80px;
      img {
        border-radius: 0;
      }
    }
    .van-card__content {
      .van-card__title {
        font-size: 15px;
        opacity: 0;
      }
      .van-card__desc {
        max-height: 40px;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #999999;
        font-size: 12px;
      }
    }
  }
}
</style>