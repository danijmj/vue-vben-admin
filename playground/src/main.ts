import { initPreferences } from '@optiml/preferences';
import { unmountGlobalLoading } from '@optiml/utils';

import { overridesPreferences } from './preferences';

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  // name is used to specify the unique identifier of the project
  // used to distinguish preferences for different projects and key prefixes for storing data and other data that needs to be isolated
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // Initialize app preferences
  await initPreferences({
    namespace,
    overrides: overridesPreferences,
  });

  // Start the application and mount
  // Main logic and view of vue application
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // 移除并销毁loading
  unmountGlobalLoading();
}

initApplication();
