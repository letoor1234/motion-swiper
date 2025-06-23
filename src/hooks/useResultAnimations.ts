import tones, { ToneData } from "@/constants/tones";
import { usePageStore } from "@/hooks/usePageStore";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { BiEdit, BiLike } from "react-icons/bi";

const useResultAnimations = () => {
  const titleControls = useAnimation();

  // Card animations
  const firstAnimControls = useAnimation();
  const firstDragControls = useDragControls();

  const secondAnimControls = useAnimation();
  const secondDragControls = useDragControls();

  const thirdAnimControls = useAnimation();
  const thirdDragControls = useDragControls();

  // Button animations
  const dislikeButtonController = useAnimation();
  const likeButtonController = useAnimation();

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

    // Init values
    firstAnimControls.set({
      y: -150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from top
    firstAnimControls.start({
      scale: 1.1,
      opacity: 1,
      y: 200,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    });

    // Init values
    secondAnimControls.set({
      y: -150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from top
    secondAnimControls.start({
      opacity: 1,
      scale: 1.05,
      y: 275,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    });

    // Init values
    thirdAnimControls.set({
      y: -150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from top
    thirdAnimControls.start({
      opacity: 1,
      y: 350,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const threshold = 100;
  const handleDragEnd = async (event: any, info: any, index: number) => {
    const control =
      index === 0
        ? firstAnimControls
        : index === 1
        ? secondAnimControls
        : thirdAnimControls;
    const secondControl =
      index === 0
        ? secondAnimControls
        : index === 1
        ? thirdAnimControls
        : firstAnimControls;
    const thirdControl =
      index === 0
        ? thirdAnimControls
        : index === 1
        ? firstAnimControls
        : secondAnimControls;
    // Limit overtaken to right is Like
    if (info.offset.x > threshold || info.offset.x < -threshold) {
      control.start({
        scale: 1,
        opacity: [1, 0, 1],
        x: [600, 600, 0],
        y: [-150, 350, 350],
        transition: { duration: 0.4 },
      });
      secondControl.start({
        scale: 1.1,
        y: 200,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 1,
        },
      });
      thirdControl.start({
        scale: 1.05,
        y: 275,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 1,
        },
      });
      const newIndex = currentIndex >= 2 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
    // Not overtaken backs to start
    else {
      await control.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300 },
      });
    }
  };

  return {
    // Title
    titleControls,

    // Cards
    firstAnimControls,
    firstDragControls,
    secondAnimControls,
    secondDragControls,
    thirdAnimControls,
    thirdDragControls,

    // Buttons
    dislikeButtonController,
    likeButtonController,

    // Swipe state y logic
    currentIndex,
    setCurrentIndex,
    handleDragEnd,
  };
};

export default useResultAnimations;
