"use client";
import { ToneData } from "@/constants/tones";
import useSwiperAnimations from "@/hooks/useSwiperAnimations";
import { AnimatePresence, motion } from "framer-motion";
import { BiDislike } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { Button } from "./ui/button";

interface SwiperCardProps {
  index: number;
  tone: ToneData;
  onSwiped: () => void;
}

const SwiperCard = ({ index, onSwiped, tone }: SwiperCardProps) => {
  const { tags, labelClassNames, cardClassNames, label, image } = tone;
  const {
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
  } = useSwiperAnimations({ index, tags, onSwiped });

  return (
    <>
      {/**Card */}
      <motion.div
        ref={cardRef}
        className={`relative w-full max-w-md h-full pt-12 px-4 pb-4 rounded-xl overflow-hidden shadow-lg cursor-grab active:cursor-grabbing ${cardClassNames}`}
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
        <div
          className={`absolute top-0 left-0 right-0 w-full bg-opacity-50 p-4 text-center text-xl ${labelClassNames}`}
        >
          {label}
        </div>
        <div className="rounded-xl overflow-hidden w-full h-full">
          <div className="bg-red-200 w-full h-full">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>

        {/**Color cover */}
        <motion.div
          className={"absolute top-0 left-0 w-full h-full bg-red-500"}
          style={{
            backgroundColor,
          }}
        />
      </motion.div>
      {/**Button controls */}
      <div className="w-full flex items-center justify-between">
        <motion.div layout animate={dislikeButtonController}>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleClickButton("dislike")}
          >
            <div className="flex justify-center items-center gap-2 text-lg font-bold">
              <BiDislike />
              Dislike
            </div>
          </Button>
        </motion.div>
        <motion.div layout animate={likeButtonController}>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleClickButton("like")}
          >
            <div className="flex justify-center items-center gap-2 text-lg font-bold">
              <FaCheck />
              Like
            </div>
          </Button>
        </motion.div>
      </div>
      {/**Emojis animation */}
      <AnimatePresence>
        {superLikeEmojis.map(({ id, leftPercent, bottomPercent, emoji }) => (
          <motion.div
            key={id}
            className="absolute text-3xl z-50"
            style={{
              left: `${leftPercent}%`,
              bottom: `${bottomPercent}%`,
            }}
            initial={{ y: 0, opacity: 0, scale: 1, rotate: 0 }}
            animate={{
              y: [50, -200],
              opacity: [1, 0],
              scale: [1.5, 0.5],
              rotate: 360,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default SwiperCard;
