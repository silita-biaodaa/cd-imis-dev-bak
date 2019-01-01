<template>
   <div class="card">
       <div class="card-top card-com laca">
           <div class="siz">
              <img src="../assets/img/buuk (1).png" alt="">
           </div>
          <div class="card-size">
              知学习
          </div>
       </div>

        <div v-for="el in bookss" :key="el.pkid">
            <div class="card-b">
               <div class="card-book">
                 《{{el.title}}》共朗读{{el.readTotal + el.readCount}}遍
               </div>
            </div>
            <div class="card-com">
               <div class="l-pu">
                    <div class="label label-f">今日朗读遍数</div> 
                    <van-stepper  v-model.number="el.readCount" class="l-mi" :min="0" />                    
               </div>
            </div>
        </div>
         

        <div  v-for="(item,index) in books" :key="index">
           <div class="card-b card-book add-book">
             <span>书本&nbsp({{index + 3}})</span>
             <span class="del-book" @click='cardDel(index)' >删除</span>
            </div> 
           <div class="pdd">
              <div class="l-put put-bot">
               <div class="label label-f">书本名称</div> <input type="text" placeholder="请输入书本名称" v-model='item.bookName' >
              </div>
              <div class="l-put">
               <div class="label label-f">朗读章节</div> <input type="text" placeholder="请输入" v-model='item.section' >
              </div>
           </div>           
        </div>
        <div class="card-com card-add" @click='cardBook'>
            <span class="laca">增加书本
              <div class="laca-add"><img src="../assets/img/add (1).png" alt=""></div>
            </span>
        </div>
        <div class="card-com card-share">
            经典名句分享
        </div>
        <div class="card-put">
            <x-textarea placeholder='请输入您要分享的经典名句' :rows='4' v-model="classic" ></x-textarea>
        </div>

        <div class="card-top card-com laca card-ma">
           <div class="siz">
              <img src="../assets/img/buuk (1).png" alt="">
           </div>
          <div class="card-size">
              行实践
          </div>
       </div>
       <div class="card-com">
          <div class="l-put">
               <div class="label label-f">修身</div> <input type="text" placeholder="请输入今日您对个人的贡献" v-model="practices.character" >
          </div>
       </div>
       <div class="card-com">
          <div class="l-put">
               <div class="label label-f">齐家</div> <input type="text" placeholder="请输入今日您对家庭和家人的贡献"  v-model="practices.work" >
          </div>
       </div>
       <div class="card-com">
          <div class="l-put">
               <div class="label label-f">建功</div> <input type="text" placeholder="请输入今日您对工作的贡献" v-model="practices.family"  >
          </div>
       </div>

        <div class="card-top card-com laca card-ma">
           <div class="siz">
              <img src="../assets/img/gift (2).png" alt="">
           </div>
          <div class="card-size">
              积善行
          </div>
       </div>
       <div class="card-b">
          <div class="card-book">
            发愿从{{pushCount.bonaStart}}起，{{pushCount.years}}年内{{pushCount.days * pushCount.bonaCount }}善事，累计{{pushCount.bonaTotal+pushCount.bonaDays}}善。
          </div>
       </div>
        <div class="card-com">

               <!-- <div class="label label-f">今日行善件数</div> <input type="text" placeholder="1善" v-model="pushCount.bonaDays" > -->
               <div class="l-pu">
                    <div class="label label-f">今日行善次数</div> 
                    <van-stepper  v-model="pushCount.bonaDays" class="l-mi" :min="0" />                    
               </div>
       </div>
       <div class="card-top card-com laca card-ma">
           <div class="siz">
              <img src="../assets/img/star (2).png" alt="">
           </div>
          <div class="card-size">
              立志愿
          </div>
       </div>
       <div class="card-put">
            <x-textarea placeholder='请输入您要分享的经典名句' :rows='4' v-model="volunteer" ></x-textarea>
        </div>
        <div class="card-top card-com laca card-ma">
           <div class="siz">
              <img src="../assets/img/gift (2).png" alt="">
           </div>
          <div class="card-size">
              省觉悟
          </div>
       </div>
       <div class="card-put">
            <x-textarea placeholder='请输入您的反省及觉悟' :rows='4' v-model="introspective" ></x-textarea>
        </div>
         <div class="card-top card-com laca card-ma">
           <div class="siz">
              <img src="../assets/img/hua.png" alt="">
           </div>
          <div class="card-size">
              感谢
          </div>
       </div>
       <div class="card-put">
            <x-textarea placeholder='请输入您的感谢' :rows='4' v-model="thanks" ></x-textarea>
        </div>
        
        <div class="card-btn" @click="punch" >
           <x-button>提交</x-button>
        </div>
   </div>
