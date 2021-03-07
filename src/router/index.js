import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                component: () => import('@/views/MainContanier')
            },
            {
                path: 'news',
                component: () => import('@/views/news')
            },
            {
                path: 'blogs',
                component: () => import('@/views/Blogs')
            }, {
                path: 'login',
                component: () => import('@/views/signIn')
            }, {
                path: 'register',
                component: () => import('@/views/signUp')
            }, {
                path: 'dailyac',
                component: () => import('@/views/dailyAC')
            }, {
                path: 'personalInfo',
                component: () => import('@/views/personalInfo')
            }, {
                path: 'words',
                component: () => import('@/views/words')
            }, {
                path: 'circle',
                component: () => import('@/views/Blogs')
            }, {
                path: 'news',
                component: () => import('@/views/news')
            }, {
                path: 'books',
                component: () => import('@/views/books')
            }, {
                path: 'upload',
                component: () => import('@/views/RecourseUpload')
            }, {
                path: 'write',
                component: () => import('@/views/write')
            },{
                path: 'newsContent',
                component: () => import('@/views/newsContent')
            }, {
                path: 'blog',
                component: () => import('@/views/Blogs')
            }, {
                path: 'blogContent',
                component: () => import('@/views/BlogContent')
            }, {
                path: 'manage',
                component: () => import('@/views/manage')
            },{
                path: 'newsContent',
                component: () => import('@/views/newsContent')
            }, {
                path: 'newsEdit',
                component: () => import('@/components/news/editNews')
            }, {
                path: 'newsAdd',
                component: () => import('@/components/news/addNews')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
