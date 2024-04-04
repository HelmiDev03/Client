import { useState } from "react";

export const SelectInput = (props: any) => {
  const { placeholder, options, onChange, label, isDisabled } = props;

  // Create a new array with the placeholder as the first option followed by the rest of the options
  const updatedOptions = [placeholder, ...options];

  return (
    <div className="relative">
      <select
        onChange={onChange}
        defaultValue={placeholder}
        disabled={isDisabled}

        className=" select-box w-[445px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};
export const SelectInputt = (props: any) => {
  const { placeholder, options, onChange, label, isDisabled } = props;

  // Create a new array with the placeholder as the first option followed by the rest of the options
  const updatedOptions = [placeholder, ...options];

  return (
    <div className="relative">
      <select
        onChange={onChange}
        defaultValue={placeholder}
        disabled={isDisabled}

        className=" select-box w-[300px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};








export const SelectInput2 = (props: any) => {
  const { placeholder, options, isDisabled, name, onChange } = props;

  // Filter out the placeholder value from the options array
  const filteredOptions = options.filter((option: string) => option !== placeholder);

  return (
    <div >
      <select
        onChange={onChange}
        disabled={isDisabled}
        name={name}
        defaultValue={placeholder}
        className="w-[330px] h-[56px]  p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                duration-300 ease-in-out"
      >
        {/* Render placeholder option */}
        <option value={placeholder}>
          {placeholder}
        </option>

        {/* Render filtered options */}
        {filteredOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
};
export const SelectInput22 = (props: any) => {
  const { placeholder, options, isDisabled, name, onChange } = props;

  // Filter out the selected value from the options array
  console.log(options)
  console.log(placeholder)
  const filteredOptions = options.filter((option: {label:{firstname : string , lastname:string}}) => option.label !== placeholder);

  return (
    <div>
      <select
        onChange={onChange}
        disabled={isDisabled}
        name={name}
        value={placeholder} // Set value to placeholder
        className="w-[330px] h-[56px]  p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                duration-300 ease-in-out"
      >
        {/* Render placeholder option only if it is not disabled */}
        {!isDisabled && (
          <option value={placeholder}>
            {placeholder}
          </option>
        )}

        {/* Render filtered options */}
        {filteredOptions.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export const SelectInput222 = (props: any) => {
  const { placeholder, options, isDisabled, name, onChange } = props;

  // Filter out the selected value from the options array


  return (
    <div>
      <select
        onChange={onChange}
        disabled={isDisabled}
        name={name}
        value={placeholder} // Set value to placeholder
        className="w-[330px] h-[56px]  p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                duration-300 ease-in-out"
      >
        {/* Render placeholder option only if it is not disabled */}
        {!isDisabled && (
          <option value={placeholder}>
            {placeholder}
          </option>
        )}

        {/* Render filtered options */}
       
      </select>
    </div>
  );
};



export const SelectInput3 = (props: any) => {
  const { placeholder, options, onChange, label, isDisabled, value } = props;

  // Create a new array with the placeholder as the first option followed by the rest of the options
  const updatedOptions = [placeholder, ...options];
  return (
    <div className="relative">
      <select
        onChange={onChange}
        value={value} // Use value instead of defaultValue
        disabled={isDisabled}
        className="select-box w-[150px] h-[36px] p-[16px] md:p-[16px] lg:p-[20px] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};




export const SelectInput5 = (props: any) => {
  const { placeholder, options, onChange, label, isDisabled } = props;

  // Create a new array with the placeholder as the first option followed by the rest of the options
  const updatedOptions = [placeholder, ...options];

  return (
    <div className="relative">
      <select
        onChange={onChange}
        defaultValue={placeholder}
        disabled={isDisabled}

        className=" select-box w-[510px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};



export const SelectInput6 = (props: any) => {
  const { placeholder, options, isDisabled, name, onChange, label } = props;

  // Filter out the placeholder value from the options array
  const filteredOptions = options.filter((option: string) => option !== placeholder);

  return (
    <div className="relative" >
      <select
        onChange={onChange}
        disabled={isDisabled}
        name={name}

        defaultValue={placeholder}
        className="w-[300px] h-[56px]  p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
              xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
              border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
              duration-300 ease-in-out"
      >
        {/* Render placeholder option */}
        <option value={placeholder}>
          {placeholder}
        </option>

        {/* Render filtered options */}
        {filteredOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>

    </div>
  );
};



export const SelectInput7 = (props: any) => {
  const { placeholder, options, isDisabled, name, onChange, label , value } = props;

  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(placeholder);

  // Filter out the placeholder from options
  const filteredOptions = options.filter((option: string) => option !== placeholder);

  return (
    <div className="relative">
      <select
        onChange={(e) => {
          setSelectedValue(e.target.value); // Update the selected value
          onChange(e); // Call the onChange function passed from the parent component
        }}
        disabled={isDisabled}
        name={name}
        value={selectedValue} // Use selectedValue as the value
        className="w-[300px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] font-lexend font-light text-[16px] leading-[24px] text-[#16151C] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {/* Render placeholder option */}
        <option value={placeholder} disabled={true}>
          {placeholder} 
        </option>

        {/* Render filtered options */}
        {filteredOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};


export const SelectInput8 = (props: any) => {
  const { placeholder, options, name, onChange, label, value } = props;

  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(value || placeholder);

  // Move StartMonth to the front of the options array
  const updatedOptions = [value, ...options.filter((option:any) => option !== value)];

  return (
    <div className="relative">
      <select
        onChange={onChange}
       
        name={name}
        value={selectedValue} // Use selectedValue as the value
        className="w-[300px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] font-lexend font-light text-[16px] leading-[24px] text-[#16151C] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {/* Render options */}
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
       
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};

export const SelectInput88 = (props: any) => {
  const { placeholder, options, name, onChange, label, value } = props;

  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(value || placeholder);

  // Move StartMonth to the front of the options array
  const updatedOptions = [value, ...options.filter((option:any) => option !== value)];

  return (
    <div className="relative">
      <select
        onChange={onChange}
       
        name={name}
        value={selectedValue} // Use selectedValue as the value
        className="w-[150px] h-[36px] p-[16px] md:p-[16px] lg:p-[20px] font-lexend font-light text-[16px] leading-[24px] text-[#16151C] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
      >
        {/* Render options */}
        {updatedOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
       
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};

