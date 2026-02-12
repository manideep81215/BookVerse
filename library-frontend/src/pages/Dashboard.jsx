import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookAPI, issueAPI } from '../services/api';
import { BookOpen, BookMarked, CheckCircle, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    returnedBooks: 0,
    availableBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  const fetchStats = async () => {
    try {
      const booksResponse = await bookAPI.getAllBooks();
      const books = Array.isArray(booksResponse.data) ? booksResponse.data : [];
      
      const totalBooks = books.length;
      const availableBooks = books.filter((b) => b.available === true).length;

      if (isAdmin()) {
        const borrowsResponse = await issueAPI.getAllBorrows();
        const borrows = Array.isArray(borrowsResponse.data) ? borrowsResponse.data : [];
        const issuedBooks = borrows.filter((b) => b.returned === false).length;
        const returnedBooks = borrows.filter((b) => b.returned === true).length;

        setStats({ totalBooks, issuedBooks, returnedBooks, availableBooks });
      } else {
        const myBorrowsResponse = await issueAPI.getMyBorrows(user?.id);
        const myBorrows = Array.isArray(myBorrowsResponse.data) ? myBorrowsResponse.data : [];
        const issuedBooks = myBorrows.filter((b) => b.returned === false).length;

        setStats({ totalBooks, issuedBooks, returnedBooks: 0, availableBooks });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = isAdmin() ? [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Issued Books',
      value: stats.issuedBooks,
      icon: BookMarked,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Returned Books',
      value: stats.returnedBooks,
      icon: CheckCircle,
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'Available Books',
      value: stats.availableBooks,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
  ] : [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'My Issued Books',
      value: stats.issuedBooks,
      icon: BookMarked,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Available Books',
      value: stats.availableBooks,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold gradient-text mb-2 text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">
            {isAdmin() 
              ? 'Manage your library and track all activities from here.' 
              : 'Discover and borrow books from our collection.'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin() ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mb-8 stagger-container`}>
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  if (stat.title === 'Total Books') {
                    navigate('/books');
                  }
                  if (stat.title === 'Available Books') {
                    navigate('/books?filter=available');
                  }
                  if (isAdmin() && stat.title === 'Issued Books') {
                    navigate('/admin/issued-books');
                  }
                  if (isAdmin() && stat.title === 'Returned Books') {
                    navigate('/admin/returned-books');
                  }
                }}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-6 hover-glow ${
                  ['Total Books', 'Available Books'].includes(stat.title) ||
                  (isAdmin() && (stat.title === 'Issued Books' || stat.title === 'Returned Books'))
                    ? 'cursor-pointer'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                    className="text-3xl font-bold text-white"
                  >
                    {loading ? '...' : stat.value}
                  </motion.div>
                </div>
                <h3 className="text-gray-400 font-medium">{stat.title}</h3>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.a
              href="/books"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl hover:bg-primary-500/20 transition-colors"
            >
              <BookOpen className="w-8 h-8 text-primary-400 mb-2" />
              <h3 className="font-semibold text-white">Browse Books</h3>
              <p className="text-sm text-gray-400">Explore our collection</p>
            </motion.a>

            {!isAdmin() && (
              <motion.a
                href="/my-issues"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors"
              >
                <BookMarked className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="font-semibold text-white">My Issues</h3>
                <p className="text-sm text-gray-400">View borrowed books</p>
              </motion.a>
            )}

            {isAdmin() && (
              <motion.a
                href="/add-book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-colors"
              >
                <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                <h3 className="font-semibold text-white">Add New Book</h3>
                <p className="text-sm text-gray-400">Expand collection</p>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
