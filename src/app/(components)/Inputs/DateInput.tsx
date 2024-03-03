const Input4 = (props: any) => {
    const  value  = props.value
    const isDisabled = props.isDisabled;
    const name = props.name;
    
  
    
    const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';



    return (
        <input  name={name}     disabled = {isDisabled}           value = {formattedValue} type='date' className="w-[330px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px]  font-lexend font-light  text-[16px] leading-[24px] text-[#16151C] 
                                                                                                                                                                                        xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] 
                                                                                                                                                                                        border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors 
                                                                                                                                                                                        duration-300 ease-in-out" />
    )
        ;

}
export default Input4 


