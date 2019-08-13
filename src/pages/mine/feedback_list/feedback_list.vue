<template>
    <div class="feedback_list">

      <div class="list" v-for="feedback in feedbackList" v-on:click="jumpTo(feedback.type, feedback.msgId)">

        <div class="title">
          <div class="img">
            <img src="../../../../static/image/jx_feedback_list_feedback.png" v-if="feedback.type === '1'">
            <img src="../../../../static/image/jx_feedback_list_message.png" v-if="feedback.type === '2'">
          </div>

          <div class="message_title">
            <div class="type_feedback" v-if="feedback.type === '1'">
              <span>{{feedback.userName}}</span>
              <span>{{feedback.sendDate | fmtDateStr2}}</span>
              <span>工资</span>
            </div>
            <div class="type_message" v-if="feedback.type === '2'">
              <span v-if="feedback.businessType === '0'">众包任务提醒</span>
              <span v-else-if="feedback.businessType === '1'">合同签约提醒</span>
              <span v-else-if="feedback.businessType === '2'">用户信息修改</span>
            </div>
          </div>

          <div class="new_feedback" v-if="feedback.isEntHaveNew === '1'">NEW</div>

        </div>

        <div class="information" v-bind:class="feedback.type === '1' ? 'feedback' : 'message'">{{feedback.msgContent}}</div>

        <div class="foot">
          <div class="company" v-show="feedback.type === '1'">{{feedback.entName}}</div>
          <div class="time">{{feedback.createDate | fmtTimeStr2}}</div>
        </div>

      </div>

    </div>
</template>

<script>
  export default {
    name: "feedback_list.vue",

    data () {

      return {

        feedbackList: []

      }

    },

    mounted () {

      this.getData();

    },



    methods: {

      getData: function () {

        this.$http({

          url: process.env.API_ROOT + 'table/record/h5sysmsglist',

          method: 'get',

        }).then(res=>{

          this.feedbackList = res.data.data;

        })

      },

      jumpTo: function (type, msgId) {

        if(type === '1'){

          this.$router.push({path: '/feedback', query: {msgId: msgId}});

        }

      }

    }
  }
</script>

<style scoped lang="less">
  @import "feedback_list.less";
</style>
