export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  brand: string;
  ml: number;
  onClick?: (id: number) => void;
  isLoading: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  brand,
  ml,
  onClick,
  isLoading,
}: ProductCardProps) {
  return (
    <button
      className="flex flex-col items-center"
      onClick={() => onClick?.(id)}
    >
      {isLoading ? (
        // 이미지 스켈레톤
        <div className="max-w-[260px] max-h-[300px bg-gray-300 animate-pulse"></div>
      ) : (
        <>
          <img
            src={imageUrl}
            alt={name}
            className="object-cover max-w-[260px] max-h-[300px] border-none rounded-md transition-transform duration-300 shadow cursor-pointer hover:scale-103"
            loading="lazy" // 이미지 로딩 UX 향상
          />
          <div className="flex flex-col gap-1 mt-2 text-[#AB3130] text-lg font-semibold text-center">
            <p>{brand}</p>
            <p className="cursor-pointer hover:underline">{name}</p>
            <p>{ml}mL</p>
          </div>

          <div className="text-[#AB3130] font-semibold text-center mt-2">
            {price.toLocaleString()} ₩
          </div>
        </>
      )}
    </button>
  );
}
