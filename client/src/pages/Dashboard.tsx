import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { Sidebar } from "../components/SideBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
import { ShareableLinkModal } from "../components/ShareableLinkModal";
import Search from "../components/Search";
import ChatAI from "../components/ChatAI";
import { CardSkeleton } from "../components/CardSkeleton";

interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "tweet" | "youtube" | "document" | "blog";
  tags: [{
    _id:string,
    title:string
  }]
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareableLinkModal, setShareableLinkModal] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "tweet" | "youtube" | "document" | "blog" | "tags" |"search"|"gemini">("all");
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.auth.token);

  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
  setLoading(true); // ← start loading
  axios.get(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      setCards(response.data.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false)); // ← done
}, [modalOpen]);


  const filteredCards =
    selectedType === "all" || selectedType === "tags" || selectedType ==='search' || selectedType ==='gemini'
      ? cards
      : cards.filter((card) => card.types === selectedType);  
  return (
    <div className="flex min-h-screen bg-[#f9fbfc] dark:bg-zinc-900 text-gray-900 dark:text-white overflow-hidden">
      <Sidebar onSelect={setSelectedType} />

      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p
            onClick={() => setSelectedType("all")}
            className="text-2xl font-bold cursor-pointer"
          >
            All Notes
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
              onClick={() => setShareableLinkModal(true)}
              className="rounded-xl"
            />
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => setModalOpen(true)}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Modals */}
        {shareableLinkModal && (
          <ShareableLinkModal
            isOpen={shareableLinkModal}
            onClose={() => setShareableLinkModal(false)}
            frontendUrl="localhost:5173"
          />
        )}
        {modalOpen && <CreateContentModal setModalOpen={setModalOpen} />}

        {/* Cards */}
        {selectedType=='search' && <Search cards={cards}/>}
        {selectedType=='gemini' && <ChatAI />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {selectedType !== "tags" && selectedType !== "search" && selectedType !== "gemini" ? (
            loading ? (
              Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            ) : filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <Card
                  key={card._id}
                  id={card._id}
                  title={card.title}
                  link={card.link}
                  type={card.types}
                  tags={card.tags}
                  onDeleteSuccess={(deletedId) =>
                    setCards((prev) => prev.filter((c) => c._id !== deletedId))
                  }
                  deleteIcon={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
                No {selectedType === "all" ? "content" : selectedType} available.
              </div>
            )
          ) : (
            selectedType === "tags" && (
              <div className="p-6 text-gray-600 dark:text-gray-400 text-lg">
                <p>Tags View Coming Soon...</p>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
