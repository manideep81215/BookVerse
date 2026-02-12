import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, User as UserIcon, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { issueAPI } from '../services/api';

const AdminIssuedBooks = () => {
  const [issuedBorrows, setIssuedBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssuedBorrows = async () => {
      try {
        const response = await issueAPI.getAllBorrows();
        const borrows = Array.isArray(response.data) ? response.data : [];
        setIssuedBorrows(borrows.filter((b) => b.returned === false));
      } catch (error) {
        console.error('Error fetching issued borrows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBorrows();
  }, []);

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
          <h1 className="text-4xl font-display font-bold gradient-text mb-2 text-white">
            Issued Books Details
          </h1>
          <p className="text-gray-300">
            Active borrows with student details. Hover student name to view full profile.
          </p>
        </motion.div>

        {issuedBorrows.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-white">
            No active issued books.
          </div>
        ) : (
          <div className="space-y-4">
            {issuedBorrows.map((borrow) => (
              <motion.div
                key={borrow.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white">
                      <BookOpen className="w-4 h-4 text-indigo-200" />
                      <span className="font-semibold">
                        {borrow.book?.title || 'Untitled Book'}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-100">
                      Author: {borrow.book?.author || 'Unknown'}
                    </p>
                    <p className="text-sm text-indigo-100">
                      ISBN: {borrow.book?.isbn || '-'}
                    </p>
                    <div className="flex items-center text-sm text-indigo-100">
                      <Calendar className="w-4 h-4 mr-2" />
                      Issued on:{' '}
                      {borrow.borrowDate
                        ? format(new Date(borrow.borrowDate), 'MMM dd, yyyy')
                        : '-'}
                    </div>
                    <p className="text-xs text-indigo-200">Borrow ID: {borrow.id}</p>
                  </div>

                  <div className="md:text-right">
                    <div className="relative inline-block group">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-200"
                      >
                        <UserIcon className="w-4 h-4" />
                        {borrow.user?.name || 'Unknown Student'}
                      </button>

                      <div className="hidden group-hover:block absolute right-0 mt-2 w-64 rounded-xl border border-white/20 bg-slate-900/95 p-4 text-left shadow-2xl z-20">
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                          Student Details
                        </p>
                        <p className="text-sm text-white">Name: {borrow.user?.name || '-'}</p>
                        <p className="text-sm text-white">Email: {borrow.user?.email || '-'}</p>
                        <p className="text-sm text-white">Role: {borrow.user?.role || '-'}</p>
                        <p className="text-sm text-white">User ID: {borrow.user?.id || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIssuedBooks;
