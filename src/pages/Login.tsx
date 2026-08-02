import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, AlertCircle, ArrowRight, User } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Parse redirect target path if routed from route guard
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Invalid credentials. Please try again.');
    }
  };

  // Demo user credentials quick-fill trigger
  const handleDemoFill = async (role: 'admin' | 'teacher' | 'student') => {
    setError('');
    let demoEmail = '';
    let demoPass = 'admin123'; // Base fallback

    if (role === 'admin') {
      demoEmail = 'admin@edusphere.com';
      demoPass = 'admin123';
    } else if (role === 'teacher') {
      demoEmail = 'teacher@edusphere.com';
      demoPass = 'teacher123';
    } else {
      demoEmail = 'student@edusphere.com';
      demoPass = 'student123';
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    // Auto trigger submission
    setSubmitting(true);
    const result = await login(demoEmail, demoPass);
    setSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Demo authentication failed.');
    }
  };

  return (
    <div class="max-w-md mx-auto my-12 px-4">
      <div class="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl space-y-6">
        
        {/* Title Header */}
        <div class="text-center space-y-2">
          <Link to="/" class="inline-flex items-center space-x-1 text-primary font-black text-xl">
            <GraduationCap class="w-8 h-8" />
            <span>EduSphere</span>
          </Link>
          <h2 class="text-xl font-extrabold text-slate-900">Sign In to Portal</h2>
          <p class="text-xs text-slate-500">Access your school administration and syllabus portal</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600">
            <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} class="space-y-4">
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</label>
            <div class="relative">
              <Mail class="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                placeholder="you@edusphere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between items-center">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Password</label>
            </div>
            <div class="relative">
              <Lock class="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            class="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-primary/10 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </form>

        {/* Redirect toggle */}
        <p class="text-xs text-center text-slate-500">
          New to EduSphere?{' '}
          <Link to="/register" class="text-primary font-bold hover:underline">
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
};
