<template>

  <div class="help_list">

    <div class="about_task">

      <div class="title">众包任务相关</div>

      <div class="answer_list" v-for="(item, index) in aboutTask" v-on:click="helpDetail(index,'task')">{{item}}？</div>

      <div class="img">
        <img src="../../../../static/image/jx_help_list_task.png">
      </div>

    </div>

    <div class="about_company">

      <div class="title">企业相关</div>

      <div class="answer_list" v-for="(item, index) in aboutCompany" v-on:click="helpDetail(index,'company')">{{item}}？</div>

      <div class="img">
        <img src="../../../../static/image/jx_help_list_company.png">
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: "help_list.vue",

    data () {

      return {

        aboutTask: ['如何发布任务','发布到任务广场是什么意思','自动发送合同是什么意思','为什么已存在的发薪企业不能发布任务','已发布的任务能否取消发布'],//任务问题列表

        aboutCompany: ['如何完成企业认证和签约','如何充值企业账户余额'],//企业问题列表

      }

    },

    methods: {

      //点击进入问题答案
      helpDetail: function (index, type) {

        this.$router.push({path: '/helpDetail', query: {type: type, index: index}});

      }

    }
  }
</script>

<style scoped lang="less">
  @import "help_list.less";
</style>
