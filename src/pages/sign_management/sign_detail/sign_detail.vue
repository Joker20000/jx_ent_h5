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
        <div class="list">
          <div class="name">姓名：</div>
          <div class="detail">小明</div>
        </div>
        <div class="list">
          <div class="name">手机号：</div>
          <div class="detail">15823567856</div>
        </div>
        <div class="list">
          <div class="name">技能标签：</div>
          <div class="detail">神车手</div>
        </div>
        <div class="list">
          <div class="name">自我介绍：</div>
          <div class="detail">这是自我介绍这是自我介绍这是自我介绍这是自我介绍</div>
        </div>
        <div class="list">
          <div class="name">报名时间：</div>
          <div class="detail">2019-07-18 12:45:34</div>
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
          <div class="detail">招聘饿了么美团外卖骑手</div>
        </div>
        <div class="list">
          <div class="name">发布企业：</div>
          <div class="detail">嘉福集团</div>
        </div>
        <div class="jump_to color_text">查看任务详情</div>
      </div>

    </div>

    <div class="button">

      <div class="out color_text" v-on:click="changeState('out')">淘汰</div>

      <div class="use background_linear_gradient" v-on:click="changeState('use')">录用</div>

    </div>

    <div class="button">

      <div class="out color_text" v-on:click="changeState('cancelUse')">取消录用</div>

    </div>

    <div class="button">

      <div class="out color_text" v-on:click="changeState('cancel')">取消淘汰</div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "sign_detail.vue",

    data () {

      return {



      }

    },

    mounted () {

      this.init();

    },


    methods: {


      init: function () {



      },

      changeState: function (type) {

        var message, title;

        switch (type) {

          case 'use':

            title = '确认录用';

            message = '确认通过后，该用户将成功承接该任务确认录用？';

            break;

          case 'out':

            title = '确认淘汰';

            message = '该用户履历不符合任务要求，淘汰后将无法承接该任务';

            break;

          case 'cancelUse':

            title = '确认取消录用';

            message = '取消录用的用户，可重新录用，也可淘汰';

            break;

          case 'cancel':

            title = '确认取消淘汰';

            message = '取消淘汰的用户，可重新录用';

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



          }

        });

      },

    }
  }
</script>

<style scoped lang="less">
  @import "sign_detail.less";
</style>
