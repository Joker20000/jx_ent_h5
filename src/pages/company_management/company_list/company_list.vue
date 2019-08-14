<template>
  <div class="company_list">
    <div class="company" v-for="company in companyList" v-on:click="$router.push({path: '/companyDetail', query: {entId: company.entId}})">
      <div class="company_name">{{company.entName}}</div>
      <div class="verified" v-if="company.verifyState === '3'">
        <i class="iconfont iconrenzhengchenggong"></i>
        <span>已认证</span>
      </div>
      <div class="verifying" v-else-if="company.verifyState === '1'">
        <i class="iconfont iconshenhezhong"></i>
        <span>审核中</span>
      </div>
      <div class="no_verify" v-else-if="company.verifyState === '0'">
        <i class="iconfont iconrenzhengshibai"></i>
        <span>未认证</span>
      </div>
      <div class="verify_fail" v-else-if="company.verifyState === '2'">
        <i class="iconfont iconshenheshibai"></i>
        <span>认证失败</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company_list.vue",

    data () {

      return {

        companyList: [],//企业列表
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

            /**
             * 接口：获取企业信息
             * 请求方式：GET
             * 接口：ent/info/getinfo
             * 入参：null
             **/

            this.$http({

              url: process.env.API_ROOT + 'ent/info/getinfo',
              method: 'get',
              params: {

                pageSize: res.data.data.count

              }

            }).then(res=>{

              this.companyList = this.companyList.concat(res.data.data.list);


            }).catch(res=>{

              console.log(res);

            });

          }

        }).catch(res=>{

          console.log(res);

        });

      }

    }

  }
</script>

<style scoped lang="less">
  @import "company_list.less";
</style>
