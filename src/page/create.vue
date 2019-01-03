<template>
   <div class="create">
      <van-nav-bar
        title="创建群组"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="create-put ">
          <van-cell-group>
            <van-field v-model="crowd" placeholder="请输入用户名"  label='群名' />
          </van-cell-group>
      </div>
      <div class="c-center">
         <button class="create-btn" @click="joinG" >创&nbsp&nbsp建</button>
      </div>
     
   </div>
</template>
<script>
import { CreatG } from '@/api/index'
export default {
  data () {
    return {
      crowd: ''
    }
  },
  methods: {
    joinG() {
        CreatG({groName:this.crowd}).then( res => {
           if(res.code == 1) {
              this.$router.push({path: '/nav/group'})
           }
        })
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.create {
  background: #f5f5f5;
  height: 100%;
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
}
</style>
