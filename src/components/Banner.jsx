"use client";

import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";
import { motion } from "motion/react"; // Rebranded package name for Framer Motion

export default function Banner() {
  // Animation configuration for staggered child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each element appearing
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      className="relative h-[90vh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <motion.div 
          className="max-w-3xl rounded-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/90 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
          >
            <FaHeartbeat className="text-base animate-pulse" />
            <span>Donate Blood, Save Lives</span>
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-6xl"
          >
            Your Blood Can Give
            <span className="block text-red-500">
              Someone Another Chance
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-gray-200"
          >
            Become a lifesaver by joining our community of blood donors.
            Search verified donors or register today to help patients
            receive blood when they need it most.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/auth/signup"
                className="block rounded-xl bg-red-600 px-8 py-4 text-center font-semibold text-white transition-colors duration-200 hover:bg-red-700 shadow-md"
              >
                Join as a Donor
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/search"
                className="block rounded-xl border-2 border-white px-8 py-4 text-center font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-red-600 shadow-md"
              >
                Search Donors
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}