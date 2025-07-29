import type { Perfume } from "../../types/perfumes";

interface PerfumeCardProps {
  perfume: Perfume;
}

{/*API 연동 필요*/ }
export function PerfumeCard({ perfume }: PerfumeCardProps) {
  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 ">
        <img
          src={perfume.imageUrl}
          alt={perfume.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: "4/5" }}
          data-ai-hint="perfume bottle"
        />
      </div>
      <div className="text-left text-[#AB3130]">
        <h3 className="font-semibold text-base mb-1">{perfume.name}</h3>
        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
        <p className="text-sm font-semibold mt-1">130,000 ₩</p>
      </div>
    </div>
  );
}