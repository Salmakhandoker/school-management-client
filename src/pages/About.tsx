import React from 'react';
import { Award, BookOpen, Clock, Heart, Users, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Brand Banner */}
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-6 space-y-4">
          <span class="text-xs font-bold text-primary uppercase tracking-widest">Our Story</span>
          <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Redefining Modern Academic Management</h1>
          <p class="text-xs md:text-sm text-slate-600 leading-relaxed">
            Founded in 2026, EduSphere started with a clear purpose: to bridge the gap between complex school administrative metrics and transparent visual statistics for students, parents, and teachers.
          </p>
          <p class="text-xs md:text-sm text-slate-600 leading-relaxed">
            By building a secure, role-governed digital system, we allow tutors to focus on teaching while providing administrators with high-fidelity analytical reporting panels to oversee class metrics.
          </p>
        </div>
        <div class="lg:col-span-6 h-64 md:h-80 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
            alt="School environment"
            class="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. core values */}
      <section class="space-y-8">
        <div class="text-center max-w-xl mx-auto">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Our Pillars</h2>
          <p class="text-xl md:text-2xl font-black text-slate-950 tracking-tight">Values That Guide Us</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
            <div class="p-2.5 bg-primary/10 text-primary w-fit rounded-xl">
              <Award class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 text-sm md:text-base">Academic Excellence</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              We compile robust learning resources, lesson syllabus parameters, and evaluation schedules to support every student.
            </p>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
            <div class="p-2.5 bg-cyan-50 text-secondary w-fit rounded-xl">
              <Heart class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 text-sm md:text-base">Transparency & Trust</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Every tuition fee, rating review, and curriculum parameter is stored transparently, maintaining deep integrity.
            </p>
          </div>

          <div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
            <div class="p-2.5 bg-emerald-50 text-accent w-fit rounded-xl">
              <Users class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-slate-900 text-sm md:text-base">Collaborative Systems</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              By connecting administrators, teachers, and student accounts, we build a cohesive ecosystem for digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Leadership board */}
      <section class="space-y-8">
        <div class="text-center max-w-xl mx-auto">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Leadership Team</h2>
          <p class="text-xl md:text-2xl font-black text-slate-950 tracking-tight">Our Academic Council</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div class="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-4">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
              alt="Elizabeth Blackwell"
              class="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary/20"
            />
            <div>
              <h4 class="font-bold text-slate-900 text-sm">Dr. Elizabeth Blackwell</h4>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dean of Sciences</p>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              An advocate for research projects and structured lab modules across high-school curriculums.
            </p>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt="Marcus Aurelius"
              class="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary/20"
            />
            <div>
              <h4 class="font-bold text-slate-900 text-sm">Marcus Aurelius</h4>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Head of Mathematics & Coding</p>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              Focused on algorithmic thinking and interactive problem-solving systems for early grade levels.
            </p>
          </div>

          <div class="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              alt="Emily Bronte"
              class="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary/20"
            />
            <div>
              <h4 class="font-bold text-slate-900 text-sm">Ms. Emily Bronte</h4>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Language & Literature Chair</p>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              Committed to narration building, creative prose, and peer critique programs.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
