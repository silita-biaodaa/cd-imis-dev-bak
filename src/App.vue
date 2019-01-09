<template>
  <div id="app" class="app-bg">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import { group } from '@/api/index'
export default {

  name: 'app',
  beforeCreate(){
    // if(localStorage.getItem('groupList')){
    //   localStorage.removeItem('groupList');
    // }
    if(localStorage.getItem('userName')){
      localStorage.removeItem('userName');
    }
    if(localStorage.getItem('tabNum')){
      localStorage.removeItem('tabNum');
    }
  },
  created(){
    this.loading();
    group({}).then( res => {
      let arr=[];
      arr=res.data;
      this.hideLoading();
      localStorage.setItem('groupList',JSON.stringify(arr));
    })
  },
  destroyed () {
    localStorage.removeItem('zeno')
  }
}
</script>

<style>
@import "./css/public.css";
</style>
