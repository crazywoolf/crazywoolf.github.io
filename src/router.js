import Vue from 'vue';

import Router from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import Meta from 'vue-meta';

import Home from './views/Home.vue';

Vue.use(Router);
Vue.use(RouterPrefetch);
Vue.use(Meta);

const router = new Router({
    base: process.env.BASE_URL,

    mode: 'history',

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },

    routes: [
        {
            path: '/',
            alias: '*',
            name: 'Home',
            component: Home
        },
        {
            path: '/pageexample',
            name: 'PageExample',
            component: () => import(/* webpackChunkName: "pageexample" */ './views/PageExample.vue')
        }
    ]
});

export default router;
