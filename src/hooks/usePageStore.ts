import { create } from "zustand";

type Page = "swiper" | "battle" | "result";
interface SwipeStore {
  currentPage: Page;
  changePage: (page: Page) => void;
}

export const usePageStore = create<SwipeStore>((set) => ({
  currentPage: "result", // "swiper",
  changePage: (page) =>
    set((s) => {
      return {
        currentPage: page,
      };
    }),
}));
