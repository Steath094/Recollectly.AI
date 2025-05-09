import { Button } from "./Button";
import { animate, hover } from "motion"
import { splitText } from "motion-plus"
import { useMotionValue } from "motion/react"
import { useEffect, useRef } from "react"
export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
    const velocityX = useMotionValue(0)
    const velocityY = useMotionValue(0)
    const prevEvent = useRef(0)
    useEffect(() => {
        if (!containerRef.current) return

        const { chars } = splitText(containerRef.current.querySelector(".h1")!)

        const handlePointerMove = (event: PointerEvent) => {
            const now = performance.now()
            const timeSinceLastEvent = (now - prevEvent.current) / 1000 // seconds
            prevEvent.current = now
            velocityX.set(event.movementX / timeSinceLastEvent)
            velocityY.set(event.movementY / timeSinceLastEvent)
        }

        document.addEventListener("pointermove", handlePointerMove)

        hover(chars, (element) => {
            // Calculate the speed of the pointer movement
            // and use that to calculate the distance the character should move
            const speed = Math.sqrt(
                velocityX.get() * velocityX.get() +
                    velocityY.get() * velocityY.get()
            )
            const angle = Math.atan2(velocityY.get(), velocityX.get())
            const distance = speed * 0.1

            animate(
                element,
                {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                },
                { type: "spring", stiffness: 100, damping: 50 }
            )
        })

        return () => {
            document.removeEventListener("pointermove", handlePointerMove)
        }
    }, [])
  return (
    <div className="w-full h-[600px] flex items-center px-24 py-4 ">
        <div className="flex-1 flex flex-col gap-7" ref={containerRef}>
            <h1 className="text-6xl leading-17 font-sans font-bold " >Capture the Web. Keep What Matters. Find It Instantly.</h1>
            <Stylesheet />
            <p className="text-xl h1" >Save your favorite links, videos, tweets, and thoughts — all in one calm, searchable space built for thinkers who don’t want to lose good ideas.</p>
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
"use client"
function Stylesheet() {
    return (
        <style>{`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                max-width: 420px;
                text-align: left;
                color: #0f1115;
            }

            .split-char {
                will-change: transform, opacity;
            }
        `}</style>
    )
}

