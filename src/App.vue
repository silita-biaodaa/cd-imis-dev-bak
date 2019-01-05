<template>
  <div id="app" class="app-bg">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import { groups } from '@/api/index'
export default {

  name: 'app',
  created(){
    if(!sessionStorage.getItem('groupList')){
      groups({}).then( res => {
        let arr=[];
        arr=res.data.create.concat(res.data.join);
        sessionStorage.setItem('groupList',JSON.stringify(arr));
      })
    }
  }
}
</script>

<style>
@import "./css/public.css";
</style>
