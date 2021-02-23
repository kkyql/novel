import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// // 为了解决重复点击报错
// //获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
// //修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/contactus',
    name: 'Contactus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Contactus.vue')

  },
  {
    path: '/bookshelf',
    name: 'Bookshelf',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Bookshelf.vue')

  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Search.vue')

  },

  {
    path: '/ranking',
    name: 'Ranking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Ranking.vue')

  },
  {
    path: '/searchinfo',
    name: 'Searchinfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Searchinfo.vue')

  },
  {
    path: '/book/:id',
    name: 'Book',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Book.vue'),
    children: [
      {
        path: '/',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
      },
      {
        path: 'chapter',
        name: 'Chapter',
        component: () => import( /* webpackChunkName: "about" */ '../views/Chapter.vue'),
      }, {
        path: 'read',
        name: 'Read',
        component: () => import( /* webpackChunkName: "about" */ '../views/Read.vue'),
      },
    ],

  },
];



const router = new VueRouter({
  routes,
})

export default router