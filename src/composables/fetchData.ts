import {ref, onMounted, onUnmounted, inject} from 'vue'
//
//
// // by convention, composable function names start with "use"
// export function useFetch(url: string) {
//     const axios: any = inject('axios')
//     // state encapsulated and managed by the composable
//
//
//     // a composable can update its managed state over time.
//     async function fetchData() {
//         const response = await axios.get(url)
//         if(response) {
//
//         }
//     }
//
//     // a composable can also hook into its owner component's
//     // lifecycle to setup and teardown side effects.
//     onMounted(() => {
//
//     })
//     onUnmounted(() => window.removeEventListener('mousemove', update))
//
//     // expose managed state as return value
//     return { x, y }
// }