"use client";
import {
  motion,
  useAnimation,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import { useEffect, useRef, useState } from "react";
import { dislikePoints, likePoints, superLikePoints } from "@/constants/points";

interface SwiperCardProps {
  index: number;
  image: string;
  label: string;
  labelClassNames: string;
  tags: string[];
  onSwiped: () => void;
}

interface SuperLikeEmojis {
  id: number;
  leftPercent: number;
  emoji: string;
  bottomPercent: number;
}

const SwiperCard = ({
  index,
  image,
  label,
  labelClassNames,
  tags,
  onSwiped,
}: SwiperCardProps) => {
  // Controlers and initial values
  const dragControls = useDragControls();
  const animationControls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-400, 0, 400], [35, 0, -35]);
  const translateY = useTransform(x, [-400, 0, 400], [-150, 0, -150]);
  const backgroundColor = useTransform(
    x,
    [-250, 0, 250],
    ["rgba(255, 0, 0, 0.2)", "rgba(0, 0, 0, 0)", "rgba(0, 255, 0, 0.2)"]
  );
  const cardRef = useRef<HTMLDivElement>(null);

  // Store swip data
  const { addTags } = useSwipeStore();

  // Handle new card appearance
  useEffect(() => {
    // Init values
    animationControls.set({
      y: 150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from bottom
    animationControls.start({
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
  }, [index]);

  // Limit overtaken
  const threshold = 100;
  const handleDragEnd = async (event: any, info: any) => {
    // Limit overtaken to right is Like
    if (info.offset.x > threshold) {
      // Add like points
      addTags(tags, likePoints);
      await animationControls.start({
        x: 600,
        y: -150,
        rotate: -35,
        opacity: 0,
        transition: { duration: 0.4 },
      });
      onSwiped();
    }
    // Overtaken to left is Dislike
    else if (info.offset.x < -threshold) {
      // Add dislike points
      addTags(tags, dislikePoints);
      await animationControls.start({
        x: -600,
        y: -150,
        rotate: 35,
        opacity: 0,
        transition: { duration: 0.4 },
      });
      onSwiped();
    }
    // Not overtaken backs to start
    else {
      await animationControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300 },
      });
    }
  };

  // Easy animated emojis for super like
  const [superLikeEmojis, setSuperLikeEmojis] = useState<SuperLikeEmojis[]>([]);

  const handleSuperLike = async () => {
    // Add superlike points
    addTags(tags, superLikePoints);
    // Spawn emojis
    const newEmojis = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      // Random position for each emoji
      leftPercent: Math.random() * 60 + 20,
      bottomPercent: Math.random() * 60 + 20,
      emoji: "✨",
    }));

    setSuperLikeEmojis(newEmojis);

    // Card out animation
    animationControls.start({
      // Shake
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      rotate: [0, -5, 10, -5, 10, -2, 2, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    await animationControls.start({
      // Scale up
      scale: 1.1,
      transition: { duration: 0.2 },
    });
    await animationControls.start({
      // Fade to top
      y: -600,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6, delay: 0.5 },
    });

    // Clear emojis
    setTimeout(() => {
      setSuperLikeEmojis([]);
    }, 1000);

    // Handle next card
    onSwiped();
  };

  return (
    <>
      {/**Card */}
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-md h-[500px] bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-lg cursor-grab active:cursor-grabbing"
        drag="x"
        dragControls={dragControls}
        animate={animationControls}
        whileDrag={{
          scale: 0.9,
        }}
        style={{
          x,
          y,
          rotate,
          translateY,
        }}
        initial={{ scale: 1, opacity: 1 }}
        onDragEnd={handleDragEnd}
        onDoubleClick={handleSuperLike}
      >
        {/**Card data */}
        <img src={image} alt={label} className="w-full h-full object-cover" />
        <div
          className={`absolute bottom-0 w-full bg-opacity-50 p-4 text-center text-xl ${labelClassNames}`}
        >
          {label}
        </div>
        {/**Color cover */}
        <motion.div
          className={"absolute top-0 left-0 w-full h-full bg-red-500"}
          style={{
            backgroundColor,
          }}
        />
      </motion.div>
      {/**Emojis animation */}
      {superLikeEmojis.map(({ id, leftPercent, bottomPercent, emoji }) => (
        <motion.div
          key={id}
          className="absolute text-3xl"
          style={{
            left: `${leftPercent}%`,
            bottom: `${bottomPercent}%`,
          }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{
            y: -200,
            opacity: 0,
            scale: 1.5,
            rotate: 360,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </>
  );
};

export default SwiperCard;
