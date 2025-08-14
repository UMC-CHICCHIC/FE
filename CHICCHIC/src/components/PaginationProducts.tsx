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
  const w = Math.max(1, windowSize);

  const pageNumbers = useMemo(() => {
    const tp = Math.max(0, totalPages);
    const half = Math.floor(w / 2);
    const start = Math.max(1, Math.min(page - half, tp - w + 1));
    const end = Math.min(tp, start + w - 1);
    const arr: number[] = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }, [page, totalPages, w]);

  const canPrev = page > 1 && !isLoading;
  const canNext = page < totalPages && isLoading;

  return (
    <nav className="flex items-center gap-2">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        className="p-2 cursor-pointer disabled:opacity-40"
        disabled={!canPrev}
        aria-label="previous page"
      >
        <img src={LeftArrowIcon} alt="이전" width={10} />
      </button>

      {/* 최근 windowSize 개의 페이지 번호 */}
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex items-center justify-center w-[44px] h-11 text-2xl py-2 px-3 focus:outline-none ${
            p === page
              ? "bg-[#AB3130] text-white"
              : "text-[#AB3130] hover:bg-[#AB3130] hover:text-white"
          }`}
          aria-current={p === page ? "page" : undefined}
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
        aria-label="next page"
      >
        <img src={RightArrowIcon} alt="다음" width={10} />
      </button>
    </nav>
  );
}
