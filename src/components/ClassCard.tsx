import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Clock, ArrowRight } from 'lucide-react';

export interface ClassData {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  grade: string;
  subject: string;
  teacherName: string;
  rating: number;
  imageUrl: string;
  status: 'active' | 'upcoming';
  duration: string;
}

interface ClassCardProps {
  course: ClassData;
}

export const ClassCard: React.FC<ClassCardProps> = ({ course }) => {
  return (
    <div class="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group">
      {/* Banner Image */}
      <div class="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={course.imageUrl}
          alt={course.title}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subject Tag */}
        <span class="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {course.subject}
        </span>
        {/* Status Tag */}
        <span class={`absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md text-white ${
          course.status === 'active' ? 'bg-accent/90' : 'bg-accent-warning/90'
        }`}>
          {course.status === 'active' ? 'Active' : 'Upcoming'}
        </span>
      </div>

      {/* Card Body */}
      <div class="flex flex-col flex-grow p-5 space-y-3">
        {/* Grade level and rating meta */}
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span class="font-medium bg-slate-100 px-2 py-0.5 rounded-md">{course.grade}</span>
          <div class="flex items-center space-x-1 text-amber-500">
            <Star class="w-3.5 h-3.5 fill-current" />
            <span class="font-bold text-slate-700">{course.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 class="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
          {course.title}
        </h3>

        {/* Short Description */}
        <p class="text-xs text-slate-600 leading-relaxed flex-grow line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Teacher details & duration */}
        <div class="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px] text-slate-500">
          <div class="flex items-center space-x-1">
            <span class="font-semibold text-slate-700">Tutor:</span>
            <span class="line-clamp-1 max-w-[90px]">{course.teacherName}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Clock class="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tuition Fee</span>
            <span class="text-base font-extrabold text-slate-900">${course.price}</span>
          </div>
          <Link
            to={`/classes/${course._id}`}
            class="flex items-center space-x-1 bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
