import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login/login'
import forgetPassword from '@/pages/login/forget_password/forget_password'
import workDesk from '@/pages/work_desk/work_desk'
import homepage from '@/pages/work_desk/homepage/homepage'
import companyBalance from '@/pages/company_management/company_balance/company_balance'
import transactionDetail from '@/pages/company_management/transaction_detail/transaction_detail'
import mine from '@/pages/work_desk/mine/mine'
import taskPage from '@/pages/task/task_page'
import releaseTask from '@/pages/task/release_task/release_task'
import signAgreement from '@/pages/task/sign_agreement/sign_agreement'
import accountCenter from '@/pages/mine/account_center/account_center'
import changeTel from '@/pages/mine/change_tel/change_tel'
import authentication from '@/pages/mine/authentication/authentication'
import changeTelCertification from '@/pages/mine/change_tel_certification/change_tel_certification'
import changePassword from '@/pages/mine/change_password/change_password'
import helpList from '@/pages/mine/help_list/help_list'
import helpDetail from '@/pages/mine/help_detail/help_detail'
import feedbackList from '@/pages/mine/feedback_list/feedback_list'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        title: '忘记密码'
      },
      component: forgetPassword
    },
    {
      path: '/workDesk',
      name: 'workDesk',
      component: workDesk,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          meta: {
            title: '工作台',
          },
          component: homepage
        },
        {
          path: 'mine',
          name: 'mine',
          meta: {
            title: '我的'
          },
          component: mine
        }
      ]
    },
    {
      path: '/companyBalance',
      name: 'companyBalance',
      meta: {
        title: '企业账户余额'
      },
      component: companyBalance
    },
    {
      path: '/transactionDetail',
      name: 'transactionDetail',
      meta: {
        title: '交易明细'
      },
      component: transactionDetail
    },
    {
      path: '/taskPage',
      name: 'taskPage',
      component: taskPage,
      children: [
        {
          path: '/releaseTask',
          name: 'releaseTask',
          meta: {
            title: '发布任务'
          },
          component: releaseTask
        },
        {
          path: '/signAgreement',
          name: 'signAgreement',
          meta: {
            title: '快捷签署服务委托协议书'
          },
          component: signAgreement
        }
      ]
    },
    {
      path: '/accountCenter',
      name: 'accountCenter',
      meta: {
        title: '账号管理'
      },
      component: accountCenter
    },
    {
      path: '/changeTel',
      name: 'changeTel',
      meta: {
        title: '登录账号'
      },
      component: changeTel
    },
    {
      path: '/authentication',
      name: 'authentication',
      meta: {
        title: '安全验证'
      },
      component: authentication
    },
    {
      path: '/changeTelCertification',
      name: 'changeTelCertification',
      meta: {
        title: '更换手机号'
      },
      component: changeTelCertification
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      meta: {
        title: '修改登录密码'
      },
      component: changePassword
    },
    {
      path: '/helpList',
      name: 'helpList',
      meta: {
        title: '使用帮助'
      },
      component: helpList
    },
    {
      path: '/helpDetail',
      name: 'helpDetail',
      meta: {
        title: '问题详情'
      },
      component: helpDetail
    },
    {
      path: '/feedbackList',
      name: 'feedbackList',
      meta: {
        title: '消息'
      },
      component: feedbackList
    }
  ]
})



