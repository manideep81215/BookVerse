import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Hash, User as UserIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { bookAPI } from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookAPI.getBookById(id);
        setBook(response.data);
      } catch {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/books')}
          className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to books
        </button>

        {!book ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-white">
            Book not found.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-white/70" />
            </div>

            <div className="p-8 space-y-4">
              <h1 className="text-4xl font-bold text-white">{book.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-indigo-100">
                <div className="inline-flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  {book.author}
                </div>
                <div className="inline-flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  ISBN: {book.isbn}
                </div>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    book.available
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : 'bg-red-500/20 text-red-300 border border-red-400/30'
                  }`}
                >
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
