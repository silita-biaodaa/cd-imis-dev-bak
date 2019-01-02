<!-- 模型： DOM 结构 -->
<template>
    <div class="clocklist">
        <div class="c-img">
            <img :src="item.user.imgUrl" alt="">
        </div>
        <p class="c-name"><span class="fc-n">{{item.user.name}}</span>-{{item.user.company}}</p>
        <div class="c-content" :class="{'active': item.isFull}">
            <p class="c-time"><span>{{item.pushd}}</span>打卡第{{item.pushCount.pushADays}}天</p>
            <div class="c-text" > 
                <!-- 知 学习 -->
                <p>【知～学习】</p>
                <div v-for="(el,index) in item.books" :key="index">
                    <p class="c-color">《{{el.title}}》{{el.readCount}}遍 共{{el.readTotal}}遍</p>                  
                </div>
                <!-- 经典名句 -->
                <template v-if="item.classic">
                    <p>【经典名句分享】</p>
                    <p class="c-color">{{item.classic}}</p>
                </template>
                <!-- 行 实践 -->
                <template v-if="item.practice">
                    <p>【行～实践】</p>
                <template v-if="item.practice.character!=''">
                    <h5>一、修身：（对自己个人）</h5>
                    <p class="c-color">{{item.practice.character}}</p>
                </template>
                <template v-if="item.practice.family!=''">
                    <h5>二、齐家：（对家庭和家人）</h5>
                    <p class="c-color">{{item.practice.family}}</p>
                </template>
                <template v-if="item.practice.work!=''">
                    <h5>三、建功：（对工作）</h5>
                    <p class="c-color">{{item.practice.work}}</p>
                </template>
                </template>
                <!-- 积善 -->
                <p>【积善】</p>
                <p class="c-color">发愿从{{item.pushCount.bonaStart}}起{{item.pushCount.years}}年内{{item.pushCount.bonaCount}}善事。今日{{item.pushCount.bonaDays}}善，累计{{item.pushCount.bonaTotal}}善</p>
                <!-- 省 觉悟 -->
                <template v-if="item.introspective">
                    <p>【省～觉悟】</p>
                    <p class="c-color">{{item.introspective}}</p>
                </template>
                <!-- 感谢 -->
                <template v-if="item.thanks">
                    <p>【感谢】</p>
                    <p class="c-color">{{item.thanks}}</p>
                </template>
                <!-- 祝愿 -->
                <template v-if="item.volunteer">
                    <p>【祝愿】</p>
                    <p class="c-color">{{item.volunteer}}</p>
                </template>
            </div>
        </div>
        <h5 class="full" @click="fullClick(index)">{{item.fullTxt}}</h5>
        <div class="c-func">
            <div class="c-zan">
                <span class="iconfont icon-jl"></span>
                <span>赞</span>
            </div>
            <div class="c-zan">
            <span class="iconfont icon-jl"></span>
                <span>详情</span>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'clocklist', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        item:{},
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped>

</style>
