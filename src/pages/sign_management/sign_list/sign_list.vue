<template>
  <div class="sign_list">
    <div class="screen">
      
      <div class="select_list_sign" v-if="pageType === 'signup'">
        <div v-on:click="selectByState('')" v-bind:class="{'selected' : selectState === ''}">全部</div>
        <div v-on:click="selectByState('1')" v-bind:class="{'selected' : selectState === '1'}">待处理</div>
        <div v-on:click="selectByState('3')" v-bind:class="{'selected' : selectState === '3'}">已录用</div>
        <div v-on:click="selectByState('4')" v-bind:class="{'selected' : selectState === '4'}">已淘汰</div>
        <div v-on:click="selectByState('2')" v-bind:class="{'selected' : selectState === '2'}">报名取消</div>
        <div v-on:click="selectByState('5')" v-bind:class="{'selected' : selectState === '5'}">过期失效</div>
      </div>
      <div class="select_list_word" v-else-if="pageType === 'work'">
        <div v-on:click="selectByState('')" v-bind:class="{'selected' : selectState === ''}">全部</div>
        <div v-on:click="selectByState('1')" v-bind:class="{'selected' : selectState === '1'}">工作中</div>
        <div v-on:click="selectByState('2')" v-bind:class="{'selected' : selectState === '2'}">待验收</div>
        <div v-on:click="selectByState('4')" v-bind:class="{'selected' : selectState === '4'}">验收中</div>
        <div v-on:click="selectByState('3')" v-bind:class="{'selected' : selectState === '3'}">验收通过</div>
      </div>

      <div class="select" v-if="!selectTaskSearch">
        <div class="company" @click="taskSelectCilck()" v-bind:class="{'color_text': selectTaskShow}">
          <span class="three" v-if="!selectTaskShow" ><img src="../../../../static/image/jx_search.png" ></span>
          <span class="three" v-if="selectTaskShow" ><img src="../../../../static/image/jx_search_blue.png" ></span>
          <span class="show_type" >任务筛选</span>
        </div>
        <div class="task_state" v-on:click="selectTaskSearchClick()" >
          <span class="three"><img src="../../../../static/image/jx_find.png"></span>
          <span class="show_type">搜索</span>
        </div>
      </div>
  
      <div class="input_box" v-if="selectTaskSearch">
        <div class="input">
          <div class="input_img">
            <img src="../../../../static/image/jx_find.png">
          </div>
          <input type="text" placeholder="搜索姓名或任务名称" v-model="taskName">
        </div>
        <div class="input_cancel" v-on:click="cancelFn" v-if="cancelShow">取消</div>
      </div>


    </div>
    
    <div class="select_bg" v-if="selectTaskShowModel"></div>
    <div class="select_by_company" v-if="selectTaskShowModel">
      <div class="company_select" @click="taskNameCilck()" v-bind:class="{'color_text': selectTaskName === ''}">全部</div>
      <div class="company_select" v-for="item in taskList" v-bind:class="{'color_text': selectTaskName === item.taskId}" @click="taskNameCilck(item)">{{item.taskName}}</div>
    </div>
  

    <mt-loadmore :top-method="loadTop" ref="loadmore">

      <div class="detail_list" v-if="list.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

        <div class="list" v-on:click="jumpTo(detail)" v-for="detail in list">

          <div class="title">
            <div class="title_img">
              <img src="../../../../static/image/jx_sign_person.png">
            </div>
            <div class="user_name">{{detail.userName}}</div>
            <div class="state" v-if="pageType === 'signup'" v-bind:class="{'color_text': detail.selectState === '3', 'orange_text': detail.selectState === '1'}">
              {{selectStateObj[detail.selectState]}}
            </div>
            <div class="state" v-else-if="pageType === 'work'" v-bind:class="{'color_text': detail.workState !== '3'}">{{workState[detail.workState]}}</div>
          </div>

          <div class="detail">
            <div class="content">任务：{{detail.taskName}}</div>
            <div class="time_box">
              <div class="img">
                <img src="../../../../static/image/jx_sign_time.png">
              </div>
              <div class="time" v-if="pageType === 'signup'">{{detail.createDate | fmtDateStr}}</div>
              <div class="time" v-else-if="pageType === 'work'">{{detail.startDate | fmtDateStr}}</div>
            </div>
          </div>

        </div>

        <div class="more_data" v-if="moreData">正在加载中</div>
        <div class="no_more_data" v-else>无更多数据</div>

      </div>

      <div class="no_data" v-else>
        <div class="no_data_img">
          <img src="../../../../static/image/jx_sign_up_no_data.png">
        </div>
        <div class="no_data_text">暂无相关数据哦~</div>
      </div>

    </mt-loadmore>

  </div>
