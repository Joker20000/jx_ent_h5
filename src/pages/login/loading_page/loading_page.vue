<template>
  <div class="loading_page">
    <img src="../../../../static/image/jx_loading_page.png">
  </div>
</template>

<script>
  export default {
    name: "loading_page",

    mounted () {

      this.$indicator.open();


      /*随便一个接口，检测登录状态*/
      this.$http({

        url: process.env.API_ROOT + 'table/record/unreadnum',
        method: 'get'

      }).then(res=>{

        this.$router.push('/workDesk/homepage');

      });

    },

    destroyed () {

      this.$indicator.close();

    }
  }
</script>

<style scoped>
  .loading_page{
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: white;
  }
  .loading_page img{
    margin: auto;
    width: 100%;
    height: calc(100vw * 643 / 599);
  }
</style>
