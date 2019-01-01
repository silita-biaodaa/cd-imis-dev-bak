
<template>
  <div class="friends">
   
      <div class="f-person">
         <div class="p-img">
            <img :src="this.imgUrl" alt="">
         </div>
         <div class="p-name">
           <p class="name">{{this.name}}</p>
           <p class="company" >{{this.compang}}</p>
           <p class="start s-top">打卡始于<span class="p-ye">{{this.pushStart}}</span>,持续打卡于<span class="p-ye">{{this.pushEnd}}</span>,</p>
           <p class="start">  日精进打卡第天<span class="p-ye">{{this.time}}</span>天,共打卡<span class="p-ye">{{this.total}}</span>次,缺卡<span class="p-ye" >{{this.que}}</span>次</p>
         </div>
      </div>
      <div class="f-content" v-for="( item, index ) in list" :key="index">
          <div class="c-img">
             <img :src="item.user.imgUrl" alt="">
          </div>
          <div class="c-content">
              <p class="c-name"><span class="fc-n">{{item.user.name}}</span>-{{item.user.company}}</p>
              <p class="c-time">{{item.pushd}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp打卡第{{item.pushCount.pushADays}}天</p>
              <div class="c-text" > 
                  <p>【知～学习】</p>
                  <div v-for="(el,index) in item.books" :key="index">
                    <p class="c-color">《{{el.title}}》{{el.readCount}}遍 共{{el.readTotal}}遍</p>                  
                  </div>
                  <p>【经典名句分享】</p>
                  <p>【行～实践】</p>
              </div>
          </div>
          <div class="c-func">
              <div class="c-zan">
                 <img src="../assets/img/zan (2).png" alt="">
                 <span>赞</span>
              </div>
              <div class="c-zan c-r">
                 <img src="../assets/img/sh (2).png" alt="">
                 <span>详情</span>
              </div>

          </div>
          <div class="c-list" v-show=item.show >
             <img src="../assets/img/zan (2).png" alt="">
             <p>{{item.praises}}</p>
          </div>
      </div>
  </div>  
</template>
<script>
import { User,Friends } from '@/api/index'
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
       list: [] 
    }
  },
  methods: {
    gainUser() {
       User({}).then( res => {
          console.log(res,1)
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
       Friends({pageNo:'1',pageSize:'4'}).then( res => {
           console.log(res)
           this.list = res.data.list
           this.list.forEach(el => {
              if(el.praise.length >= 1 ) {
                 el.praises = el.praise.join(',')
                 el.show = true
              } else {
                 el.show = false
              }
           });
           console.log(this.list)
       })
    }
  },
  created () {
    this.gainUser()
    this.gainList()
  },
  components: {
    
  }
}
</script>
<style lang='less' >

.friends {
  background: #F5F5F5;
  padding-top: 25px;
  .f-person {
     width: 710px;
     height: 241px;
     background: #E62129;
     border-radius: 10px;
     margin: 0 19px;
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
    background: #fff;
     padding: 37px;
     .c-img {
        height: 83px;
        overflow: hidden;
        width: 83px;
        background: red;
        border-radius: 50%;
        margin-right: 40px;
        float: left;
     }
     .c-content {
        float: left;
        overflow: hidden;
        clear: both;
         .c-name {
        color :#010101;
        font-weight: 500;
        font-size: 36px;
        .fc-n {
          color: #633B1E; 
        }
     }
     .c-time {
       color: #ccc;
       font-size: 24px;
       margin-top: 15px;
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
     .c-func {
        margin-top: 100px;
        margin-bottom: 39px;
        float: right;
        width: 300px;
        color: #999;
        font-size: 28px;
        .c-zan {
          float: left;
          img {
             height: 29px;
             width: 34px;
             margin-right: 7px;
          }
        }
        .c-r {
          float: right;
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
  .icon-c2b0f66c7627:before {
  content: "\e900";
}
}
</style>
