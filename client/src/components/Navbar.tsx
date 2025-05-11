import React, { useState } from "react";
import { BrainIcon } from "../Icons/BrainIcon";
import { Button } from "./Button";
import MoonIcon from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 10);
    });
    const [dark, setDark] = React.useState(false);
        const darkModeHandler = () => {
            setDark(!dark);
            document.body.classList.toggle("dark");
        }
  return (
    <motion.nav className={`z-20 mt-4 w-1/2 flex justify-between items-center px-4  py-2 rounded-2xl  bg-white fixed ${
        scrolled ? "shadow-md outline-2 outline-[#e0e8ff]"  : ""
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
        <div className=" flex text-3xl gap-2 text-center">
            <BrainIcon/>
            Recollectly
        </div>
        <div className="flex gap-2">
        
            <Button onClick={()=> darkModeHandler()} text="" variant="primary" startIcon={dark==true?<MoonIcon/>:<SunIcon/>} className="text-xl rounded-full cursor-pointer"/>
            <Button onClick={()=>navigate('/login')} text="Login" variant="primary" className="text-xl rounded-full cursor-pointer"/>
            <Button onClick={()=>navigate('/signup')} text='Sign Up' variant="secondary" className="text-xl rounded-full cursor-pointer"/>
        </div>
    </motion.nav>
  )
}
