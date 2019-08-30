<template>
  <div class="authentication">

    <div class="title">更换登录账号，需验证当前登录账号身份</div>

    <div class="img">
      <img src="../../../../static/image/jx_authentication.png">
    </div>

    <div class="code">验证码已发送至{{mobile | plusXing(3,4)}}，{{seconds}}s后可<span
      v-bind:class="seconds === 0 ? 'get_code_color': 'gray_color'" v-on:click="getCode">重新获取</span>
    </div>

    <div class="code_input">

      <div class="input_img">
        <img src="../../../../static/image/jx_authentication_input.png">
      </div>

      <div class="input">
        <input type="number" placeholder="请输入验证码" v-model="code" maxlength="6">
      </div>

    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

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

        btnName: '更换手机号',//按钮名称

        mobile: '',//用户账号

        code: '',//验证码

        seconds: 0,//倒计时

        getVoiceCode: this.getVoiceCodeCountDown(),//获取语音验证码

      }

    },


    mounted () {

      this.mobile = localStorage.getItem('mobileEnt');

      this.getCode();

    },


    methods: {

      //获取验证码
      getCode: function () {

        if(this.seconds !== 0){

          return;

        }

        this.seconds = 60;

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

            var countdown = setInterval(()=>{

              this.seconds--;

              if(this.seconds <=0 ){

                clearInterval(countdown);

              }

            },1000);

          }else {

            this.seconds = 0;

          }

        }).catch(res=>{

          console.log(res);

        })
      },

      //提交验证码
      submit: function () {

        var message;

        if(this.code === ''){

          message = '请输入验证码';

        }else if(this.code.length < 6){

          message = '请输入正确的验证码';

        }else{

          /*
          * 接口： 管理员账号修改，原号码验证
          * 请求方式： POST
          * 接口： set/safety/accountcheck
          * 入参： code
          * */
          this.$http({

            url: process.env.API_ROOT + 'set/safety/accountcheck',

            method: 'post',

            params: {

              code: this.code

            }

          }).then(res=>{

            this.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

            if(res.data.code === '0000'){

              localStorage.setItem('originCodeEnt', this.code);

              this.$router.push('/changeTelCertification');

            }

          }).catch(res=>{

            console.log(res);

          });

          return;

        }

        this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

      },


      //获取语音验证码
      getVoiceCodeCountDown: function () {

        var _this = this;

        var seconds = 60;

        var _getVoiceCode = function (){

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
            * 接口： 管理员账号修改-原手机语音验证
            * 请求方式： GET
            * 接口： jx/action/oldcheckmsgaudio
            * 入参： null
            * */

            _this.$http({

              url: process.env.API_ROOT + 'jx/action/oldcheckmsgaudio',

              method: 'get',

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
  @import "authentication.less";
</style>
