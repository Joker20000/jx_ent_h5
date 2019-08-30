<template>
    <div class="change_tel_certification">

      <div class="change_new_tel_ps">
        <img src="../../../../static/image/jx_prompt.png">
        <span>下次登录请使用更换的新手机号码，账户其他信息不变</span>
      </div>
      <div class="change_new_tel_input">
        <div class="change_new_tel_tel">
          <i class="iconfont iconsign_phone color_text"></i>
          <input type="text" placeholder="请输入手机号"  pattern="\d*" v-model="mobile" maxlength="11">
        </div>
        <div class="change_new_tel_code">
          <i class="iconfont iconsign_pen color_text"></i>
          <input type="text" placeholder="请输入验证码"  pattern="\d*" v-model="code" maxlength="6">
          <div class="get_code">
            <span v-on:click="getCode" v-if="seconds === '' || seconds === 0">{{codeText}}</span>
            <span class="gray_color" v-else>{{seconds}}s重新获取</span>
          </div>
        </div>
      </div>

      <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

      <div class="get_sound_code">没有收到验证码？请尝试获取<span class="color_text" v-on:click="getVoiceCode">语音验证码</span></div>

    </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "change_tel_certification.vue",

    components: {

      commonButton

    },

    data () {

      return {

        btnName: '更换手机号',//按钮名称

        mobile: '',//用户账号

        code: '',//验证码

        seconds: '',//倒计时

        codeText: '获取验证码',//获取验证码按钮显示文案

        getVoiceCode: this.getVoiceCodeCountDown(),//获取语音验证码

      }

    },


    methods: {

      //检测账号
      checkMobile: function () {

        var message;

        if(this.mobile === ''){

          message = '请输入手机号';

        }else if(this.mobile.indexOf('1') !== 0 || Number.isNaN(+this.mobile)){

          message = '请输入正确的手机号';

        }else if(this.mobile === localStorage.getItem('mobileEnt')){

          message = '请输入与当前手机号不同的手机号';

        }else{

          return true;

        }this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

        return false;

      },

      //检测页面输入信息
      check: function () {

        var message;

        if(!this.checkMobile()){

          return false;

        }

        if(this.seconds === ''){

          message = '请先获取验证码';

        }else if(this.code === ''){

          message = '请输入验证码';

        }else if(this.code.length < 6){

          message = '输入验证码有误';

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


      //获取验证码
      getCode: function () {

        if(!this.checkMobile()){

          return ;

        }

        if(this.seconds !== '' && this.seconds !== 0){

          return;

        }

        /*
        * 接口： 管理员账号修改-新手机验证
        * 请求方式： GET
        * 接口： jx/action/newcheckmsg
        * 入参： mobile
        * */
        this.$http({

          url: process.env.API_ROOT + 'jx/action/newcheckmsg',
          method: 'get',
          params: {

            mobile: this.mobile

          }

        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            this.seconds = 60;

            var countdown = setInterval(()=>{

              this.seconds--;

              if(this.seconds <= 0){

                clearInterval(countdown);

                this.codeText = '再次获取';

              }

            },1000);

          }else {

            this.seconds = 0;

          }

        })

      },


      //更换手机号
      submit: function () {

        if(!this.check()) return;

        this.$http({

          url: process.env.API_ROOT + 'set/safety/accountchange',

          method: 'post',

          params: {

            mobile: this.mobile,

            code: this.code,

            originCode: localStorage.getItem('originCodeEnt'),

            adminId: localStorage.getItem('adminIdEnt')

          }

        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            localStorage.removeItem('originCodeEnt');

            localStorage.setItem('mobileEnt',this.mobile);

            this.$router.push('/accountCenter');

          }

        })

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
            * 接口： 管理员账号修改-新手机语音验证
            * 请求方式： GET
            * 接口： jx/action/newcheckmsgaudio
            * 入参： mobile
            * */

            _this.$http({

              url: process.env.API_ROOT + 'jx/action/newcheckmsgaudio',

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

<style scoped lang="less">
  @import "change_tel_certification.less";
</style>
