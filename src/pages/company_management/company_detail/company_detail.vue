<template>
    <div class="company_detail">

      <div class="ps" v-if="companyDetail.verifyState === '3' || companyDetail.verifyState === '2'">
        <span v-if="companyDetail.verifyState === '3'">如需变更企业认证资料，请将需要变更的内容发送邮件至salaryhelp@jia-fu.com，或联系客服处理。</span>
        <span v-else-if="companyDetail.verifyState === '2'">您提交的企业认证未通过审核，请前往PC端提交正确的认证资料</span>
      </div>

      <div class="company_information">

        <div class="list">
          <div class="title">企业名称</div>
          <div class="information">{{companyDetail.entName}}</div>
        </div>
        <div class="list">
          <div class="title">企业昵称</div>
          <div class="information">{{companyDetail.entNickName}}</div>
        </div>
        <div class="list" v-on:click="showPs('verify')">
          <div class="title">认证状态</div>
          <div class="information">
            <span v-if="companyDetail.verifyState === '0'">未认证</span>
            <span v-else-if="companyDetail.verifyState === '1'">认证中</span>
            <span v-else-if="companyDetail.verifyState === '2'">认证失败</span>
            <span v-else-if="companyDetail.verifyState === '3'">已认证</span>
          </div>
        </div>
        <div class="list" v-on:click="showPs('sign')">
          <div class="title">签约状态</div>
          <div class="information">
            <span v-if="companyDetail.signState === '1'">已签约</span>
            <span v-else-if="companyDetail.signState === '0'">未签约</span>
          </div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">法人代表姓名</div>
          <div class="information">{{companyDetail.verifyInfo[0].legalPerson}}</div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">办公电话</div>
          <div class="information">{{companyDetail.contactPhone}}</div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">办公地址</div>
          <div class="information">{{companyDetail.province}}{{companyDetail.city}}{{companyDetail.address}}</div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">证件类型</div>
          <div class="information">{{companyDetail.verifyInfo[0].documentType}}</div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">营业执照</div>
          <div class="information" v-on:click="showImg">
            <img v-bind:src="companyDetail.verifyInfo[0].businessLicencePath">
          </div>
        </div>
        <div class="list" v-if="companyDetail.verifyState !== '0'">
          <div class="title">统一社会信用代码</div>
          <div class="information">{{companyDetail.verifyInfo[0].comid}}</div>
        </div>

      </div>

      <div class="popup" v-if="popupShow">

        <div class="popup_bg" v-on:click="popupShow = false"></div>

        <div class="popup_box">
          <div class="title">提示</div>
          <div class="content" v-if="clickPlace === 'verify'">用户端暂不支持企业认证，请前往PC端完成企业认证</div>
          <div class="content" v-else>暂不支持线上签约，如您需咨询代发工资， 代缴社保、公积金、个税等商务合作事宜， 请拔打咨询电话：<a href="tel:021-64031776" class="color_text">021-64031776</a></div>
          <div class="button color_text" v-on:click="popupShow = false">好的</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "companyDetail.vue",

    data () {

      return {

        companyDetail: {
          verifyInfo: [{}]
        },

        clickPlace: '',

        popupShow: false,

        thisimgShow: false
      }

    },

    created () {

      this.entId = this.$route.query.entId;
      this.getData();

    },


    methods: {

      getData: function () {

        /**
         * 接口：获取企业详细信息
         * 请求方式：GET
         * 接口：ent/info/getdetail
         * 入参：entId
         **/
        this.$http({

          url: process.env.API_ROOT + 'ent/info/getdetail',
          method: 'get',
          params: {
            entId: this.entId
          }

        }).then(function (res) {

          this.companyDetail = res.data.data.list[0];

        }.bind(this))

      },

      showPs: function (place) {

        this.clickPlace = place;

        (place === 'verify') && (this.companyDetail.verifyState === '0') && (this.popupShow = true);

        (place === 'sign') && (this.companyDetail.signState === '0') && (this.popupShow = true);

      },


      showImg: function () {

        WeixinJSBridge.invoke('imagePreview', {
          current: this.companyDetail.verifyInfo[0].businessLicencePath,
          urls: [ // 所有图片的URL列表，数组格式
            this.companyDetail.verifyInfo[0].businessLicencePath
          ]
        }, function(res) {
          console.log(res.err_msg)
        })

      }

    },
  }
</script>

<style scoped lang="less">
  @import "company_detail.less";
</style>
