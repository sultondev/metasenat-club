import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router"
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
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/login",
            name: "Login",
            component: LoginView,
            beforeEnter: guardAuth
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
            children: [
                {
                    path: "sponsors",
                    component: SponsorsView,
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: "dashboard",
                    props: true,
                    component: DashboardView,
                    meta: {
                        requiresAuth: true,
                        title: "DashboardMain"
                    },
                },
                {
                    path: "students",
                    component: StudentsView,
                    meta: {
                        requiresAuth: true
                    },
                }
            ],
            meta: {
                requiresAuth: true
            },
            beforeEnter: guardAuth
        }
    ],
})

function guardAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) {
    const userStore = useUserStore()

    if (to.name !== 'Login' && to.meta.requiresAuth) {
        next("/login")
    } else if (to.name === "WelcomeView") {
        next(to.fullPath)
    } else {
        next()
    }
}


// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//     const userStore = useUserStore()
//     if (to.name !== "Login" && !userStore.isAuthenticated) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         next({name: "Login"})
//     } else {
//         next({path: "/main"})
//     }
// })

export default router
