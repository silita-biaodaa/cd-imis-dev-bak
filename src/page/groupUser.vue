
<template>
  <div class="groupUser">
      <div class="title">
        <span class="iconfont icon-fanhui"></span>
        <span>{{groupName}}</span>
        <span></span>
      </div>
      <div class="serBox"><div></div></div>
      <ul class="listBox">
        <li v-for="(o,i) of list" :key="i">
          <div class="left">
            <img :src="o.imgUrl">
          </div>
          <div class="right">
            <h5>
              {{o.name}}
              <span class="delete"></span>
              <span class="turn"></span>
            </h5>
            <p>
              打卡持续<span style="color: #E62129">{{o.pushDays}}</span>天，本月缺卡<span style="color:#0BA61D">{{o.monthLostCount}}</span>次，共缺卡<span style="color:#D8B305">{{o.lostCount}}</span>次。
            </p>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
  import { CardRecord } from '@/api/index'
  export default {
    data () {
      return {
        groupName:'',
        type:'',
        list:[]
      }
    },
    name:'groupUser',
    watch:{

    },
    // components:{
    //   'clock':clocklist
    // },
    methods: {

    },
    created () {
      console.log(this.$route.query);
      this.groupName=this.$route.query.name;
      this.type=this.$route.query.type;
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
