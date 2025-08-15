import starFull from "../assets/icons/starFull.svg";
import starHalf from "../assets/icons/starHalf.svg";
import starEmpty from "../assets/icons/starEmpty.svg";
import type { Rating } from "../types/perfumes";

export function computeStar(value: Rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;
    if (value >= starNumber) return starFull;
    if (value >= starNumber - 0.5) return starHalf;
    return starEmpty;
  });
}
