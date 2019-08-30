<template>

  <div class="company_balance">

    <div class="title">

      <div class="money_title">账户可用总额（元）</div>

      <div class="money_number">{{amount}}</div>

    </div>

    <div class="company_list">

      <div class="company" v-for="company in companyList" v-on:click="jumpTo(company.entId)">

        <div class="company_name">{{company.entName}}</div>

        <div class="money">￥{{company.accountBalance}}</div>

      </div>

    </div>

  </div>

</template>

<script>
  export default {

    name: "company_balance.vue",

    data () {

      return {

        companyList: [],//企业列表

        amount: '',//账户余额

      }

    },

    mounted () {

      this.getData();

    },


    methods: {

      //获取数据
      getData: function () {

        /**
         * 接口：获取企业账户发薪单位总额
         * 请求方式：GET
         * 接口：ent/balance/allbalance
         * 入参：null
         **/
        this.$http({

          method: 'get',

          url:process.env.API_ROOT+'ent/balance/allbalance',

        }).then(res=>{

          if(res.data.code === '0000'){

            this.amount = res.data.data.amount;

            this.getBalance(res.data.data.count);

          }

        });

      },


      //获取账户余额
      getBalance: function (count) {

        /**
         * 接口：获取发薪单位账户余额信息
         * 请求方式：POST
         * 接口：ent/balance/getbalance
         * 入参：null
         **/
        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'ent/balance/getbalance',

          params: {

            pageSize: count

          }

        }).then(res => {

          if(res.data.code === '0000'){

            this.companyList = this.companyList.concat(res.data.data.list);

          }

        }).catch(res=>{

          console.log(res);

        });

      },


      //页面跳转
      jumpTo: function (entId) {

        this.$router.push({path: '/transactionDetail', query: {entId: entId}});

      }

    }

  }
</script>

<style scoped lang="less">
  @import "company_balance.less";
</style>
