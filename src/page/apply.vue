<template>
    <div class="apply">
      <v-head :head-txt="headName"></v-head>
      <van-search placeholder="请输入搜索关键词" v-model="value" @blur="onSearch" />
      <div class="apply-list" v-for="(e,i) in list" :key="i" v-show="dont" >
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
              <div class="apply-join" v-show="e.isApply == 0 ? true : false" @click="addGroups(e)" >
                  {{el.isApply == 1 ? '已申请' : '申请入群'}}
              </div>
          </div>
      </div>
      <div v-show="!dont" class="hint" >
          暂无群数据, 请先创建群
      </div>

    </div>
</template>
<script>
import { Glisy,Addgroup } from '@/api/index'
export default {
  data () {
    return {
      value: '',
      list: [],
      dont: true,
      headName:'查找群组'
    }
  },
  methods: {
    onSearch() {
      Glisy({pageNo: '1', pageSize: '10', keywords: this.value}).then( res => {
          if(res.code == 1 ) {
            console.log(res,53)
              if( res.data.list.length ) {
                 this.list = res.data.list
                 this.dont = true
              } else {
                 this.dont = false
              }

          }
      })
    },
    addGroups(val) {
      console.log(1111)
       Addgroup({groId:val.groId}).then( res => {
         console.log(res,61)
          if(res.code == 403 ) {
                 this.onSearch()
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
   .hint {
      margin-top: 200px;
      color: #666666;
      text-align: center;
      font-size: 40px;
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
    font-size: 40px !important;
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
       height: 100%;
    }
  }
  .apply-name {
    margin-top: 35px;
    p {
      width:400px;
      word-break:keep-all;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
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
