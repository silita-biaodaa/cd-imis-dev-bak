<!-- 模型： DOM 结构 -->
<template>
  <div class="clock">
    <div class="f-content" v-for="( item, index ) in clocklist" :key="index">
      <!-- <v-clock :item="item" v-for="( item, index ) in list" :key="index"></v-clock> -->
      <div class="c-img">
        <img :src="item.user.imgUrl" alt="">
      </div>
      <p class="c-name"><span class="fc-n">{{item.user.name}}</span>-{{item.user.company}}</p>
      <div class="c-content" :class="{'active': item.fullTxt=='收起'}">
        <p class="c-time"><span>{{item.pushd}}</span>打卡{{item.pushCount.putCount}}次</p>
        <div class="c-text" >
          <!-- 知 学习 -->
          <p class="title">【知～学习】</p>
          <div v-for="(el,index) in item.books" :key="index">
            <p class="c-color">《{{el.title}}》{{el.readCount}}遍 共{{el.readTotal}}遍</p>
          </div>
          <!-- 经典名句 -->
          <template v-if="item.classic">
            <p class="title">【经典名句分享】</p>
            <p class="c-color">{{item.classic}}</p>
          </template>
          <!-- 行 实践 -->
          <template v-if="item.practice.character!=''&&item.practice.family!=''&&item.practice.work!=''">
            <p class="title">【行～实践】</p>
            <template v-if="item.practice.character!=''">
              <h5>一、修身：（对自己个人）</h5>
              <p class="c-color">{{item.practice.character}}</p>
            </template>
            <template v-if="item.practice.family!=''">
              <h5>二、齐家：（对家庭和家人）</h5>
              <p class="c-color">{{item.practice.family}}</p>
            </template>
            <template v-if="item.practice.work!=''">
              <h5>三、建功：（对工作）</h5>
              <p class="c-color">{{item.practice.work}}</p>
            </template>
          </template>
          <!-- 积善 -->
          <p class="title">【积善】</p>
          <p class="c-color">发愿从{{item.pushCount.bonaStart}}起{{item.pushCount.years}}年内{{item.pushCount.bonaCount}}善事。今日{{item.pushCount.bonaDays}}善，累计{{item.pushCount.bonaTotal}}善</p>
          <!-- 省 觉悟 -->
          <template v-if="item.introspective">
            <p class="title">【省～觉悟】</p>
            <p class="c-color">{{item.introspective}}</p>
          </template>
          <!-- 感谢 -->
          <template v-if="item.thanks">
            <p class="title">【感谢】</p>
            <p class="c-color">{{item.thanks}}</p>
          </template>
          <!-- 祝愿 -->
          <template v-if="item.volunteer">
            <p class="title">【志愿】</p>
            <p class="c-color">{{item.volunteer}}</p>
          </template>
        </div>
      </div>
      <h5 class="full" v-if="item.classic||(item.practice.character!=''&&item.practice.family!=''&&item.practice.work!='')||item.introspective||item.thanks||item.volunteer">
        <span @click="fullClick(index)">{{item.fullTxt}}</span>
      </h5>
      <div class="c-func">
        <div class="c-zan">
          <template v-if="item.isParise">
            <span class="icon pickZ"></span>
            <span  style="color:#E60012">赞</span>
          </template>
          <template v-else>
            <span class="icon pickZan"></span>
            <span @click="isPariseFn(index)">赞</span>
          </template>

        </div>
        <div class="c-zan">
          <span class="icon icon-fx"></span>
          <span>详情</span>
        </div>
      </div>
      <div class="laudBox" v-if="item.praise.length!=0" >
        <span class="icon pickZan"></span>
        {{item.praise.join(',')}}
      </div>
    </div>
  </div>
</template>
<script>
  import { Parise } from '@/api/index'
  export default {
    name: 'clock', // 结构名称
    data() {
      return {
        // 数据模型
      }
    },
    props: {
      // 集成父级参数
      clocklist:{
        type:Array
      },
      name:{
        type:String,
        default:sessionStorage.getItem('userName')
      }
    },
    methods: {
      // 方法 集合
      fullClick(i){
        let obj=this.clocklist[i];
        if(obj.fullTxt=='收起'){
          obj.isFull=false;
          obj.fullTxt='全文';
        }else{
          obj.isFull=true;
          obj.fullTxt='收起';
        }
        this.$set(this.clocklist,i,obj);
      },
      isPariseFn(i){
        if(this.name==''){
          return false
        }
        let id=this.clocklist[i].pkid;
        let that=this;
        Parise({logId:id}).then(res =>{
          if(res.msg=='操作成功'){
          let obj=that.clocklist[i];
          obj.isParise=true;
          if(that.strInArr(obj.praise)){
            obj.praise.push(that.name);
          }
          that.$set(that.clocklist,i,obj);
        }
      })
      },
      strInArr(arr){
        if(arr.length==0){
          return true
        }
        for(let x of arr){
          if(x==this.name){
            return false
          }else{
            return true
          }
        }
      },
    }

  }

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
  .f-content{
    overflow: hidden;
    padding: 37px;
    padding-left: 159px;
    border-bottom: 16px solid #F5F5F5;
    position: relative;
    .full{
      margin-top: 34px;
      color: #E62129;
      font-size: 28px
    }
    .c-img {
      height: 83px;
      width: 83px;
      position: absolute;
      background: red;
      border-radius: 50%;
      top: 37px;
      left: 37px;
      img{
        width: 100%;
        border-radius: 50%
      }
    }
    .c-name {
      color :#010101;
      font-weight: 500;
      font-size: 36px;
      .fc-n {
        color: #633B1E;
      }
    }
    .c-content {
      overflow: hidden;
      height: 285px;
    }
    .c-content.active{
      height:auto;
      .title{
        line-height: 2.8
      }
      .c-text{
        margin-top: 14px;
      }
    }
    .c-time {
      color: #ccc;
      font-size: 24px;
      margin-top: 5px;
      span{
        margin-right:55px;
      }
    }
    .c-text {
      color: #000;
      font-size: 28px;
      color: #000;
      font-weight: 400;
      margin-top: 34px;
      .c-color {
        color:#999;
      }
    }
  }
  .laudBox{
    background: #F5F5F5;
    padding: 20px;
    margin-top: 75px;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .c-func {
    // margin-top: 100px;
    // margin-bottom: 39px;
    float: right;
    width: 300px;
    color: #999;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .iconfont{
      margin-right: 7px
    }
    .c-zan{
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .icon{
    width: 34px;
    height: 29px;
    margin-right: 8px;
  }
  .pickZ{
    background: url("../assets/img/z.png");
    background-size: cover;
  }
  .pickZan{
    background: url("../assets/img/zan.png");
    background-size: cover;
  }
  .icon-fx{
    background: url("../assets/img/fx.png");
    background-size: cover;
  }
  .c-list {
    float: right;
    height: 66px;
    width: 555px;
    line-height: 66px;
    background: #fff;
    margin-bottom: 37px;
    box-sizing: border-box;
    position: relative;
    padding-left: 24px;
    img {
      height: 25px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      margin-right: 22px;
    }
    p {
      padding-left: 50px;
      color:#633B1E;
      font-size: 28px;
    }
  }


</style>
