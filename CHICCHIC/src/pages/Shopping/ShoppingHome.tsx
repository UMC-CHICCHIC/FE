import { useMemo, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import SamplePerfumeImg from "../../assets/images/samplePerfumeImg.png";
import LeftArrowIcon from "../../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../../assets/icons/arrowRight.svg";

const ShoppingHome = () => {
  const [productPage, setProductPage] = useState(1);

  // 프로토타입용
  const totalPages = 20;
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(productPage - 2, totalPages - 4));
    const pages: number[] = [];
    for (let i = start; i < start + 5; i++) {
      if (i >= 1 && i <= totalPages) pages.push(i);
    }
    return pages;
  }, [productPage, totalPages]);

  return (
    <div className="flex flex-col min-h-screen items-center p-4 space-y-8 bg-[#F7F4EF]">
      {/* 상품 검색창 */}
      <section className="flex items-center w-full max-w-xl border rounded-full border-[#AB3130] px-4 py-2 my-14">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none placeholder-[#AB3130] text-[#AB3130] px-2"
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
            <span className="text-white bg-[#AB3130] py-2">노트</span>
            <span className="">노트</span>
            <span>노트</span>
            <span>노트</span>
            <span>노트</span>
            <span>노트</span>
          </div>

          <div className="grid items-center grid-cols-3 md:grid-cols-6 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">가격대</span>
            <span>가격대</span>
            <span>가격대</span>
            <span>가격대</span>
            <span>가격대</span>
            <span>가격대</span>
          </div>

          <div className="grid items-center grid-cols-3 md:grid-cols-6 border-t border-[#EAE6DF]">
            <span className="text-white bg-[#AB3130] py-2">발향률</span>
            <span>발향률</span>
            <span>발향률</span>
            <span>발향률</span>
            <span>발향률</span>
            <span>발향률</span>
          </div>
        </div>
      </section>

      {/* 상품 필터링 */}
      <section className="w-full max-w-5xl">
        <div className="flex justify-start space-x-6 text-[#AB3130] mb-4 flex-wrap gap-2 pt-6">
          <button className="hover:underline">인기도순</button>
          <button className="hover:underline">낮은가격순</button>
          <button className="hover:underline">높은가격순</button>
          <button className="hover:underline">누적판매순</button>
          <button className="hover:underline">리뷰많은순</button>
          <button className="hover:underline">평점높은순</button>
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
        <button
          onClick={(): void => setProductPage((prev): number => prev - 1)}
          disabled={productPage === 1}
          className={`p-2 cursor-pointer ${
            productPage === 1
          } ? "text-gray-300 cursor-not-allowed" : "text-[#AB3130]"`}
        >
          <img src={LeftArrowIcon} alt="rightArrow" width={10} />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setProductPage(page)}
            className={`flex box-border items-center justify-center w-[44px] h-11 text-2xl text-[#AB3130] cursor-pointer py-2 px-3 focus:outline-none ${
              productPage === page
                ? "bg-[#AB3130] text-white"
                : "text-[#AB3130] hover:bg-[#AB3130] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={(): void => setProductPage((prev): number => prev + 1)}
          className="p-2 cursor-pointer"
          disabled={productPage === totalPages}
        >
          <img src={RightArrowIcon} alt="leftArrow" width={10} />
        </button>
      </footer>
    </div>
  );
};

export default ShoppingHome;
