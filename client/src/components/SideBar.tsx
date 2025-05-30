import { BrainIcon } from "../Icons/BrainIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { HashtagIcon } from "../Icons/HashtagIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { TwiiterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  onSelect: (type: "tweet" | "youtube" | "document" | "blog" | "tags") => void;
}

export function Sidebar({ onSelect }: SidebarProps) {
  return (
    <div className="w-2/9 max-h-screen sticky top-0 left-0 bg-white border-r-2 border-gray-200 p-2">
      <div className="flex gap-2 p-4">
        <div className="text-[#5146e3]"><BrainIcon /></div>
        <p className="text-2xl font-bold font-['Segoe UI Variable Display']">Recollectly.AI</p>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <SidebarItem text="Tweets" ItemIcon={<TwiiterIcon />} onClick={() => onSelect("tweet")} />
        <SidebarItem text="Videos" ItemIcon={<YoutubeIcon />} onClick={() => onSelect("youtube")} />
        <SidebarItem text="Documents" ItemIcon={<DocumentIcon />} onClick={() => onSelect("document")} />
        <SidebarItem text="Links" ItemIcon={<LinkIcon />} onClick={() => onSelect("blog")} />
        <SidebarItem text="Tags" ItemIcon={<HashtagIcon />} onClick={() => onSelect("tags")} />
      </div>
    </div>
  );
}
