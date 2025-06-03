import type { ReactElement } from "react";
import { BookmarkIcon } from "../Icons/BookmarkIcon";
import SearchIcon from "../Icons/SearchIcon";
import { BrainIcon } from "../Icons/BrainIcon";
import TagIcon from "../Icons/TagIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { HeroFeatureCard } from "./HeroFeatureCard";

const features: [ReactElement, string, string][] = [
  [
    <BookmarkIcon />,
    "Save Everything in One Place",
    "Effortlessly bookmark tweets, YouTube videos, blog posts, and documents — all neatly stored in your personal digital library.",
  ],
  [
    <SearchIcon />,
    "Smart Search Across Your Knowledge Base",
    "Find anything in seconds. Instantly search through your saved content by keyword, tag, or source.",
  ],
  [
    <BrainIcon />,
    "Ask Your Brain (LLM-Powered Queries)",
    "Need a quick summary or deeper understanding? Ask questions about your saved content and get brief, AI-powered answers.",
  ],
  [
    <TagIcon />,
    "Tag and Filter Like a Pro",
    "Organize with ease. Add multiple tags to each item and filter your feed to stay laser-focused on what matters.",
  ],
  [
    <ShareIcon />,
    "Share Your Feed with the World",
    "Turn your collection into a curated feed and share it with friends, collaborators, or the public — knowledge is meant to be shared.",
  ],
];

export default function HeroFeature() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16 lg:px-24 py-20 bg-white dark:bg-gray-950 transition-colors">
      {features.map(([element, title, description], i) => (
        <HeroFeatureCard
          key={i}
          element={element}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
}
