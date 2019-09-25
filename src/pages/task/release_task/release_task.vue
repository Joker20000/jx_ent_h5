<template>
  <div class="release_task">

    <div class="module_title">填写任务基本信息</div>

    <div class="task_information">

      <div class="list must_input">
        <div class="title">发布到任务广场</div>
        <div class="content">
          <mt-switch v-model="showTask"></mt-switch>
        </div>
      </div>

      <div class="list must_input">
        <div class="title">
          <div>自动发送合同</div>
          <div>开启后将自动发送合同给被录用人员</div>
        </div>
        <div class="content">
          <mt-switch v-model="sendContract"></mt-switch>
        </div>
      </div>

      <div class="list must_input" v-on:click="pickerSelect('ent')">
        <div class="title">企业名称</div>
        <div class="content select" v-if="this.ent.length === 0">请选择企业名称</div>
        <div class="content select data" v-else>{{this.ent[0]}}</div>
      </div>

      <div class="list must_input">
        <div class="title">发布企业昵称</div>
        <div class="content">
          <div class="company_name">
            <input type="text" placeholder="请输入企业名称，2-32个字符" maxlength="32" minlength="2" v-model="entName" @blur="lostPointFn">
          </div>
          <div class="hide_name">
            <input type="checkbox" class="ent_name" v-model="hideName">
            <span>隐藏昵称</span>
          </div>
        </div>
      </div>

      <div class="list must_input" v-on:click="pickerSelect('type')">
        <div class="title">任务类型</div>
        <div class="content select" v-if="this.type.length === 0">请选择任务类型</div>
        <div class="content select data" v-else>{{this.type.join('>')}}</div>
      </div>

      <div class="list must_input" v-on:click="pickerSelect('place')">
        <div class="title">工作地区</div>
        <div class="content select" v-if="this.place.length === 0">请选择工作地区</div>
        <div class="content select data" v-else>{{this.place.join(' ')}}</div>
      </div>

      <div class="list must_input">
        <div class="title">任务名称</div>
        <div class="content">
          <input type="text" placeholder="请输入任务名称，4-50个字符" maxlength="50" minlength="4" v-model="taskName" @blur="lostPointFn">
        </div>
      </div>

      <div class="list must_input">
        <div class="title">任务描述</div>
        <div class="content look_mould" v-on:click="mouldShow = true">查看模板</div>
        <div class="task_detail">
          <textarea cols="30" rows="10" v-model="taskDetail" placeholder="请填写任务需求描述，4-10000个字符
