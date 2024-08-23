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
      name: 'Colors',
      path: '/colors',
      component: () => import('@/views/colors/ColorPage.vue')
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
      path: '/formComandaUpdate/:id/:idComanda',
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
    ,{
      name: 'viewProcessComandas',
      path: '/viewProcessComandas/:id/:id_orders',
      component: () => import('@/views/pages/viewProcessComandas.vue')
    }
    ,{
      name: 'maestroComandaAsignada',
      path: '/maestroComandaAsignada',
      component: () => import('@/views/pages/maestroComandaAsignada.vue')
    }
    ,{
      name: 'retenciones',
      path: '/retenciones',
      component: () => import('@/views/pages/retencion.vue')
    }
    ,{
      name: 'pickups',
      path: '/pickups',
      component: () => import('@/views/pages/comandaPickup.vue')
    }
    ,{
      name: 'pickupsDetails',
      path: '/pickupsDetails/:id1/:id2',
      component: () => import('@/views/pages/detallesPickup.vue')
    }
    ,{
      name: 'ComandasAtc',
      path: '/ComandasAtc',
      component: () => import('@/views/pages/comandaATC.vue')
    }
    ,{
      name: 'ComandasCDD',
      path: '/ComandasCDD',
      component: () => import('@/views/pages/comandaCDD.vue')
    }
    ,{
      name: 'DetalleCDD',
      path: '/DetalleCDD/:id1/:id2',
      component: () => import('@/views/pages/detalleCDD.vue')
    }
    ,{
      name: 'ReporteComanda',
      path: '/ReporteComanda',
      component: () => import('@/views/pages/reportComanda.vue')
    }
    ,{
      name: 'DetalleComandaReporte',
      path: '/DetalleComandaReporte/:id1/:id2',
      component: () => import('@/views/pages/detalleReporte.vue')
    }
  ]
};

export default MainRoutes;
