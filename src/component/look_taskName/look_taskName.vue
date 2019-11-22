<template>
  <div class="look_mould">

    <div class="mould_bg"></div>

    <div class="mould_box">

      <div class="close" v-on:click="closeNameFn"><img src="../../../static/image/contract_close.png"></div>

      <div class="swiper-container">
        <div class="swiper-wrapper">

          <div class="swiper-slide">
            <div class="mould_title">任务名称命名规则</div>
  
            <div class="need">
              <div class="tips">温馨提示：根据国家相关规定，“劳务报酬所得”不得以众包任务形式结算，请注意如下内容：</div>
              <div class="tips_list">设计、装潢、安装、制图、化验、测试、法律、会计、讲学、翻译、审稿、书画、雕刻、影视、录音、录像、演出、表演、广告、展览、技术服务、介绍服务、经纪服务、代办服务、招聘、医疗、咨询、制作等</div>
              <div class="tip_list">支持发布以下7个行业的关于营销、推广、销售、外包类任务</div>
            </div>
  
            <div>
              <div class="title">
                <span class="name">营销/推广/销售类</span>
              </div>
              <div class="detail">
                <div class="detail_list"><span>货物运输</span><span>例如:XXX物流服务推广</span></div>
                <div class="detail_list"><span>建筑服务业</span><span>例如:中低端小区住宅绿化项目推广</span></div>
                <div class="detail_list"><span>农,林,牧,渔业</span><span>例如:农副产品营销推广</span></div>
                <div class="detail_list"><span>制造业,加工业</span><span>例如:精密仪器设备兼职销售</span></div>
                <div class="detail_list"><span>批发,零售等商业贸易</span><span>例如:百草味小零食促销推广</span></div>
                <div class="detail_list"><span>餐饮,娱乐业</span><span>例如:在线短视频营销</span></div>
                <div class="detail_list"><span>其他服务业</span><span>例如:软件管理产品推广营销</span></div>
              </div>
            </div>
  
  
            <div>
              <div class="title">
                <span class="name">外包类</span>
              </div>
              <div class="detail">
                <div class="detail_list"><span>货物运输</span><span>例如:生鲜肉类运输业务外包</span></div>
                <div class="detail_list"><span>建筑服务业</span><span>例如:道路施工工程任务分包</span></div>
                <div class="detail_list"><span>农,林,牧,渔业</span><span>例如:海鲜水产养殖分包</span></div>
                <div class="detail_list"><span>制造业,加工业</span><span>例如:数控车床加工项目外包</span></div>
                <div class="detail_list"><span>批发,零售等商业贸易</span><span>例如:品牌形象包装项目外包</span></div>
                <div class="detail_list"><span>餐饮,娱乐业</span><span>例如:软件园食堂午餐服务外包</span></div>
                <div class="detail_list"><span>其他服务业</span><span>例如:产品市场调研服务外包</span></div>
              </div>
            </div>
            
          </div>
          
        </div>

      </div>


    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "look_taskName.vue",

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
  
      closeNameFn: function () {

        this.$emit('close');

      },
      

    }
  }
</script>

<style scoped lang="less">
  @import "look_taskName.less";
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