</template>
<script>
import { recordPer , pushCard } from '@/api/index'
export default {
  data () {
    return {
      books:[],
      // booksss:[],
      num:'',
      bookss:[],
      pushCount: {},  //积善行
      volunteer: '', // 立志愿
      classic: '',  // 经典名句
      practices: { character: '' ,work: '', family: ''},  //行～实践
      introspective: '', //省省悟
      thanks: '' //感谢
    }
  },
  methods: {
    gainPer() {
       recordPer({}).then( res => {
          if(res.code == 1) {
             console.log(res)
              this.thanks = res.data.thanks
              this.practice = res.data.practice ? res.data.practice : this.practices
              this.classic = res.data.classic
              this.introspective = res.data.introspective
              this.bookss = res.data.books
              this.pushCount = res.data.pushCount
              this.volunteer = res.data.volunteer
          } 
       })
    },
    punch(){
      pushCard({thanks:this.thanks,practice:this.practices,books:this.bookss,classic:this.classic,introspective:this.introspective,volunteer:this.volunteer,pushCount:this.pushCount,isPub:'1',bookish:this.books}).then( res => {
           if(res.code == 1) {
              this.$router.push({path:'/nav/friend'})
           }
      })
    },
    cardBook () {
       this.books.push({})
    },
    cardDel(i) {
       this.books.splice(i,1)
    }
  },
  created () {
     this.gainPer()
  },
  components: {
  },
  
}
</script>
<style lang="less" >
.card{
   background: #F5F5F5;

.l-pu {
    height: 96px;
   font-size: 32px;
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
.l-put {
   height: 96px;
   font-size: 32px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   .label {
     padding-left: 0px;
     color:#000;  
   }
   input {
      width: 100%;
      text-align: right;
      background:none;  
	    outline:none;  
      border:0px;
      caret-color:blue;
      padding: 20px 0px;
   }
  .label-f {
    width: 280px;
  }
}
  .card-top {
     img {
        width: 100%;
     }
  }
  .card-size {
    padding-left: 53px;
    color:#666;
    font-size: 28px;
  }
  .card-com {
    background: #fff;
    padding: 0 36px;
    height: 96px;
    line-height: 96px;
 }
 .laca {
    position: relative; 
 }
 .laca-add {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   height: 26px;
   left: -25%;
   img {
     height: 100%;
   }
 }
 .siz {
    position: absolute;   
    top: 50%;
    transform:translateY(-50%);
    height: 30px;
    width: 33px;
 }
 .card-b{
    height: 80px;
    line-height: 80px;
    background-color: #f5f5f5;
    padding-left: 36px;
 }
 .card-book {
   color: #999;
   font-size: 26px;
 }
 .add-book { 
   display: flex;
   justify-content: space-between;
   padding-right: 36px;
 }
 .del-book {
    color:#E62129;
 }
 .pdd {
    background: #fff;
    padding: 0 36px;
 }
 .put-bot{
   border-bottom: 1px solid #F2F2f2;
 }
 .card-add {
    text-align: center;
    background: #fff;
    font-size: 33px;
    color:#E62129;
    font-weight: 500;
 }
 .card-share {
    font-size: 32px;
    color:#000;
    background: #fff;
    font-weight: 400;
    margin-top: 10px;
 }
 .card-put {
    font-size: 32px;
    background: #fff;
    height: ;
 }
 .card-ma {
    margin-top: 10px;
 }
 .card-btn {
   margin-top: 110px;    
   padding: 0 32px;
    padding-bottom: 32px;
    
    .weui-btn_default {
      height: 96px;
      font-size: 36px;
      color: #fff;
      background-color: red;
    }
 }
}
 
 
</style>
