import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Joboffer from '@/components/Joboffer';
import Profile from '@/components/Profile';
import Upgrade from '@/components/Upgrade';
import Login from '@/components/Login';
import Home from '@/components/pages/home';
import Contact from '@/components/pages/contact';
import Offers from '@/components/pages/offer';
import store from '@/store/store';

Vue.use(Router);
/* eslint-disable */
export default new Router({
  routes: [
    {
      path:"/",
      redirect:{
        name:"home",
      }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/Offers',
        name: 'Offers',
        component: Offers,
    },
    {
        path: '/Contact',
        name: 'Contact',
        component: Contact,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter:(to, from, next) =>{
        if(store.state.auth == false){
          next("/login");
        }else{
          next();
        }
      }
    },
    {
      path: '/Joboffer',
      name: 'Joboffer',
      component: Joboffer,
      beforeEnter:(to, from, next) =>{
        if(store.state.auth == false){
          next("/login");
        }else{
          next();
        }
      }
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      beforeEnter:(to, from, next) =>{
        if(store.state.auth == false){
          next("/login");
        }else{
          next();
        }
      }
    },
    {
      path: '/Upgrade',
      name: 'Upgrade',
      component: Upgrade,
      beforeEnter:(to, from, next) =>{
        if(store.state.auth == false){
          next("/login");
        }else{
          next();
        }
      }
    },
  ],
});
