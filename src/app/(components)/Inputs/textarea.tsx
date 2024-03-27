const TextareaInput = (props: any) => {
  return (
    <textarea
      className="w-[300px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] border border-[#7152F3] rounded-lg focus:outline-none  focus:ring-blue-200 focus:border-transparent"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export {TextareaInput}
