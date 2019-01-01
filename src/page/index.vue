<template>
   <div class="home">
      <div class="person"> 
         <div class="person-top">
             <div class="img-post img-book">
               <img src="../assets/img/book3.png" alt=""> 
             </div>
            <span class='home-size'>个人信息</span>
         </div>
         <div class="person-put">
           <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
             <x-input title='姓名' v-model='username' placeholder='请输入您的姓名' placeholder-align='right' text-align='right' class="cc" ></x-input>
           </div>
            <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
            <x-input title='手机' v-model='mobile' placeholder='请输入您的联系方式' placeholder-align='right'  text-align='right' class="cc" type='tel' ></x-input>
           </div>
           <x-input title='企业' v-model='company' placeholder='请输入您的企业名称' placeholder-align='right' text-align='right' class="cc" ></x-input>
           <x-input title='职位' v-model='post' placeholder='请输入您的职位名称' placeholder-align='right' text-align='right' class="cc" ></x-input>
         </div> 
      </div>
      <div class="time">
        <div class="time-top">
           <div class="img-post img-time">
            <img src="../assets/img/time (3).png" alt=""> 
           </div>
           <span class='home-size' >打卡时间</span>
        </div>
        <div class="time-put">
          <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
            <datetime title='打开始于时间' v-model="tiems" placeholder='请选择' class="cc" ></datetime>
            <!-- <div class="l-put">
             <div class="label">打开始于时间:</div> <input type="text" placeholder="请输入用户姓名" @click="openPicker" v-model="tiems" >
            </div> -->
           </div>
        </div>
        <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
             <x-input title='打卡次数' v-model='count' placeholder='请输入打开次数' type='tel' placeholder-align='right' text-align='right' class="cc" ></x-input>
           </div>
      </div>

      <div class="add">
        <div class="add-top">
           <div class="img-post img-time">
            <img src="../assets/img/buuk (2).png" alt="">              
           </div>
           <span  class='home-size' >知学习</span>
        </div>
        <div class="add-put" v-for="(item,index) in first" :key="index">
           <div class="add-book">
             <span>书本&nbsp({{index + 1}})</span>
             <span class="del" @click='delbook(index)' v-show='func(index)'>删除</span>
            </div> 
           <div class="left">
              <div class="sign "> 
                <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='书本名称' v-model='item.title' placeholder='请输入书本名称' placeholder-align='right' text-align='right' class="cc" ></x-input>
              </div>
              <div class="sign"> 
                 <div class="card-com">
                   <div class="l-pu">
                        <div class="label label-f">今日朗读遍数</div> 
                        <van-stepper  v-model.number="item.readCount" class="l-mi" :min="0" />                    
                   </div>
                </div>
                <!-- <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='每日诵读遍数' v-model='item.readCount' placeholder='请输入' placeholder-align='right' text-align='right' type='tel' class="cc" ></x-input> -->
              </div>
              <div class="sign" > 
                <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='总朗读遍数' v-model='item.readTotal' placeholder='请输入' placeholder-align='right' text-align='right' type='tel' class="cc" ></x-input>
              </div>
           </div>
           
        </div>
        <div class="add-b" @click='addbook'>
           <x-button class="sign">增加书本</x-button>
           <span class="add-img"><img src="../assets/img/add (2).png" alt=""></span>
        </div>
      </div>

      <div class="well">
        <div class="well-top">
          <div class="img-post img-time">
           <img src="../assets/img/gift (2).png" alt=""> 

          </div>
           <span  class='home-size' >积善行</span>
        </div>
        <div class="well-put">
            <datetime title='积善开始时间' v-model="begin" placeholder='请选择' text-align='right' class="cc" ></datetime>
            <datetime title='积善结束时间' v-model="end" placeholder='请选择' text-align='right'  class="cc"></datetime>
             <!-- <x-input title='每日积善件数' v-model='number' placeholder='请输入' placeholder-align='right' text-align='right' type='tel'  class="cc"></x-input> -->
             <div class="card-com">
                   <div class="l-pu">
                        <div class="label label-f">每日积善件数</div> 
                        <van-stepper  v-model.number="number" class="l-mi" :min="0" />                    
                   </div>
            </div>
             <x-input title='累计积善件数' v-model='alls' placeholder='请输入' placeholder-align='right' text-align='right' type='tel' class="cc"  ></x-input>
        </div>
      </div>
      <div class="volunteer">
        <div class="volunteer-top">
          <div class="img-post img-time" >
            <img src="../assets/img/star (2).png" alt=""> 
          </div>
           <span  class='home-size' >立志愿</span>
        </div>
        <div class="volunteer-put">
            <x-textarea placeholder='请输入您的志愿' :rows='4' v-model="values" class="ccc" :autosize='true' ></x-textarea>
        </div>
        <div class="btn" @click='record'>
           <x-button  >提交</x-button>
        </div>
      </div>
      <mt-datetime-picker
          ref="picker"
          type="date"
          v-model="pickerValue">
      </mt-datetime-picker>
   </div>
