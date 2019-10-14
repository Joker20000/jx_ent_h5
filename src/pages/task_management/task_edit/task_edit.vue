<template>

  <div class="release_task task_page">
    <div class="task_information">
      <div class="list must_input" v-on:click="pickerSelect('templet')">
        <div class="title">合同模板</div>
        <div class="content select" v-if="this.templet.length === 0">请选择合同模板</div>
        <div class="content select data" v-else>{{this.templet[0]}}</div>
      </div>

      <div class="list must_input">
        <div class="title">合同名称</div>
        <div class="content">
          <input type="text" placeholder="请输入合同名称，不超过50个字" max="50" v-model="templetName" @blur="lostPointFn">
        </div>
      </div>

      <!-- <div class="list must_input" v-on:click="pickerSelect('ext')" v-show="isCompanySelectShow">
        <div class="title">业务合作企业</div>
        <div class="content select" v-if="this.ext.length === 0">请选择业务合作企业</div>
        <div class="content select data" v-else>{{this.ext[0]}}</div>
      </div> -->

    </div>

    <div class="sign_agreement">
      <input type="checkbox" class="agree" checked>
      <span>我已阅读并同意
        <span v-on:click="$router.push('signAgreement')">《快捷签署服务委托协议书》</span>
      </span>
    </div>

    <commonButton v-bind:btnName="btnName" v-on:clickEvent="submitTaskChange()"></commonButton>

    <mt-popup v-model="pickerShow" position="bottom" v-bind:closeOnClickModal="false">
      <div class="picker_button">
        <div class="picker_cancel" v-on:click="pickerCancel">取消</div>
        <div class="picker_confirm color_text" v-on:click="pickerConfirm">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValueChange" ref="picker"></mt-picker>
    </mt-popup>

  </div>

</template>

