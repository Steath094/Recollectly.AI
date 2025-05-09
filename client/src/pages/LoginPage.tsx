import HeroBackground from "../components/HeroBackground";
import { Input } from "../components/Input"
import Login from "../components/Login";
export default function LoginPage() {
  return (
    <div>
        <HeroBackground childItem={<Login/>}/>
    </div>
  )
}

export function InputBox() {
    return (
        <div className="w-full h-lvh flex justify-center items-center">
            <div className="bg-white px-6 py-24 rounded-2xl outline-1 outline-[#e1e8ff] shadow-md relative flex flex-col overflow-hidden">
                <div className="w-96 h-96 rounded-full bg-[#5146e3] absolute -top-50 -left-18"></div>
                <div className="text-black z-10 fixed">
                    <h1>Welcome Back</h1>
                    <p>Please sign-in to continue!</p>
                </div>
                <div className="z-10 fixed">
                    <Input type="text" placeholder="Username"/>
                </div>
                <div></div>
            </div>
        </div>
    )
}