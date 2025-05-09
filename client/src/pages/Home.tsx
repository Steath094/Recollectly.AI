import Footer from "../components/Footer"
import HeroBackground from "../components/HeroBackground"
import HeroBenefits from "../components/HeroBenefits"
import HeroFeature from "../components/HeroFeature"
import HeroLanding from "../components/HeroLanding"
import HeroVideo from "../components/HeroVideo"
import Navbar from "../components/Navbar"


function Home() {
    
  return (
    <div className="">
        <div className="flex justify-center">
        <Navbar/>
        </div>
        <HeroBackground childItem ={<HeroLanding/>} />
        <HeroVideo/>
        <HeroFeature/>
        <HeroBenefits/>
        <Footer/>
    </div>
  )
}

export default Home