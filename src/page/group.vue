<template>

  <div class="group">
    <van-collapse v-model="activeName" accordion>
      <van-cell title="群通知" is-link to="/notice" />

      <van-cell title="创建打卡群" is-link to="/create" />

      <van-cell title="查找打卡群" is-link to="/apply" />

      <van-collapse-item :title='this.createstle' name="1">
        <div class="group-p">
          <div class="group-list ld-left g-h" v-for="(e,i) in creates" :key='i' >
            <div class="group-img">
              <img :src="e.imgUrl" alt="">
            </div>
            <div class="group-name">
              <p>{{e.groName}}</p>
              <p class="member">
                <img src="../assets/img/person (1).png" alt="">{{e.name}}
              </p>
            </div>
          </div>
        </div>
      </van-collapse-item>

      <van-collapse-item :title='this.jointle' name="2">
        <div class="group-p">
          <div class="group-list ld-left" v-for="(e,i) in join" :key='i' >
            <div class="group-img">
              <img :src="e.imgUrl" alt="">
            </div>
            <div class="group-name">
              <p>{{e.groName}}</p>
              <p class="member">
                <img src="../assets/img/person (1).png" alt="">{{e.name}}
              </p>
              <p class="member">
                <img src="../assets/img/double (1).png" alt="">{{e.userCount}}人
              </p>
            </div>
          </div>
        </div>
      </van-collapse-item>

    </van-collapse>
  </div>

</template>
<script>
import { groups } from "@/api/index";
export default {
    data() {
      return {
        activeName: "",
        join: [],
        creates: [],
        jointle: '',
        createstle: '',

      };
    },  
    methods: {
      gainGroup() {
        groups({}).then( res => {
          console.log(res,46)
           if(res.code == 1) {
              this.join = res.data.join
              this.creates = res.data.create
              this.jointle = res.data.join.length == 0 ? '我加入的群' : '我加入的群(' + res.data.join.length + ')'
              this.createstle  = res.data.create.length == 0 ? '我创建的群' : '我创建的群(' + res.data.create.length + ')'

           }
        })
      }
    },
    created () {
      this.gainGroup()
    },
    components: {}
};
</script>
<style lang='less'>
.group {
  background: #f5f5f5;
  .group-p {
    padding: 0 36px;
    
    .group-list {
      height: 168px;
      box-sizing: border-box;
      border-bottom: 1px solid #f2f2f2;
      .group-img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin-top: 20px;
        margin-right: 32px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .group-name {
        margin-top: 25px;
        font-size: 36px;
        color: #000;
        .member {
          font-size: 24px;
          margin-top: 5px;
          color: #999;
          img {
            margin-right: 14px;
          }
        }
      }
    }
    .g-h {
      height: 126px;  
    }
  }
}
</style>
