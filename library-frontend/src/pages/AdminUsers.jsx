import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, User as UserIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { authAPI } from '../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authAPI.getAllUsers();
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const roleA = (a?.role || '').toString();
      const roleB = (b?.role || '').toString();
      if (roleA !== roleB) return roleA.localeCompare(roleB);
      return (a?.name || '').localeCompare(b?.name || '');
    });
  }, [users]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text mb-2 text-white">Users</h1>
          <p className="text-gray-300">All registered users from the database.</p>
        </motion.div>

        {sortedUsers.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-white">No users found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedUsers.map((u) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{u?.name || 'Unknown'}</p>
                    <p className="text-xs text-indigo-200">User ID: {u?.id ?? '-'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <Mail className="w-4 h-4 text-indigo-200" />
                    <span>{u?.email || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <Shield className="w-4 h-4 text-indigo-200" />
                    <span>{u?.role || '-'}</span>
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

export default AdminUsers;
