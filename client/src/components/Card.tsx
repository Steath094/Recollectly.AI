import BlogLInkIcon from "../Icons/BlogLInkIcon";
import { CopyIcon } from "../Icons/CopyIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { TwiiterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";

interface cardProp {
  title: string;
  link: string;
  type: "tweet" | "youtube" | "document" | "blog";
}

export function Card({ title, link, type }: cardProp) {
  function getId(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation(); // prevent bubbling to link
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="col-span-1 overflow-hidden min-h-72 rounded-2xl bg-white shadow-2xl p-6 border-gray-200">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="text-gray-600">
            {type === "youtube" && <YoutubeIcon />}
            {type === "document" && <DocumentIcon />}
            {type === "tweet" && <TwiiterIcon />}
            {type === "blog" && <BlogLInkIcon />}
          </div>
          <div className="text-xl font-semibold">{title}</div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600"
            title="Copy link"
          >
            <CopyIcon />
          </button>
          <div className="text-gray-400 cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 aspect-video rounded-md">
        {type === "youtube" && (
          <iframe
            className="w-full h-full rounded-md"
            src={`//www.youtube.com/embed/${getId(link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )}

        {type === "tweet" && (
          <blockquote className="twitter-tweet w-full h-full">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {(type === "document" || type === "blog") && (
          <div
            onClick={() => window.open(link, "_blank")}
            className="cursor-pointer w-full h-64 border-2 border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-center text-gray-600 text-lg font-medium"
          >
            {type === "document" ? (
              <div className="flex items-center gap-2">
                <DocumentIcon />
                <span>Open Document</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <BlogLInkIcon />
                <span>Read Blog</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
