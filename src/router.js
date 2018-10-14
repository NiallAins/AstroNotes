import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

export default new Router({
  base: 'https://niallains.github.io/AstroNotes/dist/',
  mode: 'history',
  routes: [
    {
      path: '/:note',
      component: App
    },
  ]
});
