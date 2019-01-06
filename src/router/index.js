import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Profile from '../pages/Profile/Profile'
import Video from '../pages/Video/Video'
import Message from '../pages/Message/Message'
import Find from '../pages/Find/Find'
import Login from '../pages/Login/Login'
import SendWeibo from '../pages/SendWeibo/SendWeibo'
import SetAvatar from '../pages/SetAvatar/SetAvatar'
import ChangePwd from '../pages/ChangePwd/ChangePwd'
import WelCome from '../pages/WelCome/WelCome'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        requireAuth: true,
        isShowFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/video',
      component: Video,
      meta: {
        requireAuth: true,
        isShowFooter: true
      }
    },
    {
      path: '/message',
      component: Message,
      meta: {
        requireAuth: true,
        isShowFooter: true
      }
    },
    {
      path: '/find',
      component: Find,
      meta: {
        requireAuth: true,
        isShowFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/changepwd',
      component: ChangePwd,
      meta: {requireAuth: true}
    },
    {
      path: '/sendweibo',
      component: SendWeibo
    },
    {
      path: '/setavatar',
      component: SetAvatar
    },
    {
      path: '/welcome',
      component: WelCome
    }
  ]
})
