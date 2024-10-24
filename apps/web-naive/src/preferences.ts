import { defineOverridesPreferences } from '@optiml/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  logo: {
    enable: true,
    source: '/noBgColor_sm.png',
  },
  widget: {
    languageToggle: false,
  },
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});
