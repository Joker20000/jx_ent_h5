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
import companyList from '@/pages/company_management/company_list/company_list'
import companyDetail from '@/pages/company_management/company_detail/company_detail'
import taskList from '@/pages/task_management/task_list/task_list'
import taskEdit from '@/pages/task_management/task_edit/task_edit'
import taskManagement from '@/pages/task_management/task_management'
import taskDetail from '@/pages/task_management/task_detail/task_detail'
import feedback from '@/pages/mine/feedback/feedback'
import additionInput from '@/pages/task_management/addition_input/addition_input'
import signList from '@/pages/sign_management/sign_list/sign_list'
import signDetail from '@/pages/sign_management/sign_detail/sign_detail'
import workCheck from '@/pages/sign_management/work_check/work_check'
import workInput from '@/pages/sign_management/work_input/work_input'
import loadingPage from '@/pages/login/loading_page/loading_page'
import personInformation from '@/pages/sign_management/person_information/person_information'


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
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        title: '工资条'
      },
      component: feedback
    },
    {
      path: '/companyList',
      name: 'companyList',
      meta: {
        title: '企业管理'
      },
      component: companyList
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      meta: {
        title: '企业信息'
      },
      component: companyDetail
    },
    {
      path: '/taskManagement',
      name: 'taskManagement',
      component: taskManagement,
      children: [
        {
          path: '/taskList',
          name: 'taskList',
          meta: {
            title: '任务管理'
          },
          component: taskList
        },
        {
          path: '/taskEdit',
          name: 'taskEdit',
          meta: {
            title: '合同信息'
          },
          component: taskEdit
        },
        {
          path: '/taskDetail',
          name: 'taskDetail',
          meta: {
            title: '任务详情'
          },
          component: taskDetail
        },
        {
          path: '/additionInput',
          name: 'additionInput',
          meta: {
            title: '补充任务需求'
          },
          component: additionInput
        }
      ]
    },
    {
      path: '/signList',
      name: 'signList',
      meta: {
        title: ''
      },
      component: signList
    },
    {
      path: '/signDetail',
      name: 'signDetail',
      meta: {
        title: '报名详情'
      },
      component: signDetail
    },
    {
      path: '/workCheck',
      name: 'workCheck',
      meta: {
        title: '工作验收'
      },
      component: workCheck
    },
    {
      path: '/workInput',
      name: 'workInput',
      meta: {
        title: '工作反馈'
      },
      component: workInput
    },
    {
      path: '/loadingPage',
      name: 'loadingPage',
      meta: {
        title: '嘉薪'
      },
      component: loadingPage
    },
    {
      path: '/personInformation',
      name: 'personInformation',
      meta: {
        title: '个人信息'
      },
      component: personInformation
    }
  ]
})



