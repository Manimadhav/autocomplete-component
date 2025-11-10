import React,{useRef} from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {

  const abortRef = useRef(null)

  const fetchSuggestions = async(query) => {
    if(abortRef.current){
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller
    const URL = `https://dummyjson.com/recipes/search?q=${query}`
    try{
      const result = await fetch(URL,{signal:controller.signal})
      if(!result.ok){
        throw new Error('Failed !!')
      }
      const response = await result.json()
      return response.recipes
    }catch(err){
      if(err.name === 'AbortError'){
        return []
      }
      throw err
    }
  }

  return (
    <>
      <AutoComplete
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        fetchSuggestions={fetchSuggestions}
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
