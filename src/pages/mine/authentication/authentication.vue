<template>
  <div class="authentication">

    <div class="title">更换登录账号，需验证当前登录账号身份</div>

    <div class="img">
      <img src="../../../../static/image/jx_authentication.png">
    </div>

    <div class="code">验证码已发送至{{mobile | plusXing(3,4)}}，{{$store.state.seconds}}s后可<span
      v-bind:class="$store.state.seconds === 0 ? 'get_code_color': 'gray_color'" v-on:click="getCode">重新获取</span>
    </div>

    <div class="code_input">

      <div class="input_img">
        <img src="../../../../static/image/jx_authentication_input.png">
      </div>

      <div class="input">
        <input type="number" placeholder="请输入验证码">
      </div>

    </div>

    <commonButton v-bind:btnName="btnName"></commonButton>

    <div class="sound_code">没有收到验证码？请尝试获取<span class="color_text" v-on:click="getVoiceCode">语音验证码</span></div>

  </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "authentication.vue",

    components: {

      commonButton: commonButton

    },

    data () {

      return {

        btnName: '更换手机号',

        mobile: ''

      }

    },


    mounted () {

      this.mobile = localStorage.getItem('mobile');

      this.$store.state.seconds = 0;

      this.getCode();

    },


    methods: {

      getCode: function () {

        if(this.$store.state.seconds !== 0){

          return;

        }

        this.$store.state.seconds = 60;

        /*
        * 接口：管理员账号修改-原手机验证
        * 请求方式： GET
        * 接口：jx/action/oldcheckmsg
        * 入参： null
        * */
        this.$http({

          url: process.env.API_ROOT + 'jx/action/oldcheckmsg',

          method: 'get',

        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            this.$store.state.countdown();

          }else {

            this.$store.state.seconds = 0;

          }

        })
      },

      submit: function () {



      },


      getVoiceCode: function () {



      }

    }
  }
</script>

<style scoped lang="less">
  @import "authentication.less";
</style>
