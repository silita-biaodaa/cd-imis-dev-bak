
<template>
  <div class="groupUser">
      <v-head :head-txt="groupName"></v-head>
       <van-search placeholder="请输入搜索关键词" v-model="keywords" @blur="ajax('search')" />
      <ul class="listBox" v-show=" this.list.length" >
        <li v-for="(o,i) of list" :key="i" >
          <div class="left">
            <img :src="o.imgUrl">
          </div>
          <div class="right"  @click="jumpFriend(i)">
            <h5>{{o.name}}</h5>
            <p>
              打卡第<span style="color: #E62129">{{o.pushDays}}</span>天，本月缺卡<span style="color:#0BA61D">{{o.monthLostCount}}</span>次，共缺卡<span style="color:#D8B305">{{o.lostCount}}</span>次。
            </p>
          </div>
          <span class="delete" @click="deleteFn(i)" v-if="o.isCreate!=1&&type==true"></span>
          <span class="turn" @click="turnFn(i)" v-if="o.isCreate!=1&&type==true"></span>
        </li>
      </ul>
      <div class="hint" v-show=" !this.list.length && !this.keywords.trim()">
          暂无群成员
      </div>
      <div class="hint" v-show=" !this.list.length && this.keywords.trim()">
          查询无结果
      </div>
      <v-popup :popupShow="mask" :popupType="'tip1'" :tip-text="tipTxt" @sure="maskFn"></v-popup>
      <div class="toast" v-show="text3">
          删除成功
      </div>
      <div class="toast" v-show="text2">
          转让成功
      </div>
  </div>
</template>
<script>
  import { CardRecord,groupUser,groups } from '@/api/index'
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        groupName:'',//群名
        type:'',
        list:[],
        groId:'',//群id
        mask:false,
        thisNum:'',
        tipTxt:'',
        pageList: {total: '',pageNo:1,pageSize:8},
        keywords:'',
        isScroll:true,
        noGet:false,
        text3: false,
        text2: false
      }
    },
    name:'groupUser',
    watch:{

    },
    methods: {
      jumpFriend(i){
        this.$router.push({
          path:'/nav/friend',
          query:{
            id:this.list[i].pkid
          }
        })
      },
      //确定
      maskFn(){
        let i=this.thisNum;
        if(this.tipTxt=='确认要删除该家人？'){
          let data={
            groId:this.groId,
            user:this.list[i].pkid
          }
          this.list.splice(i,1);
          groupUser.removeUser(data).then(res =>{
            if(res.code==1){
              this.text3 = true
              setTimeout(() => {
                this.text3 = false
              }, 1500);
            }
          })
        }else if(this.tipTxt=='确认要转让该群组？'){
          let data={
            groId:this.groId,
            invite:this.list[i].pkid
          }
          groupUser.changeGrouper(data).then(res =>{
            if(res.code==1){
               this.text2 = true
              setTimeout(() => {
                this.text2 = false
              }, 1500);
            }
          })
        }
      },
      deleteFn(i){
        this.thisNum=i;
        this.tipTxt='确认要删除该家人？'
        this.mask=true;
      },
      turnFn(i){
        this.thisNum=i;
        this.tipTxt='确认要转让该群组？';
        this.mask=true;
      },
      ajax(type){
		this.loading();
		if(type=='search'){
			this.pageList.pageNo=1;
			this.noGet=false;
		}
        let that=this;
        let data={
          pageNo:this.pageList.pageNo,
          pageSize:this.pageList.pageSize,
          groId:this.$route.query.id,//
          keywords:this.keywords,
        }
        CardRecord.groupPerson(data).then(res =>{
          this.hideLoading();
		  this.isScroll=true;
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
          this.loading();
          this.isScroll=false;
          this.pageList.pageNo+=1;
          this.ajax();
        }
      },
    },
    created () {
      this.groupName=this.$route.query.name;
      this.type=this.$route.query.type;
      this.groId=this.$route.query.id;
      this.ajax();
    },
    components: {

    },
    mounted(){
      window.addEventListener('scroll',this.scrollgun,true);
    },
    destroyed(){
      window.removeEventListener('scroll',this.scrollgun,true);
      groups({}).then( res => {
        let arr=[];
        arr=res.data.create.concat(res.data.join);
        localStorage.setItem('groupList',JSON.stringify(arr));
      })
    }
  }
</script>
<style lang='less' >
.title{
  padding: 33px;
  background: #fff;
  text-align: center;
  font-size: 32px;
  color: #010101;
  display:flex;
  align-items:center;
  justify-content: space-between;
  .nameTxt{
    max-width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
}
 .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #000;
    padding: 20px;
    font-size: 26px;
    border-radius: 10px;
    transform: translateX(-50%);
    color:#fff;
  }
.serBox{
  background: #F5F5F5;
  padding: 20px 32px;
  div{
    background: #fff;
    height: 72px;
    border-radius:10px;
  }
}
.listBox{
  background: #fff;
  padding: 0 36px;
  li{
    padding: 28px 0;
    border-bottom: 1px #f2f2f2 solid;
    display: flex;
    justify-content: space-between;
    position: relative;
    .delete{
      width: 31px;
      height: 31px;
      background: url("../assets/img/sc.png") no-repeat;
      background-size: cover;
      position: absolute;
      top: 28px;
      right: 0;
      z-index: 999;
    }
    .turn{
      width: 32px;
      height: 32px;
      background: url("../assets/img/zr.png") no-repeat;
      background-size: cover;
      position: absolute;
      top: 28px;
      right: 85px;
      z-index: 999;
    }
    .left{
      width: 120px;
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .right{
      width: calc(100% - 150px);


      h5{
        color: #000;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 40px;
      }
      p{
        font-size: 24px;
        color: #999;
        span{
          font-size: 28px;
        }
      }
    }
  }
  li:last-child{
    border-bottom: none;
  }

}
.groupUser {
  .van-search {
    padding: 20px 36px;
  }
  .van-cell {
    line-height: 72px;
  }
  .van-search .van-cell {
    border-radius: 10px;
  }
  .van-field__control {
    font-size: 36px;
    text-align: center;
  }
  .van-cell__left-icon, .van-cell__right-icon {
    line-height: 72px !important;
    font-size: 40px !important;
  }
  .hint {
     margin-top: 200px;
     color: #666;
     text-align: center;
     font-size: 40px;
  }
}

</style>
