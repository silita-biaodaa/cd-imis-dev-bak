<template>
    <div class="apply">
       <!-- <van-nav-bar
        title="查找群组"
        left-arrow
        @click-left="$router.go(-1)"
      />  -->
      <div class="top-nav" >
        <i class="iconfont icon-fanhui i-size"  @click="$router.go(-1)" ></i>
          查找群组
      </div>
      <van-search placeholder="请输入搜索关键词" v-model="value" @search="onSearch" />
      <div class="apply-list" v-for="(e,i) in list" :key="i" >
          <div class="ld-left apply-g" >
              <div class="apply-img">
                  <img :src="e.imgUrl" alt="">
              </div>
              <div class="apply-name">
                 <p>{{e.groName}}</p>
                 <div class="ld-left ">
                    <div class="apply-ye top">
                        <img src="../assets/img/double (1).png" alt="">
                        {{e.userCount}}
                    </div>
                    <div class="apply-ye top ddd">
                        <img src="../assets/img/person (1).png" alt="">
                        {{e.name}}
                    </div>
                 </div>
              </div>
              <div class="apply-join" v-show="e.isExist == 0 ? false : true" @click="addGroups(e)" >
                  申请入群
              </div>
          </div>
      </div>

    </div>
</template>
<script>
import { Glisy,Addgroup } from '@/api/index'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      value: '',
      list: [],
    }
  },
  methods: {
    onSearch() {
      Glisy({pageNo: '1', pageSize: '5', keywords: this.value}).then( res => {
          if(res.code == 1 ) {
            console.log(res)
              this.list = res.data.list
          }
      })
    },
    addGroups(val) {
       Addgroup({groId:val.groId}).then( res => {
          if(res.code == 403 ) {
            console.log(111)
            //  Dialog.alert({
            //     title: '申请入群',
            //     message: '申请成功,请等待群主确认'
            //   }).then(() => {
                 this.onSearch()
              // });

          }
       })
    }
  },
  created () {
    this.onSearch()
  },
  components: {

  }
}
</script>
<style lang="less" >
.apply {
   padding-top: 96px;
   .top-nav {
     height: 96px;
     width: 100%;
     line-height: 96px;
     font-size: 32px;
     color: #010101;
     text-align: center;
     position:fixed;
	   top:0;
     background: #fff;
     font-weight: 500;
     z-index: 999;
     .i-size {
        position: absolute;
        color:#000;
        left: 36px;
        top: 50%;
        transform: translateY(-50%);
        width: 96px;
        text-align:left;
     }
  }
  .van-search {
      padding: 20px 36px;
  }
  .van-cell {
    line-height: 72px;
  }
  .van-field__control {
    font-size: 36px;
    text-align: center;
  }
  .van-cell__left-icon, .van-cell__right-icon {
    line-height: 72px !important;
  }
  .apply-list {
    padding: 0 36px;
    position: relative;
  }
  .apply-join {
    position: absolute;
    right: 38px;
    top: 38px;
    width: 122px;
    height: 48px;
    border: 1px solid #E62129;
    border-radius: 5px;
    font-size: 28px;
    color: #E62129;
    text-align: center;
    line-height: 48px;
  }

  .apply-g {
     height: 175px;
     border-bottom: 1px solid #F2F2F2;
     color: #000;
     font-size: 36px;
  }
  .apply-img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 25px;
    margin-right: 28px;
    img {
       width: 100%;
    }
  }
  .apply-name {
    margin-top: 35px;
  }
  .apply-ye {
    height: 26px;
    background: #F0DFB8;
    border-radius: 3px;
    font-size: 18px;
    color:#fff;
    margin-right: 15px;
    text-align: center;
    padding: 5px;
    padding-right: 8px;
    img {
      width: 19px;
      height: 16px;
      margin-right: 5px;
    }
  }
  .ddd {
    background: #CEDDF1;
  }
}
</style>
