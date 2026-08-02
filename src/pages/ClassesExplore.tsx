import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ClassCard } from '../components/ClassCard';
import type { ClassData } from '../components/ClassCard';
import { SkeletonGrid } from '../components/SkeletonLoader';
import { API_BASE_URL } from '../context/AuthContext';

export const ClassesExplore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State synced with searchParams or internal state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [grade, setGrade] = useState(searchParams.get('grade') || 'All');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);

  // Debounced search trigger helper
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search term change
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    
    // Construct query parameters
    const params = new URLSearchParams();
    if (debouncedSearch) params.append('search', debouncedSearch);
    if (grade !== 'All') params.append('grade', grade);
    if (subject !== 'All') params.append('subject', subject);
    if (sortBy !== 'newest') params.append('sortBy', sortBy);
    params.append('page', page.toString());
    params.append('limit', '8'); // 8 classes per page

    // Update browser URL
    setSearchParams(params);

    fetch(`${API_BASE_URL}/classes?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setClasses(data.classes || []);
        setTotalPages(data.totalPages || 1);
        setTotalClasses(data.totalClasses || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load explore classes', err);
        setLoading(false);
      });
  }, [debouncedSearch, grade, subject, sortBy, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setGrade('All');
    setSubject('All');
    setSortBy('newest');
    setPage(1);
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div class="space-y-2">
        <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Academic Curriculum Catalog</h1>
        <p class="text-xs md:text-sm text-slate-500">Explore grades 9-12 classes, curriculum syllabus specifications, and schedule listings.</p>
      </div>

      {/* Filter and Sorting Controls Dashboard */}
      <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div class="relative md:col-span-4">
            <Search class="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search classes, subjects, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
            />
          </div>

          {/* Grade filter field */}
          <div class="relative md:col-span-2.5">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Grade Level</label>
            <select
              value={grade}
              onChange={(e) => { setGrade(e.target.value); setPage(1); }}
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs md:text-sm font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Grades</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          {/* Subject category filter field */}
          <div class="relative md:col-span-2.5">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Subject stream</label>
            <select
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setPage(1); }}
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs md:text-sm font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Streams</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Technology">Technology</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          {/* Sorting */}
          <div class="relative md:col-span-3">
            <label class="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Sort Results</label>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs md:text-sm font-semibold text-slate-700 focus:outline-none"
            >
              <option value="newest">Recently Added</option>
              <option value="price_asc">Tuition Fee: Low to High</option>
              <option value="price_desc">Tuition Fee: High to Low</option>
              <option value="rating">Top Rated (Review Count)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Helper Row */}
        {(debouncedSearch || grade !== 'All' || subject !== 'All' || sortBy !== 'newest') && (
          <div class="flex items-center justify-between pt-2 border-t border-slate-50">
            <span class="text-xs text-slate-500 font-medium">
              Found <strong class="text-slate-900">{totalClasses}</strong> active class listings matches.
            </span>
            <button
              onClick={handleClearFilters}
              class="text-xs text-red-500 hover:text-red-700 font-bold underline transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Render */}
      {loading ? (
        <SkeletonGrid count={8} />
      ) : classes.length === 0 ? (
        <div class="text-center py-20 bg-white border border-slate-100 rounded-3xl space-y-3">
          <SlidersHorizontal class="w-12 h-12 text-slate-300 mx-auto" />
          <h3 class="text-base font-bold text-slate-800">No matching classes found</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, selecting another grade level, or resetting filters.
          </p>
          <button
            onClick={handleClearFilters}
            class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div class="space-y-10">
          {/* Catalog grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {classes.map((course) => (
              <ClassCard key={course._id} course={course} />
            ))}
          </div>

          {/* Pagination bar */}
          {totalPages > 1 && (
            <div class="flex items-center justify-between border-t border-slate-100 pt-6">
              <span class="text-xs text-slate-500 font-medium">
                Page <strong class="text-slate-900">{page}</strong> of <strong class="text-slate-900">{totalPages}</strong>
              </span>
              <div class="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  class="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pNum = index + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      class={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        page === pNum
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  class="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
