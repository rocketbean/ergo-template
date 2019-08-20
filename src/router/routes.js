
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/login.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/origin.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/dashboard.vue') }
    ]
  },
  {
    path: '/properties',
    component: () => import('layouts/origin.vue'),
    children: [
      { path: '', component: () => import('pages/properties/properties.vue') },
      { path: ':property', component: () => import('pages/properties/property.vue') },
    ]
  },
  {
    path: '/suppliers',
    component: () => import('layouts/origin.vue'),
    children: [
      { path: '', component: () => import('pages/suppliers/suppliers.vue') },
      { path: ':supplier', component: () => import('pages/suppliers/supplier.vue') },
      // { path: ':property', component: () => import('pages/properties/property.vue') },
    ]
  },
  {
    path: '/stream/:supplier',
    component: () => import('layouts/stream.vue'),
    children: [
      { name : '/', path: '', component: () => import('pages/stream/stream.vue') },
      { name: 'joborders', path: 'joborders', component: () => import('pages/stream/joborders.vue') },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
