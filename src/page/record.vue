<template>
    <div class="groupcard" :class="{mask:popup.mask,isios:isIOS}">
        <div class="calender">
            <div class="ui-datepicker-wrapper ui-datepicker-wrapper-show">
                <div class="header">
                    <span class="datepicker" @click="datePicker">{{headYear}}年{{thisMonthDays.month}}月 <span class="arrow"></span></span>
                    <span class="dategroup" @click="groupPopup"><span class="txt">{{popup.groupName}}</span> <span class="arrow"></span></span>
                  <span class="personal" @click="userPopup"><span class="txt">{{popup.userName}}</span><span class="arrow"></span></span>
                </div>
                <div class="ui-datepicker-body">
                    <div class="datepicker-weekday">
                        <ul class="weekday-head">
                            <li style="color:#E62129">日</li>
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li style="color:#E62129">六</li>
                        </ul>
                        <!-- active -->
                        <ul class="weekday-days">
                            <li v-for="(item,i) in this.thisMonthDays.days" @click="dateClick(i)" :data-date="thisMonthDays.year+'-'+thisMonthDays.month+'-'+item.showDate" :key="'i'+i" :class="{active:item.active,ifDiabled:!item.ifThisMonthDays,card0:item.cardType=='0',card1:item.cardType=='1'}">
                                {{item.showDate}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="faBox">
                <p><i style="background: #E62129;"></i><span>已打卡</span></p>
                <p><i style="background: #0DC830;"></i><span>缺卡</span></p>
            </div>
            <div class="cardPer">
                <template v-if="type=='groups'">
                    <p>
                        <span class="tit">打卡人数：{{cardStatistics.cardsPer.length}}人</span>
                        <span v-if="cardStatistics.cardsPer.length>0">({{cardStatistics.cardsPer.join(',')}})</span>
                    </p>
                    <p>
                        <span class="tit">缺卡人数：{{cardStatistics.noCardsPer.length}}人</span>
                        <span v-if="cardStatistics.noCardsPer.length>0">({{cardStatistics.noCardsPer.join(',')}})</span>
                    </p>
                </template>
                <template v-else>
                    <p>
                        <span class="tit">打卡次数：{{cardStatistics.userCard}}次</span>
                    </p>
                    <p>
                        <span class="tit">缺卡次数：{{cardStatistics.noUserCard}}次</span>
                    </p>
                </template>
            </div>
            <van-popup v-model="popup.mask" position="bottom" :overlay="true">
                <mt-picker :slots="popup.slots" value-key="groName" ref="picker"></mt-picker>
                <button @click="confirm" class="sureBtn">确定</button>
            </van-popup>
            <van-popup v-model="dateObj.dateMask" position="bottom" :overlay="true">
              <van-datetime-picker
                type="year-month"
                :formatter="dateConfirm"
                :min-date="dateObj.minDate"
                :max-date="dateObj.maxDate"
                v-model="dateObj.date"
                @confirm="confirm"
              ></van-datetime-picker>
            </van-popup>
        </div>
        <v-clock :clocklist="list"></v-clock>
        <v-popup :popup-type="'recordTip'" :popup-show="mask" @sure="sureFn"></v-popup>
    </div>
</template>
<script>
import { groups,CardRecord } from '@/api/index'
export default {
    name: "groupcard",
    data() {
        return {
            ret: [],
            thisMonthDays: {},
            headYear:'',//顶部年
            setYear: new Date().getFullYear(),
            setMonth: new Date().getMonth()+1,
            setDay:new Date().getDate(),
            signMark: [],
            groups:[],//群组列表
            pageList: {total: '',pageNo:1,pageSize:2},
            list:[],//打卡记录list
            type:'groups',//模式，个人or群组
            groupArr:[],//打卡日历list
            groupCreat:'',
            cardStatistics:{
                cardsPer:[],//群组内打卡人
                noCardsPer:[],//群组内缺卡人
                userCard:'',//个人打卡次数
                noUserCard:'',//个人缺卡次数
            },
            popup:{
                mask:false,
                slots:[{
                    values:[],
                }],
                groupName:'选择群组',
                userName:'选择个人',
                groupid:'',
                userid:'',
            },
            dateObj:{
              dateMask:false,
              minDate:new Date('2019-01'),
              maxDate:new Date(),
              date:''
            },
            mask:false,
            isIOS:false
        };
    },
    created() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
          this.isIOS=true;
        }
        this.loading();
        //首次加载静态日历
        this.getMonthData(this.setYear,this.setMonth,true);
        var list=localStorage.getItem('groupList');
        list=JSON.parse(list);
        if(list=='undefined'||list.length==0){
          this.mask=true;
        }
        this.groups=list;
        this.popup.groupName=list[0].groName;
        this.popup.groupid=list[0].groId;
        this.getGroupsDate(this.groups[0].groId,this.setYear+'-'+this.fillZero(this.setMonth)+'-01');
        this.getGroupsUser(this.groups[0].groId,this.setYear+'-'+this.fillZero(this.setMonth)+'-'+this.fillZero(this.setDay))
    },
    mounted: function() {
        if(this.groups&&this.groups.length!=0){
            this.getSignData();
        }
    },
    methods: {
        //确定跳转
        sureFn(){
          this.$router.push({path:'/nav/group'})
        },
        //
        dateConfirm(type,value){
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`
          }
          return value;
        },
        //日期选择
        datePicker(){
          this.dateObj.dateMask=true;
        },
        //群组选择
        groupPopup(){
            this.popup.slots[0].values=this.groups;
            this.type='groups';
            //群组选择时,置空个人
            this.popup.userName='选择个人';
            this.popup.userid='';
            this.popup.mask=true;
        },
        //确认
        confirm(pick){
            let picker=this.$refs.picker.getValues()[0];
            let year=this.setYear,
                mon=this.fillZero(this.setMonth),
                da=this.fillZero(this.setDay);
            if(this.dateObj.dateMask){
              year=pick.getFullYear();
              mon=this.fillZero(pick.getMonth()+1);
              da='01';
            }
            let timeStr=year+'-'+mon+'-'+da;
            //每次点击确认，重置页码
            this.pageList={total: '',pageNo:1,pageSize:2};

            if(this.type=='groups'){
                this.loading();
                this.popup.groupName=picker.groName;
                this.popup.groupid=picker.groId;
                //群组打卡
                this.getGroupCard(this.popup.groupid,timeStr);
                //群组日历
                this.getGroupsDate(this.popup.groupid,this.setYear+'-'+this.fillZero(this.setMonth)+'-01');
                //群组统计
                this.getGroupsUser(this.popup.groupid,timeStr)
                //群组成员
                // this.userPopup();
            }else if(this.type=='user'){
                this.loading();
                this.popup.userName=picker.name;
                this.popup.userid=picker.pkid;
                //个人打卡
                this.getUserCard(picker.pkid,timeStr);
                //个人日历
                this.getUsersDate(picker.pkid,this.setYear+'-'+this.fillZero(this.setMonth)+'-01')
            }
            this.popup.mask=false;
            this.dateObj.dateMask=false;
        },
        //个人选择
        userPopup(){
            let data={
                pageNo:1,
                pageSize:100,
                groId:this.popup.groupid,//
            }
            let that=this;
            CardRecord.groupPerson(data).then(res =>{
                if(res.data.list.length>0){
                    for(let x of res.data.list){
                        x.groName=x.name
                    }
                    that.popup.slots[0].values=res.data.list
                    that.type='user';
                    that.popup.mask=true;
                }
            })
        },
        dateClick(i){//选中日期
            let arr=this.ret;
            let day=arr[i].showDate;
            let month=arr[i].month;
            let ye=this.thisMonthDays.year;
            let str=ye+'-'+this.fillZero(month)+'-'+day;
            let time=new Date(str+' 00:00:00').getTime();
            let nowTime=new Date().getTime();
            if(nowTime>time){
                for(let x of arr){
                    x.active=false;
                }
                arr[i].active=true;
            }
            this.$set(this.ret,arr);
            //每次切换日期，重置页码
            this.pageList={total: '',pageNo:1,pageSize:2};
            if(this.type=='groups'){
                //群组打卡
                this.getGroupCard(this.popup.groupid,str);
                //群组统计
                this.getGroupsUser(this.popup.groupid,str);
            }else{
                this.getUserCard(this.popup.userid,str);
            }

        },
        //小于10前置补0
        fillZero(s) {
            return s < 10 ? '0' + s : s;
        },
        //日历初始化
        getMonthData(year,month,first){
            let groupArr=this.groupArr;
            // groupArr=['01','02'];
            var firstDay = new Date(year,month - 1, 1);
            var firstDayWeekDay = firstDay.getDay();
            if(firstDayWeekDay === 0) firstDayWeekDay = 7;

            year = firstDay.getFullYear();
            month = firstDay.getMonth() + 1;

            var lastDayOfLastMonth = new Date(year,month-1,0);
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

            var preMonthDayCount = firstDayWeekDay - 1;

            var lastDay = new Date(year,month,0);
            var lastDate = lastDay.getDate();
            this.ret = [];
            // let that=this;
            for (var i = 0; i < 35; i++) {
                var date = i - preMonthDayCount;
                var showDate = date;
                var thisMonth = month;
                var ifThisMonthDays = true;

                if (date <= 0) {
                    //上一月
                    thisMonth = month - 1;
                    showDate = lastDateOfLastMonth + date;
                    ifThisMonthDays = false;
                } else if(date > lastDate){
                    //下一月
                    thisMonth = month + 1;
                    showDate = showDate -lastDate;
                    ifThisMonthDays = false;
                }
                if (thisMonth === 0) thisMonth = 12;
                if (thisMonth === 13) thisMonth = 1;
                let active=false;
                let cardType='';
                //如果第一次进，不载数据
                if(!first){
                  if(this.setDay!=''&&showDate==this.setDay&&ifThisMonthDays&&year==this.setYear&&month==this.setMonth){
                    active=true;
                  }
                  let sss=this.setYear+'-'+this.fillZero(this.setMonth)+'-'+this.fillZero(showDate),
                      dateTime=new Date(sss).getTime(),
                      creatTime=new Date(this.groupCreat).getTime();
                    if(groupArr.length>0){
                      for(let x of groupArr){
                        let days=new Date(x.date).getTime();
                        if(ifThisMonthDays&&days==dateTime){
                          cardType='0';//打卡
                          break
                        }else if(ifThisMonthDays&&days!=dateTime&&showDate<this.setDay&&dateTime>=creatTime){
                          cardType='1'
                        }else{
                          cardType=''
                        }
                      }
                    }else{
                      if(ifThisMonthDays&&showDate<this.setDay&&dateTime>=creatTime){
                        cardType='1'
                      }else{
                        cardType=''
                      }
                    }
                }




                this.ret.push({
                    month: thisMonth,
                    date:date,
                    showDate: this.fillZero(showDate),
                    ifThisMonthDays: ifThisMonthDays,//是否为当月
                    active:active,//是否选中
                    cardType:cardType,//是否打卡
                });
            }
            this.thisMonthDays = {
                year: year,
                month: this.fillZero(month),
                days: this.ret
            }
            this.headYear=year+'';
            this.headYear=this.headYear.substr(2);
            return {
                year: year,
                month: month,
                days: this.ret
            };
        },
        sh(){
            let bodyScrollHeight = 0
            let documentScrollHeight = 0
            if (document.body) {
                bodyScrollHeight = document.body.scrollHeight
            }
            if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight
            }
            return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
        },
        //监听滚轮
        scrollgun(){
            let getSt=document.documentElement.scrollTop || document.body.scrollTop,
            getWh=document.documentElement.clientHeight || document.body.clientHeight;
            let scrollBottom=this.sh()-(getSt+getWh),//滚动条距离底部距离
            rem=parseInt(window.getComputedStyle(document.documentElement)["fontSize"]),
            h=20;
            if(this.noGet){
            return false
            }
            if(!this.isScroll){
            return false
            }
            if(scrollBottom<h){
                this.isScroll=false;
                this.pageList.pageNo+=1;
                let str=this.setYear+'-'+this.fillZero(this.setMonth)+'-'+this.fillZero(this.setDay);
                if(this.type=='groups'){
                    //群组打卡
                    this.getGroupCard(this.popup.groupid,str);
                }else{
                    this.getUserCard(this.popup.userid,str);
                }
            }
        },
        getSignData(str){
            let that=this;
            if(!str){
                str=this.setYear+'-'+this.fillZero(this.setMonth)+'-'+this.fillZero(this.setDay)
            }
            //群組打卡
            that.getGroupCard(this.groups[0].groId,str);
        },
        //群組日历
        getGroupsDate(gorid,str){
            let arr=[];
            let data={
                groId:gorid,//
                date:str,
            };
            CardRecord.groupsDate(data).then(res =>{
                if(res.data.list.length>0){
                    for(let x of res.data.list){
                        if(x.lostCount==0){
                          let data={
                            date:x.days
                          }
                          arr.push(data);
                        }
                    }
                    this.groupArr=arr;
                }
                this.groupCreat=res.data.created;
                this.hideLoading();
                //日历初始化
                this.getMonthData(this.setYear,this.setMonth);
            })
        },
        //群组打卡
        getGroupCard(gorid,str){
            let that=this;
            let data={
                pageNo:this.pageList.pageNo,
                pageSize:this.pageList.pageSize,
                groId:gorid,//
                pushd:str,
            }
            if(data.pageNo==1){
                that.list=[];
            }
            CardRecord.groupsCard(data).then( res => {
                // that.hideLoading();
                that.isScroll=true;
                if(res){
                    if(that.pageList.pageNo>1){
                        that.list = that.list.concat(res.data.list);
                        that.pageList.total = res.data.total;
                    }else{
                        that.list = res.data.list;
                        that.pageList.total = res.data.total;
                    }
                    if(res.data.total==that.list.length||that.list.length<that.pageList.pageSize){
                        that.noGet=true;//如果返回总条数等于当前list长度
                    }
                }
                that.list.forEach(el => {
                    el.isFull=false;
                    el.fullTxt='全文'
                });
            })
        },
        //群组打卡统计
        getGroupsUser(gorid,str){
            let that=this;
            let data={
                groId:gorid,//
                date:str,
            }
            CardRecord.groupsUser(data).then( res => {
                // this.hideLoading();
                if(res.data){
                    that.cardStatistics.cardsPer=res.data.push;
                    that.cardStatistics.noCardsPer=res.data.lost;
                }
            })
        },
        //个人打卡
        getUserCard(userId,str){
            let that=this;
            let data={
                pageNo:this.pageList.pageNo,
                pageSize:this.pageList.pageSize,
                userId:userId,//
                pushd:str,
            }
            if(data.pageNo==1){
                that.list=[];
            }
            CardRecord.userCard(data).then( res => {
                // this.hideLoading();
                that.isScroll=true;
                if(res){
                    if(that.pageList.pageNo>1){
                        that.list = that.list.concat(res.data.list);
                        that.pageList.total = res.data.total;
                    }else{
                        that.list = res.data.list;
                        that.pageList.total = res.data.total;
                    }
                    if(res.data.total==that.list.length||that.list.length<that.pageList.pageSize){
                        that.noGet=true;//如果返回总条数等于当前list长度
                    }
                }
                that.list.forEach(el => {
                    el.isFull=false;
                    el.fullTxt='全文'
                });
            })
        },
        //个人日历
        getUsersDate(userid,str){
            let arr=[];
            let data={
                user:userid,//
                date:str,
            };
            CardRecord.usersDate(data).then(res =>{
                this.hideLoading();
                if(res.data.list.length>0){
                    for(let x of res.data.list){
                        let data={
                            date:x.pushd,
                        }
                        this.groupCreat=x.created
                        arr.push(data);
                    }
                }

                this.groupArr=arr;
                this.cardStatistics.userCard=res.data.pushCount;
                this.cardStatistics.noUserCard=res.data.lostCount;
                //日历初始化
                this.getMonthData(this.setYear,this.setMonth);
            })
        }
    }
};
</script>
<style lang="less">
  .picker-slot{
    width: 80%;
  }
.picker-item{
    font-size: 28px
}
.picker-item.picker-selected{
    font-size: 32px
}
.van-picker-column__item{
  font-size: 32px;
}
body .van-picker__cancel,body .van-picker__confirm{
  font-size: 28px;
  color: #E62129;
  padding: 0 20px;
}
body .van-picker__toolbar{
  height: 80px;
  line-height: 80px;
}
body .mask{
  max-height: 100vh;
  overflow: hidden;
}
  body .picker-items{
    padding:45px 0;
  }
 .isios .van-popup--bottom{
   bottom:0;
    height:25vh;
   .picker{
     height: 100%;
     .picker-items{
       height: 100%;
     }
     .picker-item{
       height: 44px !important;
       line-height: 44px !important;
     }
      .picker-center-highlight{
        height: 44px !important;
      }
   }
 }


.sureBtn{
    font-size: 28px;
    border: none;
    background: #fff;
    color: #E62129;
    position: absolute;
    top: 20px;
    right: 20px;
}
.calender {
    border-bottom: 16px solid #f5f5f5;
    background: #fff;
    width: 100%;
    .ui-datepicker-wrapper {
        width: 100%;
        font-size: 24px;
        color: #666;
        .ui-datepicker-wrapper-show {
            display: block;
        }
        .header {
            height: 104px;
            line-height:104px;
            display: flex;
            justify-content: space-around;
            font-size:32px;
            color: #999;
            span{
                display: flex;
                align-items: center;
                /*position: relative;*/
            }
            .dategroup{
                color: #000;
                font-weight:500;
            }
            .txt{
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
            .arrow{
                /*position: absolute;*/
                /*right: -38px;*/
                width: 23px;
                height: 12px;
                background-image: url("../assets/img/jt.png");
                background-size: cover;
                display: inline-block;
                margin-left: 15px;
            }
        }
        .weekday-head {
            display: flex;
            justify-content: space-around;
            background: #fafafa;
            li {
                height:48px;
                line-height:48px;
                font-size:24px;
                font-weight: bold;
            }
        }
        .weekday-days {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 0 7px;
            margin: 0 auto;
            background: #fafafa;
            color:#999;
            li {
                background: #fff;
                text-align: center;
                height:88px;
                line-height: 88px;
                font-size: 32px;
                width: 100px;
                margin-bottom: 7px;
                border-radius: 3px;
                border: 3px solid #fff;
                box-sizing: border-box;
            }
            .ifDiabled {
                color: #fff;
            }
            .active{
                border-color: #E62129
            }
            .card0{
                color: #E62129
            }
            .card1{
                color: #0DC830
            }
        }
    }
    .faBox{
        background: #fafafa;
        padding-left: 35px;
        height: 62px;
        line-height: 62px;
        display: flex;
        justify-content: flex-start;
        p{
            margin-right: 32px;
            display: flex;
            align-items: center;
        }
        i{
            width: 21px;
            height: 21px;
            border-radius:3px;
            margin-right: 8px;
            display: inline-block
        }
    }
    .cardPer{
        padding: 30px 38px;
        p{
            width: 100%;
        }
        span{
            font-size: 24px;
            color: #ccc;
            max-width:calc(100% - 76px);
        }
        .tit{
            color: #999;
            margin-right: 10px
        }
    }
}

</style>
