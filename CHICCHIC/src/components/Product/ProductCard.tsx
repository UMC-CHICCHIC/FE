// import SamplePerfumeImg from "../../assets/images/samplePerfumeImg.png";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  brand: string;
  ml: number;
  onClick?: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  brand,
  ml,
  onClick,
}: ProductCardProps) {
  return (
    <button
      className="flex flex-col items-center"
      onClick={() => onClick?.(id)}
    >
      <img
        src={imageUrl}
        alt={name}
        className="object-cover rounded shadow max-w-[260px] max-h-[300px] cursor-pointer hover:scale-120"
        loading="lazy" // 이미지 로딩 UX 향상
      />
      <div className="flex flex-col gap-1 mt-2 text-[#AB3130] text-lg font-semibold text-center">
        <p>{brand}</p>
        <p>{name}</p>
        <p>{ml}mL</p>
      </div>

      <div className="text-[#AB3130] font-semibold text-center mt-2">
        {price.toLocaleString()} ₩
      </div>
    </button>
  );
}
