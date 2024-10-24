import type { Router } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@optiml/constants';
import { preferences } from '@optiml/preferences';
import { useAccessStore, useUserStore } from '@optiml/stores';
import { startProgress, stopProgress } from '@optiml/utils';

import { useTitle } from '@vueuse/core';

import { $t } from '#/locales';
import { coreRouteNames, dynamicRoutes } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * Common Guard Configuration
 * @param router
 */
function setupCommonGuard(router: Router) {
  // Record already loaded pages
  const loadedPaths = new Set<string>();
  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);
    // Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Record whether the page has been loaded; if it has, subsequent page transition animations and effects will not be executed again
    loadedPaths.add(to.path);
    // Turn off page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }

    // Dynamically modify title
    if (preferences.app.dynamicTitle) {
      const { title } = to.meta;
      useTitle(`${$t(title)} - ${preferences.app.name}`);
    }
  });
}

/**
 * Access Guard Configuration
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // Basic routes that do not require access interception
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) || DEFAULT_HOME_PATH,
        );
      }
      return true;
    }

    // accessToken check
    if (!accessStore.accessToken) {
      // If explicitly declared to ignore access, can access
      if (to.meta.ignoreAccess) {
        return true;
      }
      // No access rights, redirect to login page
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // If unnecessary, delete query directly
          query: { redirect: encodeURIComponent(to.fullPath) },
          // Carry the current redirect page, and redirect to this page after login
          replace: true,
        };
      }
      return to;
    }

    // Check if dynamic routes have been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Generate route table
    // List of role identifiers for the currently logged-in user
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    const userRoles = userInfo.roles ?? [];
    // Generate menus and routes
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // Will be displayed in the menu but access will be redirected to 403
      routes: dynamicRoutes,
    });

    // Save menu information and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ?? to.fullPath) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Project Guard Configuration
 * @param router
 */
function createRouterGuard(router: Router) {
  /** Common */
  setupCommonGuard(router);
  /** Access Guard */
  setupAccessGuard(router);
}

export { createRouterGuard };
