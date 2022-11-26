import {createRouter, createWebHistory, RouteLocationNormalized} from "vue-router"
import WelcomeView from "@/views/WelcomeView.vue"
import LoginView from "@/views/LoginView.vue"
import {useUserStore} from "@/store/userStore";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "WelcomeView",
            component: WelcomeView,
        },
        {
            path: "/login",
            name: "Login",
            component: LoginView,
            // beforeEnter: guardMyRoute
        }
        // {
        //   path: "/about",
        //   name: "about",
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import("../views/AboutView.vue"),
        // },
    ],
})

function guardMyRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) {
    const userStore = useUserStore()

    next()
}

export default router
