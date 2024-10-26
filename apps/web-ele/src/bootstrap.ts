import { createApp } from 'vue';

import { registerAccessDirective } from '@optiml/access';
import { initStores } from '@optiml/stores';
import '@optiml/styles';
import '@optiml/styles/ele';

import { setupI18n } from '#/locales';

import { initComponentAdapter } from './adapter/component';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // 初始化组件适配器
  await initComponentAdapter();
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 安装权限指令
  registerAccessDirective(app);

  // 配置路由及路由守卫
  app.use(router);

  app.mount('#app');
}

export { bootstrap };
