import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div class="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Image Area */}
      <div class="skeleton-shimmer h-48 w-full"></div>
      
      {/* Body Area */}
      <div class="flex flex-col flex-grow p-5 space-y-4">
        {/* Meta Line */}
        <div class="flex justify-between items-center">
          <div class="skeleton-shimmer h-4 w-16 rounded"></div>
          <div class="skeleton-shimmer h-4 w-12 rounded"></div>
        </div>

        {/* Title Line */}
        <div class="skeleton-shimmer h-6 w-3/4 rounded"></div>

        {/* Description Lines */}
        <div class="space-y-2 flex-grow">
          <div class="skeleton-shimmer h-3.5 w-full rounded"></div>
          <div class="skeleton-shimmer h-3.5 w-5/6 rounded"></div>
        </div>

        {/* Info Line */}
        <div class="flex justify-between items-center pt-2 border-t border-slate-100">
          <div class="skeleton-shimmer h-3 w-20 rounded"></div>
          <div class="skeleton-shimmer h-3 w-16 rounded"></div>
        </div>

        {/* Bottom Area */}
        <div class="flex justify-between items-center pt-3 border-t border-slate-100">
          <div class="space-y-1">
            <div class="skeleton-shimmer h-2.5 w-12 rounded"></div>
            <div class="skeleton-shimmer h-5 w-16 rounded"></div>
          </div>
          <div class="skeleton-shimmer h-9 w-28 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
