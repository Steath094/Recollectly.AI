import { Card } from "../components/Card"
import HeroBackground from "../components/HeroBackground"
import HeroLanding from "../components/HeroLanding"
import Navbar from "../components/Navbar"


function Home() {
    
  return (
    <div className="p-4">
        <div className="flex justify-center">
        <Navbar/>
        </div>
        <HeroBackground childItem ={<HeroLanding/>} />
    </div>
  )
}

export default Home