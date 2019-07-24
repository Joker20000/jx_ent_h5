<template>
    <div class="change_tel_certification">

      <div class="change_new_tel_ps">
        <img src="../../../../static/image/jx_prompt.png">
        <span>下次登录请使用更换的新手机号码，账户其他信息不变</span>
      </div>
      <div class="change_new_tel_input">
        <div class="change_new_tel_tel">
          <i class="iconfont iconsign_phone color_text"></i>
          <input type="number" placeholder="请输入手机号"  pattern="\d*">
        </div>
        <div class="change_new_tel_code">
          <i class="iconfont iconsign_pen color_text"></i>
          <input type="number" placeholder="请输入验证码"  pattern="\d*">
          <div class="get_code">
            <span>获取验证码</span>
          </div>
        </div>
      </div>

      <commonButton v-bind:btnName="btnName"></commonButton>

      <div class="get_sound_code">没有收到验证码？请尝试获取<span class="color_text">语音验证码</span></div>

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

        btnName: '更换手机号'

      }

    }
  }
</script>

<style scoped lang="less">
  @import "change_tel_certification.less";
</style>
