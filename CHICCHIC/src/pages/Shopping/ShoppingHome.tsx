import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import SamplePerfumeImg from "../../assets/images/samplePerfumeImg.png";
import type { PAGINATION_ORDER } from "../../types/enums/category";
import { Pagination } from "../../components/Pagination";

const sortItems = [
  "인기도순",
  "낮은가격순",
  "높은가격순",
  "누적판매순",
  "리뷰많은순",
  "평점높은순",
];

const ShoppingHome = () => {
  const [productPage, setProductPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<PAGINATION_ORDER>("");

  return (
    <div className="flex flex-col min-h-screen items-center p-4 space-y-8 bg-[#F7F4EF]">
      {/* 상품 검색창 */}
      <section className="flex items-center w-full max-w-xl border rounded-full border-[#AB3130] px-4 py-2 my-14">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none placeholder-[#AB3130] text-[#AB3130] px-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
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

        <div className="items-center text-black border-b border-[#ece3d4] py-4 font-[pretendard]">
          <div className="grid items-center grid-cols-3 md:grid-cols-6 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">가격대</span>
            <label>가격대</label>
            <label>가격대</label>
            <label>가격대</label>
          </div>

          <div className="grid items-center grid-cols-3 md:grid-cols-6 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">발향률</span>
            <label>퍼퓸</label>
            <label>오 드 퍼퓸</label>
            <label>오 드 뚜왈렛</label>
            <label>오 드 코롱</label>
          </div>
        </div>
      </section>

      {/* 상품 필터링 */}
      <section className="w-full max-w-5xl">
        <div className="flex justify-start space-x-6 text-[#AB3130] mb-4 flex-wrap gap-2 pt-6">
          {sortItems.map((i) => (
            <button
              type="button"
              className="cursor-pointer hover:underline"
              // onClick={() => setSort("desc")}
              key={i}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 gap-y-24 md:grid-cols-4 font-[pretendard]">
          <div className="flex flex-col items-center">
            <img
              src={SamplePerfumeImg}
              alt="샘풀 향수 30mL"
              className="object-cover w-40 rounded shadow h-60"
            />
            <div className="text-center mt-2 text-[#AB3130] font-semibold">
              샘플 향수 30mL
            </div>
            <div className="text-center text-[#AB3130]">130,000 ₩</div>
          </div>
          {[...Array(20)].map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-40 text-lg bg-gray-300 h-60"
            >
              상품
            </div>
          ))}
        </div>
      </section>
      {/* 페이지 네이션 */}
      <footer className="flex py-12 space-x-4">
        {/* <Pagination page={} /> */}
      </footer>
    </div>
  );
};

export default ShoppingHome;
