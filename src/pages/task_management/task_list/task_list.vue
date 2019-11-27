<template>
  <div class="task_list">

    <div class="select">
      <div class="company" v-on:click="selectShow('Company')" v-bind:class="{'color_text': entId !== ''}">
        <span class="show_type">发布企业</span>
        <span class="three" v-bind:class="{'click_type': selectCompanyShow}"></span>
      </div>
      <div class="task_state" v-on:click="selectShow('Task')" v-bind:class="{'color_text': state !== ''}">
        <span class="show_type">任务状态</span>
        <span class="three" v-bind:class="{'click_type': selectTaskShow}"></span>
      </div>
    </div>

    <div class="select_bg" v-if="selectCompanyShow || selectTaskShow" v-on:click="selectCompanyShow = selectTaskShow = false"></div>

    <div class="select_by_company" v-if="selectCompanyShow">
      <div class="company_select" v-on:click="screen('company','all')" v-bind:class="{'color_text': entId === ''}">全部</div>
      <div class="company_select" v-for="company in companyList" v-on:click="screen('company', company.entId)" v-bind:class="{'color_text': entId === company.entId}">{{company.entName}}</div>
    </div>

    <div class="select_by_task_state" v-if="selectTaskShow">
      <div class="state_select" v-on:click="screen('task','all')" v-bind:class="{'color_text': state === ''}">全部</div>
      <div class="state_select" v-on:click="screen('task', '1')" v-bind:class="{'color_text': state === '1'}">待发布</div>
      <div class="state_select" v-on:click="screen('task', '2')" v-bind:class="{'color_text': state === '2'}">进行中</div>
      <div class="state_select" v-on:click="screen('task', '3')" v-bind:class="{'color_text': state === '3'}">已完成</div>
      <div class="state_select" v-on:click="screen('task', '4')" v-bind:class="{'color_text': state === '4'}">已关闭</div>
      <div class="state_select" v-on:click="screen('task', '5')" v-bind:class="{'color_text': state === '5'}">审核中</div>
      <div class="state_select" v-on:click="screen('task', '6')" v-bind:class="{'color_text': state === '6'}">审核不通过</div>
    </div>

    <mt-loadmore :top-method="loadTop" ref="loadmore">

      <div class="task_list_show" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="!noData">
        <div class="task" v-for="task in taskList" v-on:click="jumpTo(task.taskId)">
          <div class="title">
            <div class="img">
              <img src="../../../../static/image/jx_bag.png">
            </div>
            <div class="task_name">{{task.taskName}}</div>
            <div class="task_state" v-bind:class="'taskState' + task.state">{{taskState[task.state]}}</div>
          </div>
          <div class="content">
            <div class="money">
              <span>￥{{task.taskMinUnit}}<span v-if="!!task.taskMaxUnit">-</span><span v-if="!!task.taskMaxUnit">{{task.taskMaxUnit}}</span></span>
              <span>任务预算单价</span>
            </div>
            <div class="person" v-if="task.state !== '3'">
              <span>{{task.peopleCount}}</span>
              <span>需要人数</span>
            </div>
            <div class="has_person" v-if="task.state === '2'||task.state === '5'||task.state === '6'">
              <span>{{task.hireTotal}}</span>
              <span>已录用人数</span>
            </div>
            <div class="signup_person" v-if="task.state === '1'">
              <span>{{task.signUpTotal}}</span>
              <span>报名人数</span>
            </div>
            <div class="use_person" v-if="task.state === '3' || task.state === '4'">
              <span>{{task.realHireTotal}}</span>
              <span>实际用工人数</span>
            </div>
            <div class="spend_money" v-if="task.state === '3'">
              <span>{{task.realAmountTotal}}</span>
              <span>实际发放资金</span>
            </div>
          </div>
          <div class="task_info">
            <div class="task_state">报名状态：{{signupState[task.signupState]}}</div>
            <div class="company">
              <div>{{task.entName}}</div>
              <div v-if="task.state === '1'">{{task.createDate | fmtTimeStr2}}</div>
              <div v-else>{{task.releaseDate | fmtTimeStr2}}</div>
            </div>
          </div>
        </div>

        <div class="more_data" v-if="moreData">正在加载</div>
        <div class="no_more_data" v-else>无更多数据</div>
      </div>

      <div class="no_data" v-if="noData">

        <div class="no_data_img">
          <img src="../../../../static/image/nodata.png">
        </div>
        <div class="no_data_text">暂无相关数据哦~</div>

      </div>

    </mt-loadmore>

  </div>
