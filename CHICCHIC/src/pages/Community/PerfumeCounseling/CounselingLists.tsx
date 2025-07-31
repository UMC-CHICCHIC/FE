import { useMemo, useState } from "react";
import LeftArrowIcon from "../../../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../../../assets/icons/arrowRight.svg";
import PostSection from "../../../components/Community/CounselingPostSection";
import type { PostPrev } from "../../../types/post";
import { useNavigate } from "react-router-dom";

// 데모 포스트 양식
const recommendPosts: PostPrev[] = [
  {
    postId: 101,
    title: "추천해요",
    writer: "닉네임",
    createdAt: "2025.07.01.",
    image: "/sample-image.png",
  },
  {
    postId: 102,
    title: "제목제목제목제목",
    writer: "닉네임",
    createdAt: "2025.07.01.",
  },
];

// 데모 포스트 양식
const recommendedPosts: PostPrev[] = [
  {
    postId: 103,
    title: "추천 받아요",
    writer: "닉네임",
    createdAt: "2025.07.01.",
    image: "/sample-image.png",
  },
  {
    postId: 104,
    title: "제목제목제목제목",
    writer: "닉네임",
    createdAt: "2025.07.01.",
  },
];

const CounselingLists = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState<"RECOMMENDED" | "RECOMMEND">(
    "RECOMMENDED"
  );
  const post = select === "RECOMMENDED" ? recommendedPosts : recommendPosts;

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
                select === "RECOMMENDED" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("RECOMMENDED");
              }}
            >
              추천 받아요!
            </button>
            <button
              className={`${
                select === "RECOMMEND" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("RECOMMEND");
              }}
            >
              추천해요!
            </button>
          </div>
        </div>
      </section>
      <section className="w-[90%] max-w-5xl font-[pretendard] mx-auto grow py-8">
        <PostSection posts={post} category={select} />
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
