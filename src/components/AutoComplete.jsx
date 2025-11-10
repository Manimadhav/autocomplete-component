import React, { useState } from "react";

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

  const handleInputChange = (e) => {
    const userValue = e.target.value;
    setInputValue(userValue);
    onChange(userValue);
  };

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
    </div>
  );
};

export default AutoComplete;
