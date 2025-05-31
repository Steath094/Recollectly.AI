import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Sidebar } from "../components/SideBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSelector } from "react-redux"
import { ShareableLinkModal } from "../components/ShareableLinkModal"
interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "tweet" | "youtube" | "document" | "blog";
  // add others like tags, userId if needed
}
export function Dashboard(){
  const [modalOpen, setModalOpen] = useState(false)
  const [shareableLinkModal, setShareableLinkModal] = useState(false)
  const [selectedType, setSelectedType] = useState<"all" | "tweet" | "youtube" | "document" | "blog" | "tags">("all");
  const token = useSelector((state:any)=>state.auth.token);
  // console.log("Token: ",token);
  
    const [cards, setCards] = useState<CardType[]>([])
    useEffect(() => {
      // console.log(cards);
      
      axios.get(`${BACKEND_URL}/api/v1/content`,{
        headers: {
                "Authorization": token
            }
      }).then((response)=>{
          setCards(response.data.data)
      })
    }, [modalOpen]);
    const filteredCards = selectedType === "all" || selectedType === "tags"
  ? cards
  : cards.filter((card) => card.types === selectedType);

    
    return <div className="flex overflow-auto">
    <Sidebar onSelect={setSelectedType} />
    <div className="p-6 flex flex-col gap-4 bg-[#f9fbfc] w-full h-screen">
    <div className="flex justify-between w-full">
      <p onClick={()=>setSelectedType("all")} className="text-2xl font-bold cursor-pointer">All Notes</p>
      <div className="flex gap-3">
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>} onClick={()=>setShareableLinkModal(true)} className="rounded-xl cursor-pointer" />
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>} onClick={()=>setModalOpen(true)} className="rounded-xl cursor-pointer" />
      </div>
    </div>
    {shareableLinkModal && <ShareableLinkModal isOpen={shareableLinkModal} onClose={() => setShareableLinkModal(false)} frontendUrl="localhost:5173"/>}
    {modalOpen && <CreateContentModal setModalOpen={setModalOpen}/>}
    <div className="grid grid-cols-3 gap-4 py-10">
      {selectedType !== "tags" ? (
        filteredCards.map((card) => (
          
          <Card key={card._id} id={card._id} title={card.title} link={card.link} type={card.types} onDeleteSuccess={(deletedId)=>
            setCards((prev) => prev.filter((c) => c._id !== deletedId))} deleteIcon={true}/>
        ))
      ) : (
        <div className="p-6 text-gray-600 text-lg">
          {/* Replace with tag UI */}
          <p>Tags View Coming Soon...</p>
        </div>
      )}
    </div>

  </div>
  </div>
}