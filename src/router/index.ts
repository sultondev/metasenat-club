import {createRouter, createWebHistory, RouteLocationNormalized} from "vue-router"
import WelcomeView from "@/views/WelcomeView.vue"
import LoginView from "@/views/LoginView.vue"
import DashboardView from "@/views/DashboardView.vue"
import MainView from "@/views/MainView.vue"
import SponsorsView from "@/views/SponsorsView.vue"
import StudentsView from "@/views/StudentsView.vue"
import {useUserStore} from "@/store/userStore";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "WelcomeView",
            component: WelcomeView,
            beforeEnter: guardAuth
        },
        {
            path: "/login",
            name: "Login",
            component: LoginView,
            beforeEnter: guardAuth
        },
        {
            path: "/main",
            name: "Main",
            component: MainView,
            children: [
                {
                    path: "sponsors",
                    component: SponsorsView,
                },
                {
                    path: "dashboard",
                    props: true,
                    component: DashboardView,
                },
                {
                    path: "students",
                    component: StudentsView
                }
            ]
        }
    ],
})

function guardAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) {
    const userStore = useUserStore()

    if (to.name !== 'Login' && !localStorage.getItem('accessToken')) next({name: 'Login'})
    else next({path: '/main/dashboard'})
}

export default router
