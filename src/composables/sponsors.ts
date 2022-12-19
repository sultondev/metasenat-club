import {fetchData} from "@/plugins/axios";

export function useSponsors() {
    function formatDateTime(arg: string) {
        const [year, month, day] = arg.slice(0, 10).split('-').join('-').split('-');
        const res: any = [day, month, year].join(".")
        return res;
    }


    function fetchUserById(id: any) {
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

    return {formatDateTime, statusColor, fetchUserById};
}