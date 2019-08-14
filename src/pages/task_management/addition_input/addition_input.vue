<template>
  <div class="addition_input">

    <div class="addition_text">
      <textarea v-model="additionText" placeholder="请补充任务描述，4-10000个字符"></textarea>
      <div class="show_number">{{additionText.length}}</div>
    </div>

    <div class="input_files">
      <div class="title">上传附件<span>（最多上传5个附件，大小不超过8M，不支持.ext格式）</span></div>
      <div class="file_list">
        <div class="file" v-for="file in fileList">
          <div class="file_img">
            <img src="../../../../static/image/jx_task_file_download.png">
          </div>
          <div class="file_name">{{file.name}}</div>
          <div class="close" v-on:click="deleteFile(file.name)"><img src="../../../../static/image/contract_close.png"></div>
        </div>
        <div class="add_file" v-if="fileList.length < 5">
          <input type="file" v-on:change="fileInput">
          <div class="add_file_img">
            <img src="../../../../static/image/jx_add_file.png">
          </div>
        </div>
      </div>
    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

  </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "addition_input.vue",

    components: {

      commonButton

    },

    data () {

      return {

        additionText: '',//补充任务描述

        fileList: [],//上传文件列表

        btnName: '确定',//按钮名称

        filesUrl: [],//文件链接列表

        filesName: [],//文件名称列表

      }

    },

    methods: {

      //文件上传
      fileInput: function () {

        var file = event.currentTarget.files[0];

        var message;

        var input;

        if(file.name.split('.')[1] === 'exe'){

          message = '不支持ext格式文件';

          input = false;

        }else if(file.size > 8*1024*1024) {

          message = '文件过大，无法上传，请压缩后重新上传';

          input = false;

        }else {

          var param = new FormData(); //创建form对象

          param.append('file',file,file.name);//通过append向form对象添加数据

          message = '文件上传中';

          input = true;
          /*
          * 接口： 图片上传
          * 请求方式： POST
          * 接口： jx/upload/oss
          * 入参： file
          * */
          this.$http({

            url: process.env.API_ROOT + 'jx/upload/oss',
            method: 'post',
            data: param

          }).then(res=>{

            toast.close();

            if(res.data.code === '0000'){

              message = '上传成功';

              var thisfile = {};

              thisfile.name = file.name;

              thisfile.url = res.data.data.url;

              this.filesUrl.push(res.data.data.url);

              this.filesName.push(file.name);

              this.fileList.push(thisfile);

            }else {

              message = res.data.msg;

            }

            this.$toast({

              message: message,
              position: 'middle',
              duration: 1500

            });

          });

        }

        var toast = this.$toast({

          message: message,
          position: 'middle',
          duration: input? 15000 : 1500

        });

        event.currentTarget.value = '';

      },


      //删除已上传文件
      deleteFile: function (name) {

        this.fileList.some(obj => {

          if (obj.name === name){

            this.fileList.splice(this.fileList.indexOf(obj),1);

            this.filesUrl.splice(this.filesUrl.indexOf(obj.url),1);

            this.filesName.splice(this.filesName.indexOf(obj.name),1);

          }

          return obj.name === name;

        });

      },

      //提交任务补充
      submit: function () {

        if(!this.check()) return;

        var params = {};

        params.taskId = this.$route.query.taskId;

        params.taskAddtionDetail = this.additionText;

        (this.fileList.length > 0) && ((params.originalFileNamesAdd = this.filesName.join(',')) && (params.taskAddtionFile = this.filesUrl.join(',')));

        /*
        * 接口： 企业众包任务添加附加内容
        * 请求方式： POST
        * 接口： addaddtionaltaskdetails
        * 入参： taskId, taskAddtionDetail, originalFileNamesAdd, taskAddtionFile
        * */
        this.$http({

          url: process.env.API_ROOT + 'addaddtionaltaskdetails',
          method: 'post',
          params: params

        }).then(res=>{

          if(res.data.code === '0000') {

            this.$router.go(-1);

          }

        })

      },


      //检测页面输入信息
      check: function () {

        var message;

        if(!this.additionText) {

          message = '请输入任务描述';

        }else if(this.additionText.length < 4) {

          message = '任务描述内容不少于4个字符';

        }else if(this.additionText.length > 10000) {

          message = '任务描述内容不多余10000个字符';

        }else {

          return true;

        }

        this.$toast({

          message: message,
          position: 'middle',
          duration: 1500

        });

        return false;

      }

    }
  }
</script>

<style scoped lang="less">
  @import "addition_input.less";
</style>
