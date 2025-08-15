// /produts API 필드 totalPages 존재
import { useMemo } from "react";
import LeftArrowIcon from "../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../assets/icons/arrowRight.svg";

interface Props {
  page: number; // 현재 페이지(1-base)
  totalPages: number;
  onChange: (next: number) => void; // 페이지 변경
  windowSize?: number;
  isLoading?: boolean;
}

export function PaginationProducts({
  page,
  totalPages,
  onChange,
  windowSize = 5, // 최근 몇 개 페이지 번호를 보여줄지(기본 5)
  isLoading = false,
}: Props) {
  // 현재 페이지를 중심으로 windowSize만큼 슬라이딩 윈도우 구성
  const tp = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), tp);
  const w = Math.max(1, windowSize);

  const pageNumbers = useMemo(() => {
    const half = Math.floor(w / 2);
    const start = Math.max(1, Math.min(current - half, tp - w + 1));
    const end = Math.min(tp, start + w - 1);
    const arr: number[] = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }, [current, tp, w]);

  const canPrev = page > 1 && !isLoading;
  const canNext = page < tp && !isLoading;

  const go = (n: number) => {
    if (isLoading) return;
    const next = Math.min(Math.max(1, n), tp);
    if (next !== current) onChange(next);
  };

  return (
    <nav className="flex items-center gap-2">
      {/* 이전 */}
      <button
        type="button"
        onClick={() => go(current - 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
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
          className={`flex items-center justify-center w-[44px] h-11 text-2xl py-2 px-3 focus:outline-none ${
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
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canNext}
      >
        <img src={RightArrowIcon} alt="다음" width={10} />
      </button>
    </nav>
  );
}
