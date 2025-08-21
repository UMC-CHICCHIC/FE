import type { ProductSearchResult } from "../../../types/searchtype";
import { ProductGrid } from "./ProductList";

interface ProductSearchResultProps {
  name: string;
  product: ProductSearchResult | null | undefined;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  // onClear?: () => void; 리스트 페이지로 돌아가기
  onItemClick?: (id: number) => void; // detail navigate용
}

export const ProductSearchComponent = ({
  name,
  product,
  isLoading = false,
  isError = false,
  error,
  // onClear,
  onItemClick,
}: ProductSearchResultProps) => {
  // 에러 처리
  if (!name.trim()) return null;

  if (isError) {
    return <div className="text-[#AB3130]">검색 실패: {String(error)}</div>;
  }
  if (isLoading) {
    return (
      <section className="w-full max-w-[1090px]">
        <ProductGrid items={[]} isLoading pageSize={16} />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full max-w-[1100px]">
        <div className="text-[#666]">검색 결과가 없습니다.</div>
        {/* {onClear && (
          <div className="mt-3 text-right">
            <button
              className="px-4 py-2 rounded-full border border-[#AB3130] text-[#AB3130] hover:bg-[#AB3130] hover:text-white transition"
              onClick={onClear}
            >
              전체보기
            </button>
          </div>
        )} */}
      </section>
    );
  }

  return (
    <section>
      <ProductGrid
        items={[
          {
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            ml: product.ml,
            imageUrl: product.imageUrl,
          },
        ]}
        isLoading={false}
        pageSize={16}
        onItemClick={onItemClick}
      />
      {/* {onClear && (
        <div className="mt-4 text-top">
          <button
            className="px-4 py-2 rounded-full border border-[#AB3130] text-[#AB3130] hover:bg-[#AB3130] hover:text-white transition"
            onClick={onClear}
          >
            전체보기
          </button>
        </div>
      )} */}
    </section>
  );
};
