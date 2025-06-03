import type { ReactElement } from "react";

interface ButtonProps{
    variant: 'primary' | 'secondary';
    text: string,
    startIcon?: ReactElement;
    onClick?: ()=>void;
    className?: string
}
const variantClasses = {
    "primary" : "bg-[#5146e3] text-[#eeeaff] hover:bg-[#665ce6] hover:text-[#eeeaff]",
    "secondary": "bg-[#e1e8ff] text-[#0000a4] hover:bg-[#d1d9f5] hover:text-[#0000a4]"
}
export function Button({variant,text,startIcon,onClick,className}: ButtonProps) {
  return (
    <button type="button" className={`${variantClasses[variant]}  px-4 py-2 flex justify-center items-center gap-2 ${className}`} onClick={onClick}>{startIcon}{text}</button>
  )
}