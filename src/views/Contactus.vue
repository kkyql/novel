<template>
  <div>
     <HomeHeadercurr>
       
          <span slot="headercurrtitle" style="color:#fff;font-size:14px;font-weight:600">联系我们</span>
       
     </HomeHeadercurr>
     <div class="contusCard">
        <span>在线官方客服</span>
        <p>联系方式：请用微信客户端扫描下方二维码</p>
        <img src="../assets/qrcode.jpg" alt="">
        <p class="phoneNum">客服电话：020-88888888</p>
     </div>
  </div>
</template>

<script>
import HomeHeadercurr from "@/components/HomeHeadercurr.vue";
export default {
  components:{
    HomeHeadercurr,
  }


}
</script>

<style lang='less'>
body{
  background:#eaeaea ;
}
.contustitle{
  color:#ffffff;
  font-size: 14px;
  font-weight: 600;

}
.contusCard{
text-align: center;
  width: 100%;
  height: 400px;
  background: #f2f2f2;
  span{
    display: block;
    margin-top: 20px;
    color: #cab389;
    font-size: 20px;
    font-weight: 600;
  }
  p{
    font-size: 12px;
  }
  .phoneNum{
      font-size: 20px;
      color: #666666;
      font-weight: 600;
  }
  img{
    width: 35%;
  }
}

</style>