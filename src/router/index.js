import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: HomeView,
    redirect: "/login",
    children:[
        { path: "home",name:"主页" , component:() => import('../views/Home')},
        { path: "user",name:"用户管理" , component:() => import('../views/User')},
        { path: "UserDetail",name:"用户信息设置",component:()=>import('../views/UserDetail')},
        { path: "File",name:"文件管理",component:()=>import('../views/File')},
        { path: "Menu",name:"菜单管理",component:()=>import('../views/Menu')},
        { path: "Role",name:"角色管理",component:()=>import('../views/Role')},
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  localStorage.setItem("currentPathName",to.name) //设置当前的路由名称
  store.commit("setPath") //除非store的数据更新
  next() //放行路由
})

export default router
