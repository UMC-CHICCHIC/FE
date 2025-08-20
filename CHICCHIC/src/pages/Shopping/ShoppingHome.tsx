import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import type {
  PAGINATION_ORDER,
  PerfumeCategory,
} from "../../types/enums/category";
import { useProductStore } from "../../store/useProductStore";
import {
  useGetCategories,
  useGetProductList,
} from "../../hooks/queries/useGetProduct";
import { useNavigate } from "react-router-dom";
import { ProductGrid } from "../../components/Product/ProductList";
import { PaginationProducts } from "../../components/PaginationProducts";

const sortItems = [
  "인기도순",
  "낮은가격순",
  "높은가격순",
  "누적판매순",
  "리뷰많은순",
  "평점높은순",
];
type SortLabel = (typeof sortItems)[number];

const sortMap: Record<SortLabel, PAGINATION_ORDER> = {
  인기도순: "numSeller,desc",
  낮은가격순: "price,asc",
  높은가격순: "price,desc",
  누적판매순: "numSeller,desc",
  리뷰많은순: "itemRating,desc",
  평점높은순: "itemRating,desc",
};

const ShoppingHome = () => {
  const [productPage, setProductPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortLabel>("인기도순");
  const { setPerfumeId } = useProductStore();
  const [catId, setCatId] = useState<number | null>(null);

  const {
    data: priceCat,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = useGetCategories("PRICE" as PerfumeCategory);
  const {
    data: concCat,
    isLoading: isConcLoading,
    isError: isConcError,
  } = useGetCategories("CONCENTRATION" as PerfumeCategory);

  // 상품 리스트 훅 사용
  const { data, isLoading, isError } = useGetProductList({
    page: productPage - 1,
    size: 16,
    sort: sortMap[sort],
    // 가격대, 발향률에 대한 카테고리
    cat: catId ?? undefined,
  });

  const list = data?.result.content ?? [];
  const totalPages = data?.result.totalPages ?? 0;
  const currentPage = data?.result.number ?? productPage - 1;

  const handleCatId = (id: number | null) => {
    setCatId((prev) => (prev === id ? null : id));
    setProductPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen items-center p-4 space-y-8 bg-[#F7F4EF]">
      {/* 상품 검색창 구현 X */}
      <section className="flex items-center w-full max-w-xl border rounded-full border-[#AB3130] px-4 py-2 my-14">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none placeholder-[#AB3130] text-[#AB3130] px-2"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onKeyUp={(e) => e.key === "Enter" && setProductPage(1)}
        />
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="cursor-pointer"
          width={20}
        />
      </section>

      {/* 카테고리 */}
      <section className="w-full max-w-5xl text-center">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-[#AB3130]" />
          <label className="text-2xl tracking-wide font-black px-4 text-[#AB3130]">
            Category
          </label>
          <div className="flex-1 h-px bg-[#AB3130]" />
        </div>
        <div className="items-center text-black border-b border-[#ece3d4] my-4 font-[pretendard]">
          <div className="grid items-center grid-cols-7 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">가격대</span>
            {/* PRICE 카테고리 렌더링 */}
            {isPriceLoading && (
              <span className="col-span-2 py-2 text-sm text-gray-500 md:col-span-8">
                로딩중…
              </span>
            )}
            {isPriceError && (
              <span className="col-span-2 py-2 text-sm md:col-span-8">
                가격대 불러오기 실패
              </span>
            )}
            {priceCat
              ?.sort((a, b) => a.order - b.order)
              .map((c) => {
                const active = catId === c.categoryId;
                return (
                  <button
                    key={c.categoryId}
                    type="button"
                    onClick={() => handleCatId(c.categoryId)}
                    className={`m-1 py-2 px-3 text-sm transition cursor-pointer col-span-2
                    ${active ? "text-[#66191F] font-bold" : "hover:underline"}
                  `}
                  >
                    {c.name}
                  </button>
                );
              })}
          </div>

          <div className="grid items-center grid-cols-7 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">발향률</span>
            {/* CONCENTRATION 카테고리 렌더링 */}
            {isConcLoading && (
              <span className="col-span-2 py-2 text-sm text-gray-500 md:col-span-8">
                로딩중…
              </span>
            )}
            {isConcError && (
              <span className="col-span-2 py-2 text-sm md:col-span-8">
                발향률 불러오기 실패
              </span>
            )}
            {concCat
              ?.sort((a, b) => a.order - b.order)
              .map((c) => {
                const active = catId === c.categoryId;
                return (
                  <button
                    key={c.categoryId}
                    type="button"
                    onClick={() => handleCatId(c.categoryId)}
                    className={`py-2 px-3 text-sm transition cursor-pointer
                  ${active ? "text-[#66191F] font-bold" : "hover:underline"}`}
                  >
                    {c.name}
                  </button>
                );
              })}
          </div>
        </div>
      </section>
      {isError && (
        <div className="text-[#AB3130]">
          상품 목록을 불러오는 데 실패하였습니다.
        </div>
      )}
      {/* 상품 필터링 */}
      <section className="w-full max-w-5xl">
        <div className="flex justify-start space-x-2 text-[#AB3130] mb-4 flex-wrap gap-2 pt-6">
          {sortItems.map((label) => {
            const active = sort === label;
            return (
              <button
                type="button"
                key={label}
                className={`px-2 py-1 rounded cursor-pointer ${
                  active ? "font-bold" : "hover:underline"
                }`}
                onClick={() => {
                  setSort(label);
                  setProductPage(1);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <ProductGrid
          items={list.map((p) => ({
            isLoading,
            id: p.id,
            name: p.name,
            price: p.price,
            brand: p.brand,
            ml: p.ml,
            imageUrl: p.imageUrl,
          }))}
          isLoading={isLoading}
          pageSize={16}
          onItemClick={(id) => {
            setPerfumeId(id);
            navigate(`/shopping/${id}`);
          }}
        />
      </section>
      {/* 페이지 네이션 */}
      <footer className="flex py-12 space-x-4">
        <PaginationProducts
          page={currentPage}
          totalPages={totalPages}
          onChange={(n) => {
            setProductPage(n);
          }}
          windowSize={5}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
};

export default ShoppingHome;
