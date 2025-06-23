"use client";
import tones from "@/constants/tones";
import { usePageStore } from "@/hooks/usePageStore";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SwiperCard from "./SwiperCard";

const Swiper = () => {
  const { currentIndex, nextCard, reset } = useSwipeStore();
  const { changePage } = usePageStore();
  const titleControls = useAnimation();

  // First render animate
  useEffect(() => {
    // Init values
    titleControls.set({
      y: -150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from bottom
    titleControls.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    });
  }, []);

  useEffect(() => {
    if (currentIndex >= tones.length) {
      changePage("battle");
    }
  }, [currentIndex, tones]);

  const current = tones[currentIndex];

  return (
    <>
      <motion.div
        animate={titleControls}
        className="flex items-center justify-between"
      >
        <button
          className="border-none flex items-center justify-center font-bold text-lg gap-2"
          onClick={reset}
        >
          <FaArrowLeft size={16} />
          Select your tone
        </button>
        <div className="font-semibold text-sm">
          {currentIndex + 1}/{tones.length}
        </div>
      </motion.div>

      <section className="h-full w-full flex flex-col gap-4 items-center justify-center relative">
        {current != null ? (
          <SwiperCard
            key={currentIndex}
            index={currentIndex}
            onSwiped={nextCard}
            tone={current}
          />
        ) : null}
      </section>
    </>
  );
};

export default Swiper;
