"use client"
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mr-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-bounce" />
          <div className="w-6 h-6 bg-gray-300 rounded-full mt-2 animate-bounce" />
        </div>
        <div className="text-white text-lg font-semibold">Cargando...</div>
      </motion.div>
    </div>
  );
};

export default Loading;