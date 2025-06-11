import React from 'react';
import any = jasmine.any;
import {SorterResult} from "antd/es/table/interface";


interface interfaceFetchGetList {
    page: number;
    new_page: number | undefined;
    sort?: SorterResult<any>[];
    search: string ;
}
interface InterfaceResult {
    data: []
    columns: []
    count: number | undefined
}
const endpoint_url = `http://127.0.0.1:8000/items/gg`
export const fetchData = async (params: interfaceFetchGetList): Promise<InterfaceResult> => {
    const urlParams = new URLSearchParams();

    if (params.page !== undefined) {
        urlParams.append('page', params.page.toString());
    }

    if (params.new_page !== undefined) {
        urlParams.append('new_page', params.new_page.toString());
    }
    if (params.search !== undefined&&params?.search.toString()!=="") {
        urlParams.append('search', encodeURIComponent(params?.search.toString()));
    }

    if (params.sort && params.sort.length > 0) {
        const sortQuery = params.sort
            .map(s => `${s.field}:${s.order}`)
            .join(',');
        urlParams.append('sort', sortQuery);
    }
    const finish_url = `${endpoint_url}?${urlParams.toString()}`;
    const response = await fetch(finish_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },})
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: InterfaceResult = await response.json();
    return result;
}