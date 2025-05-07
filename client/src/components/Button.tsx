import type { ReactElement } from "react";

interface ButtonProps{
    variant: 'primary' | 'secondary';
    text: string,
    startIcon?: ReactElement;
    onclick?: ()=>void;
    customClasses?: string
}
const variantClasses = {
    "primary" : "bg-[#5146e3] text-[#eeeaff]",
    "secondary": "bg-[#e1e8ff] text-[#0000a4]"
}
export function Button({variant,text,startIcon,onclick,customClasses}: ButtonProps) {
  return (
    <button className={`${variantClasses[variant]} text-2xl font-light px-4 py-2 rounded-md flex justify-center items-center gap-2 ${customClasses}`} onClick={onclick}>{startIcon}{text}</button>
  )
}