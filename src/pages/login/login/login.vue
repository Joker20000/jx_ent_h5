<template>

  <div class="login">

    <div class="img">
      <img src="../../../../static/image/login_background_img.png">
    </div>

    <div class="input">

      <div class="tel_input">

        <img src="../../../../static/image/login_phone.png">

        <input type="number" placeholder="请输入企业管理员手机号" v-model="mobile" @blur="lostPointFn" pattern="\d*">

      </div>

      <div class="password_input">

        <img src="../../../../static/image/login_password.png">

        <input type="password" placeholder="请输入密码" v-model="password" @blur="lostPointFn">

      </div>

    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

    <div class="forget_password color_text" v-on:click="$router.push('/forgetPassword')">忘记密码？</div>

    <div class="ps">注册请前往PC端官网：https://www.99payroll.cn</div>

  </div>

</template>
<script>
  import commonButton from '../../../component/common_button/common_button'

  export default {

    name: 'login',

    components: {

      commonButton: commonButton

    },

    data () {

      return {

        btnName: '登录',//按钮名称

        mobile: '',//用户账号

        password: '',//用户密码

      }

    },


    mounted () {

      this.focusFn();

    },

    methods: {

      //备注失去焦点恢复页面（ios输入法）
      lostPointFn:function () {

        document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 100;

      },

      //登录
      submit: function () {

        if(this.check()){

          /**
           * 接口：登录
           * 请求方式：POST
           * 接口：jx/action/login
           * 入参：mobile，password,code
           **/
          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'jx/action/login',

            params: {

              mobile:this.mobile,

              password:hexMD5(this.password),

              source: 1

            }


          }).then(res=>{

            if(res.data.code === '0000'){

              localStorage.setItem('adminIdEnt',res.data.data.adminId);
              localStorage.setItem('adminNameEnt',res.data.data.adminName);
              localStorage.setItem('adminTypeEnt', res.data.data.adminType);
              localStorage.setItem('entIdEnt', res.data.data.entId);
              localStorage.setItem('entNameEnt', res.data.data.entName);
              localStorage.setItem('createDateEnt', res.data.data.createDate);
              localStorage.setItem('isActiveEnt', res.data.data.isActive);
              localStorage.setItem('isCancelEnt', res.data.data.isCancel);
              localStorage.setItem('isFirstLoginAfterOnlieEnt', res.data.data.isFirstLoginAfterOnlie);
              localStorage.setItem('mobileEnt', res.data.data.mobile);
              localStorage.setItem('signStateEnt', res.data.data.signState);
              localStorage.setItem('verifyStateEnt', res.data.data.verifyState);
              (!!res.data.data.logoPath) ? (localStorage.setItem('logoPathEnt', res.data.data.logoPath)) : (localStorage.removeItem('logoPathEnt'));
              this.$router.push('/workDesk/homepage');

            }else {

              this.$toast({

                message: res.data.msg,
                position: 'middle',
                duration: 1500

              });

            }

          }).catch(res=>{

            console.log(res);

          });

        }

      },


      //检测
      check: function () {

        var message;

        if(this.mobile === ''){

          message = '请输入企业管理员手机号';

        }else if(this.mobile.length < 11 || Number.isNaN(+this.mobile) || this.mobile.indexOf('1') !== 0){

          message = '请输入正确的企业管理员手机号';

        }else if(this.password === ''){

          message = '请输入密码'

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


      focusFn: function () {

        document.getElementsByClassName('login')[0].style.height = window.innerHeight + 'px';

      }

    },


    watch: {

      mobile: function () {

        this.mobile.length > 11 && (this.mobile = this.mobile.slice(0, 11));

      }

    }

  }

</script>
<style lang="less" scoped>
  @import "login.less";
</style>
