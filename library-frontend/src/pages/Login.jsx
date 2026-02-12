import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, BookOpen, ArrowRight, Eye } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [peekPassword, setPeekPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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

    const success = await login(formData);

    setLoading(false);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-primary-500/50"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold mb-2">
            <span className="bg-gradient-to-r from-white via-slate-200 to-gray-400 bg-clip-text text-transparent">
              Welcome to BookVerse
            </span>
          </h1>
          <p className="text-gray-400">Sign in to continue to BookVerse</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl shadow-indigo-900/30"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/90" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/90" />
                <input
                  type={peekPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPeekPassword((prev) => !prev)}
                  onMouseEnter={() => setPeekPassword(true)}
                  onMouseLeave={() => setPeekPassword(false)}
                  onMouseDown={() => setPeekPassword(true)}
                  onMouseUp={() => setPeekPassword(false)}
                  onBlur={() => setPeekPassword(false)}
                  onTouchStart={() => setPeekPassword(true)}
                  onTouchEnd={() => setPeekPassword(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    Show
                  </span>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 group"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?
            </p>
            <div className="mt-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
              >
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
