<template>

  <div class="common_button">

    <div v-on:click="submit">{{btnName}}</div>

  </div>

</template>
<script>

  export default {

    name: 'commonButton',

    props: {
      btnName: ''
    },

    data () {

      return {



      }

    },

    methods: {

      submit: function () {

        this.$emit('clickEvent');

      }

    }

  }

</script>
<style lang="less" scoped>
  @import "common_button.less";
</style>
