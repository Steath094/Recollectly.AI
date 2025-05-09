
export default function HeroVideo() {
  return (
    <div className="mt-18 px-24 z-10 py-14 relative aspect-video" role="img">
        <video className="absolute w-[80%] translate-1/2 top-[-22%] left-[-30%] rounded-md" playsInline muted loop autoPlay>
            <source src="Images/video.mp4" />
            Your browser does not support the video tag.
        </video>
        
        <img className="rounded-md w-full h-full" src="Images/videoBG.webp" alt="Video Background Image" />
    </div>
  )
}
