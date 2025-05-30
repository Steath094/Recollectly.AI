import type { ReactElement } from "react";

interface baritemProps{
    text: string;
    ItemIcon: ReactElement;
    onClick: ()=>void
}
export function SidebarItem({text,ItemIcon,onClick}:baritemProps) {
    return <div onClick={onClick} className="flex gap-2 p-2 items-center rounded-md hover:bg-[#e1e8ff] hover:text-[#5146e3] cursor-pointer">
        {ItemIcon}
        {text}
    </div>
}