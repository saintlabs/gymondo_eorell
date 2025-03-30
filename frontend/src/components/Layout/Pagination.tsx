import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalWorkouts: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalWorkouts,
  pageSize,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide pagination if only one page or less
  if (totalWorkouts <= pageSize || totalPages <= 1) {
    return null;
  }
  

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate range of items being shown
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalWorkouts);

  // Calculate which page buttons to show
  const getPageButtons = () => {
    if (isMobile) {
      const buttons = [];
      
      buttons.push(currentPage);

      if (currentPage > 1) {
        buttons.unshift(currentPage - 1);
      }

      if (currentPage < totalPages) {
        buttons.push(currentPage + 1);
      }

      return buttons;
    }

    const buttons = [];
    const SIBLINGS = 1; 


    if (totalPages > 1) {
      buttons.push(1);
    }

    const leftSibling = Math.max(currentPage - SIBLINGS, 1);
    const rightSibling = Math.min(currentPage + SIBLINGS, totalPages);

    const shouldShowLeftEllipsis = leftSibling > 2;
    const shouldShowRightEllipsis = rightSibling < totalPages - 1;

    if (shouldShowLeftEllipsis) {
      buttons.push('...');
    } else {
     
      for (let i = 2; i < leftSibling; i++) {
        buttons.push(i);
      }
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) { 
        buttons.push(i);
      }
    }

    if (shouldShowRightEllipsis) {
      buttons.push('...');
    } else {
      
      for (let i = rightSibling + 1; i < totalPages; i++) {
        buttons.push(i);
      }
    }

    if (totalPages > 1 && !buttons.includes(totalPages)) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="mt-6 flex flex-col items-center bg-white p-5 rounded-xl shadow-sm">
      <div className={`text-sm text-gray-600 text-center ${isMobile ? 'mb-3' : 'mb-4'}`}>
        {isMobile ? (
          <span>
            Page <span className="font-medium text-gray-900">{currentPage}</span> of{' '}
            <span className="font-medium text-gray-900">{totalPages}</span>
          </span>
        ) : (
          <span>
            Showing <span className="font-medium text-gray-900">{startItem}</span> to{' '}
            <span className="font-medium text-gray-900">{endItem}</span> of{' '}
            <span className="font-medium text-gray-900">{totalWorkouts}</span> results
          </span>
        )}
      </div>

      <nav className="flex flex-wrap justify-center gap-2 mt-2" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 ease-in-out min-w-[2.5rem] h-8
            ${currentPage === 1
              ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        
        {getPageButtons().map((item, index) => {
          if (item === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center justify-center px-2 py-1.5 text-xs text-gray-500"
              >
                •••
              </span>
            );
          }

          const page = item as number;
          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 ease-in-out min-w-[2.5rem] h-8
                ${isActive
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 ease-in-out min-w-[2.5rem] h-8
            ${currentPage === totalPages
              ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;