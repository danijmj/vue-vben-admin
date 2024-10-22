import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@optiml/constants';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'dot',
      icon: VBEN_LOGO_URL,
      order: 9999,
      title: $t('demos.vben.title'),
    },
    name: 'VbenProject',
    path: '/vben-admin',
    children: [
      {
        name: 'VbenAbout',
        path: '/vben-admin/about',
        component: () => import('#/views/_core/about/index.vue'),
        meta: {
          icon: 'lucide:copyright',
          title: $t('demos.vben.about'),
        },
      },
    ],
  },
];

export default routes;
