import { motion } from "motion/react";
import type { ReactElement } from "react";

interface HeroProp {
  childItem?: ReactElement;
}

export default function HeroBackground({ childItem }: HeroProp) {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      {/* Foreground content */}
      <div className="z-10 w-full px-4 sm:px-6 lg:px-8">{childItem}</div>

      {/* Animated Background Shapes */}
      <>
        {/* Top Left */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-[5%] left-[3%] z-[-10] w-24 h-24 rounded-full bg-gradient-to-br from-[#f2f4fc] to-[#9aa4f4] dark:from-[#2c2f3e] dark:to-[#5f67b7]"
        />

        {/* Top Right */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute top-[8%] right-[4%] z-[-10] w-32 h-20 rounded-full bg-gradient-to-tr from-[#eef1fb] to-[#a6b0f5] dark:from-[#292c3b] dark:to-[#5c66ba]"
        />

        {/* Mid Left */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[35%] left-[15%] z-[-10] w-44 h-44 bg-[#dbe1ef] dark:bg-[#3a3e52] rounded-md"
        />

        {/* Mid Right */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[45%] right-[6%] z-[-10] w-20 h-20 bg-gradient-to-tr from-[#ebecf9] to-[#7e89e6] dark:from-[#31344b] dark:to-[#535cb1] rotate-45 rounded-sm"
        />

        {/* Bottom Left */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-[8%] left-[8%] z-[-10] w-20 h-20 rounded-full bg-gradient-to-b from-[#f5f5ff] to-[#8d94f2] dark:from-[#3c3f58] dark:to-[#5a60b5]"
        />

        {/* Bottom Right */}
        <div className="absolute bottom-[6%] right-[5%] z-[-10] w-36 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />

        {/* Center Floating Oval */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-[-10] w-60 h-24 rounded-full bg-gradient-to-r from-[#f0f3ff] to-[#b2baf6] dark:from-[#35384e] dark:to-[#5f67c0]"
        />

        {/* Center Top Pill */}
        <div className="absolute z-[-10] top-[25%] left-[50%] -translate-x-1/2 w-28 h-8 rounded-full bg-gray-100 dark:bg-gray-600" />

        {/* Far Right Pill */}
        <div className="absolute z-[-10] top-[20%] right-[1%] w-6 h-36 bg-gray-100 dark:bg-gray-600 rounded-full" />

        {/* Far Left Blob */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute z-[-10] top-[60%] left-[2%] w-14 h-14 rounded-full bg-[#d3d8ef] dark:bg-[#4b5070]"
        />

        {/* Rotating Shape */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute z-[-10] top-[65%] left-[65%] w-44 h-44 bg-gradient-to-tl from-[#e8ebf7] to-[#929cf0] dark:from-[#393d57] dark:to-[#5a63b6] rounded-[45%]"
        />
      </>
    </div>
  );
}
