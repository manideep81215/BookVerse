import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import MyIssues from './pages/MyIssues';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
import AdminIssuedBooks from './pages/AdminIssuedBooks';
import AdminReturnedBooks from './pages/AdminReturnedBooks';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e2538',
              color: '#fff',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/my-issues"
            element={
              <ProtectedRoute>
                <MyIssues />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/issued-books"
            element={
              <ProtectedRoute adminOnly>
                <AdminIssuedBooks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/returned-books"
            element={
              <ProtectedRoute adminOnly>
                <AdminReturnedBooks />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/add-book"
            element={
              <ProtectedRoute adminOnly>
                <AddBook />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
