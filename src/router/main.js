import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index.vue'
import Browser from '../pages/Browser.vue'

const routes = [
    { path: '/preview', name: 'preview', component: Browser },
    { path: '/:pathMatch(.*)*', component: Index },
]

const defaultRouter = createRouter({
    history: createWebHistory(),
    routes
})

export default defaultRouter