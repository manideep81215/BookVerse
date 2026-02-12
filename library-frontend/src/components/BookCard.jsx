import { motion } from 'framer-motion';
import { BookOpen, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { issueAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onIssue }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleIssue = async () => {
    if (!book.available) {
      toast.error('Book is not available');
      return;
    }

    if (!user?.id) {
      toast.error('Please login again');
      return;
    }

    try {
      await issueAPI.issueBook({ userId: user.id, bookId: book.id });
      toast.success('Book borrowed successfully!');
      if (onIssue) onIssue();
    } catch {
      // Error handled by interceptor
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer hover-glow border border-violet-300/20"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="relative h-48 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-xl mb-4 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <BookOpen className="w-16 h-16 text-white/30 mb-2" />
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              book.available
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {book.available ? 'Available' : 'Borrowed'}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-indigo-950/45 backdrop-blur-sm px-4 py-3">
          <p className="text-indigo-100 text-sm flex items-center mt-1 line-clamp-1">
            <UserIcon className="w-4 h-4 mr-1 shrink-0" />
            {book.author}
          </p>
          <p className="text-indigo-200 text-xs mt-1 line-clamp-1">ISBN: {book.isbn}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-extrabold text-white group-hover:text-violet-200 transition-colors line-clamp-1">
          {book.title}
        </h3>

        {!isAdmin() && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              handleIssue();
            }}
            disabled={!book.available}
            className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
              book.available
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/40'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {book.available ? 'Borrow Book' : 'Not Available'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
