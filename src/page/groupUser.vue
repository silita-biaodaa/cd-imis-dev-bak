
<template>
  <div class="groupUser">
      <div class="title">
        <span class="iconfont icon-fanhui"></span>
        <span>{{groupName}}</span>
        <span></span>
      </div>
      <div class="serBox"><div></div></div>
      <ul class="listBox">
        <li v-for="(o,i) of list" :key="i" @click="jumpFriend(i)">
          <div class="left">
            <img :src="o.imgUrl">
          </div>
          <div class="right">
            <h5>
              {{o.name}}
              <span class="delete" @click="deleteFn(i)"></span>
              <span class="turn" @click="turnFn(i)"></span>
            </h5>
            <p>
              打卡持续<span style="color: #E62129">{{o.pushDays}}</span>天，本月缺卡<span style="color:#0BA61D">{{o.monthLostCount}}</span>次，共缺卡<span style="color:#D8B305">{{o.lostCount}}</span>次。
            </p>
          </div>
        </li>
      </ul>
      <v-popup :popupShow="mask" :popupType="'tip1'" :tip-text="tipTxt" @sure="maskFn"></v-popup>
  </div>
</template>
<script>
  import { CardRecord,groupUser } from '@/api/index'
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
        position: relative;
        .delete{
          width: 31px;
          height: 31px;
          background: url("../assets/img/sc.png") no-repeat;
          background-size: cover;
          position: absolute;
          top: 0;
          right: 0;
        }
        .turn{
          width: 32px;
          height: 32px;
          background: url("../assets/img/zr.png") no-repeat;
          background-size: cover;
          position: absolute;
          top: 0;
          right: 85px;
        }
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
