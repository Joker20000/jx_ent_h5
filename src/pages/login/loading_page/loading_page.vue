<script src="../../../../../app.34d97ef3c92819f44c6f.js"></script>
<template>
  <div class="loading_page">
    <!-- <img src="../../../../static/image/jx_loading_page.png"> -->
    <img :src="imgSrc">
  </div>
</template>

<script>
export default {
  name: "loading_page",

  data() {
    return {
      imgSrc: ""
    };
  },
  
  beforeCreate(){
    
    // alert(111111);
    
    var type = "";
        
        let url = window.location.href.split("?")[1];
        
        if (url) {
        type = url.split("=")[1];
        }
        
        if(type){
        
        document.title = ' 卓川';
        }else{
          document.title = ' 嘉薪';
        }
    
  },

  mounted() {
    this.$indicator.open();

    var type = "";
    
    let url = window.location.href.split("?")[1];

    if (url) {
      type = url.split("=")[1];
    }
    
    switch (type) {
      case "zhuochuan":
        localStorage.setItem("zhuochuan", "zhuochuan");
        this.imgSrc = require("../../../../static/image/zhuochuan-loading.png");
        break;

      default:
        localStorage.removeItem('zhuochuan')
        this.imgSrc = require("../../../../static/image/jx_loading_page.png");
        break;
    }


    /*随便一个接口，检测登录状态*/
    this.$http({
      url: process.env.API_ROOT + "table/record/unreadnum",
      method: "get"
    }).then(res => {
      this.$router.push("/workDesk/homepage");
    });
  },

  destroyed() {
    this.$indicator.close();
  }
};
</script>

<style scoped>
.loading_page {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: white;
}
.loading_page img {
  margin: auto;
  width: 100%;
  height: calc(100vw * 643 / 599);
}
</style>
