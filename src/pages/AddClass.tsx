import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { PlusCircle, Image, FileText, ArrowRight, AlertCircle } from 'lucide-react';

export const AddClass: React.FC = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('Grade 10');
  const [subject, setSubject] = useState('Science');
  const [imageUrl, setImageUrl] = useState('');
  const [schedule, setSchedule] = useState('');
  const [duration, setDuration] = useState('');
  const [syllabus, setSyllabus] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field check
    if (!title || !shortDescription || !description || !price || !schedule || !duration) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isNaN(Number(price)) || Number(price) < 0) {
      setError('Please enter a valid tuition price.');
      return;
    }

    setSubmitting(true);

    try {
      const parsedSyllabus = syllabus
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean);

      // Default image if empty
      const finalImageUrl = imageUrl.trim() || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600';

      const res = await fetch(`${API_BASE_URL}/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          shortDescription,
          description,
          price: Number(price),
          grade,
          subject,
          imageUrl: finalImageUrl,
          schedule,
          duration,
          syllabus: parsedSyllabus
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register the new class.');
      }

      // Success, route to explore list
      navigate('/classes');
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="max-w-2xl mx-auto py-8 px-4">
      <div class="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        
        {/* Title Header */}
        <div class="flex items-center space-x-3 border-b border-slate-50 pb-4">
          <div class="p-3 bg-primary/10 text-primary rounded-2xl">
            <PlusCircle class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-extrabold text-slate-900 font-sans">Publish New Class Listing</h1>
            <p class="text-xs text-slate-500">Submit a new academic curriculum listing to the catalog database</p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600">
            <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Entry Form */}
        <form onSubmit={handleSubmit} class="space-y-6">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Class Title *</label>
              <input
                type="text"
                placeholder="e.g. Advanced Chemistry & Lab Studies"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>

            {/* Short description */}
            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Short Summary * (displayed on listing card)</label>
              <input
                type="text"
                placeholder="e.g. Master molecular bonds, compounds, and periodic trends in organic chemistry."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                maxLength={120}
                required
              />
            </div>

            {/* Price */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tuition Fees ($USD) *</label>
              <input
                type="number"
                placeholder="e.g. 110"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                min="0"
                required
              />
            </div>

            {/* Grade */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Grade Level *</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-xs md:text-sm font-semibold text-slate-700"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>

            {/* Subject stream */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Subject Stream *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-xs md:text-sm font-semibold text-slate-700"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            {/* Image URL */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Banner Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
              />
            </div>

            {/* Schedule */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly Schedule *</label>
              <input
                type="text"
                placeholder="e.g. Mon, Wed 10:00 AM - 11:30 AM"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>

            {/* Duration */}
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration (Weeks) *</label>
              <input
                type="text"
                placeholder="e.g. 14 Weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                required
              />
            </div>

            {/* Full description */}
            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Full Syllabus Details *</label>
              <textarea
                placeholder="Detailed curriculum overview, milestones, prerequisites, required books and lab sessions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm h-32 resize-none"
                required
              />
            </div>

            {/* Syllabus lines split */}
            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Curriculum Chapters (One per line)</label>
              <textarea
                placeholder="e.g. Chapter 1: Chemical Bonds&#10;Chapter 2: Organic Formulations&#10;Chapter 3: Laboratory Safety & Titrations"
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm h-28 resize-none font-mono"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={submitting}
            class="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-primary/10 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{submitting ? 'Publishing...' : 'Add Class to Catalog'}</span>
            <ArrowRight class="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};
