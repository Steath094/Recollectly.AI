import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence
} from "framer-motion";

const benefits = [
  {
    title: "Think less about where — focus on what",
    description:
      "Your thoughts shouldn’t get lost in browser tabs or forgotten tweets. We give them a home where they’re always a search away."
  },
  {
    title: "Every link becomes a lasting resource",
    description:
      "You don’t just save a URL — you turn it into knowledge you can search, tag, and revisit, with context that stays relevant."
  },
  {
    title: "Ask, don’t scroll",
    description:
      "Don’t dig through saved pages. Ask your knowledge base questions directly and get concise answers powered by your content and AI."
  },
  {
    title: "Share your brain with the world",
    description:
      "Build a public feed from your private collection. Whether it’s a reading list, research archive, or inspiration board — share it your way."
  },
  {
    title: "Designed for mental clarity",
    description:
      "Clean design. Smooth interactions. Everything where it should be. Because a clutter-free digital brain helps you think better in the real one."
  }
];

function Card(props: any) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false
  });

  const currentBenefit = benefits[props.index % benefits.length];

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom: any) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    })
  };

  const variantsBackCard = {
    initial: { scale: 0.8, y: 60, opacity: 0 },
    animate: { scale: 0.8, y: 60, opacity: 0.8 }
  };

  function handleDragEnd(_: any, info: any) {
    if (info.offset.x < -100 || info.offset.x > 100) {
      setExitX(info.offset.x < -100 ? -250 : 250);
      props.setIndex(props.index + 1);
    }
  }

  return (
    <motion.div
      className="w-56 md:w-80 lg:w-96 h-64 md:h-72 lg:h-80 absolute top-10 cursor-grab"
      style={{ x, rotate }}
      whileTap={{ cursor: "grabbing" }}
      drag={props.drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      variants={props.frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        props.frontCard
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
    >
      <motion.div
        className="w-full h-full rounded-3xl p-6 flex flex-col justify-center items-center text-center 
          bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 
          shadow-md dark:shadow-lg outline outline-1 outline-gray-200 dark:outline-gray-800"
        style={{ scale }}
      >
        <h3 className="text-xl font-semibold mb-3">{currentBenefit.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {currentBenefit.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Example() {
  const [index, setIndex] = useState(0);
  return (
    <motion.div className="w-full h-[380px] md:h-[420px] lg:h-[450px] relative flex justify-center items-end">
      <AnimatePresence initial={false} mode="wait">
        <Card
          key={`back-${index + 1}`}
          index={index + 1}
          setIndex={setIndex}
          frontCard={false}
        />
        <Card
          key={`front-${index}`}
          index={index}
          setIndex={setIndex}
          frontCard={true}
          drag="x"
        />
      </AnimatePresence>
    </motion.div>
  );
}

export default function HeroBenefits() {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 bg-white dark:bg-gray-950 transition-colors">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-gray-100">
        Built for People Who Think Deeply, Move Fast, and Save Everything
      </h2>
      <Example />
    </div>
  );
}
