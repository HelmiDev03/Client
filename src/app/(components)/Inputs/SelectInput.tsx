export const SelectInput = (props: any) => {
    const { placeholder, options, onChange, label ,isDisabled } = props;
  
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
            <option   key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
              {option}
            </option>
          ))}
        </select>
        <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
      </div>
    );
  };






  export const SelectInput2 = (props: any) => {
    const { placeholder, options , isDisabled , name ,onChange } = props;

    // Filter out the placeholder value from the options array
    const filteredOptions = options.filter((option: string) => option !== placeholder);

    return (
        <div >
            <select
                 onChange={onChange}
                 disabled={isDisabled}
                 name = {name}
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

export const SelectInput3 = (props: any) => {
  const { placeholder, options , isDisabled , name ,onChange } = props;

  // Filter out the placeholder value from the options array
  const filteredOptions = options.filter((option: string) => option !== placeholder);

  return (
      <div >
          <select
               onChange={onChange}
               disabled={isDisabled}
               name = {name}
              defaultValue={placeholder}
              className="w-[510px] h-[56px]  p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
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


export const SelectInput5 = (props: any) => {
  const { placeholder, options, onChange, label ,isDisabled } = props;

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
          <option   key={index} value={option} disabled={index === 0} className={index === 0 ? 'text-gray-400 italic' : ''}>
            {option}
          </option>
        ))}
      </select>
      <label className="absolute top-0 left-0 px-2 pt-1 text-[11px] leading-[16px] text-indigo-600 font-light">{label}</label>
    </div>
  );
};



  