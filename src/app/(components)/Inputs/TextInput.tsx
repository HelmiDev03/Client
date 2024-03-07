



const Input = (props: any) => {
    const { placeholder, type, onChange } = props;

    // Check if the input type is 'date'
    const isDateType = type === 'date';
    const label = props.label;

    // Format the placeholder text accordingly
    const formattedPlaceholder = isDateType ? 'YYYY-MM-DD' : placeholder;

    return (
        <div className="relative">
        <label className="absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">{label}</label>
        <input 
            placeholder={formattedPlaceholder} 
          
            type={type} 
            onChange={onChange} 
            className="w-[510px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] xl:p-[16px] mb-2 
                       border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                       border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 
                       transition-colors duration-300 ease-in-out" 
        />
        </div>
    );
}
const Input2 = (props: any) => {
    const { placeholder } = props
    const { type } = props
    const { onChange } = props
   



    return (
        <input placeholder={placeholder} type={type} onChange={onChange} className="w-[90%] h-[56px] p-[16px] md:p-[16px] lg:p-[20px]
                                                                                                                                                                                        xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                                                                                                                                                                                        border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                                                                                                                                                                                        duration-300 ease-in-out" />
    )
        ;

}


const Input3 = (props: any) => {
    const { placeholder } = props
    const { label } = props
    const { type } = props
    const { onChange } = props
   



    return (
        <div className="relative">
            <label className="absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">{label}</label>
            <input
                
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                className="w-[445px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px]
                                                                                                                    xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                                                                                                                    border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                                                                                                                    duration-300 ease-in-out pl-2"
            />
        </div>
    )
        ;

}


const Input4 = (props: any) => {
    const { value, type, name, onChange , isDisabled } = props;

    if (value === undefined) {
        return (
            <input
                disabled = {isDisabled}
                placeholder="not mentioned"
                type={type}
                onChange={onChange}
                className="w-[330px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                                                                                                                                                                                        xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                                                                                                                                                                                        border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                                                                                                                                                                                        duration-300 ease-in-out"
            />
        );
    }
    else{
        return (
            <input
                disabled = {isDisabled}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                className="w-[330px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                                                                                                                                                                                            xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                                                                                                                                                                                            border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                                                                                                                                                                                            duration-300 ease-in-out"
            />
        );
    }

   
};


export default Input;
export { Input2, Input3 , Input4 };

