import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";
import moment from "moment/min/moment-with-locales"
import VueTouch from 'vue-touch'

// vue-touch插件使用
Vue.use(VueTouch, {name: 'v-touch'})
import {
    Lazyload
} from "vant";
Vue.use(Vant);
Vue.use(Lazyload);

import GeneralHeader from "@/components/GeneralHeader.vue";
Vue.component('GeneralHeader', GeneralHeader);


// moment时间格式化插件
Vue.prototype.$moment=moment




// import { Button } from 'vant';
// Vue.use(Button)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");