import React, {useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import {Table, TablePaginationConfig} from "antd";
import {fetchData} from "../../services/api";
import {listStore, ListStore} from "../../store/ListStore";


const DataTable: React.FC = observer(() => {
    useEffect(() => {
        listStore.loadData();
    }, []);
    const handlePageChange = (pagination: TablePaginationConfig,filters: any, sorter: any | any[]) => {
        if (Array.isArray(sorter)) {
            listStore.setMultiSort(sorter);
        } else {
            // Если сортировка одиночная, преобразуем в массив с одним элементом
            listStore.setMultiSort(sorter.field ? [sorter] : []);
        }
        listStore.setPagination(pagination);
    };
    return <div>
        <Table
            columns={listStore.getColumns}
            dataSource={listStore.getData}
            rowKey="id"
            pagination={listStore.pagination}
            onChange={handlePageChange}
            scroll={{ y: 600 }}
            bordered
            size="middle"
            virtual
        />
    </div>
})

export default DataTable