<template>
    <div class="homepage">

      <div class="title">

        <div class="money_title">账户可用总额（元）</div>

        <div class="money_number">{{amount}}</div>

      </div>

      <div class="money_information">

        <div class="balance color_text" v-on:click="$router.push('/companyBalance')">企业账户余额</div>

        <div class="transaction_detail color_text" v-on:click="$router.push('/transactionDetail')">交易明细</div>

      </div>

      <div class="account">

        <div class="task_management" v-on:click="$router.push('/taskList')">

          <div class="img"><img src="../../../../static/image/task_management.jpg"></div>

          <div class="name">任务管理</div>

        </div>

        <div class="sign_up_management" v-on:click="$router.push({path: '/signList', query: {type: 'signup'}})">

          <div class="img"><img src="../../../../static/image/sing_up_management.jpg"></div>

          <div class="name">报名管理</div>

        </div>

        <div class="task_check" v-on:click="$router.push({path: '/signList', query: {type: 'work'}})">

          <div class="img"><img src="../../../../static/image/task_check.jpg"></div>

          <div class="name">工作验收</div>

        </div>

        <div class="company_management" v-on:click="$router.push('/companyList')">

          <div class="img"><img src="../../../../static/image/company_management.jpg"></div>

          <div class="name">企业管理</div>

        </div>

      </div>

    </div>
</template>

<script>
  export default {
    name: "homepage.vue",

    data () {

      return {

        amount: ''

      }

    },

    mounted () {

      this.$store.state.workDeskState = 'homepage';//控制下方按钮状态

      this.getData();

    },

    methods: {

      //获取页面数据
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

          }

        })

      },

    }
  }
</script>

<style scoped lang="less">
  @import "homepage.less";
</style>
