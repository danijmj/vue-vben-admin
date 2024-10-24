import type { Recordable, UserInfo } from '@optiml/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@optiml/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@optiml/stores';

import { defineStore } from 'pinia';

import { notification } from '#/adapter/naive';
import { getAccessCodesApi, getUserInfoApi, loginApi, logoutApi } from '#/api';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * Asynchronous login processing
   * Asynchronously handle the login process
   * @param params Login form data
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // Asynchronously handle user login and obtain accessToken
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;
      const { accessToken } = await loginApi(params);

      // If successfully obtained accessToken
      if (accessToken) {
        // Store the accessToken in accessStore
        accessStore.setAccessToken(accessToken);

        // Obtain user information and store it in accessStore
        const [fetchUserInfoResult, accessCodes] = await Promise.all([
          fetchUserInfo(),
          getAccessCodesApi(),
        ]);

        userInfo = fetchUserInfoResult;

        userStore.setUserInfo(userInfo);
        accessStore.setAccessCodes(accessCodes);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(userInfo.homePath || DEFAULT_HOME_PATH);
        }

        if (userInfo?.realName) {
          notification.success({
            content: $t('authentication.loginSuccess'),
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
            duration: 3000,
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // Do nothing
    }
    resetAllStores();
    accessStore.setLoginExpired(false);
    // Redirect to login page with current route address
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    let userInfo: null | UserInfo = null;
    userInfo = await getUserInfoApi();
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
