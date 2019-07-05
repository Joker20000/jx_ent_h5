<template>

  <div class="login">

    <div class="img">
      <img src="../../../../static/image/login_background_img.png">
    </div>

    <div class="input">

      <div class="tel_input">

        <img src="../../../../static/image/login_phone.png">

        <input type="text" placeholder="请输入企业管理员手机号">

      </div>

      <div class="password_input">

        <img src="../../../../static/image/login_password.png">

        <input type="password" placeholder="请输入密码">

      </div>

    </div>

    <commonButton v-bind:btnName="btnName"></commonButton>

    <div class="forget_password color_text" v-on:click="$router.push('/forgetPassword')">忘记密码</div>

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

        btnName: '登录'

      }

    }

  }

</script>
<style lang="less" scoped>
  @import "login.less";
</style>
