import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const GlobalErrorFallback = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(matchDark.matches);
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    matchDark.addEventListener("change", listener);
    return () => matchDark.removeEventListener("change", listener);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="w-full max-w-md">
        <img src="/404.svg" alt="Error Illustration" className="w-full h-auto mb-8" />
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
          Something broke. 🧯
        </h1>
        <p className="text-center text-base sm:text-lg mb-6 leading-relaxed">
          Either something broke on our side or our deployment partners are having a bad day. Our team is already on it to fix things as soon as possible.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};
