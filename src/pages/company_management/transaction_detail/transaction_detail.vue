<template>

  <div class="transaction_detail">
  <!--公司选择-->
    <div class="company_choose" v-if="!$route.query.entId">
      <div class="company_show" v-on:click="companyShow = !companyShow">
        <span class="show_type" v-bind:class="{'color_text' : companyShow}">{{entName}}</span>
        <span class="three"></span>
      </div>

      <div class="company_list" v-if="companyShow">
        <div class="company_option" v-on:click="selectCompany()">全部</div>
        <div class="company_option" v-for="company in companyList" v-on:click="selectCompany(company.entId, company.entName)"
              v-bind:class="{'color_text': entId === company.entId}">{{company.entName}}</div>
      </div>
      <div class="popup_bg" v-if="companyShow" v-on:click="companyShow = false"></div>
    </div>

    <!--交易明细数据-->
    <div class="money_detail">

      <div class="data_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

        <div class="list" v-for="list in dataList">

          <div class="money_type">
            <div class="img">
              <img src="../../../../static/image/money_income.png" v-if="list.afterBalance - list.beforeBalance > 0">
              <img src="../../../../static/image/money_spend.png" v-else>
            </div>
            <div class="money_information">
              <div>{{transType[list.transType]}}</div>
              <div>{{list.entName}}</div>
            </div>
          </div>

          <div class="money_count_time">
            <div class="money_count" v-bind:class="{'add' : list.afterBalance - list.beforeBalance > 0}">
              <span class="plus">+</span>
              <span class="cut">-</span>
              <span>{{list.transAmt}}</span>
            </div>
            <div class="time">{{list.clearingDate | fmtTimeStr2}}</div>
          </div>

        </div>

        <div class="no_more" v-if="!moreData && dataList.length > 0">无更多数据</div>

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

        companyList: [],//企业列表

        companyShow: false,//公司筛选框显示状态

        dataList: [],//交易数据列表

        transType : {

          '1':'工资发放',

          '2':'工资代发充值',

          '3':'工资发放退款',

          '5': '发薪企业转账',

          '7':'工资发放撤回',

          '12':'工资发放',

          '13':'工资发放退款',

          '14':'工资发放',

          '15':'众包结算',

          '16':'众包结算撤回',

          '17':'众包结算退款',

          '18':'众包结算',

          '19':'众包结算退款',

          '20': '众包结算',

          '21': '众包结算退款'
        },//交易类型

        pageNum: 1,//数据分页

        moreData: false,//是否还有数据

        entId: '',//企业Id(筛选时使用)

        entName: '全部',//企业名称(筛选时使用)

      }

    },


    mounted () {

      this.entId = this.$route.query.entId;

      (!this.$route.query.entId) && (this.getCompanyList());//未从企业账户余额进入

      this.getData();

    },


    methods: {

      //获取页面数据
      getData: function () {

        var params = {};

        (!!this.entId) && (params.salaryEntId = this.entId);

        params.pageNum = this.pageNum;

        /**
         * 接口：获取企业账户交易明细
         * 请求方式：POST
         * 接口：ent/balance/getclear
         * 入参：salaryEntIds
         **/
        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'ent/balance/getclear',

          params: params

        }).then(res=>{

          if(res.data.code === '0000'){

            this.dataList = this.dataList.concat(res.data.data.list);

            (res.data.data.list.length >= 10) ? (this.moreData = true) : (this.moreData = false);

          }

        })

      },

      //下拉加载
      loadMore: function () {

        if(this.moreData){

          this.pageNum = this.pageNum + 1;

          this.getData();

        }

      },

      //获取企业列表
      getCompanyList: function () {

        /**
         * 接口：发薪企业查询
         * 请求方式：GET
         * 接口：jx/common/salaryentinfo
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url:process.env.API_ROOT+'jx/common/salaryentinfo',

          params: {
            entId: localStorage.getItem('entIdEnt')
          }

        }).then(res => {

          if(res.data.code === '0000'){

            this.companyList = this.companyList.concat(res.data.data);

          }

        }).catch(res=>{

          console.log(res);

        });

      },

      //下拉框筛选出单个企业数据
      selectCompany: function (entId, entName) {

        if(!entId){

          this.entId = '';

          this.entName = '全部';

        }else {

          this.entId = entId;

          this.entName = entName;

        }

        this.pageNum = 1;

        this.dataList = [];

        this.companyShow = false;

        this.getData();

      }

    }
  }
</script>

<style scoped lang="less">
  @import "transaction_detail.less";
</style>
