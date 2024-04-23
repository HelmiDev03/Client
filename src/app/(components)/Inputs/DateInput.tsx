const Input4 = (props: any) => {
    const  value  = props.value
    const isDisabled = props.isDisabled;
    const name = props.name;
    
    const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';
    return (
        <input name={name} disabled={isDisabled} value={formattedValue} type='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"/>
    );
}



export default Input4