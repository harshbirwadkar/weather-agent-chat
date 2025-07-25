import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl px-4 py-3 max-w-lg shadow-md bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
