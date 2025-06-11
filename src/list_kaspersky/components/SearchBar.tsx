import React, {useState, useEffect, useRef} from "react";
import { Input } from "antd";
import { observer } from 'mobx-react-lite';
import {listStore} from "../../store/ListStore";

const { Search } = Input;

const SearchBar: React.FC = observer(() => {
    const [value, setValue] = useState<string|undefined>(undefined);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timer = setTimeout(() => {
            if (value!== undefined) {
                listStore.setSearch(value);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div style={{ marginBottom: 16 }}>
            <Search
                placeholder="Поиск"
                allowClear
                enterButton="Search"
                size="large"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
});

export default SearchBar;