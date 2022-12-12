import {defineStore} from "pinia";
import {ref} from "vue";

export const useStudentsStore = defineStore('useStudentsStore', () => {
    const loading = ref(true)
    const filterModalOpen = ref(false)
    const detailsModal = ref(false)

    function toggleDetailsModal() {
        detailsModal.value = !detailsModal.value
    }

    const toggleFilterModal = () => {
        filterModalOpen.value = !filterModalOpen.value
    }

    return {
        loading, filterModalOpen, detailsModal, toggleDetailsModal,
        toggleFilterModal,
    }
})