import React from 'react';

interface VisitorCounterProps {
  count: number | null;
  className?: string;
}

export default function VisitorCounter({ count, className = '' }: VisitorCounterProps) {
  if (!count) return null;

  return (
    <div className={`bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-300 rounded-xl p-6 text-center ${className}`}>
      <p className="text-slate-600 text-lg mb-2">
        यह टेस्ट लिया है
      </p>
      <p className="text-5xl font-bold text-emerald-700">
        {count.toLocaleString('hi-IN')}
      </p>
      <p className="text-slate-600 mt-2">
        लोगों ने 👥
      </p>
    </div>
  );
}
