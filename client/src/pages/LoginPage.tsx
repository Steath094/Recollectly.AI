import HeroBackground from "../components/HeroBackground";
import Login from "../components/Login";
export default function LoginPage() {
  return (
    <div>
        <HeroBackground childItem={<Login/>}/>
    </div>
  )
}