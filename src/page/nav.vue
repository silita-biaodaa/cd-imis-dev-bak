<template>
  <div class="bar" >
    <router-view class="nav" ></router-view>
    
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  components: {
  }
}
</script>
<style lang="less" >
@import "../assets/icon/style.css";
.bar {
  .nav {
    height: calc(100% - 100px);
  }
 
}

</style>
