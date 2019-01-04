<template>
   <div class="create">
      <!-- <van-nav-bar
        title="创建群组"
        left-arrow
        @click-left="$router.go(-1)"
      /> -->
      <div class="top-nav" >
        <i class="iconfont icon-fanhui i-size"  @click="$router.go(-1)" ></i>
          创建群组
      </div>

      <div class="create-put ">
          <!-- <van-cell-group>
            <van-field v-model="crowd" placeholder="请输入用户名"  label='群名' />
          </van-cell-group> -->
        <div class="l-put"  >
              <div class="label">群名</div> <input type="text" placeholder="请输入要创建群名" v-model='crowd'  >
        </div>
      </div>
      <div class="c-center">
         <button class="create-btn" @click="joinG" >创&nbsp&nbsp建</button>
      </div>

   </div>
</template>
<script>
import { CreatG } from '@/api/index'
import { Toast } from 'vant'
export default {
  data () {
    return {
      crowd: ''
    }
  },
  methods: {
    joinG() {
        if(!this.crowd.trim()) {
            return this.$toast('群名不能为空!');
        }


        CreatG({groName:this.crowd}).then( res => {
           if(res.code == 1) {
              return   this.$router.push({path: '/nav/group'})
           } else if (res.code == 403 ) {
              return this.$toast('群名已存在!');
           } else {
              return  this.$toast('网络繁忙，请稍后尝试');
           }
         })
    }
  },
  components: {
    Toast,
  }
}
</script>
<style lang="less" >
.create {
  background: #f5f5f5;
  padding-top: 96px;
  height: 100%;
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
        font-size: 36px;
        text-align:left;
     }
  }
  .create-put {
    margin-top: 16px;
  }
  .van-cell {
    padding: 10 36px;
    line-height: 96px;
    font-size: 32px;
    font-weight: 500;
  }
  .van-field .van-cell__title {
    max-width: 150px;
  }
  .create-btn {
    height: 96px;
    width: 80%;
    border-radius: 10px;
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    background: #E62129;
  }
  .c-center {
    display: flex;
    justify-content: center;
    margin-top: 210px;
    font-size: 36px;
    color:#fff;
  }
  .l-put {
      height: 96px;
      font-size: 36px;
      display: flex;
      justify-content: flex-start;
      background: #fff;
      align-items: center;
      .label {
        width: 250px;
        padding-left: 36px;
        color:#000;
      }
      input {
         width: 100%;
         text-align: left;
         background:none;
	       outline:none;
         border:0px;
         caret-color:blue;
         padding: 20px 0px;
         padding-right: 20px;
      }
    }
}
</style>
