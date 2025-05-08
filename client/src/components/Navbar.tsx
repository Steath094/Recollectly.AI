import React from "react";
import { BrainIcon } from "../Icons/BrainIcon";
import { Button } from "./Button";
import MoonIcon from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
export default function Navbar() {
    const [dark, setDark] = React.useState(false);
    
        const darkModeHandler = () => {
            setDark(!dark);
            document.body.classList.toggle("dark");
        }
  return (
    <div className="w-1/2 flex justify-between items-center px-4  py-2 rounded-2xl  bg-white ">
        <div className=" flex text-3xl gap-2 text-center">
            <BrainIcon/>
            Recollectly
        </div>
        <div className="flex gap-2">
        
            <Button onclick={()=> darkModeHandler()} text="" variant="primary" startIcon={dark==true?<MoonIcon/>:<SunIcon/>} className="text-xl rounded-full"/>
            <Button text="Login" variant="primary" className="text-xl rounded-full"/>
            <Button text='Sign Up' variant="secondary" className="text-xl rounded-full"/>
        </div>
    </div>
  )
}
