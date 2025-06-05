import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { SendHorizonal, User, Bot } from "lucide-react";
import { useSelector } from "react-redux";

export default function ChatAI() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const token = useSelector((state: any) => state.auth.token);
  const handleSubmit = async () => {
    const input = inputRef.current!.value;
    if (!input.trim()) return;

    setUserMessage(input);
    setIsThinking(true);
    setHasSubmitted(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/ai`, {
        query: input,
      },{
        headers: {
            Authorization: token,
        },
      });
      console.log(res);
      
      const content = res.data?.data?.kwargs?.content || "No response from AI.";
      setAiResponse(content);
    } catch (err) {
      setAiResponse("Something went wrong. Try again later.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col items-center py-10 px-4 sm:px-8 md:px-16">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          AI Assistant
        </h1>

        {/* Chat Messages */}
        <div className="flex flex-col gap-6">
          {/* User Message */}
          {userMessage && (
            <div className="flex justify-end items-center gap-4">
              <motion.div
                className="bg-blue-600 text-white px-6 py-4 rounded-2xl max-w-3xl text-lg"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {userMessage}
              </motion.div>
              <div className="mt-1">
                <User className="text-blue-600" />
              </div>
            </div>
          )}

          {/* Thinking Animation */}
          {isThinking && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" />
              </div>
              <span className="text-sm ml-2">Thinking...</span>
            </div>
          )}

          {/* AI Message */}
          {!isThinking && aiResponse && (
            <div className="flex justify-start items-center gap-4">
              <div className="mt-1">
                <Bot className="text-green-600" />
              </div>
              <motion.div
                className="bg-gray-100 text-gray-800 px-6 py-4 rounded-2xl max-w-3xl text-lg"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {aiResponse}
              </motion.div>
            </div>
          )}
        </div>

        {/* Input Box */}
        {!hasSubmitted && (
          <div className="sticky bottom-10 flex items-center w-full gap-4 bg-white mt-10">
            <input
              type="text"
              placeholder="Ask me anything..."
              ref={inputRef}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="flex-grow px-6 py-4 border border-gray-300 rounded-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition"
            >
              <SendHorizonal size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
