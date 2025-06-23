import tones, { ToneData } from "@/constants/tones";
import { usePageStore } from "@/hooks/usePageStore";
import useResultAnimations from "@/hooks/useResultAnimations";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { BiEdit, BiLike } from "react-icons/bi";
import { FaCrown } from "react-icons/fa";
import { Button } from "./ui/button";

const Result = () => {
  const { winner, secondaryTags, reset } = useSwipeStore();
  const { changePage } = usePageStore();

  const {
    currentIndex,
    titleControls,
    firstAnimControls,
    firstDragControls,
    crownControls,
    secondAnimControls,
    secondDragControls,
    thirdAnimControls,
    thirdDragControls,
    dislikeButtonController,
    likeButtonController,
    handleDragEnd,
  } = useResultAnimations();

  useEffect(() => {
    if (winner == null || secondaryTags.length === 0) {
      reset();
      changePage("swiper");
    }
  }, [winner]);

  const secondaryTagsTones = useMemo(() => {
    const selected: ToneData[] = [];
    for (const tag of secondaryTags) {
      const tone = tones.find((t) => t.label.includes(tag));
      if (tone && !selected.includes(tone)) {
        selected.push(tone);
      }
      if (selected.length >= 6) break;
    }
    return selected;
  }, [secondaryTags]);

  const allTones = useMemo(() => {
    if (winner != null && secondaryTagsTones.length) {
      return [winner, ...secondaryTagsTones];
    }
    return [];
  }, [winner, secondaryTagsTones]);

  const handleReset = () => {
    reset();
    changePage("swiper");
  };

  const handleSendResult = () => {
    console.log("Result here!");
    console.log(winner);
  };

  if (winner == null || allTones.length === 0) return;

  return (
    <section className="h-full w-full flex flex-col gap-4 items-center justify-between relative">
      <motion.div
        animate={titleControls}
        className="flex flex-col items-center justify-center"
      >
        <div className="font-bold text-3xl">King of the Hill</div>
        <div className="font-semibold text-md">Your top vibe</div>
      </motion.div>
      {allTones.map((tone, i) => {
        const secondIndex = (currentIndex + 1) % 3;

        return (
          <motion.div
            key={`winner-list-${i}`}
            drag={i === currentIndex ? "x" : false}
            dragControls={
              i === 0
                ? firstDragControls
                : i === 1
                ? secondDragControls
                : thirdDragControls
            }
            animate={
              i === 0
                ? firstAnimControls
                : i === 1
                ? secondAnimControls
                : thirdAnimControls
            }
            onDragEnd={(event, info) => handleDragEnd(event, info, i)}
            className={`absolute ${
              currentIndex === i ? "z-40" : secondIndex === i ? "z-30" : "z-20"
            } w-full max-w-md h-[40vh] md:h-[60vh] pb-12 px-4 pt-4 rounded-xl shadow-lg cursor-pointer ${
              tone.cardClassNames
            }`}
            initial={{ y: 200, scale: 1, opacity: 0 }}
          >
            {tone.label === winner.label ? (
              <motion.div
                animate={crownControls}
                className="absolute top-[-4.5em] left-[50%] translate-x-[-50%]"
              >
                <FaCrown className="w-24 h-24 text-yellow-500" />
              </motion.div>
            ) : null}
            {/**Card data */}
            <div className="rounded-xl overflow-hidden w-full h-full">
              <div className="bg-red-200 w-full h-full">
                <img
                  src={tone.image}
                  alt={tone.label}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 w-full rounded-xl bg-opacity-50 p-4 text-center text-xl ${tone.labelClassNames}`}
            >
              {tone.label}
              {i === currentIndex ? (
                <p className="mt-2 text-md font-thin">Swipe to compare</p>
              ) : null}
            </div>
          </motion.div>
        );
      })}
      {/**Button controls */}
      <div className="w-full flex items-center justify-between z-50">
        <motion.div layout animate={dislikeButtonController}>
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            className=" border border-gray-500"
          >
            <div className="flex justify-center items-center gap-2 text-md">
              <BiEdit />
              Not Quite
            </div>
          </Button>
        </motion.div>
        <motion.div layout animate={likeButtonController}>
          <Button variant="default" size="lg" onClick={handleSendResult}>
            <div className="flex justify-center items-center gap-2 text-md">
              <BiLike />
              Feels Right
            </div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Result;
