import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getScrapList } from "../../apis/products";
import type { Scrap } from "../../types/perfumes";

const itemsPerPage = 16;

const MyScraps = () => {
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [allScraps, setAllScraps] = useState<Scrap[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // 페이지네이션 전체 데이터 기준
  const totalPages = Math.ceil(allScraps.length / itemsPerPage);
  const pageGroupSize = 5;
  const currentGroup = Math.ceil(page / pageGroupSize);

  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

  const fetchScraps = async () => {
    try {
      setIsLoading(true);
      const response = await getScrapList();

      if (response.isSuccess) {
        setAllScraps(response.result);
      } else {
        console.error("스크랩 목록 조회 실패:", response.message);
        setAllScraps([]);
      }
    } catch (error) {
      console.error("스크랩 목록 조회 에러:", error);
      setAllScraps([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/shopping/${productId}`);
  };

  useEffect(() => {
    fetchScraps();
  }, []);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setScraps(allScraps.slice(start, end));
  }, [page, allScraps]);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} ₩`;
  };

  return (
    <div className="min-h-screen bg-[#66191F] pt-15 pb-20 text-[#F7F4EF] px-3 sm:px-3">
      <div className="text-center mb-13 mt-13">
        <h2 className="mb-8 text-5xl">MY SCRAP</h2>
        <div className="w-15 h-px bg-[#F7F4EF] mx-auto mb-7 opacity-50"></div>
        <p className="text-lg sm:text-xl font-extralight">
          원하는 향수를 스크랩하고 한 눈에 확인해보세요.
        </p>
      </div>

      <div className="w-full mx-auto max-w-screen-2xl">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 animate-pulse"></div>
                <div className="p-2 pt-4 pb-6">
                  <div className="h-5 mb-2 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : scraps.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-[#F7F4EF] opacity-70 mb-4">
              아직 스크랩한 향수가 없습니다.
            </p>
            <p className="text-base text-[#F7F4EF] opacity-50">
              마음에 드는 향수를 스크랩해보세요!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {scraps.map((perfume, index) => (
              <div
                key={`${perfume.id}-${index}`}
                className="overflow-hidden"
                onClick={() => handleProductClick(perfume.id)}
              >
                {/* 이미지 */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#F7F4EF]">
                  <img
                    src={perfume.imageUrl}
                    alt={perfume.name}
                    className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 transition-transform duration-200 hover:scale-103"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://dummyimage.com/300x400/ccc/fff&text=No+Image";
                    }}
                  />
                </div>
                {/* 텍스트 */}
                <div className="p-2 pt-4 pb-5 text-left">
                  <div className="mb-1 text-lg font-extralight">
                    {perfume.brand}
                  </div>
                  <div className="sm:flex sm:justify-between">
                    <div className="mb-2 text-2xl font-semibold line-clamp-2">
                      {perfume.name}
                    </div>
                    <div className="text-lg font-extralight">
                      {perfume.ml}ml
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-extralight">
                    {formatPrice(perfume.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isLoading && scraps.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center py-12 space-x-4">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className={`p-2 cursor-pointer items-center justify-center transition-all ${
              page === 1
                ? "text-white/40 cursor-not-allowed"
                : "text-white hover:bg-white/10"
            }`}
          >
            <IoChevronBack size={32} />
          </button>

          {/* 페이지 번호 */}
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const pageNumber = startPage + idx;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`flex box-border items-center justify-center w-[44px] h-11 text-2xl cursor-pointer py-2 px-3 focus:outline-none ${
                  page === pageNumber
                    ? "bg-[#F7F4EF] text-[#AB3130]"
                    : "text-[#F7F4EF] hover:bg-[#F7F4EF] hover:text-[#AB3130]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className={`w-10 h-10 flex items-center justify-center transition-all ${
              page === totalPages
                ? "text-white/40 cursor-not-allowed"
                : "text-white hover:bg-white/10"
            }`}
          >
            <IoChevronForward size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyScraps;
