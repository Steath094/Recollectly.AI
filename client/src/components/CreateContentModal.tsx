import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { CrossIcons } from "../Icons/CrossIcons";

const ContentType = {
    Youtube : "youtube",
    Twitter : "twitter",
}
export function CreateContentModal ({setModalOpen}: any) {
    const [type, setType] = useState(ContentType.Youtube)
    return <div className="absolute top-0 left-0 w-full h-screen bg-gray-800 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} >
        <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-xl relative z-10 w-full max-w-[20rem] sm:max-w-sm md:max-w-md lg:max-w-md mx-2 sm:mx-4 md:mx-4 lg:mx-4 opacity-100 ">
            <div onClick={()=>setModalOpen(false)}>
                <CrossIcons className="absolute top-3 right-3 size-6 cursor-pointer"/>
            </div>
            <div className="text-center mb-2">Add New Content</div>
            <div className=" flex flex-col gap-4">
                <Input type="text" placeholder="Title (Max 30 Char)" />
                <Input type="text" placeholder="Link" />
                <div className="flex flex-col gap-2">
                    <p>Content Type</p>
                    <div className="flex gap-2 text-xl">
                    {Object.values(ContentType).map((Content)=>(
                        <Button key={Content} text={Content.charAt(0).toUpperCase() + Content.slice(1)} variant={type===Content?"primary": "secondary"}
                        onclick={()=>setType(Content)}
                        className={`px-3 sm:px-4 md:px-4 lg:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 text-sm sm:text-base md:text-base lg:text-base font-medium rounded-md transition-all duration-200 ${
                            type === Content
                              ? "bg-[##5046e4] hover:bg-[#6c63e8]"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          }`}
                        />
                    ))}
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <Button text="Submit" variant="primary" className="w-1/3"/>
                </div>
            </div>
        </div>
    </div>
}