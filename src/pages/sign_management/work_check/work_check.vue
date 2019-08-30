<template>
  <div class="work_check">

    <div class="user_information_show">

      <div class="user_information">

        <div class="user_tel">

          <div class="user">{{workDetail.userName}}</div>

          <div class="tel">{{workDetail.mobile}}</div>

        </div>

        <div class="time">{{workDetail.startDate | fmtTimeStr2}}</div>

      </div>

      <div class="state">{{workState[workDetail.workState]}}</div>

    </div>

    <div class="task_information">

      <div class="title">
        <div class="img">
          <img src="../../../../static/image/jx_sign_detail_title.png">
        </div>
        <div>任务信息</div>
      </div>
      <div class="information_list">
        <div class="list">
          <div class="name">任务名称：</div>
          <div class="detail">{{workDetail.taskName}}</div>
        </div>
        <div class="list">
          <div class="name">发布企业：</div>
          <div class="detail">{{workDetail.entName}}</div>
        </div>
        <div class="list">
          <div class="name">验收次数：</div>
          <div class="detail">{{workDetail.checkNum}}</div>
        </div>
      </div>

    </div>

    <div class="task_information">

      <div class="title">
        <div class="img">
          <img src="../../../../static/image/jx_sign_detail_title.png">
        </div>
        <div>工作进展汇报</div>
      </div>
      <div class="feedback_list">
        <div class="feedback" v-for="feedback in feedbackList">
          <div class="title" v-if="feedback.type === '1'">
            <span class="name">反馈内容</span>
            <span class="time">{{feedback.taskFeedback.pCreateDate | fmtTimeStr2}}</span>
          </div>
          <div class="title" v-else-if="feedback.type === '2'">
            <span class="name">提交验收</span>
            <span class="time">{{feedback.taskFeedback.submitDate | fmtTimeStr2}}</span>
          </div>
          <div class="title" v-else-if="feedback.type === '3'">
            <span class="name">验收通过</span>
            <span class="time">{{feedback.taskFeedback.finishDate | fmtTimeStr2}}</span>
          </div>
          <div class="feedback_detail" v-if="feedback.type === '1'">{{feedback.taskFeedback.pContent}}</div>
          <div class="feedback_file_list" v-if="!!feedback.taskFeedback.files">
            <a class="file" v-for="(fileUrl ,fileName) in feedback.taskFeedback.files" v-bind:href="fileUrl">{{fileName}}</a>
          </div>
          <div class="place" v-if="!!feedback.taskFeedback.pPlace">
            <div class="img"><img src="../../../../static/image/jx_work_check_place.png"></div>
            <div class="place_detail">{{feedback.taskFeedback.pPlace}}</div>
          </div>
        </div>
      </div>

    </div>

    <div class="button background_linear_gradient" v-on:click="buttonClickFn" v-if="workDetail.workState === '2'">验收</div>

  </div>
</template>

<script>
  export default {
    name: "work_check.vue",

    data () {

      return {

        workDetail: {},

        workState: {1: '工作中', 2: '待验收', 3: '验收通过', 4: '验收中'},

        feedbackList: []

      }

    },

    mounted () {

      this.getData();

    },


    methods: {

      getData: function () {

        this.workDetail = JSON.parse(localStorage.getItem('signDataEnt'));

        /*
        * 接口： 查看工作汇报
        * 请求方式： POST
        * 接口： table/task/workreport
        * 入参： recordId
        * */
        this.$http({

          url: process.env.API_ROOT + 'table/task/workreport',
          method: 'post',
          params: {
            recordId: this.workDetail.recordId
          }

        }).then(res=>{

          this.feedbackList = res.data.data;

          for(var feedback of this.feedbackList) {

            if(!!feedback.taskFeedback.pFiles){

              feedback.taskFeedback.files = {};

              var fileList = feedback.taskFeedback.pFiles.split(',');

              var fileNameList = feedback.taskFeedback.originalFileName.split(',');

              var length = fileList.length;

              while(length--){

                feedback.taskFeedback.files[fileNameList[length]] = fileList[length];

              }

            }

          }

        })

      },


      buttonClickFn: function () {

        this.$messagebox({

          title: '确认验收',
          message: '验收通过后，请登录嘉薪PC端完成任务结算',
          showCancelButton:true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: true,

        }).then(res=>{

          if(res === 'confirm') {

            this.submit();

          }

        })

      },


      submit: function () {

        var obj = {};
        obj.recordId = this.workDetail.recordId;
        obj.userId = this.workDetail.userId;
        var config = {
          headers: { "Content-Type": "application/json" }
        };

        /*
        * 接口： 验收
        * 请求方式： POST
        * 接口： table/task/checkaccept
        * 入参： list
        * */
        this.$http.post(process.env.API_ROOT + 'table/task/checkaccept',JSON.stringify([obj]),config).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            this.getData();

            this.workDetail.workState = '3';

            this.workDetail.checkNum++;

          }

        })

      }

    }
  }
</script>

<style scoped lang="less">
  @import "work_check.less";
</style>
