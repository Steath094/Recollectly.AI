import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CrossIcons } from "../Icons/CrossIcons";
import { useSelector } from "react-redux";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  frontendUrl: string;
}

export function ShareableLinkModal({ isOpen, onClose, frontendUrl }: ShareModalProps) {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.auth.token);

  const generateShareLink = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const hash =await res.data.hash;
      setShareLink(`${frontendUrl}/share/${hash}`);
    } catch (err) {
      console.error("Failed to create share link", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-20 backdrop-blur-sm"
      onClick={handleOutsideClick}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} 
    >
      <div
        className="w-full max-w-sm sm:max-w-md mx-4 rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <CrossIcons className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Share your Second Brain
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Generate a link to share all your saved cards.{" "}
              <span className="text-blue-600 hover:underline cursor-pointer dark:text-blue-400">
                Learn more
              </span>
            </p>
          </div>

          {shareLink ? (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={shareLink}
                  className="flex-1 p-2 px-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareLink)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={generateShareLink}
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {loading ? "Generating..." : "Create Share Link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
