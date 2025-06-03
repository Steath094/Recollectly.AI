import React, { useState } from "react";
import { BrainIcon } from "../Icons/BrainIcon";
import { Button } from "./Button";
import MoonIcon from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // install lucide-react if needed

export default function Navbar() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const status = useSelector((state: any) => state.auth.status);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] lg:w-1/2 px-4 py-3 rounded-2xl 
        bg-white dark:bg-gray-900 
        ${scrolled ? "shadow-md ring-1 ring-gray-200 dark:ring-gray-700" : ""}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold dark:text-white">
          <BrainIcon />
          Recollectly
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Button
            onClick={darkModeHandler}
            text=""
            variant="primary"
            startIcon={dark ? <MoonIcon /> : <SunIcon />}
            className="text-xl rounded-full cursor-pointer"
          />
          {status === false && (
            <>
              <Button
                onClick={() => navigate("/login")}
                text="Login"
                variant="primary"
                className="text-sm rounded-full cursor-pointer"
              />
              <Button
                onClick={() => navigate("/signup")}
                text="Sign Up"
                variant="secondary"
                className="text-sm rounded-full cursor-pointer"
              />
            </>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 dark:text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-3 items-start">
          <Button
            onClick={darkModeHandler}
            text="Toggle Theme"
            variant="primary"
            startIcon={dark ? <MoonIcon /> : <SunIcon />}
            className="w-full justify-start"
          />
          {status === false && (
            <>
              <Button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                text="Login"
                variant="primary"
                className="w-full justify-start"
              />
              <Button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                text="Sign Up"
                variant="secondary"
                className="w-full justify-start"
              />
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
}