例如 1、本项目是一个骑手配送任务；需要由骑手自己配备智能手机和电动车；2、骑手能够熟练使用智能手机接单、导航、驾驶电动车，年龄在18-50周岁"></textarea>
          <div class="text_length">{{taskDetail.length}}</div>
        </div>
      </div>

      <div class="list">
        <div class="title">上传附件
          <span class="ps">（最多上传5个附件，大小不超过8M，不支持.exe格式）</span>
        </div>
        <div class="file_list">
          <div class="file" v-for="file in taskFiles">
            <div class="file_img">
              <img src="../../../../static/image/jx_task_file_download.png">
            </div>
            <div class="file_name">{{file.name}}</div>
            <div class="close" v-on:click="deleteFile(file.name)"><img src="../../../../static/image/contract_close.png"></div>
          </div>
          <div class="add_file" v-if="taskFiles.length < 5">
            <input type="file" v-on:change="fileInput">
            <div class="add_file_img">
              <img src="../../../../static/image/jx_add_file.png">
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="module_title">填写预算和时间</div>

    <div class="task_information">

      <div class="list must_input">
        <div class="title">报名截止时间</div>
        <div class="content select" v-on:click="$refs.datetime.open()" v-if="!this.endDateShow">选择报名截止时间</div>
        <div class="content select data" v-on:click="$refs.datetime.open()" v-else>{{endDateShow}}</div>
        <div class="no_choose">
          <input type="checkbox" class="sign_up_time" v-model="noLimitTime">
          <span>不限</span>
        </div>
      </div>

      <div class="list must_input">
        <div class="title">任务总预算（元）</div>
        <div class="content">
          <input type="text" placeholder="请输入任务预算总金额" v-model="taskMoney" @blur="lostPointFn">
        </div>
      </div>

      <div class="list must_input">
        <div class="title">任务单价（元）</div>
        <div class="content max_min_spend">
          <input type="text" placeholder="最低单价" v-model="taskMinMoney" @blur="lostPointFn">
          <div class="line"></div>
          <input type="text" placeholder="最高单价" v-model="taskMaxMoney" @blur="lostPointFn">
        </div>
      </div>

      <div class="list must_input">
        <div class="title">需要人数</div>
        <div class="content">
          <input type="text" placeholder="请输入任务所需人数" v-model="needPerson" @blur="lostPointFn">
        </div>
        <div class="no_choose">
          <input type="checkbox" class="need_person" v-model="noLimit">
          <span>不限</span>
        </div>
      </div>

    </div>

    <div class="module_title" v-if="sendContract">合同信息</div>

    <div class="task_information" v-if="sendContract">

      <!--<div class="list must_input" v-on:click="pickerSelect('invoice')">-->
      <!--<div class="title">发票类型</div>-->
      <!--<div class="content select" v-if="this.invoice.length === 0">请选择发票类型</div>-->
      <!--<div class="content select data" v-else>{{this.invoice[0]}}</div>-->
      <!--</div>-->

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

      <div class="list must_input" v-on:click="pickerSelect('ext')" v-if="isCompanySelectShow">
        <div class="title">业务合作企业</div>
        <div class="content select" v-if="this.ext.length === 0">请选择业务合作企业</div>
        <div class="content select data" v-else>{{this.ext[0]}}</div>
      </div>

    </div>

    <div class="sign_agreement" v-if="sendContract">
      <input type="checkbox" class="agree" checked>
      <span>我已阅读并同意
        <span v-on:click="$router.push('signAgreement')">《快捷签署服务委托协议书》</span>
      </span>
    </div>

    <div class="button">
      <div class="save" v-on:click="publishTask(false)">保存</div>
      <div class="publish" v-on:click="publishTask(true)">发布</div>
    </div>

    <mt-popup v-model="pickerShow" position="bottom" v-bind:closeOnClickModal="false">
      <div class="picker_button">
        <div class="picker_cancel" v-on:click="pickerCancel">取消</div>
        <div class="picker_confirm color_text" v-on:click="pickerConfirm">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValueChange" ref="picker"></mt-picker>
    </mt-popup>

    <mt-datetime-picker ref="datetime" v-on:confirm="selectTime" type="date" v-bind:startDate="startDate" v-model="endDate"></mt-datetime-picker>

    <lookMould v-if="mouldShow" v-on:close="closeFn" v-on:useMould="useMouldFn"></lookMould>

  </div>
</template>

