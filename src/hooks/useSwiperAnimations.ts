"use client";
import { dislikePoints, likePoints, superLikePoints } from "@/constants/points";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import {
  useAnimation,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SuperLikeEmojis {
  id: number;
  leftPercent: number;
  emoji: string;
  bottomPercent: number;
}
interface UseSwiperAnimationsProps {
  index: number;
  tags: string[];
  onSwiped: () => void;
}

const useSwiperAnimations = ({
  index,
  tags,
  onSwiped,
}: UseSwiperAnimationsProps) => {
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

  const handleLike = async () => {
    addTags(tags, likePoints);
    await animationControls.start({
      x: 600,
      y: -150,
      rotate: -35,
      opacity: 0,
      transition: { duration: 0.4 },
    });
    onSwiped();
  };

  const handleDislike = async () => {
    addTags(tags, dislikePoints);
    await animationControls.start({
      x: -600,
      y: -150,
      rotate: 35,
      opacity: 0,
      transition: { duration: 0.4 },
    });
    onSwiped();
  };

  const handleDragEnd = async (event: any, info: any) => {
    // Limit overtaken to right is Like
    if (info.offset.x > threshold) {
      buttonsExit();
      await handleLike();
    }
    // Overtaken to left is Dislike
    else if (info.offset.x < -threshold) {
      buttonsExit();
      await handleDislike();
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

  const [alreadyClicked, setAlreadyClicked] = useState(false);

  const handleSuperLike = async () => {
    if (alreadyClicked) return;
    setAlreadyClicked(true);
    // Add superlike points
    addTags(tags, superLikePoints);

    // exit buttons
    buttonsExit();

    // Spawn emojis
    const newEmojis = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      // Random position for each emoji
      leftPercent: Math.random() * 80 + 10,
      bottomPercent: Math.random() * 80 + 10,
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

    setAlreadyClicked(false);
  };

  // Button animations
  const dislikeButtonController = useAnimation();
  const likeButtonController = useAnimation();

  // Handle buttons appearance
  useEffect(() => {
    // Init values
    dislikeButtonController.set({
      x: -150,
      opacity: 0,
      scale: 0.9,
    });
    likeButtonController.set({
      x: 150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from bottom
    dislikeButtonController.start({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
        delay: 0.3,
      },
    });
    likeButtonController.start({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
        delay: 0.5,
      },
    });
  }, []);

  const buttonsExit = () => {
    dislikeButtonController.start({
      x: -150,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    });
    likeButtonController.start({
      x: 150,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    });
  };

  const handleClickButton = async (type: "like" | "dislike") => {
    const clickedController =
      type === "like" ? likeButtonController : dislikeButtonController;

    clickedController.start({
      // Shake
      rotate: [0, -5, 10, -5, 10, -2, 2, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    await clickedController.start({
      // Scale up
      scale: 1.1,
      transition: { duration: 0.4 },
    });

    buttonsExit();
    if (type === "like") {
      handleLike();
    } else {
      handleDislike();
    }
  };

  return {
    dragControls,
    animationControls,
    dislikeButtonController,
    likeButtonController,
    superLikeEmojis,
    x,
    y,
    rotate,
    translateY,
    backgroundColor,
    cardRef,
    handleDragEnd,
    handleClickButton,
    handleSuperLike,
  };
};

export default useSwiperAnimations;
