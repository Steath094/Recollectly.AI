export default function HeroVideo() {
  return (
    <section id="video" className="lg:mt-18 lg:px-24 z-10 lg:py-14 relative aspect-video" role="img">
        <video className="absolute lg:w-[80%] w-full lg:translate-1/2 top-[-22%] left-[-30%] rounded-md" playsInline muted loop autoPlay>
            <source src="Images/video.mp4" />
            Your browser does not support the video tag.
        </video>
        
        <img className="rounded-md w-full h-full" src="Images/videoBG.webp" alt="Video Background Image" />
    </section>
  )
}