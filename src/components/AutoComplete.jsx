import React, { useState, useEffect } from "react";

const AutoComplete = ({
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  fetchSuggestions = () => {},
  onSelect = () => {},
  placeHolder = "",
  customStyles,
  dataKey,
  customLoading,
  staticData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const userValue = e.target.value;
    setInputValue(userValue);
    onChange(userValue);
  };

  const getSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
    }
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSuggestions(inputValue);
  }, [inputValue]);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        placeholder={placeHolder}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          ...customStyles,
        }}
      />
      {loading && <>{customLoading}</>}
      {error && <div>{error}</div>}
      <div
        style={{
          margin: "0",
          padding: "10px",
          maxHeight: "200px",
          overflowY: "scroll",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px",
          borderTop: "none",
        }}
      >
        {suggestions &&
          suggestions.map((suggestion) => {
            let currentSuggestion;
            if (dataKey) {
              currentSuggestion = suggestion[dataKey];
            } else if (typeof suggestion === "object") {
              currentSuggestion =
                suggestion.name || suggestion.id || JSON.stringify(suggestion);
            } else {
              currentSuggestion = suggestion;
            }
            return (
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  width: "100%",
                  borderTop: "none",
                }}
                key={currentSuggestion}
              >
                {currentSuggestion}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AutoComplete;
