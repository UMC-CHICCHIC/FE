import { useMemo, useState } from "react";
import LeftArrowIcon from "../../../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../../../assets/icons/arrowRight.svg";
import PostSection from "../../../components/Counseling/CounselingPostSection";
import { useNavigate } from "react-router-dom";
import { recommendedPosts, recommendPosts } from "../../../mocks/PostPrev";
import { usePostFilter } from "../../../store/usePostFilter";
import { useGetConsultPost } from "../../../hooks/queries/useGetConsultPost";

const CounselingLists = () => {
  const navigate = useNavigate();
  // 카테고리 상태 가져오기
  const { category, setCategory } = usePostFilter();
  // 목데이터 필터링
  const filteredPosts = useMemo(() => {
    const allPosts = [...recommendedPosts, ...recommendPosts];
    return allPosts.filter((post) => post.postType === category);
  }, [category]);
  // 엔드포인트: /consult-post 게시글 정보 훅
  const { isLoading, isError } = useGetConsultPost(category);

  const [productPage, setProductPage] = useState(1);

  // 페이지네이션 프로토타입용
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
    // 추천 상담소 카테고리 섹션
    <div className="flex flex-col items-center bg-[#F7F4EF] font-[pretendard]">
      <section className="flex justify-center w-full border-[#AB3130] border-b">
        <div className="text-[#AB3130] flex flex-col items-center justify-center mb-12 mt-2 w-[320px]">
          <p className="py-12 text-4xl font-semibold">향수 추천 상담소</p>
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <button
              className={`${
                category === "RECEIVE" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setCategory("RECEIVE");
              }}
            >
              추천 받아요!
            </button>
            <button
              className={`${
                category === "GIVE" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setCategory("GIVE");
              }}
            >
              추천해요!
            </button>
          </div>
        </div>
      </section>
      {/* 게시된 글 정보 */}
      <section className="w-[90%] max-w-5xl font-[pretendard] mx-auto grow py-8">
        <PostSection
          posts={filteredPosts}
          category={category}
          isLoading={isLoading}
          isError={isError}
        />
        <div className="flex items-start justify-end mb-4">
          <button
            className="text-sm px-12 py-2 bg-[#AB3130] text-white rounded-full cursor-pointer"
            onClick={() => navigate("/community/recommendation/new")}
          >
            글쓰기
          </button>
        </div>
      </section>
      {/* 페이지 네이션 */}
      <footer className="flex justify-center py-12 space-x-4 font-[crimsonText]">
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

export default CounselingLists;
