"use client";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import SwiperCard from "./SwiperCard";
import tones from "@/constants/tones";

const Swiper = () => {
  const { currentIndex, nextCard } = useSwipeStore();

  if (currentIndex >= tones.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">All done! 🎉</h1>
      </div>
    );
  }

  const current = tones[currentIndex];

  return (
    <main className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-100 px-6 relative">
      <SwiperCard
        key={currentIndex}
        index={currentIndex}
        image={current.image}
        label={current.label}
        labelClassNames={current.labelClassNames}
        tags={current.tags}
        onSwiped={nextCard}
      />
    </main>
  );
};

export default Swiper;
