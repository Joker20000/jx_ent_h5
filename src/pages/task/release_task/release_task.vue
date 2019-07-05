<template>
    <div class="release_task">

      <div class="module_title">填写任务基本信息</div>

      <div class="task_information">

        <div class="list must_input">
          <div class="title">发布到任务广场</div>
          <div class="content"><mt-switch v-model="showTask"></mt-switch></div>
        </div>

        <div class="list must_input">
          <div class="title">
            <div>自动发送合同</div>
            <div>开启后将自动发送合同给被录用人员</div>
          </div>
          <div class="content"><mt-switch v-model="sendContract"></mt-switch></div>
        </div>

        <div class="list must_input">
          <div class="title">企业名称</div>
          <div class="content select">请选择企业名称</div>
        </div>

        <div class="list must_input">
          <div class="title">发布企业名称</div>
          <div class="content">
            <div class="company_name">
              <input type="text" placeholder="请输入企业名称，2-32个字符" maxlength="32" minlength="2">
            </div>
            <div class="hide_name">
              <input type="checkbox">
              <span>隐藏昵称</span>
            </div>
          </div>
        </div>

        <div class="list must_input">
          <div class="title">任务类型</div>
          <div class="content select">请选择任务类型</div>
        </div>

        <div class="list must_input">
          <div class="title">工作地区</div>
          <div class="content select">请选择工作地区</div>
        </div>

        <div class="list must_input">
          <div class="title">任务名称</div>
          <div class="content">
            <input type="text" placeholder="请输入任务名称，4-50个字符">
          </div>
        </div>

        <div class="list must_input">
          <div class="title">任务名称</div>
          <div class="content look_mould">查看模板</div>
          <div class="task_detail">
            <textarea cols="30" rows="10" v-model="taskDetail" placeholder="请填写任务需求描述，4-10000个字符
例如 1、本项目是一个骑手配送任务；需要由骑手自己配备智能手机和电动车；2、骑手能够熟练使用智能手机接单、导航、驾驶电动车，年龄在18-50周岁"></textarea>
          </div>
        </div>

        <div class="list must_input">
          <div class="title">上传附件<span class="ps">（最多上传5个附件，大小不超过8M，不支持.exe格式）</span></div>
          <div class="file_list">
            <div class="add_file">
              <input type="file">
              <div class="add_file_img">
                <img src="../../../../static/image/jx_add_file.png">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="module_title">填写预算和时间</div>

      <div class="task_information">

        <div class="list must_input">
          <div class="title">报名截止时间</div>
          <div class="content select">选择报名截止时间</div>
          <div class="no_choose">
            <input type="checkbox">
            <span>不限</span>
          </div>
        </div>

        <div class="list must_input">
          <div class="title">任务总预算（元）</div>
          <div class="content">
            <input type="text" placeholder="请输入任务预算总金额">
          </div>
        </div>

        <div class="list must_input">
          <div class="title">任务单价</div>
          <div class="content max_min_spend">
            <input type="text" placeholder="最低单价">
            <div class="line"></div>
            <input type="text" placeholder="最高单价">
          </div>
        </div>

        <div class="list must_input">
          <div class="title">需要人数</div>
          <div class="content">
            <input type="text" placeholder="请输入任务所需人数">
          </div>
          <div class="no_choose">
            <input type="checkbox">
            <span>不限</span>
          </div>
        </div>

      </div>

      <div class="module_title">合同及发票</div>

      <div class="task_information">

        <div class="list must_input">
          <div class="title">发票类型</div>
          <div class="content select">请选择发票类型</div>
        </div>

        <div class="list must_input">
          <div class="title">合同模板</div>
          <div class="content select">请选择合同模板</div>
        </div>

        <div class="list must_input">
          <div class="title">合同名称</div>
          <div class="content">
            <input type="text" placeholder="请输入合同名称，不超过50个字">
          </div>
        </div>

        <div class="list must_input">
          <div class="title">业务合作企业</div>
          <div class="content select">请选择业务合作企业</div>
        </div>

      </div>

      <div class="sign_agreement">
        <input type="checkbox">
        <span>我已阅读并同意<span v-on:click="$router.push('signAgreement')">《快捷签署服务委托协议书》</span></span>
      </div>

      <div class="button">
        <div class="save">保存</div>
        <div class="publish">发布</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "release_task.vue",

    data () {

      return {

        showTask: true,

        sendContract: false,

        taskDetail: ''

      }

    },

    methods: {

    },

    mounted () {

    }
  }
</script>

<style scoped lang="less">
  @import "release_task.less";
</style>
<style>
  .release_task .task_information .mint-switch .mint-switch-core{
    width: 42px;
    height: 22px;
  }
  .release_task .task_information .mint-switch .mint-switch-core:before{
    width: 40px;
    height: 20px;
  }
  .release_task .task_information .mint-switch .mint-switch-core:after{
    width: 20px;
    height: 20px;
  }
</style>
