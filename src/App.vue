<template>
  <div id="app" class="app-bg">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import { group,User } from '@/api/index'
export default {

  name: 'app',
  beforeCreate(){
    if(localStorage.getItem('groupList')){
      localStorage.removeItem('groupList');
    }
    if(localStorage.getItem('userName')){
      localStorage.removeItem('userName');
    }
    if(localStorage.getItem('tabNum')){
      localStorage.removeItem('tabNum');
    }
  },
  created(){
    group({}).then( res => {
      let arr=[];
      arr=res.data;
      localStorage.setItem('groupList',JSON.stringify(arr));
    })
    User({}).then( res => {
      localStorage.setItem('userName',res.data.name);
    })
  }
}
</script>

<style>
@import "./css/public.css";
</style>
