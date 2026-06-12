"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// Unsplash construction site hero
const HERO_BG =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop";

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[90vh] flex items-center clip-diagonal-hero overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, delay: 0.1 }}
        >
          <p className="text-[#B8860B] text-sm uppercase tracking-[0.2em] font-body font-bold mb-4">
            SHAMAL (T) LIMITED
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.9, delay: 0.2 }}
          className="font-display font-black text-display-xl text-white uppercase tracking-wide leading-none mb-6 max-w-3xl"
        >
          Building Infrastructure,
          <br />
          Connecting the Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, delay: 0.35 }}
          className="text-white/80 text-body-lg max-w-2xl mb-10 font-body"
        >
          Premier construction and logistics company in Tanzania — roads, bridges, buildings, and freight.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/projects"
            className="bg-[#C0161C] text-white px-8 py-3 text-sm uppercase tracking-wider font-bold font-body hover:bg-[#8B0F14] transition-colors min-h-[44px] flex items-center"
          >
            View Our Projects
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-8 py-3 text-sm uppercase tracking-wider font-bold font-body hover:bg-white hover:text-[#C0161C] transition-all min-h-[44px] flex items-center"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-white/60" size={32} />
      </motion.div>
    </section>
  );
}
