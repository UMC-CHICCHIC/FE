import { useMemo, useState } from "react";
import type { Rating } from "../../types/perfumes";
import starFull from "../../assets/icons/starFull.svg";
import starHalf from "../../assets/icons/starHalf.svg";
import starEmpty from "../../assets/icons/starEmpty.svg";

interface ProductStarRatingProps {
  rating: Rating;
  onChange: (value: Rating) => void;
}

export function ProductStarRating({
  rating,
  onChange,
}: ProductStarRatingProps) {
  const [hoverRating, setHoverRating] = useState<Rating | null>(null);

  const displayValue = hoverRating ?? rating;
  const starsRating = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      if (displayValue >= starNumber) {
        return starFull;
      } else if (displayValue >= starNumber - 0.5) {
        return starHalf;
      } else {
        return starEmpty;
      }
    });
  }, [displayValue]);
  return (
    <div className="flex items-center gap-1 pb-6 text-xl">
      {starsRating.map((icon, i) => {
        const starValue = (i + 1) as Rating;
        const halfStarValue = (i + 0.5) as Rating;

        return (
          <div key={i} className="relative flex">
            {/* 왼쪽 반 */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
              onMouseEnter={() => setHoverRating(halfStarValue)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => {
                onChange(halfStarValue);
                console.log("클릭시에 넘버", onChange(halfStarValue));
              }}
            />
            {/* 전체 */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
              onMouseEnter={() => {
                setHoverRating(starValue);
                console.log("마우스 호버", setHoverRating(starValue));
              }}
              onMouseLeave={() => {
                setHoverRating(null);
                console.log("마우스 호버떠남", setHoverRating(starValue));
              }}
              onClick={() => {
                onChange(starValue);
                console.log("클릭시에 넘버", onChange(starValue));
              }}
            />
            <img src={icon} className="w-5 sm:w-10" />
          </div>
        );
      })}
      <span className="ml-2 text-base sm:text-4xl text-[#AB3130]">
        {displayValue} / 5
      </span>
    </div>
  );
}
