import Vue from 'vue'
import Router from 'vue-router'
import firebase from "firebase";

Vue.use(Router)

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import LobbyPage from '@/pages/LobbyPage'
import LobbyPageDeneme from '@/pages/LobbyPageDeneme'
import SaloonSelectPage from '@/pages/SaloonSelectPage'

let router = new Router({
  routes: [
    { path: "/", name: "Lobby", component: LobbyPage, meta: { requiresAuth:true } },
    { path: "/saloon-select", name: "SaloonSelect", component: SaloonSelectPage, meta: { requiresAuth:true } },
    { path: "/lobby", name: "LobbyPageDeneme", component: LobbyPageDeneme, meta: { requiresAuth:true } },
    { path: "/signup", name: "Signup", component: SignupPage },
    { path: "/login", name: "Login", component: LoginPage },
  ],
  /* mode: "history" */
});

router.beforeEach((to, from, next)=>{
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !currentUser) next('/login')
  else if(!requiresAuth && currentUser) next()
  else next()
})

export default router;
