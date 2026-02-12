import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative max-w-2xl"
    >
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full pl-12 pr-4 py-4 bg-[#1e2538] border border-gray-700 rounded-xl 
        focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none
        transition-all duration-300 text-white placeholder-gray-500"
      />
    </motion.div>
  );
};

export default SearchBar;