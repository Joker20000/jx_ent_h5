<template>
  <div class="feedback">

    <div class="feedback_detail" v-for="feedback in feedbackList" v-bind:class="{'send': feedback.type === '2'}">
      <div class="time">{{feedback.sendDate | fmtTimeStr2}}</div>
      <div class="information">
        <div class="img">
          <img src="../../../../static/image/jx_feedback_person.png">
        </div>
        <div class="feedback_text">{{feedback.content}}</div>
      </div>
    </div>

    <div class="input">
      <input type="text" placeholder="请输入（200字以内）" v-model="feedbackInput">
      <div class="img" v-on:click="sendFeedback">
        <img src="../../../../static/image/jx_feedback_send.png">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "feedback_vue",

    data () {

      return {

        feedbackList: [],//消息数据列表

        feedbackInput: '',//回复信息

        feedbackId: '',//消息Id

      }

    },

    mounted () {

      this.getData();

    },


    methods: {

      //获取消息
      getData: function () {

        this.feedbackId = this.$route.query.msgId;

        /*
        * 接口： 查询员工消息反馈详情
        * 请求方式： GET
        * 接口： table/record/feedbackdetail
        * 入参： feedBackId
        * */
        this.$http({

          url: process.env.API_ROOT + 'table/record/feedbackdetail',
          method: 'get',
          params: {
            feedBackId: this.feedbackId
          }

        }).then(res=>{

          this.feedbackList = res.data.data;

        })

      },


      //回复消息
      sendFeedback: function () {

        /*
        * 接口： 回复员工消息反馈
        * 请求方式： GET
        * 接口： table/record/feedback
        * 入参： content, feedBackId
        * */
        this.$http({

          url: process.env.API_ROOT + 'table/record/feedback',
          method: 'get',
          params: {
            content: this.feedbackInput,
            feedBackId: this.feedbackId
          }

        }).then(res=>{

          if(res.data.code === '0000'){

            this.feedbackInput = '';

            this.getData();

          }else {

            this.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

          }

        });

      }

    }
  }
</script>

<style scoped lang="less">
  @import "feedback.less";
</style>
