<template>
  <div class="forget_password">

    <div class="input">

      <div class="tel_input">
        <img src="../../../../static/image/login_phone.png">
        <input type="text" placeholder="请输入企业管理员手机号">
      </div>

      <div class="code">
        <img src="../../../../static/image/login_pen.png">
        <input type="text" placeholder="请输入验证码">
        <div class="get_code">获取验证码</div>
      </div>

      <div class="password_input">
        <img src="../../../../static/image/login_password.png">
        <input type="password" placeholder="6-20位字母数字密码">
      </div>

      <div class="password_input">
        <img src="../../../../static/image/login_password.png">
        <input type="password" placeholder="请再次输入密码">
      </div>

    </div>

    <commonButton v-bind:btnName="btnName"></commonButton>

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

        btnName: '确认'

      }

    },

    methods: {

    }

  }
</script>
<style lang="less" scoped >
  @import "forget_password.less";
</style>
