import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { bookAPI } from '../services/api';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const BookList = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const showAvailableOnly = searchParams.get('filter') === 'available';

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let next = books;

    if (showAvailableOnly) {
      next = next.filter((book) => book.available === true);
    }

    if (searchTerm) {
      next = next.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm)
      );
    }

    setFilteredBooks(next);
  }, [searchTerm, books, showAvailableOnly]);

  const fetchBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks();
      const rows = Array.isArray(response.data) ? response.data : [];
      setBooks(rows);
      setFilteredBooks(rows);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold gradient-text mb-4">
            {showAvailableOnly ? 'Available Books' : 'Discover Books'}
          </h1>

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title, author, or ISBN..."
          />
        </motion.div>

        {filteredBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No books found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BookCard book={book} onIssue={fetchBooks} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookList;
