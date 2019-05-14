export default {
  path: '/About',
  name: 'About',
  component: () => import('../../pages/About/About.vue'),
  meta: {
    auth: true,
    title: '关于'
  }
}
