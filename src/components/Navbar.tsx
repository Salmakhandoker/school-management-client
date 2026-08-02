import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Menu, X, LogOut, User as UserIcon, PlusCircle, BookOpen, BarChart3, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary font-semibold' : 'text-slate-600 hover:text-primary';
  };

  return (
    <nav class="sticky top-0 z-50 w-full glass-panel shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div class="flex items-center">
            <Link to="/" class="flex items-center space-x-2 text-primary font-extrabold text-xl tracking-tight">
              <GraduationCap class="w-8 h-8 text-primary animate-pulse" />
              <span>EduSphere</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div class="hidden md:flex items-center space-x-8">
            <Link to="/" class={`transition-colors duration-200 ${isActive('/')}`}>Home</Link>
            <Link to="/classes" class={`transition-colors duration-200 ${isActive('/classes')}`}>Explore Classes</Link>
            <Link to="/about" class={`transition-colors duration-200 ${isActive('/about')}`}>About Us</Link>
            
            {user ? (
              <>
                {/* 5+ routes when logged in: Add Class, Manage Classes, Dashboard, Profile */}
                <Link to="/dashboard" class={`transition-colors duration-200 flex items-center space-x-1 ${isActive('/dashboard')}`}>
                  <BarChart3 class="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                {(user.role === 'admin' || user.role === 'teacher') && (
                  <>
                    <Link to="/items/add" class={`transition-colors duration-200 flex items-center space-x-1 ${isActive('/items/add')}`}>
                      <PlusCircle class="w-4 h-4" />
                      <span>Add Class</span>
                    </Link>
                    <Link to="/items/manage" class={`transition-colors duration-200 flex items-center space-x-1 ${isActive('/items/manage')}`}>
                      <Settings class="w-4 h-4" />
                      <span>Manage</span>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link to="/contact" class={`transition-colors duration-200 ${isActive('/contact')}`}>Contact</Link>
            )}
          </div>

          {/* User Actions / Auth Buttons */}
          <div class="hidden md:flex items-center space-x-4">
            {user ? (
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} class="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <UserIcon class="w-4 h-4 text-slate-500" />
                  )}
                  <span class="text-xs font-semibold text-slate-700">{user.name.split(' ')[0]} ({user.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  class="flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut class="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div class="flex items-center space-x-3">
                <Link
                  to="/login"
                  class="text-slate-700 hover:text-primary transition-colors duration-200 text-sm font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div class="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              class="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X class="h-6 w-6" /> : <Menu class="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div class="md:hidden bg-white/95 border-b border-slate-100 backdrop-blur-md">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/classes"
              onClick={() => setIsOpen(false)}
              class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
            >
              Explore Classes
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
            >
              About Us
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>

                {(user.role === 'admin' || user.role === 'teacher') && (
                  <>
                    <Link
                      to="/items/add"
                      onClick={() => setIsOpen(false)}
                      class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      Add Class
                    </Link>
                    <Link
                      to="/items/manage"
                      onClick={() => setIsOpen(false)}
                      class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      Manage Classes
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            )}

            <hr class="my-2 border-slate-100" />

            {user ? (
              <div class="px-3 py-2 flex flex-col space-y-3">
                <div class="flex items-center space-x-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} class="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <UserIcon class="w-8 h-8 text-slate-500 bg-slate-100 p-1.5 rounded-full" />
                  )}
                  <div>
                    <div class="text-sm font-bold text-slate-800">{user.name}</div>
                    <div class="text-xs text-slate-500">{user.role} | {user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  class="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <LogOut class="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div class="px-3 py-2 flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  class="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  class="w-full text-center py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-md shadow-primary/20 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
