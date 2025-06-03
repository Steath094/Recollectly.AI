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

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("status", "false");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar: visible md and up */}
      <aside className="hidden md:flex flex-col w-60 max-h-screen sticky top-0 left-0 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
        <div
          onClick={() => navigate("/")}
          className="flex gap-2 items-center cursor-pointer mb-8 text-[#5146e3] dark:text-[#818cf8]"
        >
          <BrainIcon />
          <p className="text-2xl font-bold font-['Segoe UI Variable Display']">Recollectly</p>
        </div>

        <div className="flex flex-col gap-3 flex-grow">
          <SidebarItem text="Tweets" ItemIcon={<TwiiterIcon />} onClick={() => onSelect("tweet")} />
          <SidebarItem text="Videos" ItemIcon={<YoutubeIcon />} onClick={() => onSelect("youtube")} />
          <SidebarItem text="Documents" ItemIcon={<DocumentIcon />} onClick={() => onSelect("document")} />
          <SidebarItem text="Links" ItemIcon={<LinkIcon />} onClick={() => onSelect("blog")} />
          {/* <SidebarItem text="Tags" ItemIcon={<HashtagIcon />} onClick={() => onSelect("tags")} /> */}
        </div>

        <div className="pt-8">
          <Button
            text="LogOut"
            variant="secondary"
            startIcon={<LogoutIcon />}
            className="rounded-md cursor-pointer w-full"
            onClick={logoutHandler}
          />
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar: visible below md */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 flex justify-around items-center py-2 shadow-lg md:hidden z-50">
        <button
          aria-label="Tweets"
          onClick={() => onSelect("tweet")}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-[#5146e3] dark:hover:text-[#818cf8]"
          title="Tweets"
        >
          <TwiiterIcon />
          <span className="text-xs mt-1">Tweets</span>
        </button>

        <button
          aria-label="Videos"
          onClick={() => onSelect("youtube")}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-[#5146e3] dark:hover:text-[#818cf8]"
          title="Videos"
        >
          <YoutubeIcon />
          <span className="text-xs mt-1">Videos</span>
        </button>

        <button
          aria-label="Documents"
          onClick={() => onSelect("document")}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-[#5146e3] dark:hover:text-[#818cf8]"
          title="Documents"
        >
          <DocumentIcon />
          <span className="text-xs mt-1">Documents</span>
        </button>

        <button
          aria-label="Links"
          onClick={() => onSelect("blog")}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-[#5146e3] dark:hover:text-[#818cf8]"
          title="Links"
        >
          <LinkIcon />
          <span className="text-xs mt-1">Links</span>
        </button>

        <button
          aria-label="Logout"
          onClick={logoutHandler}
          className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
          title="Logout"
        >
          <LogoutIcon />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </nav>
    </>
  );
}
