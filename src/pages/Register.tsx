import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, User, AlertCircle, ArrowRight, Image } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [avatar, setAvatar] = useState('');
  
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    const result = await register(name, email, password, role, avatar || undefined);
    setSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed. Email might already be taken.');
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
          <h2 class="text-xl font-extrabold text-slate-900">Create Account</h2>
          <p class="text-xs text-slate-500">Register as an Admin, Teacher, or Student to access portal systems</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600">
            <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} class="space-y-4">
          
          {/* Full Name */}
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Full Name *</label>
            <div class="relative">
              <User class="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address *</label>
            <div class="relative">
              <Mail class="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Password * (min 6 chars)</label>
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

          {/* Optional Avatar Link */}
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avatar Image URL (Optional)</label>
            <div class="relative">
              <Image class="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Role Choice */}
          <div class="space-y-1">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Select Account Type *</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                class={`py-2.5 rounded-xl text-[11px] font-bold border transition-all ${
                  role === 'student'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                class={`py-2.5 rounded-xl text-[11px] font-bold border transition-all ${
                  role === 'teacher'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                class={`py-2.5 rounded-xl text-[11px] font-bold border transition-all ${
                  role === 'admin'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            class="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-primary/10 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{submitting ? 'Registering...' : 'Register'}</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </form>

        {/* Redirect toggle */}
        <p class="text-xs text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" class="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};
