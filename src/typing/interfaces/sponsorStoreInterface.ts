import {sponsorsListType} from "@/typing/types/useSponsorStore";

export interface sponsorStoreInterface {
    Init: () => void;
    activePage: number,
    pageSize: number,
    sponsorsList: sponsorsListType[],
    changeActivePage: (value: number) => void;
    sponsorsFilter: any;
    filterSponsorsByName: sponsorsListType[];
    count: number,
    getPaginationCount: any;
}