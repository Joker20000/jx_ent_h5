<template>

  <div class="work_desk">
    <router-view v-bind:newMessage="newMessage"></router-view>

    <div class="foot">

      <div class="button" v-bind:class="{'color_text': $store.state.workDeskState === 'homepage'}" v-on:click="$router.push('/workDesk/homepage')">

        <div><i class="iconfont icongongzuotai"></i></div>
        <div>工作台</div>

      </div>

      <div class="button" v-on:click="$router.push('/releaseTask')">

        <div class="img">

          <img src="../../../static/image/jx_publish_task.png">

        </div>

        <div>发任务</div>

      </div>

      <div class="button" v-bind:class="{'color_text': $store.state.workDeskState === 'mine', 'new_message': newMessage}" v-on:click="$router.push('/workDesk/mine')">

        <div><i class="iconfont iconwode"></i></div>
        <div>我的</div>

      </div>

    </div>


  </div>

</template>
<script>
  export default {

    name: 'workDesk',

    data () {

      return {

        newMessage: false

      }

    },

    created () {

      this.$http({

        url: process.env.API_ROOT + 'table/record/unreadnum',
        method: 'get'

      }).then(res=>{

        if(res.data.data !== 0) {

          this.newMessage = true;

        }

      })

    }

  }
</script>
<style lang="less" scoped>

  .work_desk{
    .foot{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding: 10px 15px;
      background-color: white;
      box-shadow: 0 -1px 3px #e5e5e5;
      .button{
        flex: 1;
        text-align: center;
        div{
          color: #ababab;
          &:last-child{
            margin-top: 5px;
          }
          i{
            font-size: 22px;
            color: #ababab;
          }
        }
        .img{
          position: absolute;
          width: 33px;
          height: 33px;
          padding: 8px;
          border-radius: 50%;
          background: white;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 -3px 3px #e5e5e5;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .color_text{
        div{
          color: #3a8aff;
          i{
            color: #3a8aff;
          }
        }
      }
      .new_message{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          display: block;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 50%;
          transform: translateX(10px);
        }
      }
    }
  }

</style>
