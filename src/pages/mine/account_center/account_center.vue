<template>
  <div class="account_center">

    <div class="account_information">

      <div class="information_list" v-if="adminType === '02'">
        <div class="title">企业logo</div>
        <div class="icon">
          <img v-bind:src="logoPath" v-if="!!logoPath">
          <img src="../../../../static/image/jx_logo_orange.png" v-else>
        </div>
        <input type="file" v-on:change="inputLogo" accept="image/*">
      </div>

      <div class="information_list">
        <div class="title">管理员角色</div>
        <div>{{adminName}}</div>
      </div>

      <div class="information_list select" v-on:click="$router.push('/changeTel')">
        <div class="title">管理员账号</div>
        <div>{{mobile | plusXing(3,4)}}</div>
      </div>

      <div class="information_list select" v-on:click="$router.push('/changePassword')">
        <div class="title">修改登录密码</div>
      </div>

    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="logout"></commonButton>

    <div class="image_cut" v-if="cutShow">
      <!--图片截取组件-->
      <VueCropper ref="cropper" :img="imgSrc" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full"
                  :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
                  :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
                  :high="option.high" :canScale="true" :enlarge="largeTime" :fixed="option.fixed"
      ></VueCropper>
      <div class="button">
        <div class="cancel" v-on:click="cancelImg">取消</div>
        <div class="confirm" v-on:click="getImage">确定</div>
      </div>
    </div>

  </div>
</template>

<script>
  import commonButton from '../../../component/common_button/common_button'
  import { vueCropper } from 'vue-cropper'
  export default {
    name: "account_center.vue",
    components: {

      commonButton: commonButton

    },

    data () {

      return {

        btnName: '退出登录',//按钮名称

        adminName: '',//用户名称

        logoPath: '',//企业logo地址

        mobile:  '',//用户账号

        adminType: '',//用户权限

        option: {
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 300,
          centerBox: false,
          high: true,
          fixed: true
        },//图片处理插件数据

        cutShow: false,//图片处理插件显示状态

        imgSrc: '',//待处理图片链接

        largeTime: '',//处理图片放大缩小倍数

      }

    },

    mounted () {

      this.adminName = localStorage.getItem('adminNameEnt');
      this.mobile = localStorage.getItem('mobileEnt');
      (!!localStorage.getItem('logoPathEnt')) && (this.logoPath = localStorage.getItem('logoPathEnt'));
      this.adminType = localStorage.getItem('adminTypeEnt');

    },


    methods: {

      //退出登录
      logout: function () {

        this.$messagebox({

          title: '提示',
          message: '确定要退出登录',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClas: 'cancel_btn',
          confirmButtonClass: 'confirm_btn'

        }).then(res=>{

          if(res === 'confirm'){

            this.signOut();

          }

        });

      },

      //退出登录
      signOut: function () {

        /*
        * 接口： 退出登录
        * 请求方式： GET
        * 接口： jx/action/logout
        * 入参： null
        * */
        this.$http({

          url: process.env.API_ROOT + 'jx/action/logout',
          method: 'get'

        }).then(res=>{

          if(res.data.code === '0000'){
  
            localStorage.removeItem('AuthorizationEnt');
            this.$router.push('/login');
            window.location.reload();

          }


        })

      },


      //上传图片
      inputLogo: function (e) {

        var file = e.currentTarget.files[0];

        this.imgSrc = URL.createObjectURL(file);

        this.cutShow = true;

      },

      //取消图片编辑
      cancelImg: function () {

        this.imgSrc = '';

        this.cutShow = false;

      },


      //获取编辑后图片
      getImage: function () {

        var height = this.$refs.cropper.cropH;
        var width = this.$refs.cropper.cropW;
        this.largeTime = Math.sqrt(800*800/height/width);


        setTimeout(()=>{

          this.$refs.cropper.getCropData((data) => {

            var form = new FormData();  // 创建FormData 对象
            let bl = this.base64UrlToBlob(data);
            form.append("file", bl, "File_"+Date.parse(new Date())+".jpg"); // 文件对象
            this.imgRequest(form);

          });

          this.cutShow = false;

        },10);

      },

      //上传图片
      imgRequest:function(param){

        let that =this;

        that.$indicator.open({
          text: '上传中,请耐心等待',
          spinnerType: 'fading-circle'
        });

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

          }).then((res) => {

          console.log(res.data);

          if (res.data.code == '0000') {

            that.changeLogo(res.data.data.url);

          }else {

            that.$indicator.close();

            that.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

          }
        }).catch((res)=>{})


      },


      //图片格式转换
      base64UrlToBlob:function(urlData){
        let arr = urlData.split(','),
          mime = arr[0].match(/:(.*?);/)[1],  // 去掉url的头，并转化为byte
          bstr = atob(arr[1]),    // 处理异常,将ascii码小于0的转换为大于0
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
        //转file
        //return new File([u8arr], filename, {type:mime});
      },


      //更换logo事件
      changeLogo: function (img) {


        /*
        * 接口： 企业名称与LOGO设置
        * 请求方式： post
        * 接口： set/ent/updatelogo
        * 入参： entName, logoPath
        * */
        this.$http({

          url: process.env.API_ROOT + 'set/ent/updatelogo',
          method: 'post',
          params: {
            entName: localStorage.getItem('entNameEnt'),
            logoPath: img
          }

        }).then(res=>{

          this.$indicator.close();

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code === '0000'){

            localStorage.setItem('logoPathEnt', img);

            this.logoPath = img;

          }

        })

      }

    },


    destroyed () {

      this.$messagebox.close();

    }
  }
</script>

<style scoped lang="less">
  @import "account_center.less";
</style>
