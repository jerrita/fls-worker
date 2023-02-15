import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index.vue'

const routes = [
    { path: '/:pathMatch(.*)*', component: Index },
]

const defaultRouter = createRouter({
    history: createWebHistory(),
    routes
})

export default defaultRouter