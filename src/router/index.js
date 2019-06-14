import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
// 注册
  {
    path: '/register',
    name:'register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
// 提交真实姓名
  {
    path: '/Myform',
    name:'Myform',
    component: () => import('@/views/form/index'),
    hidden: true,
  },
// 个人首页
  {
    path: '/',
    component: Layout,
    redirect: '/console',
    name:'personal',
    meta: { title: '个人首页', icon: 'dashboard'},
    children: [
        {
        path: 'console',
        name: 'console',
        component: () => import('@/views/console/index'),
        meta: { title: '控制台', icon: 'dashboard'}
      },
      {
        path: 'myTask',
        name: 'myTask',
        component: () => import('@/views/myTask/index'),
        meta: { title: '任务列表', icon: 'dashboard'}
      }
    ]
  },
// 星评委首页
  {
    path: '/judge',
    component: Layout,
    redirect: '/judge/judgeindex',
    name:'judge',
    meta: { title: '星评委首页', icon: 'dashboard'},
    children: [
        {
        path: 'judgeindex',
        name: 'judgeindex',
        component: () => import('@/views/judgeindex/index'),
        meta: { title: '星评员管理', icon: 'dashboard'}
      },
      {
        path: 'judgeTask',
        name: 'judgeTask',
        component: () => import('@/views/myTask/index'),
        meta: { title: '星评员任务', icon: 'dashboard'}
      },
    ]
  },
// 组织结构
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/province',
    meta:{title: '组织结构管理',icon: 'star'},
    children: [
        {
        path: 'province',
        name: 'province',
        component: () => import('@/views/organization/province'),
        meta: { title: '省星评为管理', icon: 'star' }
      },
      {
        path: 'city',
        name: 'city',
        component: () => import('@/views/organization/city'),
        meta: { title: '市星评为管理', icon: 'star' }
      },
    ]
  },
// 文档下载
  {
    path: '/download',
    name:'download',
    redirect: '/download/download1',
    component: Layout,
    meta: { title: '', icon: 'documentation'},
    // alwaysShow:true,
    children:[
      {
        path: 'download1',
        name: 'download1',
        component: () => import('@/views/register/index'),
        meta: { title: '文档下载', icon: 'documentation'}
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export const dynamicRouter = [
  {
    path: '/spaceRate',
    component: Layout,
    redirect: '/spaceRate',
    meta:{roles: ['admin', 0]},
    children: [{
      path: 'spaceRate',
      name: 'spacerate',
      component: () => import('@/views/spacerate/index'),
      meta: { title: '场所评级', icon: 'star' }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopList',
    name: 'shop',
    meta: { title: '商城管理', icon: 'shopping',roles: ['admin', 0] },
    children: [
      {
        path: 'shopList',
        name: 'shopList',
        component: () => import('@/views/table/index'),
        meta: { title: '积分商城', icon: 'shopping' }
      },
      {
        path: 'usersExchange',
        name: 'usersExchange',
        component: () => import('@/views/spacerate/index'),
        meta: { title: '用户兑换', icon: 'user' }
      },
      {
        path: 'usersExchange2',
        name: 'usersExchange2',
        component: () => import('@/views/spacerate/index'),
        meta: { title: '出售记录', icon: 'list' }
      }
    ]
  },

  {
    path: '/exchange',
    component: Layout,
    redirect: '/exchange/exchangeList',
    name: 'exchange',
    meta: { title: '积分兑换', icon: 'money', roles: ['admin','super_editor']},
    children: [
      {
        path: 'exchangeList',
        name: 'exchangeList',
        component: () => import('@/views/spacerate/index'),
        meta: { title: '兑换列表', icon: 'list' }
      },
      {
        path: 'exchangeList2',
        name: 'exchangeList2',
        component: () => import('@/views/spacerate/index'),
        meta: { title: '兑换记录', icon: 'list' }
      }
    ]
  },

  {
    path: '/complain',
    component: Layout,
    alwaysShow: true,
    redirect: '/complain/complainList',
    name: 'complain',
    meta: { title: '投诉与反馈', icon: 'edit', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'complainList',
        name: 'complainList',
        component: () => import('@/views/spacerate/index'),
        meta: { title: '投诉列表', icon: 'list' }
      }
    ]
  },
  
  // { path: '*', redirect: '/404', hidden: true }
];

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
