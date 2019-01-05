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
  created(){
    if(!sessionStorage.getItem('groupList')){
      group({}).then( res => {
        let arr=[];
        arr=res.data;
        sessionStorage.setItem('groupList',JSON.stringify(arr));
      })
    }
    if(!sessionStorage.getItem('userName')){
      User({}).then( res => {
        sessionStorage.setItem('userName',res.data.name);
      })
    }
  }
}
</script>

<style>
@import "./css/public.css";
</style>
