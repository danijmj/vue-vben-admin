import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@optiml/types';

import { generateAccessible } from '@optiml/access';
import { preferences } from '@optiml/preferences';

import { message } from '#/adapter/naive';
import { getAllMenusApi } from '#/api';
import { BasicLayout, IFrameView } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading(`${$t('common.loadingMenu')}...`, {
        duration: 1.5,
      });
      return await getAllMenusApi();
    },
    // You can specify that you do not have permission to jump to the 403 page
    forbiddenComponent,
    // If route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
