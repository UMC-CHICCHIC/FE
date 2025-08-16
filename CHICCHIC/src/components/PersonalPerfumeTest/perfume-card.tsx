import type { Perfume } from "../../types/perfumes";
import { Link } from "react-router-dom";

interface PerfumeCardProps {
  perfume: Perfume;
}

{/*API 연동 필요*/ }
export function PerfumeCard({ perfume }: PerfumeCardProps) {
  return (
    <div className="flex flex-col group">
      <Link
        to={`/shopping/${perfume.id}`}
        aria-label={`${perfume.name} 상세 보기`}
        className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 cursor-pointer"
      >
        <img
          src={perfume.imageUrl}
          alt={perfume.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: "4/5" }}
          data-ai-hint="perfume bottle"
        />
      </Link>
      <div className="text-left text-[#AB3130]">
        <h3 className="font-semibold text-base mb-1">{perfume.name}</h3>
        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
        {perfume.price && (
          <p className="text-sm font-semibold mt-1">{perfume.price.toLocaleString()} ₩</p>
        )}
        <p className="text-sm mt-1 truncate">{perfume.description}</p>
      </div>
    </div>
  );
}