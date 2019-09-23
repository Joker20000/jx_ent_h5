<template>
  
  <div class="release_task">
  
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
    
      <div class="list must_input" v-on:click="pickerSelect('ext')">
        <div class="title">业务合作企业</div>
        <div class="content select" v-if="this.ext.length === 0">请选择业务合作企业</div>
        <div class="content select data" v-else>{{this.ext[0]}}</div>
      </div>
  
    </div>
  
    <div class="sign_agreement" >
      <input type="checkbox" class="agree" checked>
      <span>我已阅读并同意<span v-on:click="$router.push('signAgreement')">《快捷签署服务委托协议书》</span></span>
    </div>
  
    <commonButton v-bind:btnName="btnName" v-on:clickEvent=""></commonButton>
  
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
  import commonButton from '../../../component/common_button/common_button'
  export default {
    name: "task_edit",
    
    components: {
      commonButton
    },
    
    data(){
      return{
        
        btnName: '确定',
        entId: '',//企业Id
  
        templetList: [],//合同模板列表
        
        templetName: '',//合同名称
  
        cooperate: [],//合作企业列表
  
        _templet: '',//点击取消时选择的合同模板类型
  
        templet: [],//点击确定时选择的合同模板类型
  
        _ext: '',//点击取消时选择的合作企业
  
        ext: [],//点击确定时选择的合作企业
  
        pickerType: false,//选择框加载时的状态(页面加载中和页面加载完成)
  
        pickerShow: false,//选择框显示状态
  
        lastPickerClick: '',//点击显示选择框位置
  
        slots: [],//选择框数据列表

      }
    },
  
    mounted () {},
    
    methods:{
  
      //备注失去焦点恢复页面（ios输入法）
      lostPointFn:function () {
    
        document.body.scrollTop =scrollY;
    
      },
  
      //获取合同模板列表
      getTempletList: function () {
    
        /*
        * 接口： 查看模板列表
        * 请求方式： POST
        * 接口： get/ssh/templetList
        * 入参： null
        * */
        this.$http({
      
          url: process.env.API_ROOT + 'get/ssh/templetList',
          method: 'post'
      
        }).then(res=>{
      
          this.templetList = res.data.data.list;
      
        })
    
      },
  
  
      //获取合作企业列表
      getAllCooperateInfo: function () {
    
        /*
        * 接口： 获取业务合作企业信息
        * 请求方式： POST
        * 接口： contract/manage/getallcooperateinfo
        * 入参： null
        * */
        this.$http({
      
          url: process.env.API_ROOT + 'contract/manage/getallcooperateinfo',
          method: 'post'
      
        }).then(res=>{
      
          this.cooperate = res.data.data;
      
        });
    
      },
  
      //点击页面弹出框事件
      pickerSelect: function (clickType) {
    
        this.pickerType = true;
    
        if(this.lastPickerClick !== clickType){
      
          this.slots = [];
      
          switch (clickType) {
        
            case 'ent':
          
              this.entSelect();
          
              break;
        
            case 'type':
          
              this.typeSelect();
          
              break;
        
            case 'place':
          
              this.placeSelect();
          
              break;
        
            case 'invoice':
          
              this.invoiceSelect();
          
              break;
        
            case 'templet':
          
              this.templetSelect();
          
              break;
        
            case 'ext':
          
              this.extSelect();
          
              break;
        
          }
      
        }
    
        this.lastPickerClick = clickType;
    
        this.pickerShow = true;
    
        this.pickerType = false;
    
        setTimeout(function () {
      
          var div = document.getElementsByClassName('task_page')[0];
      
          var scrollY = window.scrollY;
      
          div.style.position = 'fixed';
      
          div.style.top = -scrollY + 'px';
      
          div.style.overflow = 'hidden';
      
        },100);
    
      },
  
      //选择框取消事件
      pickerCancel: function () {
    
        this.pickerShow = false;
    
        this['_'+ this.lastPickerClick] = [this.$refs.picker.getSlotValue(0)];
    
        (!!this.$refs.picker.getSlotValue(1)) && (this['_'+ this.lastPickerClick].push(this.$refs.picker.getSlotValue(1)));
    
        var div = document.getElementsByClassName('task_page')[0];
    
        var scrollY = parseInt(div.style.top);
    
        div.style.position = '';
    
        div.style.top = '';
    
        div.overflow = '';
    
        window.scrollTo(0, -scrollY);
    
      },
  
  
      //选择框确定事件
      pickerConfirm: function () {
    
        this.pickerShow = false;
    
        this[this.lastPickerClick] = [this.$refs.picker.getSlotValue(0)];
    
        (!!this.$refs.picker.getSlotValue(1)) && (this[this.lastPickerClick].push(this.$refs.picker.getSlotValue(1)));
    
        var div = document.getElementsByClassName('task_page')[0];
    
        var scrollY = parseInt(div.style.top);
    
        div.style.position = '';
    
        div.style.top = '';
    
        div.overflow = '';
    
        window.scrollTo(0, -scrollY);
    
      },
  
      //选择框更换值事件
      onValueChange: function () {
    
        if(!this.lastPickerClick) return;
    
        if(this.lastPickerClick === 'type'){
      
          this.typePickerChange();
      
        }else if(this.lastPickerClick === 'place'){
      
          this.placePickerChange();
      
        }
    
      },
      
    },
    
    
  }
</script>

<style scoped lang="less">
  @import "task_edit.less";
</style>
