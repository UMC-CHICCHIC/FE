import { useMemo } from "react";
import LeftArrowIcon from "../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../assets/icons/arrowRight.svg";

interface Props {
  page: number; // 0-base
  totalPages: number; // 전체 페이지 수
  onChange: (next: number) => void; // 0-base
  windowSize?: number;
  isLoading?: boolean;
}

export function PaginationProducts({
  page,
  totalPages,
  onChange,
  windowSize = 5,
  isLoading = false,
}: Props) {
  const tp = Math.max(0, totalPages);
  const current = tp > 0 ? Math.min(Math.max(1, page + 1), tp) : 0; // 1-base
  const w = Math.max(1, windowSize);

  const pageNumbers = useMemo(() => {
    if (tp === 0) return [];
    const half = Math.floor(w / 2);
    let start = Math.max(1, current - half);
    const end = Math.min(tp, start + w - 1);
    start = Math.max(1, end - w + 1); // 보정
    const arr: number[] = [];
    for (let p = start; p <= end; p++) arr.push(p); // 끝 포함
    return arr;
  }, [current, tp, w]);

  const canPrev = !isLoading && page > 0; // 0-base
  const canNext = !isLoading && page < tp - 1; // 0-base

  const go = (nextDisplay: number) => {
    if (isLoading || tp === 0) return;
    const clamped = Math.min(Math.max(1, nextDisplay), tp);
    const nextZeroBase = clamped - 1;
    if (nextZeroBase !== page) onChange(nextZeroBase);
  };

  return (
    <nav className="flex items-center gap-2">
      {totalPages !== 0 && (
        <>
          {/* 이전 */}
          <button
            type="button"
            onClick={() => go(current - 1)}
            className="p-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canPrev}
          >
            <img src={LeftArrowIcon} alt="이전" width={10} />
          </button>
          {/* 페이지 번호 */}
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => {
                go(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center justify-center w-[44px] h-11 text-2xl py-2 px-3 focus:outline-none cursor-pointer ${
                p === current
                  ? "bg-[#AB3130] text-white"
                  : "text-[#AB3130] hover:bg-[#AB3130] hover:text-white"
              }`}
              disabled={isLoading}
            >
              {p}
            </button>
          ))}
          {/* 다음 */}
          <button
            type="button"
            onClick={() => go(current + 1)}
            className="p-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canNext}
          >
            <img src={RightArrowIcon} alt="다음" width={10} />
          </button>
        </>
      )}
    </nav>
  );
}
