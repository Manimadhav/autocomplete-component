import React from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  return (
    <>
      <AutoComplete
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        fetchSuggestions={() => {}}
        onSelect={() => {}}
        placeHolder={"Type to search ..."}
        customStyles={null}
        dataKey={null}
        customLoading={<>Loading ..</>}
        staticData={null}
      />
    </>
  );
}

export default App;
