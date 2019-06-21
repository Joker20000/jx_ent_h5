// 通过 `import` 命令加载 Vue 构建版本（runtime-only 或 standalone），
// 该构建版本已在webpack.base.conf中设置了别名。
//引入公共样式
// 导入 vue 实例
import Vue from 'vue'
// 导入 App 组件
import App from './App'
// 导入 路由
import router from './router'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
//http.js文件，即全局配置axios请求，与main.js在同级目录
import axios from './api/axios'
//封装的插件
import api from './api/index'
//joson转表单对象
import json2Form from './api/json2Form'
//Md5
import MD5 from '../static/js/MD5.min'
//导入 mint-ui
import MintUI from 'mint-ui'

import vconsole from './api/vconsole'

import wx from 'weixin-js-sdk';

//import BasicJs from './js/basic'
import VueWechatTitle from 'vue-wechat-title';
/*import VueResource from 'vue-resource'*/
import Filters from './api/filters'

//引入中央总线
import bus from './api/eventBus'

import store from './api/store'

import VueCropper from 'vue-cropper'


//!!!!!_____!!!!!!!!!!-------------控制台---------------!!!!!!!!!!!!!!!!!!!


//Vue.use(VueResource);
Vue.use(api);
Vue.use(json2Form);
Vue.use(MD5);
Vue.use(VueWechatTitle);
Vue.use(MintUI);
Vue.use(axios)
Vue.use(bus);
Vue.use(VueCropper);
Vue.prototype.bus = bus;
Vue.prototype.wx = wx
//Vue.use(BasicJs)
Vue.config.productionTip = false

require('es6-promise').polyfill();
Es6Promise.polyfill();


//判断用户是否处于登录状态，访问权限验证
let token ;

router.beforeEach((to,from,next)=>{


  var Authorization = window.localStorage.getItem('Authorization');//Authorization数据


  if(Authorization){


  } else {

  }
})



//实例化 vue 实例
new Vue({
// 定义根组件的选择器
  el: '#app',
  // 根组件的 template
  template: '<app></app>',
  // 声明根组件可以访问的组件
  components: { App },
  // 传入 router 到 vue 实例
  router,
  store
}).$mount('#app')// app 上装载 router


/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */

