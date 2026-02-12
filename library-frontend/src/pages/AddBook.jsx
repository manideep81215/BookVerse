import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';
import Navbar from '../components/Navbar';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookAPI.createBook({
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        available: true,
      });

      toast.success('Book added successfully!');
      navigate('/books');
    } catch {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            Add New Book
          </h1>
          <p className="text-indigo-100/90">Expand your library collection</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/80 bg-gradient-to-br from-white via-slate-50 to-indigo-50 shadow-2xl shadow-indigo-900/30 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ISBN *
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter ISBN"
                  required
                />
              </div>

            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Plus className="w-5 h-5" />
                <span>{loading ? 'Adding Book...' : 'Add Book'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/books')}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBook;
