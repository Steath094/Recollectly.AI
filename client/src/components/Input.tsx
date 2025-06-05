interface inputProps{
    type?: string;
    placeholder: string;
    ref?: any;
    customClasses?: string
    onChange?: ()=>void
}

export function Input({type,placeholder,ref,customClasses,onChange}:inputProps){
    return <input className={`${customClasses} w-full px-4 py-2 focus:border-2  focus:outline-[#5046e4] border rounded-md `} ref={ref} type={type || "text"} placeholder={placeholder} onChange={onChange}/>
}