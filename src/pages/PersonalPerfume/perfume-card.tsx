import type { Perfume } from "../../types/perfumes";

interface PerfumeCardProps {
  perfume: Perfume;
}

<<<<<<< HEAD
{/*API 연동 필요*/ }
export function PerfumeCard({ perfume }: PerfumeCardProps) {
  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 ">
=======
export function PerfumeCard({ perfume }: PerfumeCardProps) {
  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200">
>>>>>>> f70d5f7054b94b007c50cdda529c29c6a8cc5366
        <img
          src={perfume.imageUrl}
          alt={perfume.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: "4/5" }}
          data-ai-hint="perfume bottle"
        />
      </div>
<<<<<<< HEAD
      <div className="text-left text-[#AB3130]">
=======
      <div className="text-left">
>>>>>>> f70d5f7054b94b007c50cdda529c29c6a8cc5366
        <h3 className="font-semibold text-base mb-1">{perfume.name}</h3>
        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
        <p className="text-sm font-semibold mt-1">130,000 ₩</p>
      </div>
    </div>
  );
}