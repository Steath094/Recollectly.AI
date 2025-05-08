import { Button } from "./Button";

export default function HeroLanding() {
  return (
    <div className="w-full h-[80vh] flex items-center px-24 py-4 ">
        <div className="flex-1 flex flex-col gap-7">
            <h1 className="text-6xl leading-17 font-sans font-bold ">Capture the Web. Keep What Matters. Find It Instantly.</h1>
            <p className="text-xl">Save your favorite links, videos, tweets, and thoughts — all in one calm, searchable space built for thinkers who don’t want to lose good ideas.</p>
            <div className="flex gap-2">
                <Button text="Get Started" variant="primary" className="text-xl rounded-2xl"></Button>
                <Button text="Watch Demo" variant="secondary" className="text-xl rounded-2xl"></Button>
            </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
            <img className="drop-shadow-[0_5px_35px] drop-shadow-[#5146e3]" src="Images/landingPage.png" alt="LadningPage Icon" />
        </div>
    </div>
  )
}
