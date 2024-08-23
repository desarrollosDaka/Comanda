import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
// import VueApexCharts from 'vue3-apexcharts';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// google-fonts
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

//i18
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(Antd);
app.use(i18n);
// app.use(VueApexCharts);
app.use(Vue3Toasity, {
  autoClose: false,
  //multiple: false,
  // ...
});
app.use(vuetify).mount('#app');
