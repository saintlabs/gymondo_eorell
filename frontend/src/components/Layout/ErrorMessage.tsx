import React from 'react';

interface ErrorMessageProps {
  message: string;
}


const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-white border border-red-200 border-l-4 border-l-red-500 text-red-800 p-6 rounded-lg shadow-sm mb-6 flex items-center" role="alert">
    <div className="mr-4 flex items-center justify-center rounded-full w-10 h-10 bg-red-100 flex-shrink-0">
      <svg
        className="w-6 h-6 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-7v2h2v-2h-2zm0-2V7h2v6h-2z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="flex-1">
      <div className="text-base font-semibold mb-1 text-red-900">Error Encountered</div>
      <div className="text-sm text-red-800 leading-relaxed">{message}</div>
    </div>
  </div>
);

export default ErrorMessage; 