import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Star, Clock, Calendar, GraduationCap, DollarSign, Users, Award, BookOpen, ChevronRight } from 'lucide-react';
import { API_BASE_URL, useAuth } from '../context/AuthContext';
import { ClassCard } from '../components/ClassCard';
import type { ClassData } from '../components/ClassCard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51TiWB5R3WBRdaoSkMvQjHWladqM3k1OJ3rnkgj1v5lrEOJhjKn0v2mBMsxGMLDCRIUfXfeeaEFprjypffJdeJHdQ00DP2ALFaI');

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = useState<ClassData | any>(null);
  const [related, setRelated] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Custom mock reviews for details page richness
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/classes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Class not found');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        
        // Generate mock reviews tailored for this specific class
        const mockReviews: Review[] = [
          {
            id: 'rev_1',
            author: 'Alex Mercer',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
            rating: Math.floor(data.rating),
            date: 'July 14, 2026',
            comment: `This ${data.title} class has been extremely helpful. The lectures are structured logically, and ${data.teacherName} is very thorough.`
          },
          {
            id: 'rev_2',
            author: 'Helena Carter',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
            rating: Math.ceil(data.rating) - 1 || 4,
            date: 'June 28, 2026',
            comment: `I really enjoyed the curriculum. The syllabus details cover exactly what is required for final prep. Highly recommended class!`
          }
        ];
        setReviews(mockReviews);

        // Fetch related classes based on subject stream
        return fetch(`${API_BASE_URL}/classes?subject=${data.subject}&limit=4`);
      })
      .then(res => res ? res.json() : null)
      .then(data => {
        if (data && data.classes) {
          // Exclude current class from related recommendations
          const filtered = data.classes.filter((c: ClassData) => c._id !== id);
          setRelated(filtered.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load course details', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div class="skeleton-shimmer h-8 w-1/3 rounded mx-auto"></div>
        <div class="skeleton-shimmer h-64 w-full rounded-3xl"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div class="skeleton-shimmer h-80 col-span-2 rounded-2xl"></div>
          <div class="skeleton-shimmer h-80 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 class="text-xl font-bold text-slate-800 font-sans">Class Not Found</h2>
        <p class="text-xs text-slate-500">The requested academic catalog course does not exist or has been removed.</p>
        <Link to="/classes" class="inline-block bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav class="flex items-center space-x-1.5 text-xs text-slate-500">
        <Link to="/" class="hover:text-primary transition-colors">Home</Link>
        <ChevronRight class="w-3.5 h-3.5" />
        <Link to="/classes" class="hover:text-primary transition-colors">Explore</Link>
        <ChevronRight class="w-3.5 h-3.5" />
        <span class="text-slate-700 font-semibold line-clamp-1">{course.title}</span>
      </nav>

      {/* Main Course Layout */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Overview, Syllabus, Tutors, Reviews */}
        <div class="lg:col-span-8 space-y-8">
          {/* Main Visual Banner */}
          <div class="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-sm bg-slate-100">
            <img src={course.imageUrl} alt={course.title} class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 md:p-8">
              <div class="text-white space-y-2">
                <span class="bg-secondary/90 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  {course.subject}
                </span>
                <h1 class="text-xl md:text-3xl font-black">{course.title}</h1>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div class="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 class="text-base font-bold text-slate-950 border-b border-slate-50 pb-2 flex items-center space-x-2">
              <BookOpen class="w-5 h-5 text-primary" />
              <span>Course Description</span>
            </h2>
            <p class="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Syllabus Curriculum Checklist */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div class="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
              <h2 class="text-base font-bold text-slate-950 border-b border-slate-50 pb-2 flex items-center space-x-2">
                <GraduationCap class="w-5 h-5 text-primary" />
                <span>Curriculum & Syllabus Modules</span>
              </h2>
              <div class="space-y-3 pt-2">
                {course.syllabus.map((module: string, idx: number) => (
                  <div key={idx} class="flex items-start space-x-3 text-xs md:text-sm text-slate-700">
                    <div class="w-5 h-5 bg-indigo-50 text-primary rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span class="leading-relaxed">{module}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teacher Profile Card */}
          <div class="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 class="text-base font-bold text-slate-950 border-b border-slate-50 pb-2 flex items-center space-x-2">
              <Award class="w-5 h-5 text-primary" />
              <span>Assigned Instructor Profile</span>
            </h2>
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                alt={course.teacherName}
                class="w-16 h-16 rounded-full object-cover bg-slate-50 border border-slate-100"
              />
              <div class="space-y-1.5 text-center sm:text-left">
                <h4 class="text-sm font-bold text-slate-950">{course.teacherName}</h4>
                <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{course.subject} Department Faculty</p>
                <p class="text-xs text-slate-600 leading-relaxed">
                  A senior member of the school faculty with years of experience delivering advanced training guides. Provides detailed feedback and personalized reports.
                </p>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div class="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 class="text-base font-bold text-slate-950 border-b border-slate-50 pb-2 flex items-center space-x-2">
              <Star class="w-5 h-5 text-primary" />
              <span>Reviews & Ratings ({reviews.length})</span>
            </h2>
            <div class="space-y-4 pt-2">
              {reviews.map((rev) => (
                <div key={rev.id} class="space-y-2.5 pb-4 border-b border-slate-50 last:border-b-0 last:pb-0">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2.5">
                      <img src={rev.avatar} alt={rev.author} class="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 class="text-xs font-bold text-slate-950">{rev.author}</h4>
                        <span class="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} class={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed pl-1">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Key specifications Card */}
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-6">
            
            {/* Price section */}
            <div class="space-y-1 pb-4 border-b border-slate-100">
              <span class="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Tuition Fees</span>
              <div class="flex items-baseline space-x-1">
                <span class="text-3xl font-black text-slate-900">${course.price}</span>
                <span class="text-xs text-slate-500">/ Semester</span>
              </div>
            </div>

            {/* Spec lines */}
            <div class="space-y-4">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-500 flex items-center space-x-2">
                  <GraduationCap class="w-4 h-4 text-slate-400" />
                  <span>Grade Level</span>
                </span>
                <span class="font-bold text-slate-900">{course.grade}</span>
              </div>

              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-500 flex items-center space-x-2">
                  <Clock class="w-4 h-4 text-slate-400" />
                  <span>Duration</span>
                </span>
                <span class="font-bold text-slate-900">{course.duration}</span>
              </div>

              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-500 flex items-center space-x-2">
                  <Calendar class="w-4 h-4 text-slate-400" />
                  <span>Schedule</span>
                </span>
                <span class="font-bold text-slate-900 text-right max-w-[180px] line-clamp-1">{course.schedule}</span>
              </div>

              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-500 flex items-center space-x-2">
                  <Users class="w-4 h-4 text-slate-400" />
                  <span>Enrolled Seats</span>
                </span>
                <span class="font-bold text-slate-900">{course.enrolledStudents || 42} Students</span>
              </div>

              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-500 flex items-center space-x-2">
                  <Star class="w-4 h-4 text-slate-400" />
                  <span>Rating Index</span>
                </span>
                <span class="font-bold text-slate-900 flex items-center space-x-1">
                  <Star class="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{course.rating.toFixed(1)} / 5.0</span>
                </span>
              </div>
            </div>

            {/* Enroll CTA */}
            {!showCheckout ? (
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login', { state: { from: location } });
                  } else if (user.role !== 'student') {
                    alert('Tuition payments are only required for student accounts.');
                  } else {
                    setShowCheckout(true);
                  }
                }}
                class="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-primary/10 transition-colors"
              >
                Request Class Enrollment
              </button>
            ) : (
              <div class="space-y-4 pt-2 border-t border-slate-100">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    classId={course._id}
                    price={course.price}
                    onSuccess={() => {
                      setCourse((prev: any) => prev ? { ...prev, enrolledStudents: (prev.enrolledStudents || 0) + 1 } : null);
                      setShowCheckout(false);
                    }}
                  />
                </Elements>
                <button
                  onClick={() => setShowCheckout(false)}
                  class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel Checkout
                </button>
              </div>
            )}

          </div>

          {/* Secure Portal Alert */}
          <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-2 text-xs">
            <h4 class="font-bold text-indigo-900 flex items-center space-x-1">
              <Users class="w-4 h-4" />
              <span>JWT Authentication Active</span>
            </h4>
            <p class="text-indigo-700 leading-relaxed">
              Curriculum syllabuses and student reports are role-protected. Log in to access the full administration database.
            </p>
          </div>
        </div>

      </div>

      {/* Related Items Section */}
      {related.length > 0 && (
        <div class="space-y-6 pt-6 border-t border-slate-100">
          <h2 class="text-lg font-extrabold text-slate-950 font-sans">Related Courses</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((course) => (
              <ClassCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
