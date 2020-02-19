import Vue from 'vue';

import VueGtm from 'vue-gtm';
import VueProgressBar from 'vue-progressbar';
import VueObserveVisibility from 'vue-observe-visibility';
import 'intersection-observer';

import App from './App.vue';
import router from './router';
import store from './store';

/* UNCOMMENT TO ENABLE CACHE import './registerServiceWorker'; */
/* UNCOMMENT TO ENABLE i18n import i18n from './i18n'; */

import meta from './assets/data/meta.json';

Vue.config.productionTip = false;

if (meta.GTM !== 'GTM-XXXXXX') {
    Vue.use(VueGtm, {
        id: meta.GTM,
        enabled: true,
        debug: false,
        vueRouter: router
    });
}

Vue.use(VueProgressBar, {
    color: meta.progressbarColor
});

Vue.use(VueObserveVisibility);

new Vue({
    router,
    store,
    /* UNCOMMENT TO ENABLE i18n i18n, */
    render: h => h(App)
}).$mount('#app');