<script>
import commonButton from "../../../component/common_button/common_button";
export default {
  name: "task_edit",

  components: {
    commonButton
  },

  data() {
    return {
      btnName: "确定",
      entId: "", //企业Id

      templetList: [], //合同模板列表

      templetName: "", //合同名称

      cooperate: [], //合作企业列表

      _templet: "", //点击取消时选择的合同模板类型

      templet: [], //点击确定时选择的合同模板类型

      _ext: "", //点击取消时选择的合作企业

      ext: [], //点击确定时选择的合作企业

      pickerType: false, //选择框加载时的状态(页面加载中和页面加载完成)

      pickerShow: false, //选择框显示状态

      lastPickerClick: "", //点击显示选择框位置

      slots: [], //选择框数据列表

      slot1: {
        flex: 1,
        values: [],
        textAlign: "center"
      },
      // isCompanySelectShow: false

      templetListStroge:[]


    };
  },

  mounted() {
    this.getTempletList();
    this.getAllCooperateInfo();
  },

  methods: {
    //备注失去焦点恢复页面（ios输入法）
    lostPointFn: function() {
      document.body.scrollTop = scrollY;
    },

    //获取合同模板列表
    getTempletList: function() {
      /*
        * 接口： 查看模板列表
        * 请求方式： POST
        * 接口： get/ssh/templetList
        * 入参： null
        * */
      this.$http({
        url: process.env.API_ROOT + "get/ssh/templetList",
        method: "post"
      }).then(res => {
        this.templetListStroge = res.data.data.list;

      if(!this.$route.query.extEntId){
        this.templetList = this.templetListStroge.filter(e=>{
          return e.templetType == 1
        })
      }else{
        this.templetList =  this.templetListStroge.filter(e =>{
          return e.templetType == 2;
        })
      }

      });
    },

    //获取合作企业列表
    getAllCooperateInfo: function() {
      /*
        * 接口： 获取业务合作企业信息
        * 请求方式： POST
        * 接口： contract/manage/getallcooperateinfo
        * 入参： null
        * */
      this.$http({
        url: process.env.API_ROOT + "contract/manage/getallcooperateinfo",
        method: "post"
      }).then(res => {
        this.cooperate = res.data.data;
      });
    },

    //点击页面弹出框事件
    pickerSelect: function(clickType) {
      this.pickerType = true;

      if (this.lastPickerClick !== clickType) {
        this.slots = [];

        switch (clickType) {
          case "templet":
            this.templetSelect();
            break;
          // case "ext":
          //   this.extSelect();
          //   break;
        }
      }

      this.lastPickerClick = clickType;

      this.pickerShow = true;

      this.pickerType = false;

      setTimeout(function() {
        var div = document.getElementsByClassName("task_page")[0];

        var scrollY = window.scrollY;

        div.style.position = "fixed";

        div.style.top = -scrollY + "px";

        div.style.overflow = "hidden";
      }, 100);
    },

    //选择框取消事件
    pickerCancel: function() {
      this.pickerShow = false;

      this["_" + this.lastPickerClick] = [this.$refs.picker.getSlotValue(0)];

      !!this.$refs.picker.getSlotValue(1) &&
        this["_" + this.lastPickerClick].push(
          this.$refs.picker.getSlotValue(1)
        );

      var div = document.getElementsByClassName("task_page")[0];

      var scrollY = parseInt(div.style.top);

      div.style.position = "";

      div.style.top = "";

      div.overflow = "";

      window.scrollTo(0, -scrollY);
    },

    //选择框确定事件
    pickerConfirm: function() {
      this.pickerShow = false;

      this[this.lastPickerClick] = [this.$refs.picker.getSlotValue(0)];

      !!this.$refs.picker.getSlotValue(1) &&
        this[this.lastPickerClick].push(this.$refs.picker.getSlotValue(1));

      var div = document.getElementsByClassName("task_page")[0];

      var scrollY = parseInt(div.style.top);

      div.style.position = "";

      div.style.top = "";

      div.overflow = "";

      window.scrollTo(0, -scrollY);
    },

    //选择框更换值事件
    onValueChange: function() {
      if (!this.lastPickerClick) return;

      if (this.lastPickerClick === "type") {
        this.typePickerChange();
      } else if (this.lastPickerClick === "place") {
        this.placePickerChange();
      }
    },

    //选择合同模板
    templetSelect: function() {
      this.slot1.values = this.getArray(this.templetList, "templetName");

      this.slots.push(this.slot1);

      this._templet &&
        !this.templet &&
        this.$refs.picker.setSlotValue(0, this._templet[0]);

      this.templet && this.$refs.picker.setSlotValue(0, this.templet[0]);
    },

    getArray: function(obj, key) {
      let arr = [];

      obj.forEach(res => {
        arr.push(res[key]);
      });

      return arr;
    },
    // //选择合作企业
    // extSelect: function() {
    //   this.slot1.values = this.getArray(this.cooperate, "cooperateEntName");

    //   this.slots.push(this.slot1);

    //   this._ext && !this.ext && this.$refs.picker.setSlotValue(0, this._ext[0]);

    //   this.ext && this.$refs.picker.setSlotValue(0, this.ext[0]);
    // },
    submitTaskChange() {

      if(!this.checkAll()) return;
      let params={};
      params.taskId = this.$route.query.taskId;
      //合同类型赋值
      this.templetList.some(obj => {
        obj.templetName === this.templet[0] && (params.templateId = obj.tempId);
      });
      //合同名称赋值
      params.contractName = this.templetName;
      // 改送自动发送任务合同
      params.isSendContract='1';
      //合作企业赋值
      // this.cooperate.some(obj => {
      //   obj.cooperateEntName === this.ext[0] &&
      //     (params.extEntId = obj.cooperateEntId);
      // });

      this.$http({
        url: process.env.API_ROOT + "updateenttask",
        method: "post",
        params
      }).then(res => {

        if(!!params.templateId){
          this.$toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          });

          if (res.data.code == "0000") {
            this.$router.go(-1);
          }
        }

      });
    },
    checkAll: function () {

      var message;

      if (this.templet.length === 0) {
        message = "请选择合同模板";
      } else if (!this.templetName) {
        message = "请输入合同名称";
      }else if (!document.getElementsByClassName("agree")[0].checked) {
        message = "请同意《快捷签署服务委托协议书》";
      } else {
        return true;
      }

      this.$toast({

        message: message,
        position: 'middle',
        duration: 1500

      });
    }
  },
  watch:{
    templet: function() {
      let item = {};
      //合同类型赋值
      this.templetList.some(obj => {
        obj.templetName === this.templet[0] && (item = obj);
      });

      // if (item.templetType == 2) {
      //   this.isCompanySelectShow = true;
      // } else {
      //   this.isCompanySelectShow = false;
      // }
    }
  }
};
</script>

<style scoped lang="less">
@import "task_edit.less";
</style>
