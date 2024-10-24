/**
 * @zh_CN 登录页面 url 地址
 */
export const LOGIN_PATH = '/auth/login';

/**
 * @zh_CN 默认首页地址
 */
export const DEFAULT_HOME_PATH = '/analytics';

export interface LanguageOption {
  label: string;
  value: 'de-DE' | 'en-US' | 'es-ES' | 'zh-CN';
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: 'Deutsch',
    value: 'de-DE',
  },
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: 'Español',
    value: 'es-ES',
  },
  {
    label: '简体中文',
    value: 'zh-CN',
  },
];
