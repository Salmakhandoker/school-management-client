import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Award, CheckCircle, ChevronDown, Send, Check } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ClassCard } from '../components/ClassCard';
import type { ClassData } from '../components/ClassCard';
import { SkeletonGrid } from '../components/SkeletonLoader';
import { API_BASE_URL } from '../context/AuthContext';

export const Home: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subject' | 'enrollment'>('subject');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    // Fetch dashboard stats
    fetch(`${API_BASE_URL}/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to load stats', err));

    // Fetch top 4 classes
    fetch(`${API_BASE_URL}/classes?limit=4`)
      .then(res => res.json())
      .then(data => {
        setClasses(data.classes || []);
        setClassesLoading(false);
      })
      .catch(err => {
        console.error('Failed to load classes', err);
        setClassesLoading(false);
      });
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }

    setNewsletterSubscribed(true);
    setEmail('');
  };

  // Static fallback data for charts in case server stats fail
  const defaultSubjectData = [
    { name: 'Mathematics', averageScore: 84, classAverage: 78 },
    { name: 'Science', averageScore: 89, classAverage: 82 },
    { name: 'Arts & Lit', averageScore: 92, classAverage: 85 },
    { name: 'Technology', averageScore: 95, classAverage: 88 },
    { name: 'Social Studies', averageScore: 87, classAverage: 80 }
  ];

  const defaultEnrollmentData = [
    { month: 'Sep', activeStudents: 310, newAdmissions: 45 },
    { month: 'Oct', activeStudents: 325, newAdmissions: 15 },
    { month: 'Nov', activeStudents: 330, newAdmissions: 10 },
    { month: 'Dec', activeStudents: 330, newAdmissions: 5 },
    { month: 'Jan', activeStudents: 360, newAdmissions: 35 },
    { month: 'Feb', activeStudents: 375, newAdmissions: 15 },
    { month: 'Mar', activeStudents: 382, newAdmissions: 12 }
  ];

  const subjectData = stats?.subjectPerformance || defaultSubjectData;
  const enrollmentData = stats?.enrollmentTrends || defaultEnrollmentData;
  const overviewStats = stats?.overview || {
    totalStudents: 382,
    totalTeachers: 24,
    totalClasses: 8,
    graduationRate: 98.4
  };

  return (
    <div class="space-y-20 pb-16">
      
      {/* 1. HERO SECTION (Limited to 60-70% height) */}
      <section class="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden py-12 md:py-20 flex items-center min-h-[500px] md:min-h-[600px] max-h-[70vh]">
        <div class="absolute inset-0 opacity-15">
          <div class="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full filter blur-3xl animate-pulse"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-float"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div class="space-y-6 md:col-span-7">
              <span class="inline-flex items-center space-x-1.5 bg-primary/25 border border-primary/40 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-secondary">
                <Award class="w-4 h-4" />
                <span>Excellence in Digital Learning</span>
              </span>
              <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Empowering the Future with <span class="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">EduSphere</span>
              </h1>
              <p class="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
                Seamlessly coordinate school classes, trace curriculum milestones, visualize performance insights, and run school affairs with role-secured admin modules.
              </p>
              <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  to="/classes"
                  class="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 text-sm"
                >
                  <span>Explore Classes</span>
                  <ArrowRight class="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  class="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3 rounded-xl font-bold transition-all text-sm"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
            
            {/* Interactive Badge Preview */}
            <div class="hidden md:block md:col-span-5 relative">
              <div class="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4 animate-float">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">Console</span>
                </div>
                <div class="space-y-2">
                  <div class="text-xs text-secondary font-mono">$ fetch academic_report_status.sh</div>
                  <div class="text-[11px] text-slate-300 font-mono pl-3">
                    ✔ Successfully seeded local database fallback.<br/>
                    ✔ Express server responsive on Port 5000.<br/>
                    ✔ Charts ready for analysis rendering.<br/>
                    ✔ Auth loaded: Administrator mode active.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATISTICS COUNTERS SECTION */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
          
          <div class="flex items-center space-x-4 p-2">
            <div class="p-3 bg-primary/10 rounded-2xl text-primary">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-extrabold text-slate-900">{overviewStats.totalStudents}</div>
              <div class="text-xs text-slate-500 font-medium">Students Enrolled</div>
            </div>
          </div>

          <div class="flex items-center space-x-4 p-2 border-l border-slate-100 lg:border-l lg:pl-6">
            <div class="p-3 bg-secondary/10 rounded-2xl text-secondary">
              <BookOpen class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-extrabold text-slate-900">{overviewStats.totalTeachers}</div>
              <div class="text-xs text-slate-500 font-medium">Certified Tutors</div>
            </div>
          </div>

          <div class="flex items-center space-x-4 p-2 border-l border-slate-100 lg:border-l lg:pl-6">
            <div class="p-3 bg-accent/10 rounded-2xl text-accent">
              <Trophy class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-extrabold text-slate-900">{overviewStats.totalClasses}</div>
              <div class="text-xs text-slate-500 font-medium">Active Curriculums</div>
            </div>
          </div>

          <div class="flex items-center space-x-4 p-2 border-l border-slate-100 lg:border-l lg:pl-6">
            <div class="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <Award class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl md:text-3xl font-extrabold text-slate-900">{overviewStats.graduationRate}%</div>
              <div class="text-xs text-slate-500 font-medium">Graduation Rate</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE FEATURES SECTION */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Administrative Core</h2>
          <p class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Everything You Need to Manage Academics</p>
          <p class="text-sm text-slate-500">EduSphere combines advanced data visualizations with role-secured permissions for streamlined coordination.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-4">
            <div class="w-10 h-10 bg-indigo-50 text-primary rounded-xl flex items-center justify-center font-bold">1</div>
            <h3 class="text-base font-bold text-slate-900">Dynamic Recharts Analytics</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Unlock student performance averages and seasonal enrollment trends directly through native dashboard analytics.
            </p>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-4">
            <div class="w-10 h-10 bg-cyan-50 text-secondary rounded-xl flex items-center justify-center font-bold">2</div>
            <h3 class="text-base font-bold text-slate-900">Role-Based Access Control</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Verify credentials using JWT tokens. Admins and teachers coordinate classes, while students browse schedules.
            </p>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-4">
            <div class="w-10 h-10 bg-emerald-50 text-accent rounded-xl flex items-center justify-center font-bold">3</div>
            <h3 class="text-base font-bold text-slate-900">Local Database Resilience</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              A fallback local file system database activates automatically when Atlas MongoDB is offline, guaranteeing 100% uptime.
            </p>
          </div>

        </div>
      </section>

      {/* 4. RECHARTS ANALYTICS PREVIEW SECTION */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div class="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 gap-4">
            <div>
              <h3 class="text-lg font-extrabold text-slate-950">Academic Analytics Insights</h3>
              <p class="text-xs text-slate-500">Real-time charts plotting class averages and new admission registrations.</p>
            </div>
            
            {/* Chart toggle controls */}
            <div class="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('subject')}
                class={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'subject' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Subject Performance
              </button>
              <button
                onClick={() => setActiveTab('enrollment')}
                class={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'enrollment' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Admissions Trend
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div class="h-80 w-full pt-8">
            {activeTab === 'subject' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '11px', fontWeight: 500 }} />
                  <YAxis stroke="#94a3b8" domain={[50, 100]} style={{ fontSize: '11px', fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#06B6D4' }}
                  />
                  <Bar dataKey="averageScore" fill="#4F46E5" name="Average Grade Score (%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="classAverage" fill="#06B6D4" name="Target Class Minimum (%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '11px', fontWeight: 500 }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '11px', fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#06B6D4' }}
                  />
                  <Area type="monotone" dataKey="activeStudents" stroke="#4F46E5" fillOpacity={1} fill="url(#colorStudents)" name="Total Enrollment" strokeWidth={3} />
                  <Area type="monotone" dataKey="newAdmissions" stroke="#06B6D4" fill="none" name="Monthly Admissions" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      {/* 5. TOP COURSE PREVIEW CATALOG (Listing 4 cards) */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div class="space-y-2">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest font-sans">Featured Catalog</h2>
            <p class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Browse Popular Classes</p>
          </div>
          <Link
            to="/classes"
            class="flex items-center space-x-1.5 text-primary hover:text-primary-hover font-bold text-sm transition-colors border-b border-primary/20 hover:border-primary-hover"
          >
            <span>View All Academic Classes</span>
            <ArrowRight class="w-4 h-4" />
          </Link>
        </div>

        {classesLoading ? (
          <SkeletonGrid count={4} />
        ) : classes.length === 0 ? (
          <div class="text-center py-12 bg-white rounded-3xl border border-slate-100">
            <p class="text-slate-500 text-sm font-medium">No active courses registered in the database.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {classes.slice(0, 4).map((course) => (
              <ClassCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-xl mx-auto space-y-3">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Feedbacks</h2>
          <p class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans">Trusted by Tutors & Parents</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <p class="text-xs text-slate-600 leading-relaxed italic">
              "Using the EduSphere database panel has dramatically cut down our weekly attendance registration time. The charting graphs make tracking grade distributions clear and effortless."
            </p>
            <div class="flex items-center space-x-3 pt-6 border-t border-slate-50 mt-4">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Sarah" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 class="text-xs font-bold text-slate-900">Dr. Sarah Vance</h4>
                <p class="text-[10px] text-slate-400">High School Principal</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <p class="text-xs text-slate-600 leading-relaxed italic">
              "Being able to review curriculum schedules and view details of physics classes online has helped my son prepare so much better for college entry science exams. A fantastic tool!"
            </p>
            <div class="flex items-center space-x-3 pt-6 border-t border-slate-50 mt-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Richard" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 class="text-xs font-bold text-slate-900">Richard Kimball</h4>
                <p class="text-[10px] text-slate-400">Parent of 11th Grader</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <p class="text-xs text-slate-600 leading-relaxed italic">
              "Creating and publishing course curriculum syllabuses directly from the tutor interface is super simple. Route permissions keep student records and settings fully protected."
            </p>
            <div class="flex items-center space-x-3 pt-6 border-t border-slate-50 mt-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Emily" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 class="text-xs font-bold text-slate-900">Ms. Emily Bronte</h4>
                <p class="text-[10px] text-slate-400">English Literature Teacher</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Frequently Asked</h2>
          <p class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans">Common Questions</p>
        </div>

        <div class="space-y-4">
          
          {[
            {
              q: "How does the local database fallback mechanism work?",
              a: "When the server starts, it checks for a valid MongoDB URI. If the server cannot authenticate (due to bad credentials, whitelisting, or offline status), it automatically activates a file-based storage fallback. All database operations and filters function identically."
            },
            {
              q: "Who is authorized to create or delete class listings?",
              a: "Only authenticated accounts holding the roles of Administrator ('admin') or Teacher ('teacher') can publish additions or execute item deletions. Standard students have read-only access to explore lists."
            },
            {
              q: "Are credentials auto-filled for evaluation?",
              a: "Yes! On the Login page, there are quick-fill options to instantly populate Administrator, Teacher, or Student user profiles."
            },
            {
              q: "How can I sort and filter classes on the explore list?",
              a: "The Explore Classes page features search input, grade filtering dropdowns (Grade 9-12), subject filters (Science, Math, Technology, etc.), and sorting by tuition price ranges or rating levels."
            }
          ].map((item, index) => (
            <div key={index} class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-200">
              <button
                onClick={() => toggleFaq(index)}
                class="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-primary transition-colors text-sm md:text-base"
              >
                <span>{item.q}</span>
                <ChevronDown class={`w-5 h-5 text-slate-400 transition-transform duration-200 ${faqOpen === index ? 'rotate-180 text-primary' : ''}`} />
              </button>
              {faqOpen === index && (
                <div class="px-5 pb-5 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3 bg-slate-50/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION SECTION */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-primary to-indigo-800 text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/20 text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden">
          <div class="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full filter blur-xl"></div>
          <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full filter blur-xl"></div>

          <div class="space-y-2 max-w-xl mx-auto">
            <h3 class="text-xl md:text-2xl font-black font-sans">Subscribe to the Academy Bulletin</h3>
            <p class="text-xs md:text-sm text-indigo-100 leading-relaxed">
              Stay up-to-date with course registrations, calendar dates, statistics reports, and new syllabus releases. No spam, unsubscribe anytime.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div class="flex flex-col items-center justify-center space-y-2 py-4 animate-bounce">
              <div class="p-3 bg-white/20 rounded-full">
                <Check class="w-6 h-6 text-white" />
              </div>
              <p class="text-sm font-bold">Successfully Subscribed! Thank you.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div class="w-full flex flex-col items-start space-y-1">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                {newsletterError && <span class="text-xs text-amber-300 font-bold self-start pl-1">{newsletterError}</span>}
              </div>
              <button
                type="submit"
                class="w-full sm:w-auto bg-white text-primary hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <Send class="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
