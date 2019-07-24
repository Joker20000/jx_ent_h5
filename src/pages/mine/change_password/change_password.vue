<template>
    <div class="change_password">

      <div class="input">

        <div class="list">
          <span>原密码</span>
          <input type="password" placeholder="请输入原密码">
        </div>

        <div class="list">
          <span>新密码</span>
          <input type="password" placeholder="6-20位数字密码">
        </div>

        <div class="list">
          <span>确认密码</span>
          <input type="password" placeholder="请再次输入密码">
        </div>

      </div>

      <commonButton v-bind:btnName="btnName"></commonButton>

    </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "change_password.vue",

    components: {

      commonButton

    },

    data () {

      return {

        btnName: '确认'

      }

    }
  }
</script>

<style scoped lang="less">
  @import "change_password.less";
</style>
