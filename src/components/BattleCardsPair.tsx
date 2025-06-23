"use client";
import { ToneData } from "@/constants/tones";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface BattleCardsPairProps {
  tonesPair: ToneData[];
  handleBattlePick: (picked: ToneData) => void;
}

const BattleCardsPair = ({
  tonesPair,
  handleBattlePick,
}: BattleCardsPairProps) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const firstToneController = useAnimation();
  const secondToneController = useAnimation();

  // Handle animate selected and not selected
  const handleSelectTone = async (tone: ToneData) => {
    if (selectedLabel) return;

    const index = tonesPair.findIndex((t) => t.label === tone.label);

    const selectedController =
      index === 0 ? firstToneController : secondToneController;
    const notSelectedController =
      index === 1 ? firstToneController : secondToneController;

    // VS label out animation
    vsLabelControls.start({
      x: 150,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        bounce: 0.5,
        duration: 0.1,
      },
    });

    // Card out animation
    notSelectedController.start({
      x: -400,
      opacity: 0,
      transition: { duration: 0.6 },
    });
    selectedController.start({
      // Shake
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      rotate: [0, -5, 10, -5, 10, -2, 2, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    await selectedController.start({
      // Scale up
      scale: 1.1,
      y: index === 0 ? 100 : -100,
      transition: { duration: 0.2 },
    });
    await selectedController.start({
      // Fade to top
      y: -600,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6, delay: 0.7 },
    });

    // Handle next battle
    handleBattlePick(tone);

    // Clear selected tone
    setSelectedLabel(null);
  };

  const vsLabelControls = useAnimation();
  // First render animate
  useEffect(() => {
    // Init values
    vsLabelControls.set({
      x: -150,
      opacity: 0,
      scale: 0.9,
    });
    // Appears from bottom
    vsLabelControls.start({
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        bounce: 0.5,
        duration: 0.1,
      },
    });
  }, [tonesPair]);

  return (
    <AnimatePresence mode="wait">
      <motion.div className="relative flex flex-col w-full gap-2">
        {tonesPair.map((tone, index) => {
          return (
            <motion.div
              key={`battle-card-${tone.label}`}
              className={`relative w-full max-w-md h-[40vh] pb-12 px-4 pt-4 rounded-xl overflow-hidden shadow-lg cursor-pointer ${tone.cardClassNames}`}
              onClick={() => {
                console.log("Clicked");
                setSelectedLabel(tone.label);
                handleSelectTone(tone);
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={index === 0 ? firstToneController : secondToneController}
            >
              {/**Card data */}

              <div className="rounded-xl overflow-hidden w-full h-full">
                <div className="bg-red-200 w-full h-full">
                  <img
                    src={tone.image}
                    alt={tone.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 w-full bg-opacity-50 p-4 text-center text-xl ${tone.labelClassNames}`}
              >
                {tone.label}
              </div>
            </motion.div>
          );
        })}
        <motion.div
          animate={vsLabelControls}
          className="absolute top-50 left-60 translate-y-[50%] uppercase text-2xl font-bold p-4 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center border border-slate-50"
        >
          vs
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BattleCardsPair;
