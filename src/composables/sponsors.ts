export function useSponsors() {
    function formatDateTime(arg: string) {
        const [year, month, day] = arg.slice(0, 10).split('-').join('-').split('-');
        const res: any = [day, month, year].join(".")
        return res;
    }

    function numberWithSpaces(x: string | number) {
        if (!isNaN(Number(x))) {
            return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return undefined
    }

    const statusColor = (value: string) => {
        value = value.toLowerCase();
        if (value === 'yangi') return '!text-dodgerblue';
        if (value === 'moderatsiyada') return '!text-gold';
        if (value === 'tasdiqlangan') return '!text-my-green';
        if (value === 'bekor qilingan') return '!text-dark-silver';
        return '';
    }

    return {formatDateTime, numberWithSpaces, statusColor};
}