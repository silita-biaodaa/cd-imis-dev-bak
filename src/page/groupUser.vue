
<template>
  <div class="groupUser">
      <v-head :head-txt="groupName"></v-head>
      <!--<div class="serBox"><div></div></div>-->
      <ul class="listBox">
        <li v-for="(o,i) of list" :key="i">
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
      <v-popup :popupShow="mask" :popupType="'tip1'" :tip-text="tipTxt" @sure="maskFn"></v-popup>
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
              this.$toast('删除成功');
            }
          })
        }else if(this.tipTxt=='确认要转让该群组？'){
          let data={
            groId:this.groId,
            invite:this.list[i].pkid
          }
          groupUser.changeGrouper(data).then(res =>{
            if(res.code==1){
              this.$toast('转让成功');
              this.type=false;
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
      }
    },
    created () {
      this.groupName=this.$route.query.name;
      this.type=this.$route.query.type;
      this.groId=this.$route.query.id;
      let that=this;
      let data={
        pageNo:1,
        pageSize:100,
        groId:this.$route.query.id,//
      }
      CardRecord.groupPerson(data).then(res =>{
        if(res){
          that.list=res.data.list
        }
      })
    },
    components: {

    },
    mounted(){

    },
    destroyed(){
      groups({}).then( res => {
        let arr=[];
        arr=res.data.create.concat(res.data.join);
        localStorage.setItem('groupList',JSON.stringify(arr));
      })
    }
  }
</script>
<style lang='less' scoped>
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
</style>
