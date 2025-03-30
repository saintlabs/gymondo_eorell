import React from 'react';

// Styles and keyframes are now handled by Tailwind utility classes
const LoadingSpinner: React.FC = () => {
  // Removed useEffect hook for injecting keyframes
  
  return (
    // Replaced style={spinnerStyles.container} with Tailwind classes
    <div className="flex flex-col justify-center items-center py-12 bg-white rounded-xl shadow-sm">
      {/* Replaced style={spinnerStyles.spinnerWrapper} with Tailwind classes */}
      <div className="relative w-14 h-14">
        {/* Replaced style={spinnerStyles.spinnerOuter} with Tailwind classes (using border-2) */}
        <div className="absolute w-full h-full rounded-full border-2 border-transparent border-t-indigo-700 animate-spin" style={{ animationDuration: '1s', animationTimingFunction: 'ease-in-out' }}></div>
        {/* Replaced style={spinnerStyles.spinnerMiddle} with Tailwind classes (using border-2) */}
        <div className="absolute inset-[5px] rounded-full border-2 border-transparent border-t-indigo-400 animate-spin" style={{ animationDuration: '1.5s', animationTimingFunction: 'ease-in-out' }}></div>
        {/* Replaced style={spinnerStyles.spinnerInner} with Tailwind classes (using border-2) */}
        <div className="absolute inset-[10px] rounded-full border-2 border-transparent border-t-indigo-200 animate-spin" style={{ animationDuration: '2s', animationTimingFunction: 'ease-in-out' }}></div>
      </div>
      {/* Replaced style={spinnerStyles.text} with Tailwind classes */}
      <div className="mt-6 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">Loading...</div>
    </div>
  );
};

export default LoadingSpinner; 