import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';

// const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

const page: AppRouteModule = {
  path: '/device',
  name: 'PageDemo',
  component: LAYOUT,
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    // title: t('routes.demo.page.page'),
    title: '套管设备管理',
  },
  children: [
    // =============================form start=============================
    {
      path: 'parameter_detail/:id',
      name: 'ParameterDetail',
      meta: {
        hideMenu: true,
        title: '设备修改',
        ignoreKeepAlive: true,
        showMenu: false,
      },
      component: () => import('/@/views/device/parameters/high/index.vue'),
    },
    {
      path: 'parameter_info/:id',
      name: 'ParameterInfo',
      meta: {
        hideMenu: true,
        title: '设备详情',
        ignoreKeepAlive: true,
        showMenu: false,
      },
      component: () => import('/@/views/device/parameters/high/index.vue'),
    },
    {
      path: 'parameters',
      name: 'parameters',
      component: () => import('/@/views/device/parameters/index.vue'),
      meta: {
        title: '设备列表',
      },
    },

    {
      path: 'alarm',
      name: 'alarm',
      component: () => import('/@/views/device/alarm/index.vue'),
      meta: {
        title: '报警管理',
      },
      children: [
      ],
    },
    // =============================form end=============================
    // =============================desc start=============================
    {
      path: 'suddenList',
      name: 'suddenList',
      // component: getParentLayout('DescPage'),
      component: () => import('/@/views/device/recording/suddenList.vue'),
      meta: {
        title: '突变列表',
      },
      children: [
        // {
        //   path: 'suddenList',
        //   name: 'suddenList',
        //   component: () => import('/@/views/device/recording/suddenList.vue'),
        //   meta: {
        //     title: '突变列表',
        //   },
        // },
        // {
        //   path: 'high',
        //   name: 'DescHighPage',
        //   component: () => import('/@/views/demo/page/desc/high/index.vue'),
        //   meta: {
        //     title: t('routes.demo.page.descHigh'),
        //   },
        // },
      ],
    },
    // =============================desc end=============================
    {
      path: 'recordingNew',
      name: 'recordingNew',
      // component: getParentLayout('DescPage'),
      component: () => import('/@/views/device/recording/recordingNew.vue'),
      meta: {
        title: '查询最新录波列表',
      },
      children: [
      ],
    },
    {
      path: 'recordingList',
      name: 'recordingList',
      // component: getParentLayout('DescPage'),
      component: () => import('/@/views/device/recording/recordingList.vue'),
      meta: {
        title: '本地已保存录波列表',
      },
      children: [
      ],
    },
    // =============================result start=============================
    // {
    //   path: 'result',
    //   name: 'ResultPage',
    //   component: getParentLayout('ResultPage'),
    //   meta: {
    //     title: '录波相关',
    //   },
    //   children: [
    //     {
    //       path: 'recordingNew',
    //       name: 'recordingNew',
    //       component: () => import('/@/views/device/recording/recordingNew.vue'),
    //       meta: {
    //         title: '查询最新录波列表',
    //       },
    //     },
    //     {
    //       path: 'recordingList',
    //       name: 'recordingList',
    //       component: () => import('/@/views/device/recording/recordingList.vue'),
    //       meta: {
    //         title: '本地已保存录波列表',
    //       },
    //     },
    //   ],
    // },
  ],
};

export default page;
