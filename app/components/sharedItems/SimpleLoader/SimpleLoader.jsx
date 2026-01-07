"use client"
import { useEffect, useState } from 'react';

const SimpleLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#051320] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-20 h-20 border-4 border-[#D9FDA3]/20 border-t-[#D9FDA3] rounded-full animate-spin mb-4 mx-auto" />
        
        {/* Progress Text */}
        <div className="text-white text-xl mb-2">{progress}%</div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <div className="text-gray-400 text-sm mt-4">
          Loading awesome content...
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;