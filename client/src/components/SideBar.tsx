import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../Icons/BrainIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { TwiiterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Button } from "./Button";
import LogoutIcon from "../Icons/LogoutIcon";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

interface SidebarProps {
  onSelect: (type: "tweet" | "youtube" | "document" | "blog" | "tags") => void;
}

export function Sidebar({ onSelect }: SidebarProps) {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const logoutHandler = () =>{
        localStorage.setItem("token", "");
        localStorage.setItem("status","false");
        dispatch(logout())
        navigate('/')
  }
  return (
    <div className="w-2/9 max-h-screen sticky top-0 left-0 bg-white border-r-2 border-gray-200 p-2">
      <div className="flex gap-2 p-4 cursor-pointer" onClick={()=>navigate('/')}>
        <div className="text-[#5146e3]"><BrainIcon /></div>
        <p className="text-2xl font-bold font-['Segoe UI Variable Display']">Recollectly</p>
      </div>
      <div className="flex flex-col justify-between h-9/10">
        <div className="flex flex-col gap-3 p-4">
        <SidebarItem text="Tweets" ItemIcon={<TwiiterIcon />} onClick={() => onSelect("tweet")} />
        <SidebarItem text="Videos" ItemIcon={<YoutubeIcon />} onClick={() => onSelect("youtube")} />
        <SidebarItem text="Documents" ItemIcon={<DocumentIcon />} onClick={() => onSelect("document")} />
        <SidebarItem text="Links" ItemIcon={<LinkIcon />} onClick={() => onSelect("blog")} />
        {/* <SidebarItem text="Tags" ItemIcon={<HashtagIcon />} onClick={() => onSelect("tags")} /> */}
      </div>
      <div className="flex p-8"><Button text="LogOut" variant="secondary" startIcon={<LogoutIcon/>} className="rounded-md cursor-pointer hover:" onClick={logoutHandler}></Button></div>
      </div>
    </div>
  );
}
