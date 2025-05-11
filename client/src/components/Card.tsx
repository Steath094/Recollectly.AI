import { CopyIcon } from "../Icons/CopyIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { TwiiterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";

interface cardProp{
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document" | "link"
}
export function Card({title,link,type}: cardProp) {
    function getId(url:string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
    return <div className=" col-span-1 overflow-hidden min-h-72 rounded-2xl bg-[#ffffff] shadow-2xl p-6 border-gray-400">
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
            <div className="text-gray-600">
            {type==="youtube" && <YoutubeIcon/>}
            {type==="document" && <DocumentIcon/>}
            {type==="twitter" && <TwiiterIcon/>}
            </div>
            <div className="text-xl font-semibold">
                {title} 
            </div>
            </div>
           <div className="flex gap-2 items-center">
            <div className="text-gray-400 ">
                <a href={link}>
                    <CopyIcon/>
                </a>
                </div>
                <div className="text-gray-400 cursor-pointer">
                <DeleteIcon/>
                </div>  
           </div>
        </div>
        <div className="pt-4 aspect-video rounded-md">
            {type==="youtube" && <iframe className="w-full h-full rounded-md" src={`//www.youtube.com/embed/${getId(link)}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>}
            {type==="twitter" &&<blockquote className="twitter-tweet w-full h-full">
                <a href={link.replace("x.com","twitter.com")}></a> 
                </blockquote>}
            {type==="document" && 
            <iframe className="aspect-auto h-96 border-2 rounded-md" src={link}></iframe>}
        </div>
        <div>

        </div>
    </div>
}