</template>

<script>
  export default {
    name: "taskList",

    data () {

      return {

        taskList: [],//任务列表

        taskState: {'1': '待发布','2': '进行中','3': '已完成','4': '已关闭','5': '审核中','6': '审核不通过'},//任务状态

        signupState: {'1': '未开始', '2': '报名中', '3': '已结束'},//报名状态

        pageNum: 1,//数据分页

        moreData: false,//数据可以继续加载

        noData: false,//没有数据

        companyList: [],//公司列表

        selectCompanyShow: false,//公司选择框显示状态

        selectTaskShow: false,//任务状态选择框显示状态

        entId: '',//企业ID

        state: '',//任务状态

        noUse: true

      }

    },

    mounted () {

      this.getData();

      this.getCompany();

    },

    activated () {

      this.noUse = this.moreData;

      /*任务详情中任务状态发生改变 任务列表页面刷新*/
      if(sessionStorage.getItem('delete') === '1'){

        sessionStorage.removeItem('delete');

        this.loadTop();

      }

    },

    methods: {

      /*获取页面数据*/
      getData: function () {

        var params = {};

        (!!this.entId) && (params.entId = this.entId);

        (!!this.state) && (params.state = this.state);

        params.pageNum = this.pageNum;

        /*
        * 接口： 企业众包任务查询
        * 请求方式： POST
        * 接口： /gettaskinfo
        * 入参： null
        * */

        this.$http({

          url: process.env.API_ROOT + 'gettaskinfo',

          method: 'post',

          params: params

        }).then(res=>{

          this.taskList = this.taskList.concat(res.data.data.list);

          (res.data.data.list.length === 10) ? (this.moreData = true) : (this.moreData = false);

          (this.pageNum === 1 && res.data.data.list.length === 0) ? (this.noData = true) : (this.noData = false);

          this.noUse = this.moreData;

        });

      },

      //上拉加载
      loadMore: function () {

        if(this.moreData && this.noUse){

          this.noUse = false;

          this.pageNum++;

          this.getData();

        }

      },


      //获取账号下发薪企业
      getCompany: function () {

        /**
         * 接口：发薪企业查询
         * 请求方式：GET
         * 接口：jx/common/salaryentbusiness
         * 入参：entId, verifyState, signState, businessType
         **/
        this.$http({

          method: 'get',
          url: process.env.API_ROOT + 'jx/common/salaryentbusiness',
          params: {
            entId: localStorage.getItem('entIdEnt'),
            verifyState: 3,
            signState: 1,
            businessType: '05'
          }

        }).then(res=>{

          if(res.data.code === '-1'){

            this.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

          }else if(res.data.code === '0000'){

            this.companyList = res.data.data;

          }

        });

      },


      //筛选下拉框显示控制
      selectShow: function (type) {

        if(type === 'Task') {

          this.selectTaskShow = !this.selectTaskShow;

          this.selectCompanyShow = false;

        }else {

          this.selectCompanyShow = !this.selectCompanyShow;

          this.selectTaskShow = false;

        }

      },


      //下拉框数据点击筛选事件
      screen: function (type , id) {

        if(type === 'company') {

          (id === 'all') ? (this.entId = '') : (this.entId = id);

        }else if(type === 'task') {

          (id === 'all')? (this.state = '') : (this.state = id);

        }

        this.taskList = [];

        this.pageNum = 1;

        this.getData();

        this.selectTaskShow = false;

        this.selectCompanyShow = false;

      },


      //下拉刷新
      loadTop: function () {

        this.pageNum = 1;

        this.entId = '';

        this.state = '';

        this.taskList = [];

        this.getData();

        this.$refs.loadmore.onTopLoaded();

      },


      jumpTo: function (taskId) {

        this.noUse = false;

        this.$router.push({path: '/taskDetail', query: {taskId: taskId}});

      }

    }
  }
</script>

<style scoped lang="less">
  @import "task_list.less";
</style>
