import React from 'react';

export default function Pagination({
                                     currentPage,
                                     totalItems,
                                     itemsPerPage,
                                     onPageChange,
                                     onRowsPerPageChange,
                                   }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle case where totalItems is 0
  const displayedPages = totalPages > 0 ? totalPages : 1;

  const handlePrev = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  // Create an array of page numbers to display
  // Show max 5 pages with ellipsis for larger sets
  const getPageNumbers = () => {
    if (displayedPages <= 5) {
      return Array.from({ length: displayedPages }, (_, i) => i);
    }

    // Always show first and last page
    let pages = [0];

    // Calculate middle pages
    if (currentPage <= 2) {
      pages.push(1, 2, 3, '...');
    } else if (currentPage >= displayedPages - 3) {
      pages.push('...', displayedPages - 4, displayedPages - 3, displayedPages - 2);
    } else {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
    }

    // Add last page
    if (displayedPages > 1) {
      pages.push(displayedPages - 1);
    }

    return pages;
  };

  return (
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center">
          <label htmlFor="rowsPerPage" className="text-sm mr-2 dark:text-black">Items per page:</label>
          <select
              id="rowsPerPage"
              value={itemsPerPage}
              onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {[5, 10, 15, 20].map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <span className="ml-4 text-sm dark:text-black">
          {totalItems > 0 ? (
              <>Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems}</>
          ) : (
              <>No items</>
          )}
        </span>
        </div>

        <div className="flex items-center gap-2">
          <button
              onClick={handlePrev}
              disabled={currentPage === 0 || totalItems === 0}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Prev
          </button>

          {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 dark:text-black">...</span>
              ) : (
                  <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                          currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                      }`}
                  >
                    {pageNum + 1}
                  </button>
              )
          ))}

          <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1 || totalItems === 0}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
  );
}