interface inputProps{
    type?: string;
    placeholder: string;
    ref?: any;
    customClasses?: string
}

export function Input({type,placeholder,ref}:inputProps){
    return <input className={`w-full px-4 py-2 focus:border-2  focus:outline-[#5046e4] `} ref={ref} type={type || "text"} placeholder={placeholder} />
}