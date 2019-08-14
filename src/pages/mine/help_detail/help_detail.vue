<template>

  <div class="help_detail">

    <div class="title">{{title}}</div>

    <div class="detail" v-html="detail"></div>

    <div class="img">
      <img src="../../../../static/image/jx_help_detial.png">
    </div>

  </div>

</template>

<script>
  export default {
    name: "help_detail.vue",

    data () {

      return {

        helpDetail: {

          task: [
            {'如何发布众包任务':'企业只要完成企业认证和签约，填写发布任务相关信息即可发布众包任务；若企业需要通过平台自动发送合同给接单人员，则还需要先申请数字印章证书；企业认证、签约和申请数字印章证书均需在嘉薪网页端完成。'},
            {'发布到任务广场是什么意思': '发布到任务广场是指众包任务发布成功后，该任务将显示在自由客平台的任务广场，用户可在      任务广场报名该任务；若选择不发布到任务广场，则该任务仅在企业平台显示，仅企业管理员可见。'},
            {'自动发送合同是什么意思': '若您发布的任务需要和用户签订合同，发布任务时选择自动发送合同，任务发布成功后，用户报名该任务，您成功录用用户后，系统将自动发送电子合同给用户，用户在线上签约即可，线上电子合同具备法律效应；无需再线下签订合同。'},
            {'为什么无法选择账号中已存在的企业发布任务': '发布众包任务，企业须先完成实名认证和签约；若企业选择自动发送合同；企业还须完成数字印章申请才可发布任务。若企业已存在却不能发布任务，请先确认是否已完成企业认证、签约和数字印章申请。'},
            {'已发布的任务能否取消发布': '已发布成功的任务，无法取消发布；若无任何人已被录用开始工作，可关闭任务。'}
          ],

          company: [
            {'如何完成企业认证和签约': '企业认证</br>' +
              '登录网页端嘉薪官网，在【发薪企业管理】-【企业信息管理】中添加发薪企业，根据平台要求填写企业认证相关信息，提交认证，嘉薪会在1-2个工作日内进行审核并以短信形式告知审核结果；</br>' +
              '</br>' +
              '签约</br>' +
              '嘉薪只支持线下签约，如需咨询代发工资，代缴社保、公积金、个税等商务合作事宜，可拔打客服电话：021-64031776'},
            {'企业账户如何充值': '用户端暂不支持企业账户充值，可登录网页端嘉薪官网，在【发薪企业管理】-【企业账户充值】中进行账户充值。'}
          ]

        },//问题答案列表

        title: '',//问题标题

        detail: '',//问题答案

      }

    },


    mounted () {


      var index = this.$route.query.index;

      var type = this.$route.query.type;

      var information = this.helpDetail[type][index];

      this.title = Object.keys(information)[0];

      this.detail = Object.values(information)[0];

    }
  }
</script>

<style scoped lang="less">
  @import "help_detail.less";
</style>
