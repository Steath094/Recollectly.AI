import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
import { Card } from "../components/Card";
interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "tweet" | "youtube" | "document" | "blog";
  // add others like tags, userId if needed
}
function SharePage() {
    const hash = useParams();
    console.log(hash);
    
    const token = useSelector((state:any)=>state.auth.token);
    const [cards, setCards] = useState<CardType[]>([])
    const [userName, setUserName] = useState<string>("")
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/${hash.id}`,{
        headers: {
                "Authorization": token
            }
      }).then((response)=>{
        console.log(response);
        setUserName(response.data.data.userName)
          setCards(response.data.data.content)
      })
    }, []);
  return (
    <div className="p-6 flex flex-col gap-4 bg-[#f9fbfc] w-full h-screen">
        <div className="flex justify-between w-full">
          <p className="text-5xl font-bold cursor-pointer">{userName}'s Knowledge Base</p>
        </div>
        <div className="grid grid-cols-3 gap-4 py-10">
          {cards.length>0 && cards.map((card)=>(
            <Card key={card._id} id={card._id} title={card.title} link={card.link} type={card.types} deleteIcon={false}/>
          ))}
        </div>
    
      </div>
  )
}

export default SharePage