import {makeAutoObservable, runInAction, toJS} from "mobx";
import {TablePaginationConfig} from "antd";
import {fetchData} from "../services/api";
import {SorterResult} from "antd/es/table/interface";

import { debounce } from 'lodash';
export interface ListInterface  {
    id: number;
    name: string;
    version: string;
    created_at: string;
    desc: string;
    country: number;
    count: number;
    parent: number;
}
interface FilterValue {
    text: string;
    value: string;
}

interface Filters {
    [key: string]: FilterValue[] | null;
}

interface SortOrder {
    columnKey?: string;
    order?: "ascend" | "descend" | null;
}
export class ListStore {
    data: ListInterface[] = []
    columns: any = []
    loading = false;
    list_count  :number | undefined= 0
    error: string | null = null;
    sorters: SorterResult<any>[] = [];
    search: string = "";
    pagination : TablePaginationConfig  = {
        current: 1,
        pageSize: 1000,
        total: 0,
        onChange: (page, pageSize) => {
            console.log(page, pageSize)
            console.log(page)
            console.log("6")
            this.pagination.current=page
            this.loadData()
        },
    }
    filters: Filters = {};
    constructor() {
        makeAutoObservable(this);
    }
    setSearch(value: string ) {
        this.search = value
        // this.loadData();
        this.debouncedLoadData();
    }
    private debouncedLoadData = debounce(() => {
        this.loadData();
    }, 300);
    setMultiSort = (sorters: SorterResult<any>[]) => {
        this.sorters = sorters.filter(s => s.field && s.order);
        this.loadData();
    };
    setPagination(pagination: TablePaginationConfig) {

        this.pagination.current =pagination.current || 1
    }
    get getData() {
        return toJS(this.data);
    }
    get getColumns() {
        return toJS(this.columns);
    }
    async loadData(params?:{
        new_page:number;
    }) {
        const sortParams = this.sorters.map(sorter => ({
            field: sorter.field as string,
            order: sorter.order === 'ascend' ? 'asc' : 'desc'
        }));
        this.loading = true;
        this.error = null;
        const {data,columns,count} = await fetchData({page:this.pagination.current ?? 1,new_page:params?.new_page,sort: this.sorters, search:this.search});
        // console.log(data,columns)
        this.data = data
        this.columns = columns
        this.list_count = count
        this.pagination.total = count
    }
}
export const listStore = new ListStore();