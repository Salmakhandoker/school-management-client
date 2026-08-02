import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { Trash2, Eye, AlertCircle, Settings, Sliders } from 'lucide-react';
import type { ClassData } from '../components/ClassCard';

export const ManageClasses: React.FC = () => {
  const { token, user } = useAuth();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/classes?limit=100`) // Fetch all for management
      .then(res => res.json())
      .then(data => {
        setClasses(data.classes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load courses', err);
        setError('Failed to fetch class records.');
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course from the school directory?')) {
      return;
    }

    setDeletingId(id);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/classes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete class item.');
      }

      // Remove from UI state
      setClasses(prev => prev.filter(c => c._id !== id));
    } catch (err: any) {
      setError(err.message || 'An error occurred during deletion.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Header */}
      <div class="flex items-center space-x-3 border-b border-slate-100 pb-4">
        <div class="p-3 bg-primary/10 text-primary rounded-2xl">
          <Settings class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-xl font-extrabold text-slate-900 font-sans">Manage School Curriculum</h1>
          <p class="text-xs text-slate-500">Overview of all active classes. Administrative permissions are active.</p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div class="flex items-start space-x-2 bg-red-50 border border-red-100 p-3.5 rounded-xl text-xs text-red-600">
          <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Management Grid/Table */}
      {loading ? (
        <div class="space-y-4">
          <div class="skeleton-shimmer h-12 w-full rounded-xl"></div>
          <div class="skeleton-shimmer h-12 w-full rounded-xl"></div>
          <div class="skeleton-shimmer h-12 w-full rounded-xl"></div>
        </div>
      ) : classes.length === 0 ? (
        <div class="text-center py-16 bg-white border border-slate-100 rounded-2xl">
          <p class="text-slate-500 text-xs font-semibold">No classes catalogued. Add your first class to get started!</p>
        </div>
      ) : (
        <div class="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="p-4 pl-6">Course Banner & Title</th>
                  <th class="p-4">Grade</th>
                  <th class="p-4">Subject Stream</th>
                  <th class="p-4">Tutor</th>
                  <th class="p-4">Tuition Price</th>
                  <th class="p-4 pr-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs md:text-sm">
                {classes.map((course) => (
                  <tr key={course._id} class="hover:bg-slate-50/50 transition-colors">
                    {/* Title */}
                    <td class="p-4 pl-6 flex items-center space-x-3.5">
                      <img src={course.imageUrl} alt={course.title} class="w-12 h-8 rounded-lg object-cover bg-slate-50 border border-slate-100" />
                      <div>
                        <div class="font-bold text-slate-900 line-clamp-1">{course.title}</div>
                        <div class="text-[10px] text-slate-400 mt-0.5 font-medium line-clamp-1 max-w-[200px]">{course.shortDescription}</div>
                      </div>
                    </td>
                    {/* Grade */}
                    <td class="p-4">
                      <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold text-xs">{course.grade}</span>
                    </td>
                    {/* Subject */}
                    <td class="p-4">
                      <span class="text-slate-600 font-medium">{course.subject}</span>
                    </td>
                    {/* Teacher */}
                    <td class="p-4 text-slate-600 font-medium">{course.teacherName}</td>
                    {/* Price */}
                    <td class="p-4 font-extrabold text-slate-950">${course.price}</td>
                    {/* Actions */}
                    <td class="p-4 pr-6 text-center">
                      <div class="flex items-center justify-center space-x-2">
                        <Link
                          to={`/classes/${course._id}`}
                          class="p-2 rounded-lg bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors flex items-center justify-center"
                          title="View Course details"
                        >
                          <Eye class="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(course._id)}
                          disabled={deletingId === course._id}
                          class="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors flex items-center justify-center disabled:opacity-40"
                          title="Delete Course listing"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
