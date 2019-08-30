<template>
    <div class="change_password">

      <div class="input">

        <div class="list">
          <span>原密码</span>
          <input type="password" placeholder="请输入原密码" v-model="oldPassword">
        </div>

        <div class="list">
          <span>新密码</span>
          <input type="password" placeholder="6-20位字母数字密码" v-model="password">
        </div>

        <div class="list">
          <span>确认密码</span>
          <input type="password" placeholder="请再次输入密码" v-model="passwordAgain">
        </div>

      </div>

      <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

    </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "change_password.vue",

    components: {

      commonButton

    },

    data () {

      return {

        btnName: '确认',//按钮名称

        oldPassword: '',//原密码

        password: '',//新密码

        passwordAgain: '',//验证新密码

      }

    },


    methods: {

      //检测页面数据
      check: function () {

        var message;

        var pasdRegex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//(6-16位，大小字母以及数字)

        if(this.oldPassword === ''){

          message = '请输入原密码';

        }else if(this.password === ''){

          message = '请输入新密码';

        }else if(this.passwordAgain === ''){

          message = '请再次输入密码';

        }else if(!pasdRegex.test(this.password)){

          message = '请输入6-20位字母数字密码'

        }else if(this.password !== this.passwordAgain){

          message = '请确认两次密码相同';

        }else if(this.password === this.oldPassword) {

          message = '新密码和原密码不能相同！';

        }else {

          return true;

        }

        this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

        return false;

      },


      //更换密码
      submit: function () {

        if(!this.check()) return;

        /*
        * 接口： 管理员修改密码
        * 请求方式： POST
        * 接口： set/safety/changepwd
        * 入参： oldPassword, password, confirmPassword
        * */
        this.$http({

          url: process.env.API_ROOT + 'set/safety/changepwd',

          method: 'post',

          params: {

            oldPassword: hexMD5(this.oldPassword),

            password: hexMD5(this.password),

            confirmPassword: hexMD5(this.passwordAgain)

          }

        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1000

          });

          if(res.data.code === '0000'){

            setTimeout(()=>{

              this.$router.go(-1);

            },1000);

          }

        })

      }

    }
  }
</script>

<style scoped lang="less">
  @import "change_password.less";
</style>
