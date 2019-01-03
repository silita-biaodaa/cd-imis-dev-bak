<template>
  <div class="bar" >
    <router-view class="nav" ></router-view>
    <div class="bar-b">
      <ul>
        <li v-for="(o,i) of navList" :key="i">
          <router-link :to="o.to">
            <span :class="o.className"></span>
            <div class="bar-s">{{o.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        navList:[
          {
            name:'打卡圈',
            className:'icon-dkq',
            to:'friend'
          },{
            name:'记录',
            className:'icon-jl',
            to:'record'
          },{
            name:'打卡',
            className:'icon-dk',
            to:'card'
          },{
            name:'群组',
            className:'icon-qz',
            to:'group'
          },{
            name:'设置',
            className:'icon-sz',
            to:''
          }
        ]
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
      min-height: calc(100vh - 100px);
      padding-bottom: 100px
    }
    .bar-b {
      background: #fff;
      height: 100px;
      width: 100%;
      // border: 1px solid red;
      position: fixed;
      left: 0;
      bottom: 0;
      ul{
        display: flex;
        li{
          width: 20%;
          line-height:50px;
          text-align: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-sizing: border-box;
        }
      }
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
