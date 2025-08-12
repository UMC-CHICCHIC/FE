import { useMemo, useState } from "react";
import type { Rating } from "../../types/perfumes";
import { computeStar } from "../../utils/ratings";

interface StarRatingProps {
  rating: Rating;
  onChange: (value: Rating) => void;
}

// 별점 입력 컴포넌트
export function StarRating({ rating, onChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<Rating | null>(null);
  const displayValue = hoverRating ?? rating;

  const starsRating = useMemo(() => computeStar(displayValue), [displayValue]);

  return (
    <div className="flex font-[crimsonText] items-center gap-1 pb-6 text-xl">
      {starsRating.map((icon, i) => {
        const starValue = (i + 1) as Rating;
        const halfStarValue = (i + 0.5) as Rating;

        return (
          <div key={i} className="relative flex">
            {/* 왼쪽 반 */}
            <div
              className="absolute top-0 left-0 z-10 w-1/2 h-full cursor-pointer"
              onMouseEnter={() => setHoverRating(halfStarValue)}
              onClick={() => onChange(halfStarValue)}
            />
            {/* 전체 */}
            <div
              className="absolute top-0 right-0 z-10 w-1/2 h-full cursor-pointer"
              onMouseEnter={() => setHoverRating(starValue)}
              onClick={() => onChange(starValue)}
            />
            <img src={icon} className="w-5 sm:w-9" />
          </div>
        );
      })}
      <span className="ml-2 sm:ml-6 text-base sm:text-3xl text-[#AB3130]">
        {displayValue} / 5
      </span>
    </div>
  );
}