</template>

<script>
export default {
  name: "sign_list.vue",

  data() {
    return {
      list: [],

      selectStateObj: {
        1: "待处理",
        2: "报名取消",
        3: "已录用",
        4: "已淘汰",
        5: "过期失效"
      },

      workState: { 1: "工作中", 2: "待验收", 3: "验收通过", 4: "验收中" },

      pageNum: 1,

      selectState: "",

      taskName: "",

      moreData: false,

      selectTaskShow: false, //任务状态选择框显示状态

      pageType: "",
      taskList: [],

      selectTaskName: "",
      selectTaskSearch: false,
      selectTaskShowModel: false,
    };
  },

  mounted() {
    this.pageType = this.$route.query.type;

    document.title = this.pageType === "work" ? "工作验收" : "报名管理";

    if (!!sessionStorage.getItem("signListType")) {
      this.selectState = sessionStorage.getItem("signListType");

      sessionStorage.removeItem("signListType");
    }

    this.getData();

    this.getTaskData();
  },

  methods: {
    jumpTo: function(obj) {
      localStorage.setItem("signDataEnt", JSON.stringify(obj));

      this.pageType === "work" && this.$router.push("/workCheck");

      this.pageType === "signup" && this.$router.push("/signDetail");
    },

    getData: function() {
      var params = {};

      params.pageNum = this.pageNum;

      this.selectState !== "" &&
        this.pageType === "signup" &&
        (params.selectState = this.selectState);

      this.selectState !== "" &&
        this.pageType === "work" &&
        (params.workState = this.selectState);

      this.taskName !== "" &&
        this.pageType === "signup" &&
        (params.taskName = this.taskName);

      this.taskName !== "" &&
        this.pageType === "work" &&
        (params.userName = this.taskName);

      var url =
        this.pageType === "work" ? "table/task/checkalllist" : "getselectinfo";

      /*
        * 接口： 登录企业下工作验收列表
        * 请求方式： POST
        * 接口： table/task/checkalllist
        * 入参： userName, workState
        * */

      /*
        * 接口： 企业众包任务报名信息查询
        * 请求方式： POST
        * 接口： getselectinfo
        * 入参： selectState, taskName,
        * */
      this.$http({
        url: process.env.API_ROOT + url,
        method: "post",
        params: params
      }).then(res => {
        this.list = this.list.concat(res.data.data.list);

        this.moreData = res.data.data.list.length >= 10 ? true : false;
      });
    },

    loadMore: function() {
      if (this.moreData) {
        this.pageNum++;

        this.getData();
      }
    },

    getTaskData() {
      var params = {};
      // 兼容两个接 默认查100条
      this.$http({
        url: process.env.API_ROOT + "gettasknameinfo",
        method: "get",
        params: params
      }).then(res => {
        this.taskList = res.data.data;
      });
    },

    selectByState: function(state) {
      this.selectState = state;

      sessionStorage.setItem("signListType", state);

      this.pageNum = 1;

      this.list = [];

      this.getData();
    },

    loadTop: function() {
      this.pageNum = 1;

      this.taskName = "";

      this.list = [];

      this.getData();

      this.$refs.loadmore.onTopLoaded();
    },

    cancelFn: function() {
      this.taskName = "";

      this.selectTaskSearch = false;

      this.pageNum = 1;

      this.list = [];

      this.getData();
    },
    taskNameCilck(item) {
      if (!item) {
        this.selectTaskName = "";
        this.taskName = "";
        this.selectTaskShow=false;
      } else {
        this.selectTaskName = item.taskId;

        this.taskName = item.taskName;
      }
      this.selectTaskShowModel = false;
    },
    taskSelectCilck(){
      this.selectTaskShowModel = true;
      this.selectTaskShow = true;
    },
    selectTaskSearchClick(){
      this.selectTaskSearch=true;
      this.taskName='';
      this.selectTaskShow=false;
      this.selectTaskName='';
    }
  },

  watch: {
    taskName: function() {
      this.list = [];

      this.pageNum = 1;

      this.getData();
    }
  },

  computed: {
    cancelShow: function() {
      return !!this.taskName;
    }
  }
};
</script>

<style scoped lang="less">
@import "sign_list.less";
</style>
