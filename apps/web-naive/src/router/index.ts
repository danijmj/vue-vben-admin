import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@optiml/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';

/**
 * Create vue-router instance
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // Initial route list to be added to the router.
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // Whether to prohibit trailing slashes.
  // strict: true,
});

const resetRoutes = () => resetStaticRoutes(router, routes);

// Create router guard
createRouterGuard(router);

export { resetRoutes, router };
