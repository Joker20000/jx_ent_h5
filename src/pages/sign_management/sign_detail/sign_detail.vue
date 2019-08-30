<template>
  <div class="sign_detail">

    <div class="user_information">
      <div class="title">
        <div class="img">
          <img src="../../../../static/image/jx_sign_detail_title.png">
        </div>
        <div>用户信息</div>
      </div>
      <div class="information_list">

        <div class="sing_type_img">
          <img src="../../../../static/image/jx_sign_detail_waiting.png" v-if="signData.selectState === '1'">
          <img src="../../../../static/image/jx_sign_detail_sign_cancel.png" v-else-if="signData.selectState === '2'">
          <img src="../../../../static/image/jx_sign_detail_used.png" v-else-if="signData.selectState === '3'">
          <img src="../../../../static/image/jx_sign_detail_out.png" v-else-if="signData.selectState === '4'">
          <img src="../../../../static/image/jx_sign_detail_time_out.png" v-else-if="signData.selectState === '5'">
        </div>

        <div class="list">
          <div class="name">姓名：</div>
          <div class="detail">{{signData.userName}}</div>
        </div>
        <div class="list">
          <div class="name">手机号：</div>
          <div class="detail">{{signData.mobile}}</div>
        </div>
        <div class="list">
          <div class="name">技能标签：</div>
          <div class="detail">{{signData.label}}</div>
        </div>
        <div class="list">
          <div class="name">自我介绍：</div>
          <div class="detail">{{signData.introduce}}</div>
        </div>
        <div class="list">
          <div class="name">报名时间：</div>
          <div class="detail">{{signData.createDate | fmtDateStr}}</div>
        </div>
      </div>
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
          <div class="detail">{{signData.taskName}}</div>
        </div>
        <div class="list">
          <div class="name">发布企业：</div>
          <div class="detail">{{signData.entName}}</div>
        </div>
        <div class="jump_to color_text" v-on:click="jumpTo">查看任务详情</div>
      </div>

    </div>

    <div class="button" v-if="signData.selectState === '1'">

      <div class="out color_text" v-on:click="changeState('out')">淘汰</div>

      <div class="use background_linear_gradient" v-on:click="changeState('use')">录用</div>

    </div>

    <div class="button" v-else-if="signData.selectState === '3'">

      <div class="out color_text" v-on:click="changeState('cancelUse')">取消录用</div>

    </div>

    <div class="button" v-else-if="signData.selectState === '4'">

      <div class="out color_text" v-on:click="changeState('cancel')">取消淘汰</div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "sign_detail.vue",

    data () {

      return {

        signData: {},

        clickType: ''

      }

    },

    mounted () {

      this.init();

    },


    methods: {


      init: function () {

        this.signData = JSON.parse(localStorage.getItem('signDataEnt'));

      },

      changeState: function (type) {

        if(this.clickType) return;

        var message, title, num;

        switch (type) {

          case 'use':

            title = '确认录用';

            message = '确认通过后，该用户将成功承接该任务确认录用？';

            num = '3';

            break;

          case 'out':

            title = '确认淘汰';

            message = '该用户履历不符合任务要求，淘汰后将无法承接该任务';

            num = '4';

            break;

          case 'cancelUse':

            title = '确认取消录用';

            message = '取消录用的用户，可重新录用，也可淘汰';

            num = '1';

            break;

          case 'cancel':

            title = '确认取消淘汰';

            message = '取消淘汰的用户，可重新录用';

            num = '1';

            break;

        }

        this.$messagebox({

          title: title,
          message: message,
          showCancelButton:true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: true,

        }).then(res=>{

          if(res === 'confirm'){

            this.clickType = true;

            var params, url = '', httpSet = {};

            if(type === 'cancelUse' || type === 'cancel'){

              params = {};
              params.taskId = this.signData.taskId;
              params.userId = this.signData.userId;
              params.selectState = this.signData.selectState;
              url = 'task/cancel/employordieout';
              httpSet.params = params;

            }else if(type === 'use' || type === 'out'){

              var data = {};
              data.relId = this.signData.relId;
              data.taskId = this.signData.taskId;
              data.userId = this.signData.userId;
              data.entId = this.signData.entId;
              data.userName = this.signData.userName;
              data.mobile = this.signData.mobile;
              data.selectState = (type === 'use') ? ('3') : ('4');
              data.taskName = this.signData.taskName;
              params = new FormData();
              params.append('dataList',JSON.stringify([data]));
              url = 'task/update/userselectstate';
              httpSet.data = params;

            }

            httpSet.url = process.env.API_ROOT + url;
            httpSet.method = 'post';

            this.$http(httpSet).then(res=>{

              this.clickType = false;

              var message = res.data.msg;

              if(res.data.code === '0000'){

                switch (type) {
                  case 'use':
                    message = '录用成功';
                    break;
                  case 'out':
                    message = '淘汰成功';
                    break;
                  case 'cancelUse':
                    message = '已取消录用';
                    break;
                  case 'cancel':
                    message = '已取消淘汰';
                    break;
                }

                this.signData.selectState = num;

              }

              this.$toast({

                message: message,
                position: 'middle',
                duration: 1500

              });

            });

          }

        });

      },


      jumpTo: function () {

        this.$router.push({path: '/taskDetail', query: {taskId: this.signData.taskId}});

      },

    }
  }
</script>

<style scoped lang="less">
  @import "sign_detail.less";
</style>
