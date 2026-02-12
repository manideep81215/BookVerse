import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;