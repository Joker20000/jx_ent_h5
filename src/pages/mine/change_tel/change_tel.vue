<template>
    <div class="change_tel">

      <div class="user_info">
        <div class="title">当前管理员账号</div>
        <div class="tel">{{mobile | plusXing(3,4)}}</div>
      </div>

      <commonButton v-bind:btnName="btnName" v-on:clickEvent="$router.push('/authentication')"></commonButton>
      <div class="ps">新手机须为未注册手机号</div>

    </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "change_tel.vue",

    components: {

      commonButton: commonButton

    },
    data () {

      return {

        btnName: '更换手机号',//按钮名称

        mobile: '',//用户账号

      }

    },


    mounted () {

      this.mobile = localStorage.getItem('mobileEnt');

    }
  }
</script>
<style scoped lang="less">
  @import "change_tel.less";
</style>
