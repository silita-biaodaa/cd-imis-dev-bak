<template>
   <div class="home">
      <div class="person"> 
         <div class="person-top">
             <img src="../assets/img/book2.png" alt=""> 
            <span>个人信息</span>
         </div>
         <div class="person-put">
           <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
             <x-input title='姓名' v-model='username' placeholder='请输入你的真实姓名' placeholder-align='center' ></x-input>
           </div>
            <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
            <x-input title='手机' v-model='mobile' placeholder='请输入你的联系方式' placeholder-align='center' ></x-input>
           </div>
           <x-input title='企业' v-model='company' placeholder='请输入你的企业名称' placeholder-align='center' ></x-input>
           <x-input title='职位' v-model='post' placeholder='请输入你的职位名称' placeholder-align='center' ></x-input>
         </div> 
      </div>
      <div class="time">
        <div class="time-top">
           <img src="../assets/img/time (1).png" alt=""> 
           <span>打卡时间</span>
        </div>
        <div class="time-put">
          <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
            <datetime title='打开始于时间' v-model="tiems" placeholder='请选择' ></datetime>
           </div>
        </div>
        <div class="sign"> 
             <img src="../assets/img/sign1.png" alt="" class="sign-img">
             <x-input title='打卡次数' v-model='count' placeholder='请输入打开次数' placeholder-align='right' ></x-input>
           </div>
      </div>

      <div class="add">
        <div class="add-top">
           <img src="../assets/img/buuk (1).png" alt=""> 
           <span>打卡时间</span>
        </div>
        <div class="add-put" v-for="(item,index) in first" :key="index">
           <div class="add-book">
             <span>书本&nbsp({{index + 1}})</span>
             <span class="del" @click='delbook(index)' v-show='func(index)'>删除</span>
            </div> 
           <div class="left">
              <div class="sign "> 
                <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='书本名称' v-model='item.title' placeholder='请输入书本名称' placeholder-align='right' ></x-input>
              </div>
              <div class="sign"> 
                <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='每日诵读遍数' v-model='item.readCount' placeholder='请输入' placeholder-align='right' ></x-input>
              </div>
              <div class="sign" > 
                <img src="../assets/img/sign1.png" alt="" class="sign-img">
                <x-input title='总朗读遍数' v-model='item.readTotal' placeholder='请输入' placeholder-align='right' ></x-input>
              </div>
           </div>
           
        </div>
        <div class="add-b" @click='addbook'>
           <x-button  ><x-icon type="ios-plus-empty" size="30" class="add-a"></x-icon>增加书本</x-button>
        </div>
      </div>

      <div class="well">
        <div class="well-top">
           <img src="../assets/img/gift (2).png" alt=""> 
           <span>打卡时间</span>
        </div>
        <div class="well-put">
            <datetime title='积善开始时间' :v-model="begin" placeholder='请选择' ></datetime>
            <datetime title='积善结束时间' :v-model="end" placeholder='请选择' ></datetime>
             <x-input title='积善件数' :v-model='number' placeholder='请输入' placeholder-align='right' ></x-input>
             <x-input title='累计积善件数' :v-model='alls' placeholder='请输入' placeholder-align='right' ></x-input>
        </div>
      </div>
      <div class="volunteer">
        <div class="volunteer-top">
           <img src="../assets/img/star (2).png" alt=""> 
           <span>立志愿</span>
        </div>
        <div class="volunteer-put">
            <x-textarea placeholder='请输入您的志愿' :rows='4' v-model="values"> </x-textarea>
        </div>
        <div class="btn" @click='record'>
           <x-button  >提交</x-button>
        </div>
      </div>
   </div>
</template>
<script>
import { recordBook } from "@/api/index";
export default {
  data () {
    return {
      username: '',
      mobile: '',
      company: '',
      post: '',
      tiems: '',
      count: '',
      begin: '',
      end: '',
      number: '',
      alls: '',
      values: '',
      first: [{}]
    }
  },
  methods: {
    addbook () {
       this.first.push({})
    },
    delbook (i) {
      this.first.splice(i,1)
    },
    func (index) {
       if (index == 0) {
          return false 
       } else {
          return true
       }
    },
    record () {
      console.log(11111)
      recordBook({name: this.username, phone: this.mobile, company: this.company, post: this.post, pushStart: this.tiems,total: this.count, bonaStart: this.begin, bonaEnd: this.end, bonaCount: this.number, bonaTotal: this.alls, volunteer: this.values, books: this.first}).then( res => {
         alert(res.code)
         console.log(res,131)
      })
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 1200px;
  background: #F5F5F5;
  ::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #F5F5F5;
}
.person {
  //  height: 48px;
   padding-left: 18px;
   padding-right: 18px;
   background: #FFF;
   .person-top {
    //  padding-bottom: 8px; 
      // margin-bottom: 20px;
      height: 48px;
      line-height: 48px;
      font-size: 19px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      // align-items: center;
      // text-align: center;
      img {
         position: absolute;
         transform:translateY(-50%);
         top: 50%;
        //  padding-right: 12px;
      }
      span{
        padding-left: 34px;
      }
   }
   .person-put {
    
   }
}
.add {
   margin-top: 8px;
  background: #FFF;
  .add-top {
      padding-left: 18px;
      padding-right: 18px;
      height: 48px;
      line-height: 48px;
      font-size: 19px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         position: absolute;
         transform:translateY(-50%);
         top: 50%;
      }
      span{
        padding-left: 38px;
      }
  }
   .add-put{
     .add-book {
       padding-left: 30px;
       padding-right: 30px;
       background: #F5F5F5;
       display: flex;
       justify-content:space-between;
     }
   }
   .add-b {
     position: relative;
     .weui-btn_default {
       background: #FFF;
        color: red;
     }
      .add-a{
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        left: 41%;
        //  line-height: 48px;
        top: 50%;
      }
   }
   .del {
      color: red;
   }
}
.time{
  margin-top: 8px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .time-top {
      height: 48px;
      line-height: 48px;
      font-size: 19px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         position: absolute;
         transform:translateY(-50%);
         top: 50%;
      }
      span{
        padding-left: 38px;
      }
  }
}
.well {
    margin-top: 8px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .well-top {
    height: 48px;
      line-height: 48px;
      font-size: 19px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         position: absolute;
         transform:translateY(-50%);
         top: 50%;
      }
      span{
        padding-left: 35px;
      }
  }
}
.volunteer{
  margin-top: 8px;
  padding-left: 18px;
  padding-right: 18px;
  background: #FFF;
  .volunteer-top {
      height: 48px;
      line-height: 48px;
      font-size: 19px;
      border-bottom: 1px solid #F2F2F2;
      position: relative;
      img {
         position: absolute;
         transform:translateY(-50%);
         top: 50%;
      }
      span{
        padding-left: 38px;
      }
  }
  .btn {
    margin-top: 55px;
    padding-bottom: 18px;
    .weui-btn_default {
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
       left: -2px;
     }
  .left {
    padding-left: 18px;
  }
}
</style>