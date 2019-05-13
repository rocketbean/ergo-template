
const routes = [
  {
    path: '/login',
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
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
