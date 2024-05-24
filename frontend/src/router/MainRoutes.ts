const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Typography',
      path: '/typography',
      component: () => import('@/views/typography/TypographyPage.vue')
    },
    {
      name: 'Colors',
      path: '/colors',
      component: () => import('@/views/colors/ColorPage.vue')
    },
    {
      name: 'Shadow',
      path: '/shadow',
      component: () => import('@/views/shadows/ShadowPage.vue')
    },
    {
      name: 'Color',
      path: '/icon/ant',
      component: () => import('@/views/icons/AntDesignIcons.vue')
    },
    {
      name: 'other',
      path: '/sample-page',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'maestroComanda',
      path: '/maestroComanda',
      component: () => import('@/views/pages/maestroComanda.vue')
    },
    {
      name: 'formComanda',
      path: '/formComanda',
      component: () => import('@/views/pages/formComanda.vue')
    },
    {
      name: 'formComandaUpdate',
      path: '/formComandaUpdate/:id',
      component: () => import('@/views/pages/formComandaUpdate.vue')
    }
    ,{
      name: 'masterUser',
      path: '/masterUser',
      component: () => import('@/views/pages/masterUser.vue')
    }
    ,{
      name: 'formCreatedUser',
      path: '/formCreatedUser',
      component: () => import('@/views/pages/formCreatedUser.vue')
    }
    ,{
      name: 'formUpdateUser',
      path: '/formUpdateUser/:id',
      component: () => import('@/views/pages/formUpdateUser.vue')
    }
    ,{
      name: 'PageInfo',
      path: '/PageInfo',
      component: () => import('@/views/pages/pageInfo.vue')
    }
    ,{
      name: 'maestroPedidos',
      path: '/maestroPedidos',
      component: () => import('@/views/pages/maestroPedidos.vue')
    }
    ,{
      name: 'addArticulos',
      path: '/addArticulos/:id/:update?',
      component: () => import('@/views/pages/addArticulos.vue')
    }
    ,{
      name: 'addArticulosUpdate',
      path: '/addArticulosUpdate/:id',
      component: () => import('@/views/pages/addArticuloUpdate.vue')
    }
  ]
};

export default MainRoutes;
