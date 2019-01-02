
<template>
  <div class="friends">
   
      <div class="f-person">
         <div class="p-img">
            <img :src="imgUrl" alt="">
         </div>
         <div class="p-name">
           <p class="name">{{name}}</p>
           <p class="company" >{{compang}}</p>
           <p class="start s-top">打卡始于<span class="p-ye">{{pushStart}}</span>,持续打卡于<span class="p-ye">{{pushEnd}}</span>,</p>
           <p class="start">  日精进打卡第天<span class="p-ye">{{time}}</span>天,共打卡<span class="p-ye">{{total}}</span>次,缺卡<span class="p-ye" >{{que}}</span>次</p>
         </div>
      </div>
      <div class="f-content" v-for="( item, index ) in list" :key="index">
          <!-- <v-clock :item="item" v-for="( item, index ) in list" :key="index"></v-clock> -->
          <div class="c-img">
              <img :src="item.user.imgUrl" alt="">
          </div>
          <p class="c-name"><span class="fc-n">{{item.user.name}}</span>-{{item.user.company}}</p>
          <div class="c-content" :class="{'active': item.fullTxt=='收起'}">
              <p class="c-time"><span>{{item.pushd}}</span>打卡第{{item.pushCount.pushADays}}天</p>
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
                      <p class="title">【祝愿】</p>
                      <p class="c-color">{{item.volunteer}}</p>
                  </template>
              </div>
          </div>
          <h5 class="full" @click="fullClick(index)" v-if="item.classic||(item.practice.character!=''&&item.practice.family!=''&&item.practice.work!='')||item.introspective||item.thanks||item.volunteer">{{item.fullTxt}}</h5>
          <div class="c-func">
              <div class="c-zan" @click="isPariseFn(index)">
                  <span class="iconfont icon-jl"></span>
                  <span v-if="item.isParise" style="color:#E60012">已赞</span>
                  <span v-else>點赞</span>
              </div>
              <div class="c-zan">
              <span class="iconfont icon-jl"></span>
                  <span>详情</span>
              </div>
          </div>
          <div class="laudBox" v-if="item.praise.length!=0" >
            <span class="iconfont icon-jl"></span>
            {{item.praise.join(',')}}
          </div>
      </div>
  </div>  
</template>
<script>
import { User,Friends,Parise } from '@/api/index'
// import clocklist from '@/components/clockList';
export default {
  data () {
    return {
       show:true,
       name: '',
       imgUrl: '', 
       compang: '',
       pushStart: '',
       pushEnd: '',
       total: '',
       time: '',
       que: '',
       pushd: '',
       pushDays: '',
       list: [] ,
       isScroll:true,
       noGet:false,
       pageList: {total: '',pageNo:1,pageSize:2},
    }
  },
  watch:{

  },
  components:{
    // 'v-clock':clocklist
  },
  methods: {
    gainUser() {
       User({}).then( res => {
          this.name = res.data.name
          this.imgUrl = res.data.imgUrl
          this.compang = res.data.company
          this.pushStart = res.data.pushStart
          this.pushEnd = res.data.pushEnd
          this.total = res.data.total
          this.time = res.data.pushDays
          this.que = res.data.lostCount
       })
    },
    gainList() {
      let that=this;
       Friends({pageNo:that.pageList.pageNo,pageSize:that.pageList.pageSize}).then( res => {
         console.log(res);
          //  that.list = res.data.list;
           that.isScroll=true;
          if(res){
	        		if(that.pageList.pageNo>1){
        				that.list = that.list.concat(res.data.list);
        				that.pageList.total = res.data.total;
        			}else{
                that.list = res.data.list;
                that.pageList.total = res.data.total;
              }
              if(res.data.total==that.list.length||that.list.length<that.pageList.pageSize){
                that.noGet=true;//如果返回总条数等于当前list长度
              }
	        }
          that.list.forEach(el => {
            el.isFull=false;
            el.fullTxt='全文'
          });
       })
    },
    fullClick(i){
      let obj=this.list[i];
      if(obj.fullTxt=='收起'){
        obj.isFull=false;
        obj.fullTxt='全文';
      }else{
        obj.isFull=true;
        obj.fullTxt='收起';
      }
      this.$set(this.list,i,obj);
    },
    isPariseFn(i){
      if(this.name==''){
        return false
      }
      let id=this.list[i].pkid;
      let that=this;
      Parise({logId:id}).then(res =>{
        if(res.msg=='操作成功'){
          let obj=that.list[i];
          if(that.strInArr(obj.praise)){
            obj.praise.push(that.name);
          }
          that.$set(that.list,i,obj);
        }
      })
    },
    sh(){
			let bodyScrollHeight = 0
			let documentScrollHeight = 0
			if (document.body) {
				bodyScrollHeight = document.body.scrollHeight
			}
			if (document.documentElement) {
				documentScrollHeight = document.documentElement.scrollHeight
			}
			return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
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
    //监听滚轮
      scrollgun(){
        let getSt=document.documentElement.scrollTop || document.body.scrollTop,
          getWh=document.documentElement.clientHeight || document.body.clientHeight;
        let scrollBottom=this.sh()-(getSt+getWh),//滚动条距离底部距离
          rem=parseInt(window.getComputedStyle(document.documentElement)["fontSize"]),
          h=20;
        if(this.noGet){
          return false
        }
        if(!this.isScroll){
          return false
        }
        if(scrollBottom<h){
          this.isScroll=false;
          this.pageList.pageNo+=1;
          this.gainList();
        }
      },
  },
  created () {
    this.gainUser();
    this.gainList();
  },
  components: {
    
  },
  mounted(){
    window.addEventListener('scroll',this.scrollgun,true);
  },
  destroyed() {
		window.removeEventListener('scroll',this.scrollgun,true);
        // console.group('销毁完成状态===============》destroyed');
  },
}
</script>
<style lang='less' >
.friends {
  background: #fff;
  padding-top: 25px;
  .f-person {
     width: 710px;
     height: 241px;
     background:linear-gradient(0deg,rgba(230,33,41,1) 0%,rgba(255,85,1,1) 100%);
     border-radius: 10px;
     margin: 0 auto;
     padding: 56px 0 0 27px;
     box-sizing: border-box;
     .p-img {
        height: 129px;
        width: 129px;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
        margin-right: 15px; 
        float: left;
        img {
          width: 100%;
        }
     }
     .p-name {
        width: 500px;
        float: left;
        .name {
           color: #fff;
           font-size: 36px;
        }
        .company {
           color: #fff;
           font-size: 28px;
        }
        .start {
          color: #DDD;
          font-size: 20px;
          margin-top: 4px;
        }
        .s-top {
          margin-top: 10px;
        }
        .p-ye {
          color: #FFEE31;
        }
     }
  }
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
         padding-left: 1em
       }
     }
     }
     .laudBox{
       background: #F5F5F5;
       padding: 20px;
       margin-top: 75px;
       border-radius: 10px
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
          align-content: center
        }
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
    

  }
  .nav-b {
    height: 100px;
    width: 100%;
    border: 1px solid red;
    position: fixed;
    left: 0;
    bottom: 0;
  }

</style>
