<template>

  <div class="company_balance">

    <div class="title">

      <div class="money_title">账户可用总额（元）</div>

      <div class="money_number">12445.00</div>

    </div>

    <div class="company_list">

      <div class="company" v-for="company in companyList">

        <div class="company_name">嘉福集团</div>

        <div class="money">￥0.00</div>

      </div>

    </div>

  </div>

</template>

<script>
  export default {

    name: "company_balance.vue",

    data () {

      return {

        companyList: [0,1,4,3]

      }

    }

  }
</script>

<style scoped lang="less">
  @import "company_balance.less";
</style>
