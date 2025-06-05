import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Input } from "./Input";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

interface CardType {
  _id: string;
  title: string;
  link: string;
  types: "tweet" | "youtube" | "document" | "blog";
  tags: [{
    _id: string;
    title: string;
  }];
}

interface SearchProps {
  cards: CardType[];
}

export default function Search({ cards }: SearchProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [displayedCards, setDisplayedCards] = useState<CardType[]>(cards);
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const token = useSelector((state: any) => state.auth.token);
  useEffect(() => {
    if (searchResults.length === 0) {
      setDisplayedCards(cards);
    } else {
      const matchingIds = new Set(searchResults.map((s) => s.metadata.id));
      const filtered = cards.filter((card) => matchingIds.has(card._id));
      setDisplayedCards(filtered);
    }
  }, [searchResults, cards]);

  const handleInput = () => {
    const query = searchRef.current?.value || "";

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/search?query=${query}`,{
            headers: {
                Authorization: token,
            },
        });
        
        setSearchResults(res.data.data || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500); // 500ms debounce

    setTypingTimeout(timeout);
  };

  return (
    <div>
      <div className="w-full sm:w-1/2 mb-6">
        <Input
          ref={searchRef}
          type="text"
          placeholder="Search For Docs, Notes, Videos..."
          customClasses="mb-4 rounded-full"
          onChange={handleInput}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        <AnimatePresence>
          {displayedCards.map((card) => (
            <motion.div
              key={card._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                id={card._id}
                title={card.title}
                link={card.link}
                type={card.types}
                tags={card.tags}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
