<template>
  <div class="forget_password">

    <div class="input">

      <div class="tel_input">
        <img src="../../../../static/image/login_phone.png">
        <input type="text" placeholder="请输入企业管理员手机号" v-model="mobile" maxlength="11">
      </div>

      <div class="code">
        <img src="../../../../static/image/login_pen.png">
        <input type="text" placeholder="请输入验证码" v-model="code">
        <div class="get_code"
             v-bind:class="codeShow ? 'background_linear_gradient' : 'gray_background'"
             v-on:click="getCodeCheck">
          <span v-if="codeShow">{{codeText}}</span>
          <span v-else>{{$store.state.seconds}}s后再次获取</span>
        </div>
      </div>

      <div class="password_input">
        <img src="../../../../static/image/login_password.png">
        <input type="password" placeholder="6-20位字母数字密码" v-model="password">
      </div>

      <div class="password_input">
        <img src="../../../../static/image/login_password.png">
        <input type="password" placeholder="请再次输入密码" v-model="passwordAgain">
      </div>

    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

    <div class="get_sound_code">没有收到验证码？请尝试获取 <span class="color_text">语音验证码</span></div>

  </div>
</template>
<script>

  import commonButton from '../../../component/common_button/common_button'
  export default {

    name: 'forgetPassword',

    components: {
      commonButton
    },

    data () {

      return {

        btnName: '确认',

        mobile: '',

        code: '',

        password: '',

        passwordAgain: '',

        codeText: '获取验证码'

      }

    },

    methods: {

      checkMobile: function () {

        var message;

        if(this.mobile === ''){

          message = '请输入管理员手机号';

        }else if(this.mobile.length < 11 || Number.isNaN(+this.mobile) || this.mobile.indexOf('1') !== 0){

          message = '请输入正确的手机号';

        }else{

          return true;

        }

        this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

        return false;

      },


      getCodeCheck: function () {

        if(!this.checkMobile()) return;

        if(this.codeShow){

          this.getCode();

        }

      },


      countDown: function () {

        this.$store.state.seconds = 60;

        this.codeText = '再次获取';

        this.$store.state.countdown();

      },


      getCode: function () {

        /**
         * 接口：忘记密码发送短信
         * 请求方式：GET
         * 接口：jx/action/forgetmsg
         * 入参：mobile
         **/
        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'jx/action/forgetmsg',

          params: {

            mobile:this.mobile,

          }

        }).then(res=>{

          if(res.data.code === '0000'){

            this.countDown();

          }

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

        }).catch(res=>{

          console.log(res);

        });

      },

      submit: function () {

        if(!this.checkAll()) return;

        /**
         * 接口：忘记密码
         * 请求方式：POST
         * 接口：set/safety/retrievalpwd
         * 入参：mobile, code, password, confirmPassword
         **/
        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'set/safety/retrievalpwd',

          params: {

            mobile:this.mobile,

            code: this.code,

            password: hexMD5(this.password),

            confirmPassword: hexMD5(this.passwordAgain)

          }

        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            setTimeout(()=>{

              this.$router.go(-1);

            },500);

          }

        }).catch(res=>{

          console.log(res);

        });

      },

      checkAll: function () {

        if(!this.checkMobile()) return;

        var message;

        var pasdRegex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//(6-16位，大小字母以及数字)

        if(this.code === ''){

          message = '请输入验证码';

        }else if(this.code.length < 6){

          message = '请输入正确的验证码';

        }else if(this.password === ''){

          message = '请输入密码';

        }else if(this.passwordAgain === ''){

          message = '请再次输入密码';

        }else if(!pasdRegex.test(this.password)){

          message = '请输入6-20位字母数字密码';

        }else if(this.password !== this.passwordAgain){

          message = '请确认两次密码相同';

        }else {

          return true;

        }

        this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

        return false;

      }

    },


    computed: {

      codeShow: function () {

        return ((this.$store.state.seconds === 0) || (this.$store.state.seconds === 61)) ? true: false;

      }

    },

    destroyed () {

      this.$toast.close();

    }

  }
</script>
<style lang="less" scoped >
  @import "forget_password.less";
</style>
