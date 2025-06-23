"use client";
import Battle from "@/components/Battle";
import Swiper from "@/components/Swiper";
import { usePageStore } from "@/hooks/usePageStore";
import { AnimatePresence, motion } from "framer-motion";
import Result from "./Result";

const HomePage = () => {
  const { currentPage } = usePageStore();
  return (
    <AnimatePresence mode="wait" initial={false}>
      {currentPage === "swiper" ? (
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="page"
        >
          <div className="w-full h-screen flex flex-col gap-2 p-6 overflow-hidden">
            <Swiper />
          </div>
        </motion.main>
      ) : null}
      {currentPage === "battle" ? (
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="page"
        >
          <div className="w-full h-screen flex flex-col gap-2 p-6 overflow-hidden">
            <Battle />
          </div>
        </motion.main>
      ) : null}
      {currentPage === "result" ? (
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="page"
        >
          <div className="w-full h-screen flex flex-col gap-2 p-6 overflow-hidden">
            <Result />
          </div>
        </motion.main>
      ) : null}
    </AnimatePresence>
  );
};

export default HomePage;
