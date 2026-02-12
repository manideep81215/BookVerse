import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Mail, Shield, User as UserIcon, Pencil, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { authAPI, issueAPI } from '../services/api';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateCurrentUser } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await issueAPI.getMyBorrows(user.id);
        setIssues(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching profile issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [user?.id]);

  const latestIssues = useMemo(() => {
    const toTime = (value) => (value ? parseISO(value).getTime() : 0);
    return [...issues]
      .sort((a, b) => toTime(b.borrowDate) - toTime(a.borrowDate))
      .slice(0, 8);
  }, [issues]);

  useEffect(() => {
    setEditedName(user?.name || '');
  }, [user?.name]);

  const handleSaveName = async () => {
    if (!user?.id) return;
    const trimmed = editedName.trim();
    if (!trimmed) {
      toast.error('Name is required');
      return;
    }

    setSavingName(true);
    try {
      const response = await authAPI.updateName(user.id, trimmed);
      const updatedUser = response.data;
      updateCurrentUser(updatedUser);
      setIsEditingName(false);
      toast.success('Name updated successfully');
    } catch {
      // interceptor handles error toast
    } finally {
      setSavingName(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold gradient-text text-white mb-6"
        >
          My Profile
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <UserIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                {!isEditingName ? (
                  <h2 className="text-2xl font-bold text-white">{user?.name || 'User'}</h2>
                ) : (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="input-field h-10 max-w-xs"
                    placeholder="Enter your name"
                    disabled={savingName}
                  />
                )}
                <p className="text-indigo-100">{user?.role || 'STUDENT'}</p>
              </div>
            </div>

            {!isEditingName ? (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveName}
                  disabled={savingName}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {savingName ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedName(user?.name || '');
                    setIsEditingName(false);
                  }}
                  disabled={savingName}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:opacity-60"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="inline-flex items-center gap-2 text-indigo-100">
              <Mail className="w-4 h-4" />
              {user?.email || '-'}
            </div>
            <div className="inline-flex items-center gap-2 text-indigo-100">
              <Shield className="w-4 h-4" />
              Role: {user?.role || '-'}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-white">Latest Issues</h3>

          {latestIssues.length === 0 ? (
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-indigo-100">
              Yet to issue a book.
            </div>
          ) : (
            latestIssues.map((issue) => {
              const isReturned = issue.returned === true || issue.status === 'RETURNED';
              return (
                <div
                  key={issue.id}
                  className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {issue.book?.title || 'Untitled Book'}
                      </p>
                      <p className="text-sm text-indigo-100">
                        {issue.book?.author || 'Unknown Author'}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                        isReturned
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {isReturned ? 'Returned' : 'Active'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="inline-flex items-center gap-2 text-indigo-100">
                      <Calendar className="w-4 h-4" />
                      Issued:{' '}
                      {issue.borrowDate ? format(parseISO(issue.borrowDate), 'MMM dd, yyyy') : '-'}
                    </div>
                    {isReturned ? (
                      <div className="inline-flex items-center gap-2 text-green-300">
                        <CheckCircle className="w-4 h-4" />
                        Returned:{' '}
                        {issue.returnDate ? format(parseISO(issue.returnDate), 'MMM dd, yyyy') : '-'}
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 text-amber-300">
                        <Clock className="w-4 h-4" />
                        Yet to return
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
