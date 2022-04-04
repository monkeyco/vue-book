import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from '@/pages/BookIndex.vue'
import BookSearch from '@/pages/BookSearch.vue'
import BookEdit from '@/pages/BookEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex,
    meta: {
        title: '書籍登録一覧'
    }
  },
  {
    path: '/search',
    name: 'BookSearch',
    component: BookSearch,
    meta: {
        title: '書籍検索'
    }
  },
  {
    path: '/edit/:id',
    name: 'BookEdit',
    component: BookEdit,
    meta: {
        title: '書籍詳細'
    }
  },
  {
    // 存在しないURLの場合、TOPにリダイレクト
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
