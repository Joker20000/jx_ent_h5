<template>
  <div class="addition_input">

    <div class="addition_text">
      <textarea v-model="additionText" placeholder="请补充任务描述，4-10000个字符"></textarea>
      <div class="show_number">{{additionText.length}}</div>
    </div>

    <div class="input_files">
      <div class="title">上传附件<span>（最多上传5个附件，大小不超过8M，不支持.ext格式）</span></div>
      <div class="file_list">
        <div class="file" v-for="file in fileList">{{file.name}}</div>
        <div class="input">
          <input type="file" v-on:change="fileInput">
          <div>+</div>
        </div>
      </div>
    </div>

    <commonButton v-bind:btnName="btnName"></commonButton>

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

        additionText: '',

        fileList: [],

        btnName: '确定',

        filesUrl: [],

        filesName: []

      }

    },

    methods: {

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

      }

    }
  }
</script>

<style scoped lang="less">
  @import "addition_input.less";
</style>
