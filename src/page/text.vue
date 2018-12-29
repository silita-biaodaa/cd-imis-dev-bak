<template>
   <div> 
        打卡
       <!-- <inline-calendar @on-change='eveday' v-model="text"></inline-calendar> -->
       <!-- <div>今日打开的多少人，昨日打开多少人</div> -->
   </div>
</template>
<script>
export default {
  data () {
    return {
        // text: ['2018-12-20', '2018-12-21']
    }
  },
  methods: {
    // eveday(val) {
    //    console.log(val[val.length - 1 ])
    // }
  },
  components: {
  }
}
</script>
<style lang="less" >
//  caption, th {
//    text-align: center;
//  }
// .inline-calendar td.current > span.vux-calendar-each-date {
//    background-color:red !important;
// }
</style>