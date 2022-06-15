import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/home',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('/@/views/dashboard/home/index.vue'),
      meta: {
        // affix: true,
        title: "首页",
        hideMenu: true,
      },
    },
    // {
    //   path: 'analysis',
    //   name: 'Analysis',
    //   component: () => import('/@/views/dashboard/analysis/index.vue'),
    //   meta: {
    //     // affix: true,
    //     title: t('routes.dashboard.analysis'),
    //   },
    // },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('/@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.workbench'),
    //   },
    // },
  ],
};

export default dashboard;
