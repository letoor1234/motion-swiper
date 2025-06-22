import { create } from "zustand";

interface SwipeStore {
  currentIndex: number;
  tagScores: Record<string, number>;
  nextCard: () => void;
  addTags: (tags: string[], score: number) => void;
  reset: () => void;
}

export const useSwipeStore = create<SwipeStore>((set) => ({
  currentIndex: 0,
  tagScores: {},
  nextCard: () => set((s) => ({ currentIndex: s.currentIndex + 1 })),
  addTags: (tags, score) =>
    set((s) => {
      const newScores = { ...s.tagScores };
      tags.forEach((tag) => {
        newScores[tag] = (newScores[tag] || 0) + score;
      });
      return { tagScores: newScores };
    }),
  reset: () => set({ currentIndex: 0, tagScores: {} }),
}));
