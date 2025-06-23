import { ToneData } from "@/constants/tones";
import { create } from "zustand";

interface SwipeStore {
  currentIndex: number;
  tagScores: Record<string, number>;
  lastTagScored: {
    tags: string[];
    score: number;
  } | null;
  winner: ToneData | null;
  secondaryTags: string[];
  confidenceScore: number;
  nextCard: () => void;
  prevCard: () => void;
  addTags: (tags: string[], score: number) => void;
  setWinner: ({
    winner,
    secondaryTags,
    confidenceScore,
  }: {
    winner: ToneData;
    secondaryTags: string[];
    confidenceScore: number;
  }) => void;
  reset: () => void;
}

export const useSwipeStore = create<SwipeStore>((set) => ({
  currentIndex: 0,
  tagScores: {},
  lastTagScored: null,
  winner: null,
  secondaryTags: [],
  confidenceScore: 0,
  nextCard: () =>
    set((s) => ({
      currentIndex: s.currentIndex + 1,
    })),

  prevCard: () =>
    set((s) => {
      if (s.currentIndex === 0 || !s.lastTagScored) return s;
      // Revert lastTagScored from tagScores
      const { tags, score } = s.lastTagScored;
      const newScores = { ...s.tagScores };
      tags.forEach((tag) => {
        newScores[tag] = (newScores[tag] || 0) - score;
        if (newScores[tag] <= 0) {
          delete newScores[tag];
        }
      });

      return {
        currentIndex: s.currentIndex - 1,
        tagScores: newScores,
        lastTagScored: null, // Limpia para no revertirlo varias veces
      };
    }),

  addTags: (tags, score) =>
    set((s) => {
      const newScores = { ...s.tagScores };
      tags.forEach((tag) => {
        newScores[tag] = (newScores[tag] || 0) + score;
      });
      return {
        tagScores: newScores,
        lastTagScored: { tags, score }, // Guarda para posible undo
      };
    }),

  setWinner: ({ winner, secondaryTags, confidenceScore }) =>
    set(() => {
      return {
        winner,
        secondaryTags,
        confidenceScore,
      };
    }),

  reset: () =>
    set(() => {
      return {
        currentIndex: 0,
        tagScores: {},
        lastTagScored: null,
        winner: null,
        secondaryTags: [],
        confidenceScore: 0,
      };
    }),
}));
