"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide preloader after a longer delay to show full animation (8-9s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7700); // 8.5 seconds visibility

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72">
            <Image
              src="/locader-light.gif"
              alt="Preloader"
              fill
              unoptimized // Essential for GIFs in Next.js Image
              priority
              className="object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 text-emerald-900/40"
          >
            খিজিরিয়া চিশতিয়া ভান্ডার
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
