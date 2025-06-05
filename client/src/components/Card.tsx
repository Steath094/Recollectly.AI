import { useSelector } from "react-redux";
import BlogLInkIcon from "../Icons/BlogLInkIcon";
import { CopyIcon } from "../Icons/CopyIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { TwiiterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

interface cardProp {
  id: string;
  title: string;
  link: string;
  type: "tweet" | "youtube" | "document" | "blog";
  tags?: [{
    _id:string,
    title:string
  }]
  onDeleteSuccess?: (id: string) => void; // optional callback if you want to remove card from parent
  deleteIcon?:boolean;
}

export function Card({ id, title, link, type,tags, onDeleteSuccess, deleteIcon }: cardProp) {
  const token = useSelector((state: any) => state.auth.token);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  function getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(link);
  }

  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: { Authorization: token },
      });
      setDeleteModalOpen(false);
      if (onDeleteSuccess) onDeleteSuccess(id);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  }

  return (
    <div className="col-span-1 overflow-hidden min-h-72 rounded-2xl dark:bg-gray-800 bg-white shadow-xl p-6 border dark:border-gray-700 border-gray-200 transition">
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="dark:bg-gray-900 bg-white rounded-2xl p-6 w-96 shadow-xl border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-center dark:text-white text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-center mt-2 dark:text-gray-300 text-gray-600">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="text-gray-600 dark:text-gray-300">
            {type === "youtube" && <YoutubeIcon />}
            {type === "document" && <DocumentIcon />}
            {type === "tweet" && <TwiiterIcon />}
            {type === "blog" && <BlogLInkIcon />}
          </div>
          <div className="text-xl font-semibold dark:text-white text-gray-900">
            {title}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
            title="Copy link"
          >
            <CopyIcon />
          </button>
          {deleteIcon && (
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              title="Delete"
            >
              <DeleteIcon />
            </button>
          )}
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
            className="cursor-pointer w-full h-64 border-2 border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg font-medium"
          >
            <div className="flex items-center gap-2">
              {type === "document" ? <DocumentIcon /> : <BlogLInkIcon />}
              <span>{type === "document" ? "Open Document" : "Read Blog"}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 pt-4 flex-wrap">
        {tags?.map(tag=>(
          <div key={tag._id} className="px-2 rounded-lg bg-[#e1e8ff] text-[#0000a4] ">{tag.title}</div>
        ))}
      </div>
    </div>
  );
}

