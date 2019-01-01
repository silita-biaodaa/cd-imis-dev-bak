<template>
  <div class="bar" >
    <router-view class="nav" ></router-view>
    <div class="bar-b">
       <van-row class="bar-l">
          <van-col span="5" class="bar-c">
            <router-link to='friend' >
                <span class="icon-c2b0f66c7627"></span>
                 <div class="bar-s">朋友圈</div> 
            </router-link>
          </van-col>
          <van-col span="5">1111</van-col>
          <van-col span="5">
             <router-link to='card'>
                 打卡
             </router-link>
          </van-col>
          <van-col span="5">11</van-col>
          <van-col span="4">11</van-col>

        </van-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  components: {
  }
}
</script>
<style lang="less" >
@import "../assets/icon/style.css";
.bar {
  .nav {
    height: calc(100% - 100px);
  }
  .bar-b {
    background: #fff;
    height: 100px;
    width: 100%;
    // border: 1px solid red;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .bar-c {
    text-align: center;
  }
  .bar-l {
    box-sizing: border-box;
    padding: 19px 0  9px  0;
    line-height: 100px;
  }
  .bar-down {
    color:#999;
    display: flex;
    flex-direction:'column';
  }
}

</style>
