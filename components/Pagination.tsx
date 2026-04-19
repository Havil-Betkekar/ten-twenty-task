interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const safeChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    // show dots if current page is from start
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    // show dots if current page is from end
    if (currentPage < totalPages - 2) pages.push("...");
    // Always show last page
    pages.push(totalPages);

    return pages;
  };
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg bg-white-50 px-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer px-3 h-8 text-sm text-gray-600 border-r-gray-200 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => safeChange(page)}
            className={`
              w-8 h-8 text-sm rounded
              ${
                currentPage === page
                  ? "bg-gray-200 text-blue font-medium"
                  : "text-gray-600 hover:bg-white"
              }
            `}
          >
            {page}
          </button>
        ),
      )}

      {/* Next button */}
      <button
        onClick={() => safeChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 h-8 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
