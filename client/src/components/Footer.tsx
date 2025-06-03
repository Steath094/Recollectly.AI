import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BrainIcon } from "../Icons/BrainIcon";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 px-6 py-6 border-t border-gray-200 dark:border-gray-800 text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium"
        >
          <div className="w-6 h-6 flex items-center">
            <BrainIcon />
          </div>
          <span>Recollectly</span>
        </Link>

        {/* Center: Tagline */}
        <div className="text-center md:text-left text-xs text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} Steath094 — Built for curious minds.
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 items-center text-indigo-600 dark:text-indigo-400">
          <a
            href="https://x.com/steath094"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Steath094"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-dawood-khan-161245232/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
