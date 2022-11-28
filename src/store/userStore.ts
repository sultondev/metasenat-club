import {defineStore} from 'pinia'
import router from "@/router";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        authUser() {
            if (localStorage.getItem("isAuthenticated")) {
                console.log(true)
            } else {
                console.log(false)
            }
        },
        changeUserAuth(state: boolean) {
            this.isAuthenticated = state;
        },
        Init() {
            // I  could add some validation to check whether the user has valid token or not
            // It was because of back-end the authorization field didn't work
            // and also lack of time
            // but thanks a lot it was an awesome experience
            if (localStorage.getItem("accessToken")) {
                this.isAuthenticated = true;
            } else {
                this.isAuthenticated = false
            }
        },
        logOut() {
            localStorage.removeItem("accessToken")
            this.isAuthenticated = false
            router.push("/login")
        }
    },
    getters: {
        isLoggedIn: (state) => {
            return state.isAuthenticated;
        }
    }
})