import { Button } from "./Button";
import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HeroLanding() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);
  const status = useSelector((state: any) => state.auth.status);

  const getStartedHandler = () => {
    if (status) {
      navigate("/dashboard");
    } else navigate("/signup");
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const { chars } = splitText(containerRef.current.querySelector(".h1")!);

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const timeSinceLastEvent = (now - prevEvent.current) / 1000;
      prevEvent.current = now;
      velocityX.set(event.movementX / timeSinceLastEvent);
      velocityY.set(event.movementY / timeSinceLastEvent);
    };

    document.addEventListener("pointermove", handlePointerMove);

    hover(chars, (element) => {
      const speed = Math.sqrt(
        velocityX.get() ** 2 + velocityY.get() ** 2
      );
      const angle = Math.atan2(velocityY.get(), velocityX.get());
      const distance = speed * 0.1;

      animate(
        element,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        { type: "spring", stiffness: 100, damping: 50 }
      );
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <section className="w-full py-12 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[80vh]">
      <div className="flex flex-col gap-7 flex-1" ref={containerRef}>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans leading-tight">
          Capture the Web. Keep What Matters. Find It Instantly.
        </h1>
        <Stylesheet />
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 h1">
          Save your favorite links, videos, tweets, and thoughts — all in one calm,
          searchable space built for thinkers who don’t want to lose good ideas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={getStartedHandler}
            text="Get Started"
            variant="primary"
            className="text-lg sm:text-xl rounded-2xl cursor-pointer"
          />
          <AnchorLink href="#video">
            <Button
              text="Watch Demo"
              variant="secondary"
              className="text-lg sm:text-xl rounded-2xl cursor-pointer"
            />
          </AnchorLink>
        </div>
      </div>
      <div className="flex-1 w-1/2 justify-center items-center hidden lg:flex">
        <img
            src="Images/landingPage.png"
            alt="LandingPage Icon"
            className=" drop-shadow-[0_5px_35px] drop-shadow-[#5146e3]"
        />
        </div>

    </section>
  );
}

function Stylesheet() {
  return (
    <style>{`
      .split-char {
        will-change: transform, opacity;
      }
    `}</style>
  );
}
