<template>
  <div class="look_mould">

    <div class="mould_bg"></div>

    <div class="mould_box">

      <div class="close" v-on:click="closeFn"><img src="../../../static/image/contract_close.png"></div>

      <div class="swiper-container">
        <div class="swiper-wrapper">

          <div class="swiper-slide">
            <div class="mould_title">软件开发</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>前端开发</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：</div>
              <div class="detail_list">1、应用平台：微信小程序</div>
              <div class="detail_list">2、根据本公司提供的原型和设计图进行前端开发，并与后端联调接口；</div>
              <div class="detail_list">3、联调完成提供页面测试并修改BUG，小程序成功上线无遗留BUG即可；</div>
            </div>
            <div class="need">
              <div class="name">要求：</div>
              <div class="need_list">1、精通Javascript/CSS/HTML等前端技术；</div>
              <div class="need_list">2、有微信小程序，H5和WEB的项目开发经验；</div>
              <div class="need_list">3、熟悉主流浏览器的兼容性调试；</div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="mould_title">设计</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>设计LOGO</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：</div>
              <div class="detail_list">1、本司是一家智能科技公司，主要服务智能家居生态链，主营：智能家居，门锁等智能科技类产品的研发，销售等，现需设计一个企业logo；</div>
              <div class="detail_list">2、设计要求：</div>
              <div class="detail_list">a. 大气、简洁、能体现特色；</div>
              <div class="detail_list">b.有视觉冲击力，醒目易识别，突出行业元素;</div>
              <div class="detail_list">c.附上创意说明。</div>
            </div>
            <div class="need">
              <div class="name">知识产权说明：</div>
              <div class="need_list">1、所设计的作品为原创，为第一次发布，未侵犯他人的著作权，如有侵犯他人著作权，由设计者承担所有法律责任;</div>
              <div class="need_list">2、我方支付设计费用，即拥有该作品的知识产权，包括著作权,使用权和发布权等,有权对设计作品进行修改,组合和应用;设计者不得再向其他任何地方使用该设计作品。</div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="mould_title">营销策划</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>市场调研</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：</div>
            </div>
            <div class="need">
              <div class="name">要求：<span>全国区域的市场调研，贷后管理部门信息化现状的问卷，需要得到客户的资料，做个市场调研的报告。</span></div>
              <div class="need_list">1、问卷的设计</div>
              <div class="need_list">2、线上和线下相结合，提供人员去线下做调研，深入金融机构进行深访。</div>
              <div class="need_list">3、需要将样本手机，出具一个调研报告（第二个诉求最重要）</div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="mould_title">服务业</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>家政服务</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：</div>
              <div class="need_list">1、工作时间：每周六来家中进行两小时的保洁工作，</div>
              <div class="need_list">2、工作内容：主要负责主次卧、客厅、厨房、卫生间的卫生清洁工作；</div>
            </div>
            <div class="need">
              <div class="name">要求：</div>
              <div class="need_list">1、希望家政从业人员有从业资格证；</div>
              <div class="need_list">2、希望家政从业人员有相关家政工作经验；</div>
              <div class="need_list">3、希望是由固定人员从事服务；</div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="mould_title">物流配送</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>货物配送</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：</div>
              <div class="need_list">1、配送地点：由上海运送至杭州；</div>
              <div class="need_list">2、配送时间：2019年4月13日当天送达；</div>
              <div class="need_list">3、配送物：一批精密仪器；</div>
              <div class="need_list">4、配送说明：需要有配送方提供物品的搬运装卸，保证物品准时运送到制定地点，由接收方确认货物完整方可完成订单；</div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="mould_title">文化传媒</div>
            <div class="title">
              <span class="name">任务内容：</span>
              <span>拍摄短视频</span>
            </div>
            <div class="detail">
              <div class="name">任务描述：<span>征集抖音、快手小故事剧本，要求内容健康积极</span></div>
              <div class="need_list">1、主要用于拍摄抖音、快手等平台视频；</div>
              <div class="need_list">2、故事要交代场景，任务关系明确，对话不少于10句；</div>
              <div class="need_list">3、内容不得违反法律法规；</div>
            </div>
          </div>

        </div>

        <div class="swpier-pagination"></div>
      </div>

      <div class="button background_linear_gradient" v-on:click="useMould">使用模板</div>

    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "look_mould.vue",

    mounted () {

      this.init();

    },

    methods: {

      init: function () {

        var mySwiper = new Swiper('.swiper-container',{
          pagination: {
            el: '.swpier-pagination',
          }
        });

      },

      closeFn: function () {

        this.$emit('close');

      },


      useMould: function () {

        var mouldText = document.getElementsByClassName('swiper-slide-active')[0].innerText;

        var mouldArr = mouldText.split('\n');

        mouldArr.shift();

        this.$emit('useMould', mouldArr);

      }

    }
  }
</script>

<style scoped lang="less">
  @import "look_mould.less";
</style>
<style>
  .swpier-pagination{
    text-align: center;
  }
  .swpier-pagination>.swiper-pagination-bullet{
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #dddddd;
    margin: 3px;
  }
  .swpier-pagination>.swiper-pagination-bullet-active{
    background-color: #06abff;
  }
</style>
