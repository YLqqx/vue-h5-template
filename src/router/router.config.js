/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/mining',
    meta: {
      title: '矿池',
      keepAlive: false
    },
    children: [
      {
        path: '/mining',
        name: 'Mining',
        component: () => import('@/views/home/index'),
        meta: { title: '矿池', keepAlive: false }
      },
      {
        path: '/dao',
        name: 'Dao',
        component: () => import('@/views/home/Dao'),
        meta: { title: '董事会', keepAlive: false }
      },
      {
        path: '/provideLiquidity',
        name: 'ProvideLiquidity',
        component: () => import('@/components/provideLiquidity'),
        meta: { title: '质押', keepAlive: false }
      }
    ]
  }
]
