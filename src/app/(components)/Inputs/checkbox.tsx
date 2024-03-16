import React, { useState, useEffect } from "react";

interface CheckboxGroupProps {
  options: string[];
  name: string;
  onChange: (selectedOptions: string[]) => void;
  label: string;
  value?: string[];
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  name,
  onChange,
  label,
  value,
}) => {
  // Initialize state
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Update selectedOptions when value prop changes
  useEffect(() => {
    if (value) {
      const updatedOptions = options.filter((option) => value.includes(option));
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [value, options]);

  // Toggle selection of options
  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions); // Call onChange with updated options
  };

  return (
    <div>
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
