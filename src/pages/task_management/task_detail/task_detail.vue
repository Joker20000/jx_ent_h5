<template>
  <div class="task_detail">
    
    <div class="task_id">任务编号：{{taskInfo.taskId}}</div>
    
    <div class="task_title">
      <div class="task_image">
        <img src="../../../../static/image/jx_task_detail_wating.png" v-if="taskInfo.state === '1'">
        <img src="../../../../static/image/jx_task_detail_working.png" v-if="taskInfo.state === '2'">
        <img src="../../../../static/image/jx_task_detail_finish.png" v-if="taskInfo.state === '3'">
        <img src="../../../../static/image/jx_task_detail_close.png" v-if="taskInfo.state === '4'">
        <img src="../../../../static/image/jx_task_detail_audited.png" v-if="taskInfo.state === '5'">
        <img src="../../../../static/image/jx_task_detail_failed.png" v-if="taskInfo.state === '6'">
      </div>
      <div class="task_name">{{taskInfo.taskName}}</div>
      <div class="type_place">
        <div class="type">
          <img src="../../../../static/image/jx_task_type.png">
          <span>{{taskInfo.industryName}} > {{taskInfo.typeName}}</span>
        </div>
        <div class="place">
          <img src="../../../../static/image/jx_task_place.png">
          <span v-if="!!taskInfo.region">{{taskInfo.region}}</span>
          <span v-else>不限</span>
        </div>
      </div>
      <div class="task_money_state">
        <div class="task_money">
          <div>￥{{taskInfo.taskMinUnit}}
            <span v-if="!!taskInfo.taskMaxUnit">-</span>
            <span v-if="!!taskInfo.taskMaxUnit">{{taskInfo.taskMaxUnit}}</span>
          </div>
          <div>任务预算单价</div>
        </div>
        <div class="task_money_all">
          <div>￥{{taskInfo.taskAmount}}</div>
          <div>总预算</div>
        </div>
        <div class="state">
          <div v-if="taskInfo.signupState === '1'">未开始</div>
          <div v-else-if="taskInfo.signupState === '2'">报名中</div>
          <div v-else-if="taskInfo.signupState === '3'">已结束</div>
          <div>报名状态</div>
        </div>
      </div>
      <div @click="canotChange()" class="show_all" v-if="taskInfo.state === '1' || taskInfo.state === '2'|| taskInfo.state === '5'|| taskInfo.state === '6'">
        <span>发布到任务广场</span>
        <mt-switch :disabled='taskInfo.state==5' v-model="taskShow"></mt-switch>
      </div>
      
      <div @click="canotChange()" class="show_all" v-if="taskInfo.state === '1' || taskInfo.state === '2'|| taskInfo.state === '5'|| taskInfo.state === '6'">
        <span>自动发送合同</span>
        <mt-switch :disabled='taskInfo.state==5' @change="changeBtn(taskInfo)" v-model="isSendContract"></mt-switch>
      </div>
      
      <!-- <div class="task_info" v-if="taskInfo.isSendContract === '1'">
        <span>任务合同：</span><span>自动发送合同</span>
      </div> -->
      <div class="task_info" v-if="taskInfo.state !== '3'">
        <span>需要人数：</span>
        <span>{{taskInfo.peopleCount}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.state === '1'">
        <span>报名人数：</span>
        <span>{{taskInfo.signUpTotal}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.state === '2'">
        <span>已录用人数：</span>
        <span>{{taskInfo.hireTotal}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.state === '3' || taskInfo.state === '4'">
        <span>实际用工人数：</span>
        <span>{{taskInfo.realHireTotal}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.state === '3'">
        <span>实际发放资金：</span>
        <span>{{taskInfo.realAmountTotal}}</span>
      </div>
      <div class="task_info">
        <span>报名截止时间：</span>
        <span v-if="!!taskInfo.abortDate">{{taskInfo.abortDate | fmtDateStr2}}</span>
        <span v-else>不限</span>
      </div>
      <div class="task_info">
        <span>发布企业：</span>
        <span>{{taskInfo.entName}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.extEntName">
        <span>服务商：</span>
        <span>{{taskInfo.extEntName}}</span>
      </div>
      <div class="task_info" v-if="taskInfo.state == '1' || taskInfo.state == '5' || taskInfo.state == '6'">
        
        <span>创建时间：</span>
        <span>{{taskInfo.createDate | fmtTimeStr2}}</span>
      </div>
      <div class="task_info" v-else="">
        <span>发布时间：</span>
        <span>{{taskInfo.releaseDate | fmtTimeStr2}}</span>
      </div>
    </div>
    
    <div class="task_state">
      
      <div class="state" v-bind:class="{'select' : taskInfo.stateForTask >= 1 }">
        <div class="img"><img src="../../../../static/image/jx_task_publish.png"></div>
        <div class="word">发布任务</div>
      </div>
      <div class="state" v-bind:class="{'select' : taskInfo.stateForTask >= 2 }">
        <div class="img"><img src="../../../../static/image/jx_task_signup.png"></div>
        <div class="word">用户报名</div>
      </div>
      <div class="state" v-bind:class="{'select' : taskInfo.stateForTask >= 3 , 'close':taskInfo.stateForTask === '7'}">
        <div class="img"><img src="../../../../static/image/jx_task_working.png"></div>
        <div class="word" v-if="taskInfo.stateForTask !== '7'">用户工作中</div>
        <div class="word" v-else>任务已关闭</div>
      </div>
      <div class="state" v-bind:class="{'select' : taskInfo.stateForTask >= 4 && taskInfo.stateForTask !== '7'}">
        <div class="img"><img src="../../../../static/image/jx_task_check.png"></div>
        <div class="word">工作验收</div>
      </div>
      <div class="state" v-bind:class="{'select' : taskInfo.stateForTask >= 5 && taskInfo.stateForTask !== '7' }">
        <div class="img"><img src="../../../../static/image/jx_task_check.png"></div>
        <div class="word">任务结算</div>
      </div>
      <div class="state states" v-bind:class="{'select' : taskInfo.stateForTask >= 6 && taskInfo.stateForTask !== '7' }">
        <div class="img "><img src="../../../../static/image/jx_task_finish.png"></div>
        <div class="word ">完成</div>
      </div>
    
    </div>
    
    <div class="task_content">
      <div class="title">
        <div class="box_name">任务内容</div>
        <div class="add" v-on:click="$router.push({path: '/additionInput', query: {taskId: $route.query.taskId}})" v-if="taskInfo.state == '2' && addShowBtn">
          <img src="../../../../static/image/jx_task_additional.png">
          <span>补充任务需求</span>
        </div>
      </div>
      <div class=" task_content_word" v-if="taskInfo.state === '6'">
        <img src="../../../../static/image/task_content_tips.png" alt="">
        <span>不通过原因：{{taskInfo.checkedReason}}</span>
      </div>
      
      <div class="content_text" v-html="taskInfo.taskDetails"></div>
      <div class="file_list" v-if="!!taskInfo.taskFile">
        <a class="file" v-bind:href="fileSrc" v-for="(fileName, fileSrc) in fileList">
          <div class="img">
            <img src="../../../../static/image/jx_task_file_download.png">
          </div>
          <span>{{fileName}}</span>
        </a>
      </div>
      <div class="addition_list" v-if="!!taskInfo.entTaskAddList">
        
        <div class="additional" v-for="addTaskAdd in taskInfo.entTaskAddList">
          <div class="title">
            <div class="box_name">补充内容</div>
            <div class="additional_time">{{addTaskAdd.createDate | fmtTimeStr2}}</div>
            <div class="additional_time" v-if="taskInfo.state == '2' &&addTaskAdd.checkedState == '2'">
              <span @click="editShow(addTaskAdd)"><img src="../../../../static/image/task_content_edit.png" alt="">修改</span>
              <span @click="deleteShow(addTaskAdd)"><img src="../../../../static/image/task_content_modify.png" alt="">删除</span></div>
          </div>
          
          <div class=" task_content_word"   v-if="addTaskAdd.checkedState == '2' && taskInfo.state !='3' && taskInfo.state !='4' ">
            <p>
              <img src="../../../../static/image/task_content_delete.png" alt="">
              <span>审核不通过，请修改后重新提交</span>
            </p>
            <div class="checkreason">
              <img src="../../../../static/image/task_content_tips.png" alt="">
              <span class="reason">不通过原因：</span><p >{{addTaskAdd.checkedReason}}</p>
            </div>
          </div>
          
          <div class=" task_content_word" v-if="addTaskAdd.checkedState == '0' && taskInfo.state !='3' && taskInfo.state !='4' ">
            <img src="../../../../static/image/task_content_text.png" alt="">
            <span>审核中，审核通过后用户可查看</span>
          </div>
          
          <div class=" task_content_word"   v-if="taskInfo.state == '3' && addTaskAdd.checkedState != '1' ">
            <p>
              <img src="../../../../static/image/task_content_delete.png" alt="">
              <span>审核不通过</span>
            </p>
            <p  v-if=" addTaskAdd.checkedReason">
              <img src="../../../../static/image/task_content_tips.png" alt="">
              <span>不通过原因：{{ addTaskAdd.checkedReason}}</span>
            </p>
            <p v-else>
              <img src="../../../../static/image/task_content_tips.png" alt="">
              <span>不通过原因：任务已完成</span>
            </p>
          </div>
          <div  class=" task_content_word"  v-if="taskInfo.state == '4' && addTaskAdd.checkedState != '1'">
            <p>
              <img src="../../../../static/image/task_content_delete.png" alt="">
              <span>审核不通过</span>
            </p>
            <p v-if="addTaskAdd.checkedReason">
              <img src="../../../../static/image/task_content_tips.png" alt="">
              <span>不通过原因：{{ addTaskAdd.checkedReason}}</span>
            </p>
            <p v-else>
              <img src="../../../../static/image/task_content_tips.png" alt="">
              <span>不通过原因：任务已关闭</span>
            </p>
          </div>
          
          
          <div class="content_text" v-html="transformText(addTaskAdd.taskAddtionDetail)"></div>
          <div class="file_list" v-if="!!addTaskAdd.taskAddtionFile">
            <a class="file" v-bind:href="fileSrc" v-for="(fileName, fileSrc) in addTaskAdd.additionFile">
              <div class="img">
                <img src="../../../../static/image/jx_task_file_download.png">
              </div>
              <span>{{fileName}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="button" v-if="taskInfo.state === '1'">
      <div class="delete" v-on:click="deleteTask">删除任务</div>
      <div class="publish" v-on:click="publishTask">继续发布</div>
    </div>
    
    <div class="button" v-else-if="taskInfo.state === '2'">
      <div class="end" v-on:click="endTask" v-if="taskInfo.signupState === '2'">结束报名</div>
      <div class="close" v-on:click="closeTask">关闭任务</div>
      <div class="finish" v-on:click="finishTask">&nbsp;&nbsp;已完成&nbsp;&nbsp;</div>
    </div>
    
    <div class="button" v-else-if="taskInfo.state === '6'">
      <div class="delete" v-on:click="deleteTask">删除任务</div>
      <div class="publish" v-on:click="publishTask">重新发布</div>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "task_detail.vue",
    
    data() {
      return {
        taskInfo: {}, //任务信息
        
        taskShow: true, //发布到任务广场状态
        
        isSendContract: true, //自动发送合同状态
        
        fileList: {}, //文件列表
        
        dataState: false, //数据状态（判断页面刚进入还是加载完毕）
        
        companyList: [],
        
        addshow:''
      };
    },
    
    mounted() {
      this.getData();
      
      this.getCompantList();
      
      window.scrollTo(0, 0);
    },
    
    methods: {
      //获取任务详情
      getData: function() {
        /*
          * 接口： 企业众包任务详情查询
          * 请求方式： POST
          * 接口： gettaskinfosimple
          * 传参：taskId
          * */
        this.$http({
          url: process.env.API_ROOT + "gettaskinfosimple",
          method: "post",
          params: {
            taskId: this.$route.query.taskId
          }
        }).then(res => {
          console.log(res);
          
          res.data.data.taskDetails.indexOf("\n") !== -1 &&
          (res.data.data.taskDetails = res.data.data.taskDetails
            .split("\n")
            .join("</br>"));
          
          this.taskInfo = res.data.data;
          
          this.taskShow = res.data.data.isShow === "1";
          
          this.isSendContract = res.data.data.isSendContract === "1";
          
          if (this.taskInfo.taskFile) {
            this.fileList = this.getTaskFile(
              this.taskInfo.taskFile,
              this.taskInfo.originalFileNames
            );
          }
          
          if (!!this.taskInfo.entTaskAddList) {
            for (var obj of this.taskInfo.entTaskAddList) {
              if (!!obj.taskAddtionFile) {
                obj.additionFile = this.getTaskFile(
                  obj.taskAddtionFile,
                  obj.originalFileNamesAdd
                );
              }
            };
            
            this.addshow = this.taskInfo.entTaskAddList[this.taskInfo.entTaskAddList.length-1];
            
          }else{
            
            this.addshow = '';
            
          }
          
          setTimeout(
            function() {
              this.dataState = true;
            }.bind(this),
            1
          );
        });
      },
      
      //更改文件列表显示状态
      getTaskFile: function(taskFile, originalFileNames) {
        var fileList = taskFile.split(",");
        
        var fileNameList = originalFileNames.split(",");
        
        var fileObj = {};
        
        var length = fileList.length;
        
        while (length--) {
          fileObj[fileList[length]] = fileNameList[length];
        }
        
        return fileObj;
      },
      
      getCompantList() {
        this.$http({
          method: "get",
          url: process.env.API_ROOT + "jx/common/salaryentbusiness",
          params: {
            entId: localStorage.getItem("entIdEnt"),
            verifyState: 3,
            signState: 1,
            businessType: "05"
          }
        }).then(res => {
          if (res.data.code === "-1") {
            this.$toast({
              message: res.data.msg,
              position: "middle",
              duration: 1500
            });
          } else if (res.data.code === "0000") {
            this.companyList = res.data.data;
          }
        });
      },
      changeBtn: function(taskInfo) {
        if(this.taskInfo.state == 5){
          this.$toast({
            message: "任务审核中，暂不支持该操作",
            position: "middle",
            duration: 1500
          });
          return;
        }
        let arr = this.companyList.filter(e => {
          return e.entId == this.taskInfo.entId && e.bestSignIsOpen == "1";
        });
        if ((!arr || arr.length == 0) && this.isSendContract) {
          this.$messagebox({
            title: "提示",
            message:
              "为保证电子合同具有法律效力，开启自动发送任务合同前，请先前往PC端【合同管理】-【印章管理】中申请企业印章证书，申请成功即可开启",
            showCancelButton: false,
            confirmButtonText: "好的",
            closeOnClickModal: true
          }).then(res => {
            this.isSendContract = false;
          });
          return;
        }
        if (
          this.isSendContract &&
          (!this.taskInfo.templateId ||
            this.taskInfo.templateId == "")
        ) {
          this.$messagebox({
            title: "提示",
            message: "开启自动发送合同，需先填写合同信息",
            showCancelButton: true,
            confirmButtonText: "去填写",
            cancelButtonText: "取消",
            closeOnClickModal: true
          }).then(res => {
            this.isSendContract = false;
            if (res === "confirm") {
              
              this.$router.push({path: '/taskEdit', query: {taskId: this.$route.query.taskId,extEntId:this.taskInfo.extEntId}});
              
            }
          });
          return;
        }
        this.$http({
          url: process.env.API_ROOT + "updateenttask",
          method: "post",
          params: {
            taskId: this.$route.query.taskId,
            isSendContract: this.isSendContract ? "1" : "0"
          }
        }).then(res => {
          
          this.taskInfo.isSendContract=this.isSendContract ? "1" : "0";
          
          this.$toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          });
          if (res.data.code !== "0000") {
            this.isSendContract =!this.isSendContract;
          }
        });
      },
      
      //删除任务
      deleteTask: function() {
        var message;
        if(this.taskInfo.state == '6'){
          message = "删除任务后，该任务将不能重新发布，确认删除？"
        }else{
          message = "删除任务后，该任务将不能继续发布，确认删除？"
        }
        this.$messagebox({
          title: "确认删除任务",
          message: message,
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: true
        }).then(res => {
          if (res === "confirm") {
            /*
              * 接口： 删除任务
              * 请求方式： GET
              * 接口： deltask
              * 入参： this.
              * */
            this.$http({
              url: process.env.API_ROOT + "deltask",
              method: "get",
              params: {
                taskId: this.$route.query.taskId
              }
            }).then(res => {
              this.$toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              });
              
              if (res.data.code === "0000") {
                
                sessionStorage.setItem("delete", "1");
                
                this.$router.go(-1);
              }
            });
          }
        });
      },
      
      //删除补充需求
      deleteShow: function(addTaskAdd) {
        
        this.$messagebox({
          title: "确认删除任务",
          message: '确认删除该补充需求内容？',
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: true
        }).then(res => {
          if (res === "confirm") {
            /*
              * 接口： 删除任务
              * 请求方式： GET
              * 接口： deltask
              * 入参： this.
              * */
            this.$http({
              url: process.env.API_ROOT + "deltaskadd",
              method: "post",
              params: {
                taskId: this.$route.query.taskId,
                recdId:addTaskAdd.recdId
              }
            }).then(res => {
              this.$toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              });
              
              if (res.data.code === "0000") {
                this.getData();
              }
            });
          }
        });
      },
      
      editShow(addTaskAdd) {
        console.log(addTaskAdd)
        sessionStorage.setItem("addTaskAdd",JSON.stringify(addTaskAdd));
        this.$router.push({path:"/additionInput",query:{taskId:this.taskInfo.taskId}});
      },
      
      //继续发布任务
      publishTask: function() {
        sessionStorage.setItem("change", "1");
        
        sessionStorage.setItem("taskInfo", JSON.stringify(this.taskInfo));
        
        this.$router.push("/releaseTask");
      },
      
      //结束报名
      endTask: function() {
        this.$messagebox({
          title: "确认结束报名",
          message:
            "结束报名后，任务将不再展示在任务广场，用户也不可再报名，确认结束？",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: true
        }).then(res => {
          if (res === "confirm") {
            /*
              * 接口： 更新企业众包任务
              * 请求方式： POST
              * 接口： updateenttask
              * 入参： signupState
              * */
            this.$http({
              url: process.env.API_ROOT + "updateenttask",
              method: "post",
              params: {
                taskId: this.$route.query.taskId,
                signupState: 3
              }
            }).then(res => {
              this.$toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              });
              
              if (res.data.code === "0000") {
                sessionStorage.setItem("delete", "1");
                
                this.getData();
                
                window.scrollTo(0, 0);
              }
            });
          }
        });
      },
      
      //关闭任务
      closeTask: function() {
        this.$messagebox({
          title: "确认关闭任务",
          message:
            "任务关闭后，任务将不在任务广场显示，同时所有报名将失效，确认关闭？",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: true
        }).then(res => {
          if (res === "confirm") {
            /*
              * 接口： 更新企业众包任务
              * 请求方式： POST
              * 接口： updateenttask
              * 入参： state
              * */
            this.$http({
              url: process.env.API_ROOT + "updateenttask",
              method: "post",
              params: {
                taskId: this.$route.query.taskId,
                state: 4
              }
            }).then(res => {
              this.$toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              });
              
              if (res.data.code === "0000") {
                sessionStorage.setItem("delete", "1");
                
                this.getData();
                
                window.scrollTo(0, 0);
              }
            });
          }
        });
      },
      
      //结束任务
      finishTask: function() {
        this.$messagebox({
          title: "确认结束任务",
          message:
            "若存在用户未完成结算，因此产生的相关纠纷，平台不承担任何责任。",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: true
        }).then(res => {
          if (res === "confirm") {
            /*
              * 接口： 更新企业众包任务
              * 请求方式： POST
              * 接口： updateenttask
              * 入参： state
              * */
            this.$http({
              url: process.env.API_ROOT + "updateenttask",
              method: "post",
              params: {
                taskId: this.$route.query.taskId,
                state: 3
              }
            }).then(res => {
              this.$toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              });
              
              if (res.data.code === "0000") {
                sessionStorage.setItem("delete", "1");
                
                this.getData();
                
                window.scrollTo(0, 0);
              }
            });
          }
        });
      },
      canotChange(){
        if(this.taskInfo.state=='5'){
          this.$toast({
            message: '任务审核中，暂不支持该操作',
            position: "middle",
            duration: 1500
          });
        }
      },
      
      transformText(text){
        if(text){
          return text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
        }
      }
    },
    
    
    
    destroyed() {
      this.$messagebox.close();
    },
    
    watch: {
      //更改任务广场发布状态
      taskShow: function() {
        if (this.dataState) {
          
          
          
          /*
            * 接口： 任务是否展示
            * 请求方式： POST
            * 接口： taskisshow
            * 入参： taskId， isShow
            * */
          this.$http({
            url: process.env.API_ROOT + "taskisshow",
            method: "post",
            params: {
              taskId: this.$route.query.taskId,
              isShow: this.taskShow ? "1" : "0"
            }
          }).then(res => {
            this.$toast({
              message: res.data.msg,
              position: "middle",
              duration: 1500
            });
            
            if (res.data.code !== "0000") {
              this.taskShow = !this.taskShow;
            }
          });
        }
      }
    },
    computed:{
      addShowBtn(){
        
        if(this.addshow&&this.addshow.checkedState&&(this.addshow.checkedState==='0'||this.addshow.checkedState==='2')){
          
          return false;
        }
        return true;
        
      }
    }
  };
</script>

<style scoped lang="less">
  @import "task_detail.less";
</style>
<style>
  .task_detail .mint-switch .mint-switch-core {
    height: 14px;
    width: 27px;
    border-radius: 7px;
  }
  .task_detail .mint-switch .mint-switch-core:after {
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
  .task_detail .mint-switch .mint-switch-core:before {
    width: 27px;
    height: 14px;
  }
  .task_detail
  .mint-switch
  .mint-switch-input:checked
  + .mint-switch-core::after {
    transform: translateX(13px);
  }
  .mint-msgbox .mint-msgbox-btns > .mint-msgbox-btn {
    font-size: 16px;
  }
</style>
