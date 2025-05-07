import type { ReactElement } from "react";

interface baritemProps{
    text: string;
    ItemIcon: ReactElement;
}
export function SidebarItem({text,ItemIcon}:baritemProps) {
    return <div className="flex gap-2 p-2 items-center rounded-md hover:bg-[#e1e8ff] hover:text-[#5146e3]">
        {ItemIcon}
        {text}
    </div>
}