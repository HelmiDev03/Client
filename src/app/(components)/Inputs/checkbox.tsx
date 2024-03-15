import React, { useState } from "react";

interface CheckboxGroupProps {
  options: string[];
  name: string;
  onChange: (selectedOptions: string[]) => void;
  label: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  name,
  onChange,
  label,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div >
      <div style={{ color: "#7152F3" }}>{label}</div>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            name={name}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label htmlFor={`checkbox-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};
