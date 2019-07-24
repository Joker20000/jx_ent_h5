<template>
  <div class="account_center">

    <div class="account_information">

      <div class="information_list" v-if="adminType === '02'">
        <div class="title">企业logo</div>
        <div class="icon"><img src="../../../../static/image/jx_publish_task.png"></div>
      </div>

      <div class="information_list">
        <div class="title">管理员角色</div>
        <div>{{adminName}}</div>
      </div>

      <div class="information_list select" v-on:click="$router.push('/changeTel')">
        <div class="title">管理员账号</div>
        <div>{{mobile | plusXing(3,4)}}</div>
      </div>

      <div class="information_list select" v-on:click="$router.push('/changePassword')">
        <div class="title">修改登录密码</div>
      </div>

    </div>

    <commonButton v-bind:btnName="btnName"></commonButton>

  </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "account_center.vue",
    components: {

      commonButton: commonButton

    },

    data () {

      return {

        btnName: '退出登录',

        adminName: '',

        logoPath: '../../../../static/image/mine_person.png',

        mobile:  '',

        adminType: '',

      }

    },

    mounted () {

      this.adminName = localStorage.getItem('adminName');
      this.mobile = localStorage.getItem('mobile');
      (!!localStorage.getItem('logoPath')) && (this.logoPath = localStorage.getItem('logoPath'));
      this.adminType = localStorage.getItem('adminType');

    }
  }
</script>

<style scoped lang="less">
  @import "account_center.less";
</style>
