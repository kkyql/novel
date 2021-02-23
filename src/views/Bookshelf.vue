<template>
  <div>
    <HomeHeadercurr>
      <span
        slot="headercurrtitle"
        style="color: #fff; font-size: 14px; font-weight: 600"
        >我的书架</span
      >
    </HomeHeadercurr>
    <div style="weight:100%;height:45px;background:#f4f4f4;" class="comtitle">共{{bookrack.length}}本向右滑动可移除哦~</div>
    <div class="bookshelfinfo" v-for="(item,index) in bookrack" :key="index">
      <van-swipe-cell >
        <van-card
          
          @click="$router.push('/book/' + item._id)"
          :title="`${item.title}`"
          :desc="`当前阅读到第${zjurl(item._id)+1}章`"
          class="goods-card"
          :thumb="`http://statics.zhuishushenqi.com${item.cover}`"
        />
        <!-- <span class="zhangjie">{{zjurl(item._id)}}</span> -->
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="removeBookrack(item)"/>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations} from "vuex";
import HomeHeadercurr from "../components/HomeHeadercurr";
export default {
  data(){
      return{
        zjkk:this.zjurl()
      }
  },
  
  created(){
    console.log(this.zjurl())
    // let pageid = this.bookrack.forEach(element => {
    //   return element._id
    // });
    // console.log(pageid)
    // console.log(JSON.parse(window.localStorage.getItem("page")))
  },
  components: {
    HomeHeadercurr,
  },
  computed: {
    ...mapState(["bookInfo", "bookrack"]),
  },
  methods:{
    ...mapMutations(["addBookrack", "removeBookrack"]),
    // removeshelf(id){
    //   console.log(id)
    // }

    zjurl(kk){
        return  Number(window.localStorage.getItem(kk))
    }
  }
};
</script>

<style lang="less">
.comtitle{
  line-height: 45px;
  color: #999;
  font-size: 12px;
  margin-left: 20px;
}
.van-card__title{
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
}
.goods-card {
    margin: 0;
    // background-color: #ffffff;
  }
.van-card__desc{
  font-size: 12px;
  color: #999;
}

  .delete-button {
    height: 100%;
  }
  .van-image{
    width: 58px;
    
  }
  .van-card__thumb img{
    border-radius: 0px;
    height: 78px;
  }
  .van-card__thumb{
      width: 58px;
      margin-right: 10px;
  }
  .van-swipe-cell__wrapper{
    border-bottom: 1px solid#e5e5e5;
    // margin-bottom: 10px;
  }

</style>