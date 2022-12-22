import {fetchData} from "@/plugins/axios";

export function useSponsors() {
    function formatDateTime(arg: string) {
        const date = new Date(arg)
        return [date.getDate(), date.getMonth(), date.getFullYear()].join(".")
    }


    function fetchSponsorById(id: any) {
        return fetchData(`/sponsor-detail/${id}/`)
    }


    const statusColor = (value: string) => {
        value = value.toLowerCase();
        if (value === 'yangi') return '!text-dodgerblue';
        if (value === 'moderatsiyada') return '!text-gold';
        if (value === 'tasdiqlangan') return '!text-my-green';
        if (value === 'bekor qilingan') return '!text-dark-silver';
        return '';
    }

    return {formatDateTime, statusColor, fetchSponsorById};
}