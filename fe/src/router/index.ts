import { createRouter, createWebHistory } from 'vue-router'
import { PageNames } from '~/config/route'
import { beforeJoinRoom, checkRoomCode } from '~/router/guards'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: PageNames.Home,
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/room/:roomCode/player',
      name: PageNames.PlayerNameScreen,
      component: () => import('../views/Player.vue'),
      beforeEnter: checkRoomCode,
    },
    {
      path: '/room/:roomCode',
      name: PageNames.Room,
      component: () => import('../views/Room.vue'),
      beforeEnter: beforeJoinRoom,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
})

export default router
