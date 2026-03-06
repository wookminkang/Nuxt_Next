'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PaginationProps = {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 (페이지 번호 1-based) */
  onPageChange: (page: number) => void;
  /** 한 번에 보여줄 페이지 번호 개수 (기본 5) */
  maxVisible?: number;
  /** 추가 className */
  className?: string;
};

/**
 * 표시할 페이지 번호 배열 계산 (슬라이딩 윈도우)
 */
function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages, maxVisible);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      role="navigation"
      aria-label="페이지 네비게이션"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        className="flex size-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`${page}페이지`}
            className={cn(
              'flex size-9 min-w-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-gray-800 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        className="flex size-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <ChevronRight className="size-5" />
      </button>
    </nav>
  );
}
