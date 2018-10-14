import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

export default new Router({
  base: '/AstroNotes/dist/',
  mode: 'history',
  routes: [
    {
      path: '/:note',
      component: App
    },
  ]
});
