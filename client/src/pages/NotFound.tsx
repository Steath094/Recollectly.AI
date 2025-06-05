import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-all bg-white dark:bg-black text-gray-900 dark:text-white">
      <img
        src="/404.svg"
        alt="Not Found"
        className="max-w-xs sm:max-w-sm lg:max-w-md mb-8"
      />
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
        Lost in space? 🚀
      </h1>
      <p className="text-center text-lg sm:text-xl mb-6 max-w-md">
        The page you’re looking for doesn't exist. Maybe it moved, or maybe you just typed it wrong.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
