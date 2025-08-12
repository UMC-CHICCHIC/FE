import { useMemo } from "react";
import LeftArrowIcon from "../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../assets/icons/arrowRight.svg";

interface PaginationProps {
  page: number; // 현재 페이지(1-base)
  hasNext: boolean; // 다음 페이지 존재 여부 (data.length === size)
  onChange: (next: number) => void; // 페이지 변경
  windowSize?: number; // 최근 몇 개 페이지 번호를 보여줄지(기본 5)
  isLoading?: boolean;
}

export function Pagination({
  page,
  hasNext,
  onChange,
  windowSize = 5,
  isLoading = false,
}: PaginationProps) {
  // total 없음 → 지나온 페이지들 중 최근 windowSize 개만 노출 (start..page)
  const pageNumbers = useMemo(() => {
    const w = Math.max(1, windowSize);
    const start = Math.max(1, page - w + 1);
    const arr: number[] = [];
    for (let i = start; i <= page; i++) arr.push(i);
    return arr;
  }, [page, windowSize]);

  const canPrev = page > 1 && !isLoading;
  const canNext = hasNext && !isLoading;

  return (
    <nav className="flex items-center gap-2">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canPrev}
      >
        <img src={LeftArrowIcon} alt="이전" width={10} />
      </button>

      {/* 최근 windowSize 개의 페이지 번호 */}
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex box-border items-center justify-center w-[44px] h-11 text-2xl cursor-pointer py-2 px-3 focus:outline-none ${
            p === page
              ? "bg-[#AB3130] text-white"
              : "text-[#AB3130] hover:bg-[#AB3130] hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        onClick={() => canNext && onChange(page + 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canNext}
      >
        <img src={RightArrowIcon} alt="다음" width={10} />
      </button>
    </nav>
  );
}
