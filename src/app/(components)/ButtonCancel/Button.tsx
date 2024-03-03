


    export default function ButtonCancel(props: any) {
        const text=props.text
        const fct=props.fct
        return (
          <button className='text-[#16151C]  font-lexend  font-light text-[16px] leading-[24px]' onClick={fct} >{text}
                 
            </button>
        );
      }
    