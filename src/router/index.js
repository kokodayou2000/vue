import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
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
  },{
    path: '*',
    name:'404',
    component:()=> import( '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//重置路由
export const resetRouter = ()=> {
  router.matcher =  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}



//动态路由
export const setRouters = ()=>{
  //{... children}
  const storeMenus = localStorage.getItem("menus");

  if (storeMenus){
    //拼装动态路由
    const manageRouter = {
      path: '/', name: 'Manage', component: HomeView, redirect: "/login",
      children:[]};
    const menus =  JSON.parse(storeMenus);

    menus.forEach(item =>{
      if (item.path){
        let itemMenu = {path: item.path,name:item.name,component: ()=>import('../views/'+item.viewPage+'.vue')}
        manageRouter.children.push(itemMenu);
      }else if (item.children.length){
        item.children.forEach(item=>{
          if (item.path){
            let itemMenu = {path: item.path,name:item.name,component: ()=>import('../views/'+item.viewPage+'.vue')}
            manageRouter.children.push(itemMenu)
          }
        }
        )
      }
    })
    const routerNames = router.getRoutes().map(v => v.name);
    //避免重复添加
    if (!routerNames.includes('Manage')){
      router.addRoute(manageRouter);
    }


  }
  }


    /*
    console.log(menus)
    menus.forEach(item =>{
      let itemMenu =  {
        path:item.path
        ,name:item.name
        ,component: ()=>import('../views/'+item.viewPage+'.vue')
      }

      manageRouter.children.push(itemMenu);

      let itemChildren = item.children;
      itemChildren.forEach(itemC =>{

        let itemCMenu = {
          path:itemC.path,
          name:itemC.name,
          component: ()=> import(
              '../views/'+itemC.viewPage+'.vue'
              )
        }

        console.log(itemC.viewPage)
        manageRouter.children.push(itemCMenu);
      })
    })
    console.log("manageRouter--> "+manageRouter.children)
    router.addRoute(manageRouter);
  }

  */

setRouters()

router.beforeEach((to, from, next)=>{
  localStorage.setItem("currentPathName",to.name) //设置当前的路由名称
  store.commit("setPath") //除非store的数据更新
  /*
  //未找到路由的情况
  if (!to.matched.length){
    const storeUser = localStorage.getItem("user");
    console.log("storeUser"+storeUser)
    if(storeUser){
      next("/404")//放行路由
    }else{
      next("/login")
    }
  }

   */
  // console.log("next")
  next()

})

export default router
