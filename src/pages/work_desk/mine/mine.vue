<template>

  <div class="mine">

    <div class="person_information" v-on:click="$router.push('/accountCenter')">
      <div class="img">
        <img v-bind:src="logoPath" v-if="!!logoPath">
        <img src="../../../../static/image/jx_logo_orange.png" v-else>
      </div>
      <div class="person">
        <div class="name">{{adminName}}</div>
        <div class="tel">{{mobile | plusXing(3,4)}}</div>
      </div>
    </div>

    <div class="banner" v-on:click="$router.push('/helpList')">
      <img src="../../../../static/image/mine_banner.png">
    </div>

    <div class="list">
      <div class="message" v-on:click="$router.push('/feedbackList')">
        <div class="title">
          <img src="../../../../static/image/mine_message.png">
          <span>消息</span>
        </div>
        <div class="new_message" v-if="newMessage">您有新消息</div>
      </div>
      <div class="online" v-on:click="customer">
        <div class="title">
          <img src="../../../../static/image/mine_online.png">
          <span>在线客服</span>
        </div>
      </div>
      <div class="tel" v-on:click="call">
        <div class="title">
          <img src="../../../../static/image/mine_tel.png">
          <span>电话咨询</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

  import { customerInit, customerClick } from "../../../../static/js/basic"

  export default {
    name: "mine.vue",

    data () {

      return {

        adminName: '',

        logoPath: '',

        mobile:  '',

      }

    },

    props: ['newMessage'],

    mounted () {

      //美恰初始化
      customerInit({
        name:this.getStorage('userNameEnt'),// 名字
        tel:this.getStorage('mobileEnt'),// 电话
      });

      this.$store.state.workDeskState = 'mine';//控制下方按钮状态
      this.adminName = localStorage.getItem('adminNameEnt');
      this.mobile = localStorage.getItem('mobileEnt');
      (!!localStorage.getItem('logoPathEnt')) && (this.logoPath = localStorage.getItem('logoPathEnt'));


    },

    methods: {

      customer: function () {

        customerClick();

      },


      //拨打电话
      call: function () {

        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

          window.location.href = 'tel: 4008216990';

        }else {

          this.$messagebox({

            title: '提示',
            message: '确定拨打电话：4008216990吗？',
            showCancelButton:true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: true,

          }).then(res=>{

            if(res === 'confirm'){

              window.location.href = 'tel: 4008216990';

            }

          });

        }

      }

    }
  }
</script>

<style scoped lang="less">
  @import "mine.less";
</style>
