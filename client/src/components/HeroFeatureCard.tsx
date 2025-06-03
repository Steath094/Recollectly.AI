import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import type { ReactElement } from "react";

interface CardProps {
  element: ReactElement;
  title: string;
  description: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

export function HeroFeatureCard({ element, title, description }: CardProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
      className="rounded-3xl outline-1 outline-[#374151] bg-gray-900 shadow-md hover:shadow-lg hover:shadow-indigo-900 transition-shadow duration-300 group"
    >
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="text-4xl text-indigo-400">{element}</div>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
