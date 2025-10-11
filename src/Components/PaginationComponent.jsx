import React from "react";
import "./PaginationComponent.css"; // optional, for custom styling

export default function PaginationComponent({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 5,
}) {
  if (totalPages <= 1) return null; // hide pagination if only 1 page

  const pages = [];
  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  // Adjust start/end if at boundaries
  if (end - start + 1 < maxVisiblePages) {
    if (start === 1) end = Math.min(totalPages, start + maxVisiblePages - 1);
    else if (end === totalPages) start = Math.max(1, end - maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="yotpo-reviews-pagination-container">
      <div className="yotpo-horizontal-pagination">
        <button
          className="yotpo-reviews-pagination-item"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <ul className="yotpo-horizontal-pagination-container">
          {pages.map((p) => (
            <li key={p} className="yotpo-pagination-number-container">
              <button
                className={`yotpo-reviews-pagination-item yotpo-pagination-number ${
                  currentPage === p ? "selected" : ""
                }`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="yotpo-reviews-pagination-item"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </nav>
  );
}
