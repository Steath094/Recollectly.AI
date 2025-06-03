import type { ReactElement } from "react";

interface BarItemProps {
  text: string;
  ItemIcon: ReactElement;
  onClick: () => void;
}

export function SidebarItem({ text, ItemIcon, onClick }: BarItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 p-2 items-center rounded-md cursor-pointer
                 hover:bg-[#e1e8ff] hover:text-[#5146e3]
                 dark:hover:bg-[#2a2e47] dark:hover:text-[#818cf8]"
    >
      {ItemIcon}
      <span>{text}</span>
    </div>
  );
}
