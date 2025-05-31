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
  const token = useSelector((state:any)=>state.auth.token);
  const generateShareLink = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
	"share": true
}, {
        headers: {
                "Authorization": token
            },
      });
      
      const hash = res.data.hash;
      setShareLink(`${frontendUrl}/share/${hash}`);
    } catch (err) {
      console.error("Failed to create share link", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-40 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <CrossIcons className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Share your Second Brain
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Generate a link to share all your saved cards.{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Learn more</span>
            </p>
          </div>

          {shareLink ? (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={shareLink}
                  className="flex-1 p-2 px-3 border border-gray-300 rounded-lg text-sm bg-gray-50"
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
                className="w-full mt-4 py-2 text-sm text-blue-600 hover:underline text-center"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={generateShareLink}
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {loading ? "Generating..." : "Create Share Link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}