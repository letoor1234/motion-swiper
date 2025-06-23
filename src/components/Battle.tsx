"use client";
import tones, { ToneData } from "@/constants/tones";
import { usePageStore } from "@/hooks/usePageStore";
import { useSwipeStore } from "@/hooks/useSwipeStore";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import BattleCardsPair from "./BattleCardsPair";
import { Button } from "./ui/button";

const Battle = () => {
  // Get scores from store
  const { tagScores, setWinner, reset } = useSwipeStore();
  const { changePage } = usePageStore();

  useEffect(() => {
    if (tagScores.length === 0) {
      reset();
      return changePage("swiper");
    }
  }, [tagScores]);

  // Get 6 final tones from tags
  const topTones: ToneData[] = useMemo(() => {
    // Sort from scores
    const sortedTags = Object.entries(tagScores)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);

    // Find tone from tags
    const selected: ToneData[] = [];
    for (const tag of sortedTags) {
      const tone = tones.find((t) => t.tags.includes(tag));
      if (tone && !selected.includes(tone)) {
        selected.push(tone);
      }
      if (selected.length >= 6) break;
    }
    return selected;
  }, [tagScores]);

  // Calculate confidence score
  const swipeConfidenceScore = useMemo(() => {
    const total = Object.values(tagScores).reduce((a, b) => a + b, 0);
    return total > 0
      ? Math.min(100, Math.round((total / (tones.length * 10)) * 100))
      : 0;
  }, [tagScores]);

  // Battle Flow
  const [battleQueue, setBattleQueue] = useState<ToneData[]>([]);
  const [winnerState, setWinnerState] = useState<ToneData | null>(null);
  const [currentPair, setCurrentPair] = useState<[ToneData, ToneData] | null>(
    null
  );
  const [secondaryChoices, setSecondaryChoices] = useState<ToneData[]>([]);
  const [phase, setPhase] = useState<"battle" | "secondary-tags" | "done">(
    "battle"
  );

  // Pairing: [higher, lower] style for battle queue
  const pairedTones = useMemo(() => {
    const pairs: ToneData[] = [];
    let left = 0;
    let right = topTones.length - 1;

    const sorted = [...topTones]; // asegúrate de que topTones esté ordenado de mayor a menor ya

    while (left < right) {
      pairs.push(sorted[left]);
      pairs.push(sorted[right]);
      left++;
      right--;
    }

    // Si queda uno sin par (impar), lo agrego como final directo
    if (left === right) {
      pairs.push(sorted[left]);
    }

    return pairs;
  }, [topTones]);

  // Start battle with proper pairs
  useEffect(() => {
    if (pairedTones.length >= 2) {
      setBattleQueue([...pairedTones]);
    }
  }, [pairedTones]);

  // Update phases
  useEffect(() => {
    if (phase !== "battle") return;

    if (battleQueue.length === 1) {
      setWinnerState(battleQueue[0]);
      setPhase("secondary-tags");
    } else if (battleQueue.length >= 2) {
      setCurrentPair([battleQueue[0], battleQueue[1]]);
    }
  }, [battleQueue, phase]);

  // Select Winner of phase
  const handleBattlePick = (picked: ToneData) => {
    const remaining = [...battleQueue.slice(2), picked];
    setBattleQueue(remaining);
  };

  // Select
  const toggleSecondary = (tone: ToneData) => {
    if (secondaryChoices.includes(tone)) {
      setSecondaryChoices((prev) => prev.filter((t) => t !== tone));
    } else if (secondaryChoices.length < 2) {
      setSecondaryChoices((prev) => [...prev, tone]);
    }
  };

  const handleFinish = () => {
    if (winnerState == null) return;

    // Store winner and change page
    setWinner({
      winner: winnerState,
      secondaryTags: secondaryChoices.map((t) => t.label),
      confidenceScore: swipeConfidenceScore,
    });
    changePage("result");
  };

  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      {phase === "battle" && currentPair ? (
        <BattleCardsPair
          tonesPair={currentPair}
          handleBattlePick={handleBattlePick}
        />
      ) : null}

      {phase === "secondary-tags" && winnerState ? (
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            className={`relative w-full max-w-md md:w-2xl h-[40vh] md:h-[70vh] pb-12 px-4 pt-4 rounded-xl overflow-hidden shadow-lg cursor-pointer ${winnerState.cardClassNames}`}
            initial={{ scale: 0.8, opacity: 0, y: -200 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              bounce: 0.7,
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            {/**Winner data */}
            <div className="rounded-xl overflow-hidden w-full h-full">
              <div className="bg-red-200 w-full h-full">
                <img
                  src={winnerState.image}
                  alt={winnerState.label}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 w-full bg-opacity-50 p-4 text-center text-xl ${winnerState.labelClassNames}`}
            >
              {winnerState.label}
            </div>
          </motion.div>
          <div className="w-full flex flex-col items-center justify-center gap-2 md:justify-between md:h-full">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <motion.p>Select 2 secondary tones:</motion.p>
              <div className="flex gap-4 flex-wrap justify-center">
                {topTones
                  .filter((t) => t.label !== winnerState.label)
                  .map((tone) => (
                    <button
                      key={tone.label}
                      onClick={() => toggleSecondary(tone)}
                      className={`border px-4 py-2 rounded transition-transform cursor-pointer ${
                        tone.labelClassNames
                      }
                  ${tone.cardClassNames}
                  ${
                    secondaryChoices.includes(tone)
                      ? "border scale-110 shadow-lg"
                      : "opacity-60"
                  }`}
                    >
                      {tone.label}
                    </button>
                  ))}
              </div>
            </div>
            <Button
              disabled={secondaryChoices.length !== 2}
              onClick={handleFinish}
              className="disabled:opacity-50 font-bold"
              size={"lg"}
            >
              Finish
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Battle;
