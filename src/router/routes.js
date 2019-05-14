import layoutHeaderAside from '@/layout/header-aside'

import homeInfo from '../pages/HomeInfo/homeInfo'
import HouseInfo from '../pages/HouseInfo/HouseInfo'
import Contract from '../pages/Contract/Contract'
import About from '../pages/About/About'
import HomePrice from '../pages/HomePrice/HomePrice'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: () => import('@/pages/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      {
        path: '/Leaseholder',
        name: 'Leaseholder',
        component: () => import('../pages/Leaseholder'),
        meta: {
          Auth: true,
          cache: true,
          title: '租客管理'
        }
      },
      {
        path: '/HomeInfo',
        name: 'homeInfo',
        component: homeInfo,
        meta: {
          Auth: true,
          cache: true,
          title: '房间管理'
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../pages/Profile'),
        meta: {
          Auth: true,
          cache: true,
          title: '我的信息'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
          Auth: true,
          cache: true,
          title: '关于'
        }
      },
      {
        path: '/houseInfo',
        name: 'houseInfo',
        component: HouseInfo,
        meta: {
          Auth: true,
          cache: true,
          title: '房屋管理'
        }
      },
      {
        path: '/contract',
        name: 'contract',
        component: Contract,
        meta: {
          Auth: true,
          cache: true,
          title: '合同管理'
        }
      },
      {
        path: '/HomePrice',
        name: 'HomePrice',
        component: HomePrice,
        meta: {
          Auth: true,
          cache: true,
          title: '缴费信息'
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  },
  {
    path: '/userPerfect',
    name: 'userPerfect',
    component: () => import('@/pages/UserPerfect')
  },
  {
    path: '/OutInfo/:phone',
    name: 'OutInfo',
    component: () => import('../pages/OutInfo'),
    meta: {
      cache: true,
      title: '房屋客户端'
    }
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    hidden: true,
    component: () => import('@/pages/NotFound')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
