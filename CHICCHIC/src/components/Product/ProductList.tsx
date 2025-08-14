// src/components/product/ProductGrid.tsx
import { memo } from "react";
import { ProductCard, type ProductCardProps } from "./ProductCard";

type ProductGridItem = Omit<ProductCardProps, "onClick"> & {
  onClick?: (id: number) => void;
};

interface ProductGridProps {
  items: ProductGridItem[];
  isLoading?: boolean;
  pageSize?: number;
  onItemClick?: (id: number) => void;
  columns?: number; // 열 수
}

export const ProductGrid = memo(function ProductGrid({
  items,
  isLoading = false,
  pageSize = 16,
  onItemClick,
  columns = 4, // (기본 4 = 4x4)
}: ProductGridProps) {
  const gridCols = `grid grid-cols-4 md:grid-cols-${columns} gap-40 gap-y-24 font-[pretendard]`;

  if (!isLoading && items.length === 0) {
    return (
      <div className="w-full py-16 text-center text-[#AB3130]">
        표시할 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className={gridCols}>
      {isLoading
        ? Array.from({ length: pageSize }).map((_, idx) => (
            <div
              key={idx}
              className="h-60 w-40 mx-auto rounded bg-[#EAE6DF] animate-pulse"
            />
          ))
        : items.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              brand={p.brand}
              ml={p.ml}
              imageUrl={p.imageUrl}
              onClick={onItemClick}
            />
          ))}
    </div>
  );
});
