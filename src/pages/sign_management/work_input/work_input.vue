<template>
  <div class="addition_input">

    <div class="addition_text">
      <div class="title">
        <span class="must_input">*</span>反馈内容</div>
      <textarea v-model="additionText" placeholder="请填写反馈内容 （200字以内）" maxlength="200"></textarea>
      <div class="show_number">{{additionText.length}}</div>
    </div>

    <div class="input_files">
      <div class="title">上传附件
        <span>（最多上传6个附件，大小不超过3M）</span>
      </div>
      <div class="file_list">
        <div class="file" v-for="file in fileList">
          <div class="file_img">
            <img src="../../../../static/image/jx_task_file_download.png">
          </div>
          <div class="file_name">{{file.name}}</div>
          <div class="close" v-on:click="deleteFile(file.name)"><img src="../../../../static/image/contract_close.png"></div>
        </div>
        <div class="add_file" v-if="fileList.length < 6">
          <input type="file" v-on:change="fileInput">
          <div class="add_file_img">
            <img src="../../../../static/image/jx_add_file.png">
          </div>
        </div>
      </div>

      <div class="place">
        <div class="img"><img src="../../../../static/image/jx_work_check_place.png"></div>
        <div class="place_detail">{{place}}</div>
      </div>
    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submit"></commonButton>

  </div>
</template>

