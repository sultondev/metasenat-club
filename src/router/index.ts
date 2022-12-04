import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router"
import WelcomeView from "@/views/WelcomeView.vue"
import LoginView from "@/views/LoginView.vue"
import DashboardView from "@/views/DashboardView.vue"
import MainView from "@/views/MainView.vue"
import SponsorsView from "@/views/Sponsors/SponsorsView.vue"
import StudentsView from "@/views/StudentsView.vue"
import PageNotFound from "@/views/PageNotFound.vue"
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
            beforeEnter: hideForAuth,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
            children: [
                {
                    path: "sponsors",
                    component: SponsorsView,
                    name: "sponsors-list",
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
        },
        {path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound},
    ],
})

function guardAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) {
    const userStore = useUserStore()
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!userStore.isLoggedIn && !localStorage.getItem("accessToken")) {
            next({name: 'Login'})
        } else if (userStore.isLoggedIn) {
            next()
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next()
    }
}

function hideForAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const userStore = useUserStore()
    if (to.path === "/login" && localStorage.getItem("accessToken")) {
        next("/")
    } else {
        next()
    }
}

export default router
