<template>

  <div class="mine">

    <div class="person_information">
      <div class="img">
        <img src="../../../../static/image/mine_person.png">
      </div>
      <div class="person">
        <div class="name">超级管理员</div>
        <div class="tel">176****1324</div>
      </div>
    </div>

    <div class="banner">
      <img src="../../../../static/image/mine_banner.png">
    </div>

    <div class="list">
      <div class="message">
        <div class="title">
          <img src="../../../../static/image/mine_message.png">
          <span>消息</span>
        </div>
        <div class="new_message">您有新消息</div>
      </div>
      <div class="online">
        <div class="title">
          <img src="../../../../static/image/mine_online.png">
          <span>在线客服</span>
        </div>
      </div>
      <div class="tel">
        <div class="title">
          <img src="../../../../static/image/mine_tel.png">
          <span>电话咨询</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "mine.vue"
  }
</script>

<style scoped lang="less">
  @import "mine.less";
</style>
