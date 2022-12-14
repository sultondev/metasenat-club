import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router"

const WelcomeView = () => import("@/views/WelcomeView.vue")
const LoginView = () => import("@/views/Auth/LoginView.vue")
const DashboardView = () => import("@/views/DashboardView.vue")
const MainView = () => import("@/views/MainView.vue")
const SponsorsView = () => import("@/views/Sponsors/SponsorsView.vue")
const SponsorDetails = () => import("@/views/Sponsors/SponsorDetails.vue")
const StudentsView = () => import("@/views/Students/StudentsView.vue")
const StudentDetails = () => import("@/views/Students/StudentDetails.vue")
const PageNotFound = () => import("@/views/PageNotFound.vue")
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
                    component: DashboardView,
                    meta: {
                        requiresAuth: true,
                        title: "DashboardMain"
                    },
                },
                {
                    path: "students",
                    component: StudentsView,
                    name: "students-list",
                    meta: {
                        requiresAuth: true
                    },
                }
            ],

            meta: {
                requiresAuth: true
            },
            beforeEnter: guardAuth
        }, {
            path: "/main/sponsors/:id",
            component: SponsorDetails,
            name: "sponsor-details",
            meta: {
                requiresAuth: true
            },
        },
        {
            path: "/main/student/:id",
            component: StudentDetails,
            name: "student-details",
            meta: {
                requiresAuth: true
            },
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
