import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ClassesExplore } from './pages/ClassesExplore';
import { ClassDetail } from './pages/ClassDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddClass } from './pages/AddClass';
import { ManageClasses } from './pages/ManageClasses';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';

// Session verification route guard
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'teacher' | 'student')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
        <div class="skeleton-shimmer h-12 w-2/3 max-w-md rounded-2xl mx-auto"></div>
      </div>
    );
  }

  if (!user) {
    // Save redirected path for post-login redirection
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div class="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Sticky top-level navigation panel */}
      <Navbar />
      
      {/* Content wrapper */}
      <main class="flex-grow">
        <Routes>
          {/* Public Routing */}
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<ClassesExplore />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Administration Routing **/}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/add"
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <AddClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/manage"
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ManageClasses />
              </ProtectedRoute>
            }
          />

          {/* Redirect Wildcards */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer metadata links */}
      <Footer />
    </div>
  );
}

export default App;
