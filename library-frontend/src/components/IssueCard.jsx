import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { issueAPI } from '../services/api';
import toast from 'react-hot-toast';

const IssueCard = ({ issue, onReturn }) => {
  const borrowedDate = issue.borrowDate || issue.issueDate;
  const dueDate = issue.dueDate || null;
  const isReturned = issue.returned === true || issue.status === 'RETURNED';
  const isOverdue = !isReturned && !!dueDate && new Date(dueDate) < new Date();

  const handleReturn = async () => {
    try {
      await issueAPI.returnBook(issue.id);
      toast.success('Book returned successfully!');
      if (onReturn) onReturn();
    } catch (error) {
      // Error handled by interceptor
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border bg-white/10 backdrop-blur-md p-6 shadow-lg transition-all ${
        isOverdue ? 'border-red-500/50 shadow-red-900/20' : 'border-white/20 shadow-indigo-900/20'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{issue.book?.title || 'Untitled Book'}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isReturned
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : isOverdue
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {isReturned ? 'Returned' : isOverdue ? 'Overdue' : 'Active'}
            </span>
          </div>
          
          <p className="text-gray-400 mb-3">by {issue.book?.author || 'Unknown Author'}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {borrowedDate && (
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                Borrowed: {format(new Date(borrowedDate), 'MMM dd, yyyy')}
              </div>
            )}
            {dueDate && (
              <div className={`flex items-center ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
                <Clock className="w-4 h-4 mr-1" />
                Due: {format(new Date(dueDate), 'MMM dd, yyyy')}
              </div>
            )}
            {isReturned && issue.returnDate && (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Returned: {format(new Date(issue.returnDate), 'MMM dd, yyyy')}
              </div>
            )}
          </div>

          {issue.fineAmount > 0 && (
            <div className="mt-3 flex items-center text-red-400">
              <AlertCircle className="w-4 h-4 mr-1" />
              Fine: ₹{issue.fineAmount}
            </div>
          )}
        </div>

        {!isReturned && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReturn}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
          >
            Return Book
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default IssueCard;
