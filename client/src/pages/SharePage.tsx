import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
import { Card } from "../components/Card";

interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "tweet" | "youtube" | "document" | "blog";
}

function SharePage() {
  const { id } = useParams();
  const token = useSelector((state: any) => state.auth.token);
  const [cards, setCards] = useState<CardType[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/brain/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserName(response.data.data.userName);
        setCards(response.data.data.content);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          {userName.toUpperCase()}'S KNOWLEDGE BASE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.length==0 && <div className="text-center">No content Available to Share</div>}
          {cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              link={card.link}
              type={card.types}
              deleteIcon={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SharePage;
