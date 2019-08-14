<template>
  <div class="sign_list">
    <div class="screen">
      <div class="select_list_sign" v-if="$route.query.type === 'signup'">
        <div class="selected">全部</div>
        <div>待处理</div>
        <div>已录用</div>
        <div>已淘汰</div>
        <div>报名取消</div>
        <div>过期失效</div>
      </div>
      <div class="select_list_word" v-else-if="$route.query.type === 'work'">
        <div class="selected">全部</div>
        <div>工作中</div>
        <div>待验收</div>
        <div>验收中</div>
        <div>验收通过</div>
      </div>
      <div class="input_box">
        <div class="input">
          <div class="input_img">
            <img src="../../../../static/image/jx_find.png">
          </div>
          <input type="text" placeholder="搜索姓名或任务名称">
          <div class="close">
            <img src="../../../../static/image/contract_close.png">
          </div>
        </div>
        <div class="input_cancel">取消</div>
      </div>
    </div>

    <div class="detail_list" v-if="list.length > 0">

      <div class="list" v-on:click="$router.push('/signDetail')">

        <div class="title">
          <div class="title_img">
            <img src="../../../../static/image/jx_sign_person.png">
          </div>
          <div class="user_name">小单</div>
          <div class="state">已录用</div>
        </div>

        <div class="detail">
          <div class="content">任务：开发一个小程序</div>
          <div class="time_box">
            <div class="img">
              <img src="../../../../static/image/jx_sign_time.png">
            </div>
            <div class="time">2019-07-21 18:24:36</div>
          </div>
        </div>

      </div>

    </div>

    <div class="no_data" v-else>
      <div class="no_data_img">
        <img src="../../../../static/image/jx_sign_up_no_data.png">
      </div>
      <div class="no_data_text">暂无相关数据哦~</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "sign_list.vue",

    data () {

      return {

        list: [1]

      }

    }
  }
</script>

<style scoped lang="less">
  @import "sign_list.less";
</style>