</template>
<script>
import  util  from '../util/util'
import { recordBook } from "@/api/index";
import { dateFormat } from 'vux'
export default {
  data () {
    return {
      username: '',
      company: '',
      post: '',
      mobile: '',
      tiems: '',
      count: '',
      begin: '',
      end: '',
      number: 0,
      alls: '',
      values: '',
      first: [{title:'《六项精进》',readCount:0}],
      pass: true,
      pickerValue: ''
    }
  },
  methods: {
    addbook () {
       this.first.push({})
    },
    delbook (i) {
      this.first.splice(i,1)
    },
    getTime () {
       this.tiems = dateFormat(new Date(), 'YYYY-MM-DD')
       this.begin = dateFormat(new Date(), 'YYYY-MM-DD')
    },
    func (index) {
       if (index == 0) {
          return false 
       } else {
          return true
       }
    },
    record () {
      
      this.pass = true;
      
        if(!this.username) {
          this.pass = false
           return this.$vux.alert.show({
                  title: '请输入必填选项',
                  content: '请输入您的姓名',
                })
        } ;
         if (!this.mobile) {
           this.pass = false
          return this.$vux.alert.show({
                  title: '请输入必填选项',
                  content: '请输入手机号',
                })
        } ;
            this.first.forEach( el => {
              var arr = Object.keys(el)
               if( el == {} || arr.length !== 3 ) {
                  this.pass = false;
                     return  this.$vux.alert.show({
                          title: '请输入必填选项',
                          content: '请填写或者删除多余空白书本',
                   })
               } 
            }
            
            );
    
      if ( this.pass ) {
           console.log(11111)
           recordBook({name: this.username, phone: this.mobile, company: this.company, post: this.post, pushStart: this.tiems,total: this.count, bonaStart: this.begin, bonaEnd: this.end, bonaCount: this.number, bonaTotal: this.alls, volunteer: this.values, books: this.first}).then( res => {
               if(res.code == 1) {
                 console.log(res,191)
                 this.$router.replace({path:'nav/card'})
               }
            })
        }
      
    },
    openPicker() {
        this.$refs.picker.open();
      },
  },
   watch:{
    pickerValue(val) {
       this.tiems = util.itcTiem(this.pickerValue)
    },
    tiems(val) {
        var s1 = new Date(val.replace(/-/g, "/"));
        var s2 = new Date();//当前日期
        var days = s2.getTime() - s1.getTime();
        this.count = parseInt(days / (1000 * 60 * 60 * 24));
    }
  },
  created () {
    this.getTime()
  },
  components: {
  }
}
</script>
<style lang="less" >
.home {
  box-sizing: border-box;
  .home-size {
     font-size: 28px;
     color:#666;
  }
  .cc {
    height: 96px;
    font-size: 32px;
    box-sizing: border-box;
  }
  .ccc {
     font-size: 32px;
  }
  // height: 1200px;
  background: #F5F5F5;
   .img-post {
      position: absolute;
      transform:translateY(-50%);
      top: 50%;
   }
   .img-time {
      height: 30px;
      width: 30px;
   }
 .l-pu {
    height: 96px;
   font-size: 32px;
  line-height: 96px; 
   display: flex;
   justify-content: space-between;
   text-align: center;
   .l-mi {
      margin:  auto  0;
      .van-stepper__minus, .van-stepper__plus {
        width: 62px;
        height: 56px;
        border-color: #ccc;
        
      }
      .van-stepper__minus {
        border-radius: 18px 0 0 18px;
      }
      .van-stepper__plus {
        border-radius: 0 18px 18px 0;
      }
      .van-stepper__input{
         width: 62px;
         height: 56px;
      }
      .van-stepper__minus::before, .van-stepper__plus::before {
        width: 30px !important;
        height: 2px !important;
        color: #999 !important;
      }
      .van-stepper__minus::after, .van-stepper__plus::after {
        height: 30px !important;
        width: 2px !important;
        color: #999 !important;
      }
      .van-stepper__input {
        font-size: 36px;
      }
   }
}  
   
.person {
  box-sizing: border-box;
  //  height: 48px;
   padding-left: 18px;
   padding-right: 18px;
   background: #FFF;
   .person-top {
    //  padding-bottom: 8px; 
      // margin-bottom: 20px;
      height: 96px;
      line-height: 96px;
      font-size: 28px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      // align-items: center;
      // text-align: center;
      .img-book {
         width: 30px;
         height: 30px;
      } 
      img {
        height: 100%;
      }
      span{
        padding-left: 35px;
      }
   }
   .person-put {
   }
}
.add {
  box-sizing: border-box;
    margin-top: 16px;
    background: #FFF;
  .add-top {
      padding-left: 18px;
      padding-right: 18px;
      height: 96px;
      line-height: 96px;
      font-size: 32px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         height: 100%;
      }
      span{
        padding-left: 38px;
      }
  }
   .add-put{
     .add-book {
       height: 96px;
       padding-left: 30px;
       padding-right: 30px;
       background: #F5F5F5;
       display: flex;
       justify-content:space-between;
       line-height: 96px;
       font-size: 28px;
     }
   }
   .add-b {
     position: relative;
     height: 76px;
     .weui-btn_default {
       height: 76px;
       font-size: 32px;
       background: #FFF;
        color: red;
     }
     img {
       height: 100%;
     }
      .add-a{
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        left: 41%;
      }
   }
   .del {
      color: red;
   }
}
.time{
  box-sizing: border-box;
  margin-top: 16px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .time-top {
      height: 96px;
      line-height: 96px;
      font-size: 28px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
        height: 100%;
      }
      span{
        padding-left: 38px;
      }
  }
}
.well {
  box-sizing: border-box;
  margin-top: 16px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .well-top {
    height: 96px;
      line-height: 96px;
      font-size: 32px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         height: 100%;
      }
      span{
        padding-left: 35px;
      }
  }
}
.volunteer{
  box-sizing: border-box;
  margin-top: 16px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .volunteer-top {
      height: 96px;
      line-height: 96px;
      font-size: 28px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         height: 100%;
      }
      span{
        padding-left: 38px;
      }
  }
  .btn {
    margin-top: 110px;    
    padding-bottom: 32px;
    .weui-btn_default {
      height: 96px;
      font-size: 36px;
      color: #fff;
      background-color: red;
    }
  }
}
 .sign {
       position: relative;
     }
     .sign-img {
       position: absolute;
       transform:translateY(-50%);
       top: 50%;
       left: -4px;
     }
     .add-img{
        position: absolute;
        transform:translateY(-50%);
        top: 50%;
        left: 37%;
        height: 26px;
        width: 26px;
     }
  .left {
    padding-left: 18px;
  }
  
}
.dp-content {
      padding: 200px 0 !important;
  }
.scroller-item {
   font-size: 40px !important;
}
.weui-dialog__title{
   font-size: 32px !important;
}
.weui-dialog__hd {
  padding: 55px 38px 36px !important;
}
.weui-dialog{
   max-width: 540px !important;
}
.weui-dialog__bd {
  min-height: 60px !important;
  font-size: 26px !important;
}
.weui-dialog__ft {
  line-height: 70px !important;
  font-size: 25px !important;
}
.dp-header .dp-item{
  font-size: 26px !important; 
  height: 55px !important;
  line-height: 55px !important;
}
</style>