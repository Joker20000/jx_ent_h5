<template>
    <div class="feedback_list">

      <div class="list" v-for="feedback in feedbackList">

        <div class="title">
          <div class="img">
            <img src="../../../../static/image/jx_feedback_list_feedback.png" v-if="feedback.type === 1">
            <img src="../../../../static/image/jx_feedback_list_message.png" v-if="feedback.type === 2">
          </div>

          <div class="message_title">
            <div class="type_feedback" v-if="feedback.type === 1">
              <span>小明</span>
              <span>2019-04</span>
              <span>工资</span>
            </div>
            <div class="type_message" v-if="feedback.type === 2">众包任务提醒</div>
          </div>

        </div>

        <div class="information" v-bind:class="feedback.type === 1 ? 'feedback' : 'message'">收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到收到</div>

        <div class="foot">
          <div class="company" v-show="feedback.type === 1">嘉福集团</div>
          <div class="time">2018-09-08 14:20:50</div>
        </div>

      </div>

    </div>
</template>

<script>
  export default {
    name: "feedback_list.vue",

    data () {

      return {

        feedbackList: [
          {type: 1},
          {type: 2},
          {type: 1}
        ]

      }

    }
  }
</script>

<style scoped lang="less">
  @import "feedback_list.less";
</style>
