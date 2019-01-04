
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
        <p class="start">  日精进打卡第<span class="p-ye">{{time}}</span>天,共打卡<span class="p-ye">{{total}}</span>次,缺卡<span class="p-ye" >{{que}}</span>次</p>
      </div>
    </div>
    <v-clock :clocklist="list" :name="name"></v-clock>
  </div>
</template>
<script>
  import { User,Friends,Parise,groups } from '@/api/index'
  export default {
    data () {
      return {
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
    // components:{
    //   'clock':clocklist
    // },
    methods: {
      gainUser(userid) {
        let data={}
        if(userid){
          data.userId=userid
        }
        User(data).then( res => {
          this.name = res.data.name;
        sessionStorage.setItem('userName',res.data.name);
        this.imgUrl = res.data.imgUrl
        this.compang = res.data.company
        this.pushStart = res.data.pushStart
        this.pushEnd = res.data.pushEnd
        this.total = res.data.total
        this.time = res.data.pushDays
        this.que = res.data.lostCount
      })
      },
      gainList(userid) {
        let that=this;
        let data={pageNo:that.pageList.pageNo,pageSize:that.pageList.pageSize}
        if(userid){
          data.userId=userid
        }
        Friends(data).then( res => {
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
      // fullClick(i){
      //   let obj=this.list[i];
      //   if(obj.fullTxt=='收起'){
      //     obj.isFull=false;
      //     obj.fullTxt='全文';
      //   }else{
      //     obj.isFull=true;
      //     obj.fullTxt='收起';
      //   }
      //   this.$set(this.list,i,obj);
      // },
      // isPariseFn(i){
      //   if(this.name==''){
      //     return false
      //   }
      //   let id=this.list[i].pkid;
      //   let that=this;
      //   Parise({logId:id}).then(res =>{
      //     if(res.msg=='操作成功'){
      //       let obj=that.list[i];
      //       if(that.strInArr(obj.praise)){
      //         obj.praise.push(that.name);
      //       }
      //       that.$set(that.list,i,obj);
      //     }
      //   })
      // },
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
      // strInArr(arr){
      //   if(arr.length==0){
      //     return true
      //   }
      //   for(let x of arr){
      //     if(x==this.name){
      //       return false
      //     }else{
      //       return true
      //     }
      //   }
      // },
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
      if(this.$route.query.id){
        let id=this.$route.query.id;
        this.gainUser(id);
        this.gainList(id);
      }else{
        this.gainUser();
        this.gainList();
      }

      if(!sessionStorage.getItem('groupList')){
        groups({}).then( res => {
          let arr=[];
          arr=res.data.create.concat(res.data.join);
          sessionStorage.setItem('groupList',JSON.stringify(arr));
        })
      }
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
        background: linear-gradient(0deg, rgba(230, 33, 41, 1) 0%, rgba(255, 85, 1, 1) 100%);
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
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
  }
</style>
