import type { Rating } from "../../types/perfumes";
import { computeStar } from "../../utils/ratings";

export function GetStarRating({
  value,
  className = "",
}: {
  value: Rating;
  className?: string;
}) {
  const icons = computeStar(value);
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {icons.map((src, i) => (
        <img key={i} src={src} className="w-5 sm:w-7" alt="rating" />
      ))}
    </div>
  );
}
