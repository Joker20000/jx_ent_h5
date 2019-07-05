<template>

  <div class="transaction_detail">
  <!--公司选择-->
    <div class="company_show" v-on:click="companyShow = !companyShow">
      <span class="show_type" v-bind:class="{'color_text' : companyShow}">全部</span>
      <span class="three"></span>
    </div>

    <div class="company_list" v-if="companyShow">
      <div class="company_option" v-for="company in companyList">嘉福集团</div>
    </div>
    <div class="popup_bg" v-if="companyShow" v-on:click="companyShow = false"></div>

    <!--交易明细数据-->
    <div class="money_detail">

      <div class="data_list">

        <div class="list" v-for="list in dataList">

          <div class="money_type">
            <div class="img">
              <img src="../../../../static/image/money_income.png">
            </div>
            <div class="money_information">
              <div>工资发放撤回</div>
              <div>嘉福集团</div>
            </div>
          </div>

          <div class="money_count_time">
            <div class="money_count">+100.00</div>
            <div class="time">2019-06-20 15:30:30</div>
          </div>

        </div>

        <div class="no_more">没有更多数据了</div>

      </div>

      <div class="nodata" v-if="dataList.length === 0">
        <div class="nodata_img"><img src="../../../../static/image/nodata.png"></div>
        <div class="nodata_text">暂无相关数据哦~</div>
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: "transaction_detail.vue",

    data () {

      return {

        companyList: [0,1,4,4,4,4,4,4],

        companyShow: false,

        dataList: [1,2,3]

      }

    }
  }
</script>

<style scoped lang="less">
  @import "transaction_detail.less";
</style>
