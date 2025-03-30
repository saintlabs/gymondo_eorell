import React, { CSSProperties } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const paginationStyles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.5rem',
    height: '2.5rem',
    padding: '0 0.75rem',
    margin: '0 0.25rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: '0.375rem',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#4B5563',
  },
  buttonActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    color: '#4338CA',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  buttonIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: '0.875rem',
  },
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.5rem',
    height: '2.5rem',
    margin: '0 0.25rem',
    fontSize: '0.875rem',
    color: '#4B5563',
  }
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which page buttons to show
  const getPageButtons = () => {
    const buttons = [];

    // Always show first page
    buttons.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      buttons.push('...');
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      buttons.push('...');
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageButtons = getPageButtons();

  return (
    <div style={paginationStyles.container}>
      {/* Previous button */}
      <button
        style={{
          ...paginationStyles.button,
          ...(currentPage === 1 ? paginationStyles.buttonDisabled : {})
        }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span style={paginationStyles.buttonIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* Page numbers */}
      {pageButtons.map((button, index) => {
        if (button === '...') {
          return (
            <span key={`ellipsis-${index}`} style={paginationStyles.ellipsis}>
              ...
            </span>
          );
        }

        const pageNumber = button as number;
        return (
          <button
            key={pageNumber}
            style={{
              ...paginationStyles.button,
              ...(pageNumber === currentPage ? paginationStyles.buttonActive : {})
            }}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            <span style={paginationStyles.buttonText}>{pageNumber}</span>
          </button>
        );
      })}

      {/* Next button */}
      <button
        style={{
          ...paginationStyles.button,
          ...(currentPage === totalPages ? paginationStyles.buttonDisabled : {})
        }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span style={paginationStyles.buttonIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Pagination; 