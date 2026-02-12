import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { issueAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import IssueCard from '../components/IssueCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MyIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchMyIssues();
    }
  }, [user?.id]);

  const fetchMyIssues = async () => {
    try {
      const response = await issueAPI.getMyBorrows(user.id);
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching borrows:', error);
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
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">My Borrowed Books</h1>
          <p className="text-gray-400">Track your borrow and return history</p>
        </motion.div>

        {issues.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <p className="text-gray-400 text-lg">You have not borrowed any books yet</p>
          </motion.div>
        ) : (
          <div className="space-y-4 stagger-container">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} onReturn={fetchMyIssues} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;
