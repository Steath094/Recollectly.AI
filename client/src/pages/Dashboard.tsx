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
interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "twitter" | "youtube" | "document" | "link";
  // add others like tags, userId if needed
}
export function Dashboard(){
  const [modalOpen, setModalOpen] = useState(false)
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
    return <div className="flex">
    <Sidebar/>
    <div className="p-6 flex flex-col gap-4 bg-[#f9fbfc] w-full h-screen">
    <div className="flex justify-between w-full">
      <p className="text-2xl font-bold">All Notes</p>
      <div className="flex gap-3">
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>} />
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>} onClick={()=>setModalOpen(true)} />
      </div>
    </div>
    {modalOpen && <CreateContentModal setModalOpen={setModalOpen}/>}
    <div className="grid grid-cols-3 gap-4">
      {cards.length>0 && cards.map((card)=>(
        <Card key={card._id} title={card.title} link={card.link} type={card.types}/>
      ))}
    </div>
  </div>
  </div>
}