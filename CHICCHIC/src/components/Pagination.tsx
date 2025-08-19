import { useMemo } from "react";
import LeftArrowIcon from "../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../assets/icons/arrowRight.svg";

interface PaginationProps {
  page: number; // 현재 페이지(1-base)
  hasNext: boolean; // 다음 페이지 존재 여부 (data.length === size)
  onChange: (next: number) => void; // 페이지 변경
  windowSize?: number; // 최근 몇 개 페이지 번호를 보여줄지(기본 5)
  lookAhead?: number; // 앞으로 몇 페이지를 미리 보여줄지 (기본 1)
  isLoading?: boolean;
}

export function Pagination({
  page,
  hasNext,
  onChange,
  windowSize = 5, // 기본 5로 설정
  lookAhead = 1,
  isLoading = false,
}: PaginationProps) {
  const w = Math.max(1, windowSize);
  const forward = hasNext ? Math.max(0, lookAhead) : 0;

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - (w - 1));
    const end = page + forward; // ex) page=1, hasNext=true → 1..2
    const arr: number[] = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }, [page, w, forward]);

  const canPrev = page > 1 && !isLoading;
  const canNext = hasNext && !isLoading;

  const go = (n: number) => {
    if (isLoading) return;
    if (n < 1) return;
    if (n === page) return;
    onChange(n);
  };

  return (
    <nav className="flex items-center gap-2">
      {/* 이전 */}
      <button
        type="button"
        onClick={() => go(page - 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canPrev}
        aria-label="previous page"
      >
        <img src={LeftArrowIcon} alt="이전" width={10} />
      </button>

      {/* 페이지 번호들 */}
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`flex box-border items-center justify-center w-[44px] h-11 text-2xl cursor-pointer py-2 px-3 focus:outline-none ${
            p === page
              ? "bg-[#AB3130] text-white"
              : "text-[#AB3130] hover:bg-[#AB3130] hover:text-white"
          }`}
          aria-current={p === page ? "page" : undefined}
          disabled={isLoading}
        >
          {p}
        </button>
      ))}

      {/* 다음 */}
      <button
        type="button"
        onClick={() => go(page + 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canNext}
        aria-label="next page"
      >
        <img src={RightArrowIcon} alt="다음" width={10} />
      </button>
    </nav>
  );
}
