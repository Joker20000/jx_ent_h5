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
        <div class="get_code" v-on:click="getCodeCheck"
             v-bind:class="(seconds === '' || seconds === 0) ? 'background_linear_gradient' : 'gray_background'">
          <span v-if="(seconds === '' || seconds === 0)">{{codeText}}</span>
          <span v-else>{{seconds}}s后再次获取</span>
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

    <div class="get_sound_code">没有收到验证码？请尝试获取 <span class="color_text" v-on:click="getVoiceCode">语音验证码</span></div>

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

        btnName: '确认',//按钮名称

        mobile: '',//用户账号

        code: '',//验证码

        password: '',//密码

        passwordAgain: '',//验证码密码

        codeText: '获取验证码',//验证码按钮显示

        seconds: '',//验证码按钮倒计时

        getVoiceCode: '',//获取语音验证码事件

      }

    },


    created () {

      this.getVoiceCode = this.getVoiceCodeCountDown();

    },

    methods: {

      //检测手机号
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


      //检测获取验证码条件
      getCodeCheck: function () {

        if(this.checkMobile() && (this.seconds === 0 || this.seconds === '')){

          this.getCode();

        }

      },


      //倒计时
      countDown: function () {

        this.seconds = 60;

        var countdown = setInterval(()=>{

          this.seconds--;

          if(this.seconds <= 0){

            clearInterval(countdown);

            this.codeText = '再次获取';

          }

        },1000);

      },


      //获取验证码
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

      //重置密码
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

      //检测页面信息
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

      },


      //获取语音验证码
      getVoiceCodeCountDown: function () {

        var _this = this;

        var seconds = 60;

        var _getVoiceCode = function (){

          if(!_this.checkMobile()) return;

          if(seconds !== 0 && seconds !== 60){

            _this.$toast({

              message: '请勿在1分钟内多次发送短信',
              position: 'middle',
              duration: 1500

            });

            return;

          }else {

            seconds = 60;

            /*
            * 接口： 忘记密码-发送语音短信
            * 请求方式： GET
            * 接口： jx/action/forgetmsgaudio
            * 入参： mobile
            * */

            _this.$http({

              url: process.env.API_ROOT + 'jx/action/forgetmsgaudio',

              method: 'get',

              params: {

                mobile: _this.mobile

              }

            }).then(res=>{

              _this.$toast({

                message: res.data.msg,
                position: 'middle',
                duration: 1500

              });

              if(res.data.code === '0000'){

                var countdown = setInterval(()=>{

                  seconds--;

                  if(seconds <= 0){

                    clearInterval(countdown);

                  }

                },1000);

              }

            })

          }

        };

        return _getVoiceCode;

      }

    }

  }
</script>
<style lang="less" scoped >
  @import "forget_password.less";
</style>
