import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from "./list_kaspersky/components/DataTable";
import SearchBar from "./list_kaspersky/components/SearchBar";

function App() {
  return (
    <div className="App">
        <SearchBar/>
      <DataTable />
    </div>
  );
}

export default App;