<script>
import lookMould from "../../../component/look_mould/look_mould";
export default {
  name: "release_task.vue",

  data() {
    return {
      showTask: true, //发布到任务广场状态

      sendContract: true, //自动发送合同状态

      taskDetail: "", //任务描述

      companyList: [], //账号下发薪企业列表

      entId: "", //企业Id

      typeList: [], //任务二级类型列表

      industry: [], //任务一级类型列表

      provinceList: [], //省列表

      cityList: [], //市列表

      invoiceList: ["人力资源服务", "现代服务"], //发表类型列表

      templetList: [], //合同模板列表

      cooperate: [], //合作企业列表

      slots: [], //选择框数据列表

      slot1: {
        flex: 1,
        values: [],
        textAlign: "center"
      }, //选择框数据列表

      slot2: {
        flex: 1,
        values: [],
        textAlign: "center"
      }, //选择框数据列表

      pickerShow: false, //选择框显示状态

      lastPickerClick: "", //点击显示选择框位置

      _type: "", //点击取消时任务类型

      type: [], //点击确定时选择的任务类型

      _place: "", //点击取消时选择的地区

      place: [], //点击确定时选择的地区

      _ent: "", //点击取消时选择的发薪企业

      ent: [], //点击确定时选择的发薪企业

      // _invoice: '',//点击取消时选择的发票类型
      //
      // invoice: [],//点击确定时选择的发票类型

      _templet: "", //点击取消时选择的合同模板类型

      templet: [], //点击确定时选择的合同模板类型

      _ext: "", //点击取消时选择的合作企业

      ext: [], //点击确定时选择的合作企业

      pickerType: false, //选择框加载时的状态(页面加载中和页面加载完成)

      entName: "", //发布企业昵称

      taskName: "", //任务名称

      taskFiles: [], //任务文件列表

      taskMoney: "", //任务总预算

      taskMaxMoney: "", //任务单价最高单价

      taskMinMoney: "", //任务单价最低单价

      needPerson: "", //需要人数

      templetName: "", //合同名称

      startDate: new Date(), //时间选择框开始时间

      endDate: new Date(), //任务结束时间

      endDateShow: "", //页面显示的任务结束时间

      filesUrl: [], //文件链接列表

      filesName: [], //文件名称列表

      mouldShow: false, //任务描述模板显示状态

      hideName: false, //隐藏昵称

      pageType: "publish", //页面状态 发布任务还是任务继续发布

      taskId: "", //任务Id

      pageLoading: true,

      isCompanySelectShow: false
    };
  },

  components: {
    lookMould //任务描述模板组件
  },

  mounted() {
    this.getData();

    //从任务详情编辑任务进入
    if (sessionStorage.getItem("change") === "1") {
      this.setTaskData();
    }

    window.scrollTo(0, 0);

    setTimeout(() => {
      this.pageLoading = false;
    }, 500);
  },

  methods: {
    //备注失去焦点恢复页面（ios输入法）
    lostPointFn: function() {
      document.body.scrollTop = scrollY;
    },

    //获取页面所需数据
    getData: function() {
      this.getCompanyList(true);

      this.getTaskList(0);

      this.getProvince();

      this.getTempletList();

      this.getAllCooperateInfo();
    },

    //获取账号下发薪企业列表
    getCompanyList: function(type) {
      this.entId = localStorage.getItem("entIdEnt");

      var params = {
        entId: this.entId,
        verifyState: 3,
        signState: 1,
        businessType: "05"
      };
      type && (params.bestSignIsOpen = 1);

      /**
       * 接口：发薪企业查询
       * 请求方式：GET
       * 接口：jx/common/salaryentbusiness
       * 入参：entId, verifyState, signState, businessType
       **/
      this.$http({
        method: "get",
        url: process.env.API_ROOT + "jx/common/salaryentbusiness",
        params: params
      }).then(res => {
        if (res.data.code === "-1") {
          this.$toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          });
        } else if (res.data.code === "0000") {
          this.companyList = res.data.data;

          var companyArr = this.getArray(this.companyList, "entName");

          if (companyArr.indexOf(this.ent[0]) === -1 && !this.pageLoading) {
            this.ent = [];

            this._ent = [];
          }

          if (this.lastPickerClick === "ent") {
            this.slots = [];

            this.slot1.values = companyArr;

            this.slots.push(this.slot1);
          }
        }
      });
    },

    //获取任务类型列表
    getTaskList: function(nodeId) {
      /*
        * 接口： 获取任务类型
        * 请求方式： GET
        * 接口： getindustrytype
        * 入参： parentId
        * */
      this.$http({
        url: process.env.API_ROOT + "getindustrytype",
        method: "get",
        params: {
          parentId: nodeId
        }
      }).then(res => {
        nodeId
          ? (this.typeList = res.data.data)
          : (this.industry = res.data.data);

        !!this.typeList &&
          (this.slot2.values = this.getArray(this.typeList, "name"));
      });
    },

    //获取省列表
    getProvince: function() {
      /*
        * 接口： 获取省地址
        * 请求方式： GET
        * 接口： jx/common/provinces
        * 入参： null
        * */
      this.$http({
        url: process.env.API_ROOT + "jx/common/provinces",
        method: "get"
      }).then(res => {
        this.provinceList = res.data.data;
      });
    },

    //获取市列表
    getCity: function(province) {
      /*
        * 接口： 获取市地址
        * 请求方式： GET
        * 接口： jx/common/citys
        * 入参： provinceId, province
        * */
      this.$http({
        url: process.env.API_ROOT + "jx/common/citys",
        method: "get",
        params: {
          province: province
        }
      }).then(res => {
        this.cityList = res.data.data;

        this.slot2.values = this.getArray(res.data.data, "addrName");
      });
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
        this.templetList = res.data.data.list;
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

    //选择框更换值事件
    onValueChange: function() {
      if (!this.lastPickerClick) return;

      if (this.lastPickerClick === "type") {
        this.typePickerChange();
      } else if (this.lastPickerClick === "place") {
        this.placePickerChange();
      }
    },

    //获取JSON数组里面单一对象的值
    getArray: function(obj, key) {
      let arr = [];

      obj.forEach(res => {
        arr.push(res[key]);
      });

      return arr;
    },

    //点击页面弹出框事件
    pickerSelect: function(clickType) {
      this.pickerType = true;

      if (this.lastPickerClick !== clickType) {
        this.slots = [];

        switch (clickType) {
          case "ent":
            this.entSelect();

            break;

          case "type":
            this.typeSelect();

            break;

          case "place":
            this.placeSelect();

            break;

          // case 'invoice':
          //
          //   this.invoiceSelect();
          //
          //   break;

          case "templet":
            this.templetSelect();

            break;

          case "ext":
            this.extSelect();

            break;
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

    //选择发薪企业
    entSelect: function() {
      this.slot1.values = this.getArray(this.companyList, "entName");

      this.slots.push(this.slot1);

      this._ent && !this.ent && this.$refs.picker.setSlotValue(0, this._ent[0]);

      this.ent && this.$refs.picker.setSlotValue(0, this.ent[0]);
    },

    //选择任务类型
    typeSelect: function() {
      this.slot1.values = this.getArray(this.industry, "name");

      this.slots.push(this.slot1);

      this.slot2.values = this.getArray(this.typeList, "name");

      this.slots.push(this.slot2);

      if (this.type) {
        this.$refs.picker.setSlotValue(0, this.type[0]);

        this.$refs.picker.setSlotValue(1, this.type[1]);
      } else if (this._type) {
        this.$refs.picker.setSlotValue(0, this._type[0]);

        this.$refs.picker.setSlotValue(1, this._type[1]);
      }
    },

    //选择地区
    placeSelect: function() {
      this.slot1.values = this.getArray(this.provinceList, "addrName");

      this.slot1.values.unshift("不限");

      this.slots.push(this.slot1);

      this.slot2.values = this.getArray(this.cityList, "addrName");

      this.slots.push(this.slot2);

      if (this.place) {
        this.$refs.picker.setSlotValue(0, this.place[0]);

        this.$refs.picker.setSlotValue(1, this.place[1]);
      } else if (this._place) {
        this.$refs.picker.setSlotValue(0, this._place[0]);

        this.$refs.picker.setSlotValue(1, this._place[1]);
      }
    },

    //选择发票类型
    // invoiceSelect: function () {
    //
    //   this.slot1.values = this.invoiceList;
    //
    //   this.slots.push(this.slot1);
    //
    //   (this._invoice && !this.invoice) && (this.$refs.picker.setSlotValue(0, this._invoice[0]));
    //
    //   (this.invoice) && (this.$refs.picker.setSlotValue(0, this.invoice[0]));
    //
    // },

    //选择合同模板
    templetSelect: function() {
      this.slot1.values = this.getArray(this.templetList, "templetName");

      this.slots.push(this.slot1);

      this._templet &&
        !this.templet &&
        this.$refs.picker.setSlotValue(0, this._templet[0]);

      this.templet && this.$refs.picker.setSlotValue(0, this.templet[0]);
    },

    //选择合作企业
    extSelect: function() {
      this.slot1.values = this.getArray(this.cooperate, "cooperateEntName");

      this.slots.push(this.slot1);

      this._ext && !this.ext && this.$refs.picker.setSlotValue(0, this._ext[0]);

      this.ext && this.$refs.picker.setSlotValue(0, this.ext[0]);
    },

    //类型选择框一级列表数据变化事件
    typePickerChange: function() {
      if (this.pickerType) return;

      var industry = this.$refs.picker.getSlotValue(0);

      var obj = this.industry.filter(res => {
        return res.name === industry;
      });

      var nodeId = obj[0].nodeId;

      if (this.$refs.picker.getSlotValue(1) === undefined) {
        this.getTaskList(nodeId);
      } else {
        this.typeList[0].parentId !== nodeId && this.getTaskList(nodeId);
      }

      this._type = [
        this.$refs.picker.getSlotValue(0),
        this.$refs.picker.getSlotValue(1)
      ];
    },

    //地址选择框一级列表数据变化事件
    placePickerChange: function() {
      if (this.pickerType) return;

      var province = this.$refs.picker.getSlotValue(0);

      if (province === "不限") {
        this.slot2.values = [];
      } else {
        var obj = this.provinceList.filter(res => {
          return res.addrName === province;
        });

        var parentId = obj[0].addrId;

        if (this.$refs.picker.getSlotValue(1) === undefined) {
          this.getCity(province);
        } else {
          parentId !== this.cityList[0].prientId && this.getCity(province);
        }
      }

      this._place = [
        this.$refs.picker.getSlotValue(0),
        this.$refs.picker.getSlotValue(1)
      ];
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

    //上传文件
    fileInput: function() {
      var file = event.currentTarget.files[0];

      var message;

      var input;

      if (file.name.split(".")[1] === "exe") {
        message = "不支持ext格式文件";

        input = false;
      } else if (file.size > 8 * 1024 * 1024) {
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

            this.taskFiles.push(thisfile);
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

    //检测页面输入数据
    checkAll: function() {
      var message;

      if (this.ent.length === 0) {
        message = "请选择企业名称";
      } else if (!this.entName) {
        message = "请输入发布企业昵称";
      } else if (this.entName.length < 2 || this.entName.length > 32) {
        message = "企业名称为2-32个字符";
      } else if (this.type.length === 0) {
        message = "请选择任务类型";
      } else if (this.place.length === 0) {
        message = "请选择工作地区";
      } else if (!this.taskName) {
        message = "请输入任务名称";
      } else if (
        this.taskName.length < 4 ||
        this.taskName.length > 50 ||
        !Number.isNaN(+this.taskName)
      ) {
        message = "任务名称为4-50个字符";
      } else if (!this.taskDetail) {
        message = "请填写任务需求描述";
      } else if (this.taskDetail.length < 4 || this.taskDetail.length > 10000) {
        message = "任务需求为4-10000个字符";
      } else if (!this.endDateShow && !this.noLimitTime) {
        message = "请选择报名截止时间";
      } else if (!this.taskMoney) {
        message = "请输入任务预算总金额";
      } else if (Number.isNaN(+this.taskMoney)) {
        message = "任务预算总金额需为纯数字";
      } else if (!this.taskMinMoney) {
        message = "请输入最低单价";
      } else if (Number.isNaN(+this.taskMinMoney)) {
        message = "最低金额需为纯数字";
      } else if (!!this.taskMaxMoney && Number.isNaN(+this.taskMaxMoney)) {
        message = "最高金额需为纯数字";
      } else if (
        !!this.taskMinMoney &&
        !!this.taskMaxMoney &&
        +this.taskMinMoney > +this.taskMaxMoney
      ) {
        message = "最低金额不得大于最高金额";
      } else if (!this.needPerson && !this.noLimit) {
        message = "请输入任务所需人数";
      } else if (Number.isNaN(+this.needPerson) && this.needPerson !== "不限") {
        message = "任务所需人数需为纯数字";
      } else if (this.sendContract) {
        // if(this.invoice.length === 0) {
        //
        //   message = '请选择发票类型';
        //
        // }else
        if (this.templet.length === 0) {
          message = "请选择合同模板";
        } else if (!this.templetName) {
          message = "请输入合同名称";
        } else if (this.templetType == 2 &&this.ext.length === 0) {
          message = "请选择业务合作企业";
        } else if (!document.getElementsByClassName("agree")[0].checked) {
          message = "请同意《快捷签署服务委托协议书》";
        } else {
          return true;
        }
      } else {
        return true;
      }

      this.$toast({
        message: message,
        position: "middle",
        duration: 1500
      });

      return false;
    },

    //发布任务/保存任务
    publishTask: function(submit) {
      if (!this.checkAll()) return;

      var params = {};

      //发布到任务广场赋值
      params.isShow = this.showTask ? "1" : "0";

      //自动发送合同赋值
      params.isSendContract = this.sendContract ? "1" : "2";

      //企业entId赋值
      var entInfo = this.companyList.filter(obj => obj.entName === this.ent[0]);
      params.entId = entInfo[0].entId;

      //企业名称赋值
      params.entName = this.ent[0];

      //企业昵称赋值
      params.nickname = this.entName;

      //隐藏企业昵称赋值
      params.nicknameHide = this.hideName ? "0" : "1";

      //获取行业类型
      this.industry.some(obj => {
        obj.name === this.type[0] && (params.industry = obj.nodeId);
      });

      //获取任务类型
      this.typeList.some(obj => {
        obj.name === this.type[1] && (params.type = obj.nodeId);
      });

      //工作地区赋值
      if (this.place[0] !== "不限") {
        params.province = this.place[0];
        params.city = this.place[1];
      } else {
        params.province = "不限";
        params.city = "不限";
      }

      //任务名称赋值
      params.taskName = this.taskName;

      //任务描述赋值
      params.taskDetails = this.taskDetail;

      //报名截止时间赋值
      params.abortDate = this.endDateShow;

      //报名截止时间不限赋值
      this.noLimitTime && (params.abortDate = "不限");

      //任务总预算赋值
      params.taskAmount = this.taskMoney;

      //任务单价最低单价赋值
      this.taskMinMoney && (params.taskMinUnit = this.taskMinMoney);

      //任务单价最高单价赋值
      this.taskMaxMoney && (params.taskMaxUnit = this.taskMaxMoney);

      //需要人数赋值
      params.peopleCount = this.needPerson;

      //需要人数不限赋值
      this.noLimit && (params.peopleCount = "不限");

      //发票类型赋值
      // params.invoiceType = (this.invoice[0] === '人力资源服务') ? ('1') : ('2');

      //合同类型赋值
      this.templetList.some(obj => {
        obj.templetName === this.templet[0] && (params.templateId = obj.tempId);
      });

      //合同名称赋值
      params.contractName = this.templetName;

      //合作企业赋值
      this.cooperate.some(obj => {
        obj.cooperateEntName === this.ext[0] &&
          (params.extEntId = obj.cooperateEntId);
      });

      var url;

      if (this.pageType === "publish") {
        //发布类型赋值
        params.submit = submit;

        url = "pulluptask";
      } else if (this.pageType === "update") {
        //更新任务状态
        params.state = submit ? "2" : "1";

        params.taskId = this.taskId;

        url = "updateenttask";
      }

      //上传文件赋值
      !!this.filesUrl &&
        (params.taskFile = this.filesUrl.join(",")) &&
        (params.originalFileNames = this.filesName.join(","));

      /*
        * 接口： 更新企业众包任务
        * 请求方式： POST
        * 接口： updateenttask
        * 入参： 很多
        * */

      /*
        * 接口： 企业众包任务发布
        * 请求方式： POST
        * 接口： pulluptask
        * 入参： 好多
        * */
      this.$http({
        url: process.env.API_ROOT + url,
        method: "post",
        params: params
      }).then(res => {
        if (res.data.code === "0000") {
          this.$router.push("/taskList");
        } else {
          this.$toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          });
        }
      });
    },

    //时间选择事件
    selectTime: function() {
      this.endDateShow = this.changeTime(this.endDate, "-");
    },

    //更换时间显示状态
    changeTime: function(date, symbol) {
      var year = date.getFullYear();

      var month = date.getMonth() + 1;

      var day = date.getDate();

      return (
        year +
        symbol +
        (month + "").padStart(2, "0") +
        symbol +
        (day + "").padStart(2, "0")
      );
    },

    //从任务详情继续发布进入
    //获取任务数据
    setTaskData: function() {
      sessionStorage.removeItem("change");

      var taskInfo = JSON.parse(sessionStorage.getItem("taskInfo"));

      sessionStorage.removeItem("taskInfo");

      //页面状态为继续发布任务
      this.pageType = "update";

      this.taskId = taskInfo.taskId;

      //自动发送合同赋值
      this.sendContract = taskInfo.isSendContract === "1" ? true : false;

      //发布到任务广场赋值
      this.showTask = taskInfo.isShow === "1" ? true : false;

      //企业名称赋值
      this.ent.push(taskInfo.entName);

      //发布企业昵称赋值
      this.entName = taskInfo.nickname;

      //隐藏任务昵称赋值
      this.hideName = taskInfo.nicknameHide === "0" ? true : false;

      //任务类型赋值
      this.type.push(taskInfo.industryName);

      //获取任务列表
      this.getTaskList(taskInfo.industry);

      //任务类型赋值
      this.type.push(taskInfo.typeName);

      //工作地区赋值
      taskInfo.province === "不限"
        ? this.place.push("不限")
        : this.place.push(taskInfo.province) && this.place.push(taskInfo.city);

      //获取地区列表
      this.getCity(taskInfo.province);

      //任务名称赋值
      this.taskName = taskInfo.taskName;

      //任务描述赋值
      this.taskDetail = taskInfo.taskDetails.split("</br>").join("\n");

      //上传文件赋值
      if (!!taskInfo.taskFile) {
        this.filesUrl = taskInfo.taskFile.split(",");
        this.filesName = taskInfo.originalFileNames.split(",");
        var fileArr = taskInfo.taskFile.split(",");
        var fileNameArr = taskInfo.originalFileNames.split(",");
        var length = fileArr.length;
        while (length--) {
          var file = {};
          file.url = fileArr[length];
          file.name = fileNameArr[length];
          this.taskFiles.push(file);
        }
      }

      //报名截止时间赋值
      if (!taskInfo.abortDate) {
        this.noLimitTime = true;
      } else {
        this.endDateShow = this.changeTime(new Date(taskInfo.abortDate), "-");
        if (
          new Date(this.changeTime(new Date(), "-") + " ") >
          new Date(this.endDateShow)
        ) {
          this.endDateShow = "";
        }
      }

      //任务总预算赋值
      this.taskMoney = taskInfo.taskAmount;

      //任务最高单价赋值
      !!taskInfo.taskMaxUnit && (this.taskMaxMoney = taskInfo.taskMaxUnit);

      //任务最低单价赋值
      this.taskMinMoney = taskInfo.taskMinUnit;

      //需要人数赋值
      taskInfo.peopleCount === "不限"
        ? (this.noLimit = true)
        : (this.needPerson = taskInfo.peopleCount);

      if (this.sendContract) {
        //发票类型赋值
        // this.invoice.push(this.invoiceList[taskInfo.invoiceType - 1]);

        //合同模板类型赋值
        this.templet.push(taskInfo.templateName);

        //合同名称赋值
        this.templetName = taskInfo.contractName;

        //合作企业赋值
        this.ext.push(taskInfo.extEntName);
      }
    },

    //关闭任务描述模板
    closeFn: function() {
      this.mouldShow = false;
    },

    //使用任务描述模板
    useMouldFn: function(mouldArr) {
      this.taskDetail = mouldArr.join("\n");

      this.mouldShow = false;
    },

    //删除已上传的文件
    deleteFile: function(name) {
      this.taskFiles.some(obj => {
        if (obj.name === name) {
          this.taskFiles.splice(this.taskFiles.indexOf(obj), 1);

          this.filesUrl.splice(this.filesUrl.indexOf(obj.url), 1);

          this.filesName.splice(this.filesName.indexOf(obj.name), 1);
        }

        return obj.name === name;
      });
    }
  },

  computed: {
    //报名截止时间限制
    noLimitTime: {
      get: function() {
        if (this.endDateShow !== "不限") {
          return false;
        }

        return true;
      },

      set: function(newValue) {
        if (newValue) {
          this.endDateShow = "不限";
        } else {
          this.endDateShow = "";
        }
      }
    },

    //人员数量限制
    noLimit: {
      get: function() {
        if (this.needPerson !== "不限") {
          return false;
        }

        return true;
      },

      set: function(newValue) {
        if (newValue) {
          this.needPerson = "不限";
        } else {
          this.needPerson = "";
        }
      }
    }
  },

  watch: {
    needPerson: function() {
      if (this.needPerson.indexOf(".") !== -1) {
        this.needPerson = this.needPerson.slice(0, this.needPerson.length - 1);
      } else if (this.needPerson === "不" || this.needPerson === "限") {
        this.needPerson = "";
      }
    },

    sendContract: function() {
      this.getCompanyList(this.sendContract);
    },

    taskMinMoney: function() {
      if (this.taskMinMoney.length > 10) {
        this.taskMinMoney = this.taskMinMoney.slice(0, 10);
      }
    },

    taskMaxMoney: function() {
      if (this.taskMaxMoney.length > 10) {
        this.taskMaxMoney = this.taskMaxMoney.slice(0, 10);
      }
    },

    taskMoney: function() {
      if (this.taskMoney.length > 10) {
        this.taskMoney = this.taskMoney.slice(0, 10);
      }
    },
    templet: function() {
      let item = {};
      //合同类型赋值
      this.templetList.some(obj => {
        obj.templetName === this.templet[0] && (item = obj);
      });

      if (item.templetType == 2) {
        this.isCompanySelectShow = true;
      } else {
        this.isCompanySelectShow = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "release_task.less";
</style>
<style>
.release_task .task_information .mint-switch .mint-switch-core {
  width: 42px;
  height: 22px;
}
.release_task .task_information .mint-switch .mint-switch-core:before {
  width: 40px;
  height: 20px;
}
.release_task .task_information .mint-switch .mint-switch-core:after {
  width: 20px;
  height: 20px;
}
.release_task .mint-popup {
  width: 100vw;
}
</style>
