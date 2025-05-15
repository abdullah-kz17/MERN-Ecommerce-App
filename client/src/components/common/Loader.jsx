import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  // Animation effects
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="relative w-48 h-48">
          {/* Hexagonal Frame */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-24 h-1 bg-blue-400 dark:bg-blue-500 opacity-50"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                      transformOrigin: 'center',
                    }}
                />
            ))}
          </div>

          {/* Energy particles */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-300"
                    style={{
                      transform: `translate(-50%, -50%)`,
                      animation: `energyParticle${i % 4} 2s infinite ease-in-out ${i * 0.2}s`
                    }}
                />
            ))}
          </div>

          {/* Pulsing outer ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '10s' }}>
            <circle
                cx="50%"
                cy="50%"
                r="40%"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="10,5"
                fill="none"
                className="text-purple-500 dark:text-purple-400"
            />
          </svg>

          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
                cx="50%"
                cy="50%"
                r="35%"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-blue-500 dark:text-blue-400"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          {/* Center Element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 opacity-20 animate-pulse" />

              {/* Icon container with lightning effect */}
              <div className="relative z-10">
                <div className="absolute -inset-1 bg-yellow-400 dark:bg-yellow-300 opacity-30 blur-sm animate-pulse" />
                <Zap
                    size={36}
                    className="text-yellow-500 dark:text-yellow-400 filter drop-shadow-md animate-bounce"
                    style={{ animationDuration: '2s' }}
                />
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="absolute -bottom-12 left-0 right-0 flex flex-col items-center">
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
              Loading...
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes energyParticle0 {
          0%, 100% { transform: translate(-50%, -50%) translateX(0) translateY(-28px); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) translateX(0) translateY(-20px); opacity: 0.2; }
        }
        @keyframes energyParticle1 {
          0%, 100% { transform: translate(-50%, -50%) translateX(24px) translateY(14px); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) translateX(17px) translateY(10px); opacity: 0.2; }
        }
        @keyframes energyParticle2 {
          0%, 100% { transform: translate(-50%, -50%) translateX(-24px) translateY(14px); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) translateX(-17px) translateY(10px); opacity: 0.2; }
        }
        @keyframes energyParticle3 {
          0%, 100% { transform: translate(-50%, -50%) translateX(0) translateY(0); opacity: 0; }
          25% { transform: translate(-50%, -50%) translateX(20px) translateY(-20px); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) translateX(0) translateY(-28px); opacity: 0.8; }
          75% { transform: translate(-50%, -50%) translateX(-20px) translateY(-20px); opacity: 0.8; }
        }
      `}</style>
      </div>
  );
};

export default Loader;