<script>
import commonButton from "../../../component/common_button/common_button";
export default {
  name: "work_input.vue",

  components: {
    commonButton
  },

  data() {
    return {
      additionText: "", //补充任务描述

      fileList: [], //上传文件列表

      btnName: "提交反馈", //按钮名称

      filesUrl: [], //文件链接列表

      filesName: [], //文件名称列表
      
      place: ''
    };
  },
  mounted() {
   this.init();
  },

  methods: {
  
    init: function () {
    
      var self = this;
    
      /*
       * 接口：获取微信签名
       * 请求方式：POST
       * 接口：jx/common/getweixinsign
       * 入参：url
       */
    
      console.log(window.location.href);
    
      this.$http({
      
        method: 'post',
      
        url: process.env.API_ROOT + 'jx/common/getweixinsign',
      
        params: {
        
          url: window.location.href
        
        },
      
      }).then((res) => {
      
        console.log(res.data)
      
        console.log('获取签名')
      
        self.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxee620089167335f6', // 必填，公众号的唯一标识 - 测试版本
          //appId: 'wx1c4f2e1dc540639e', // 必填，公众号的唯一标识 - 生产版本
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature,// 必填，签名
          jsApiList: ['checkJsApi', 'openLocation', 'getLocation'], // 必填，需要使用的JS接口列表
        });
      
      
        self.wx.checkJsApi({
          jsApiList: ['getLocation'],
          success: function (res) {
            if (res.checkResult.getLocation == false) {
            
              this.$messagebox({
                title: '提示',
                message: '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！',
                showCancelButton: false,
                confirmButtonText: '我知道了',
                confirmButtonClass: 'confirm_btn_orange',
              }).then((action) => {
              }).catch((res) => {
              })
              return;
            }
          }
        });
      
        self.wx.ready(function () {
        
          console.log('获得地址详细')
        
          self.wx.getLocation({
          
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          
            success: function (res) {
            
              this.latitude = res.latitude;// 纬度，浮点数，范围为90 ~ -90
            
              this.longitude = res.longitude// 经度，浮点数，范围为180 ~ -180
            
            
              self.setStorage('pLatitude',res.latitude)
            
              self.setStorage('pLongitude',res.longitude)
            
            
              console.log('纬度' + this.latitude)
            
              console.log('经度' + this.longitude)
            
              delete self.$http.defaults.headers.common.Authorization;
            
            
            
              //转gps
              self.$http({
              
                method: 'get',
              
                url: 'https://restapi.amap.com/v3/assistant/coordinate/convert',
              
                params: {
                
                  key: '91346f1a20ac9f3db7691f94b8547873',//key值
                
                  locations: this.longitude + ',' + this.latitude,//key值
                
                  coordsys: 'gps',
                
                }
              
              }).then((res) => {
              
                console.log(res.data)
              
                this.gpsLocation = res.data.locations
              
                if (res.data.info == 'ok') {
                
                
                  //逆编译
                  self.$http({
                  
                    method: 'get',
                  
                    url: 'https://restapi.amap.com/v3/geocode/regeo',
                  
                    params: {
                    
                      key: '91346f1a20ac9f3db7691f94b8547873',//key值
                    
                      location: this.gpsLocation
                    
                    },
                  
                  }).then(function (res) {
                  
                    console.log(res.data);
                  
                  
                    console.log(res.data.regeocode.formatted_address)
                  
                    self.place = res.data.regeocode.formatted_address;
                  
                    self.$http.defaults.headers.common.Authorization = localStorage.getItem('Authorization');
                  
                  
                  
                  
                  }.bind(this)).catch((res) => {
                  
                    console.log(res);
                  
                  });
                
                }
              
              }).catch((res) => {
              })
            
            
            },
            cancel: function () {
            
              console.log('不允许')
            
              this.place = '暂无位置'
              // 用户取消后执行的回调函数
            }
          });
        
        
        });
      
      
      }).catch((res) => {
      })
    
    
    },
    
    
    //文件上传
    fileInput: function() {
      var file = event.currentTarget.files[0];

      var message;

      var input;

      if (file.name.split(".")[1] === "exe") {
        message = "不支持ext格式文件";

        input = false;
      } else if (file.size > 3 * 1024 * 1024) {
        message = "文件过大，无法上传，请压缩后重新上传";

        input = false;
      } else {
        var param = new FormData(); //创建form对象

        param.append("file", file, file.name); //通过append向form对象添加数据

        message = "文件上传中";

        input = true;
        /*
          * 接口： 图片上传
          * 请求方式： POST
          * 接口： jx/upload/oss
          * 入参： file
          * */
        this.$http({
          url: process.env.API_ROOT + "jx/upload/oss",
          method: "post",
          data: param
        }).then(res => {
          toast.close();

          if (res.data.code === "0000") {
            message = "上传成功";

            var thisfile = {};

            thisfile.name = file.name;

            thisfile.url = res.data.data.url;

            this.filesUrl.push(res.data.data.url);

            this.filesName.push(file.name);

            this.fileList.push(thisfile);
          } else {
            message = res.data.msg;
          }

          this.$toast({
            message: message,
            position: "middle",
            duration: 1500
          });
        });
      }

      var toast = this.$toast({
        message: message,
        position: "middle",
        duration: input ? 15000 : 1500
      });

      event.currentTarget.value = "";
    },

    //删除已上传文件
    deleteFile: function(name) {
      this.fileList.some(obj => {
        if (obj.name === name) {
          this.fileList.splice(this.fileList.indexOf(obj), 1);

          this.filesUrl.splice(this.filesUrl.indexOf(obj.url), 1);

          this.filesName.splice(this.filesName.indexOf(obj.name), 1);
        }

        return obj.name === name;
      });
    },

    //提交任务补充
    submit: function() {
      if (!this.check()) return;

      let workDetail = JSON.parse(localStorage.getItem("signDataEnt"));
      
      var params = {};

      params.taskId = workDetail.taskId;

      params.taskAddtionDetail = this.additionText;

      this.fileList.length > 0 &&
        ((params.originalFileNamesAdd = this.filesName.join(",")) &&
          (params.taskAddtionFile = this.filesUrl.join(",")));

      /*
        * 接口： 企业众包任务添加附加内容
        * 请求方式： POST
        * 接口： addaddtionaltaskdetails
        * 入参： taskId, taskAddtionDetail, originalFileNamesAdd, taskAddtionFile
        * */
      this.$http({
        url: process.env.API_ROOT + "user/task/addfeedback",
        method: "post",
        params: params
      }).then(res => {
        if (res.data.code === "0000") {
          this.$router.go(-1);
        }
      });
    },

    //检测页面输入信息
    check: function() {
      var message;

      if (!this.additionText) {
        message = "请填写反馈内容";
      } else if (this.additionText.length < 4) {
        message = "反馈内容不少于4个字符";
      } else {
        return true;
      }

      this.$toast({
        message: message,
        position: "middle",
        duration: 1500
      });

      return false;
    }
  }
};
</script>

<style scoped lang="less">
@import "work_input.less";
</style>
