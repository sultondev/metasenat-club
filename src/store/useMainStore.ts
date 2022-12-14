import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('useMainStore', () => {
    const loading = ref(true)
    const filterModalOpen = ref(false)
    const detailsModal = ref(false)
    const detailedApplicationsFilter = ref([])
    const detailedSumsFilter = ref([])

    function toggleDetailsModal() {
        detailsModal.value = !detailsModal.value
    }

    const toggleFilterModal = () => {
        filterModalOpen.value = !filterModalOpen.value
    }

    return {
        loading, filterModalOpen, detailsModal, toggleDetailsModal,
        toggleFilterModal, detailedApplicationsFilter, detailedSumsFilter
    }
})