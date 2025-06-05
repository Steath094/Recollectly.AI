import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { CrossIcons } from "../Icons/CrossIcons";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
import { PlusIcon } from "../Icons/PlusIcon";

const ContentType = {
  Youtube: "youtube",
  Twitter: "tweet",
  Document: "document",
  Blog: "blog",
};

export function CreateContentModal({ setModalOpen }: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const token = useSelector((state: any) => state.auth.token);
  const [tags,setTags] = useState<string[]>([]);
  const [tagIds,setTagIds] = useState<string[]>([]);

  const addTag = async () =>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/tag`,{
      tagTitle: tagRef.current?.value
    },{
      headers: {
        Authorization: token,
      },})
      console.log(response.data);
      
    setTags([...tags as string[],tagRef.current?.value as string])
    tagRef.current!.value='';
    setTagIds([...tagIds ,response.data.data._id])
  }
  console.log(tagIds);
  
  const handleContentSubmit = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    if (!title || !link) return; // Optional: prevent empty submit

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
          tags: tagIds
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setModalOpen(false);
    } catch (error) {
      // Optionally handle error here
      console.error(error);
    }
  };

  // Close modal on clicking outside content box
  const handleOutsideClick = () => setModalOpen(false);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-10 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
       style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} 
    >
      <div
        className="bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-4 sm:mx-6 md:mx-8"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <button
          onClick={() => setModalOpen(false)}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <CrossIcons className="w-6 h-6" />
        </button>
        <h2 className="text-center text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add New Content
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            ref={titleRef}
            type="text"
            placeholder="Title (Max 30 Char)"
            customClasses="dark:bg-gray-800 dark:text-gray-100"
          />
          <Input
            ref={linkRef}
            type="text"
            placeholder="Link"
            customClasses="dark:bg-gray-800 dark:text-gray-100"
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray-800 dark:text-gray-200 font-medium">Content Type</p>
            <div className="flex flex-wrap gap-2 text-base sm:text-lg">
              {Object.values(ContentType).map((content) => (
                <Button
                  key={content}
                  text={content.charAt(0).toUpperCase() + content.slice(1)}
                  variant={type === content ? "primary" : "secondary"}
                  onClick={() => setType(content)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium rounded-md transition-colors duration-200 ${
                    type === content
                      ? "bg-[#5046e4] hover:bg-[#6c63e8] text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-gray-800 dark:text-gray-200 font-medium" htmlFor="tag">Tag</label>
            <div className="flex gap-2 mt-2">
              <Input ref={tagRef} type="text" placeholder="Add a Tag"/>
              <Button onClick={addTag} variant="secondary" text={''} startIcon={<PlusIcon/>}></Button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {tags.map(tag=>(
                <div className="px-2 rounded-lg bg-[#e1e8ff] text-[#0000a4] ">{tag}</div>
              ))}
            </div>
          </div>
          <div  className="flex justify-center mt-6">
            <Button
              onClick={handleContentSubmit}
              text="Submit"
              variant="primary"
              className="w-1/2 sm:w-1/3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
