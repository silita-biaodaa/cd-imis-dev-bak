<!-- 弹出框 -->
<template>
    <div class="popup" v-if="popupShow">
        <div class="content">
            <template v-if="popupType=='tip1'">
                <div class="top-box">{{text}}</div>
                <div class="bottom-box">
                    <p @click="cancelFn">{{cancelTxt}}</p>
                    <p @click="sure" style="color: #E62129">{{sureTxt}}</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'popup', // 结构名称
    data() {
        return {
            // 数据模型
          text:''
        }
    },
    watch: {
        // 监控集合
      'tipText':function(newValue,oldValue){
        this.text=newValue
      }
    },
    props: {
        // 集成父级参数
        popupType:{},
        popupShow:{
            default:false
        },
        tipText:{
            default:'是否继续该操作？'
        },
        sureTxt:{
            default:'确定'
        },
        cancelTxt:{
            default:'取消'
        }
    },
    computed:{
      txt(){
        return this.tip1Text
      }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    methods: {
        // 方法 集合
        cancelFn(){//取消
            this.$parent.mask=false;
            this.$emit('quxiao',{data:false})
        },
        sure(){
        	this.$parent.mask=false;
        	this.$emit('sure',{data:true})
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped>
.popup{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(0,0,0,.5);
    z-index: 999;
}
.content{
    border-radius:10px;
    background: #ffffff;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
    position: fixed;
    z-index: 1000;
    overflow: hidden;
    width:600px;
}
.top-box{
  border-bottom: 1px solid #F2F2F2;
  height: 211px;
  line-height: 211px;
  text-align: center;
  font-size: 32px;
}
.bottom-box{display: flex}
.bottom-box p{width: 50%;text-align: center;line-height:96px;color: #000;font-size:36px}
.bottom-box p:first-of-type{border-right: 1px solid #e8e8e8}
</style>
