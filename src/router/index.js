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
    }
  ]
})



