import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../context/AuthContext';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate fields
    if (!name || !email || !subject || !message) {
      setError('Please fill in all form fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!res.ok) {
        throw new Error('Message transmission failed. Please try again.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
        <p class="text-xs md:text-sm text-slate-500">
          Have questions about tuition enrollments or curriculum setup? Send us a message and our support team will reply within 24 hours.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div class="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-8 shadow-xl">
          <div class="space-y-2">
            <h3 class="text-lg font-bold font-sans">Contact Information</h3>
            <p class="text-xs text-slate-400">Reach out directly through our support channels.</p>
          </div>

          <div class="space-y-6">
            <div class="flex items-start space-x-3.5 text-xs md:text-sm">
              <MapPin class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-slate-200">Our Location</h4>
                <p class="text-slate-400 mt-1">100 Academic Circle, Suite 500, Boston, MA 02108</p>
              </div>
            </div>

            <div class="flex items-start space-x-3.5 text-xs md:text-sm">
              <Phone class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-slate-200">Call Us</h4>
                <p class="text-slate-400 mt-1">+1 (800) 555-0199</p>
              </div>
            </div>

            <div class="flex items-start space-x-3.5 text-xs md:text-sm">
              <Mail class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-slate-200">Email Address</h4>
                <p class="text-slate-400 mt-1">support@edusphere.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div class="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h3 class="text-lg font-bold text-slate-950 border-b border-slate-50 pb-2">Send Message</h3>

          {/* Success Banner */}
          {success && (
            <div class="flex items-start space-x-2 bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs text-emerald-700 animate-pulse">
              <CheckCircle2 class="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span class="font-bold">Message Delivered!</span>
                <p class="mt-0.5">Thank you. Our school administration team will inspect your inquiry soon.</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600">
              <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} class="space-y-4">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Inquiry Subject *</label>
              <input
                type="text"
                placeholder="e.g. Course Syllabus clarification / Enrollment query"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>

            {/* Message Body */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Message Description *</label>
              <textarea
                placeholder="Type your message description here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm h-32 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              class="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-primary/10 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
              <Send class="w-4 h-4" />
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};
