<template>
    <div class="homepage">

      <div class="title">

        <div class="money_title">账户可用总额（元）</div>

        <div class="money_number">12445.00</div>

      </div>

      <div class="money_information">

        <div class="balance color_text" v-on:click="$router.push('/companyBalance')">企业账户余额</div>

        <div class="transaction_detail color_text" v-on:click="$router.push('/transactionDetail')">交易明细</div>

      </div>

      <div class="account">

        <div class="task_management">

          <div class="img"><img src="../../../../static/image/task_management.jpg"></div>

          <div class="name">任务管理</div>

        </div>

        <div class="sign_up_management">

          <div class="img"><img src="../../../../static/image/sing_up_management.jpg"></div>

          <div class="name">报名管理</div>

        </div>

        <div class="task_check">

          <div class="img"><img src="../../../../static/image/task_check.jpg"></div>

          <div class="name">工作验收</div>

        </div>

        <div class="company_management">

          <div class="img"><img src="../../../../static/image/company_management.jpg"></div>

          <div class="name">企业管理</div>

        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "homepage.vue"
    }
</script>

<style scoped lang="less">
  @import "homepage.less";
</style>
