import { useMemo, useState } from "react";
import LeftArrowIcon from "../../../assets/icons/arrowLeft.svg";
import RightArrowIcon from "../../../assets/icons/arrowRight.svg";

interface Post {
  imageUrl?: string;
  profileImage?: string;
  title: string;
  author: string;
  date: string;
}

// 데모 포스트 양식
const recommendPosts: Post[] = [
  {
    imageUrl: "/sample-image.png",
    title: "추천해요",
    author: "닉네임",
    profileImage: "/profile.png",
    date: "2025.07.01.",
  },
  {
    title: "제목제목제목제목",
    author: "닉네임",
    date: "2025.07.01.",
  },
];

// 데모 포스트 양식
const recommendedPosts: Post[] = [
  {
    imageUrl: "/sample-image.png",
    title: "추천받아요",
    author: "닉네임",
    profileImage: "/profile.png",
    date: "2025.07.01.",
  },
  {
    title: "제목제목제목제목",
    author: "닉네임",
    date: "2025.07.01.",
  },
];

const CounselingLists = () => {
  const [select, setSelect] = useState<"recommended" | "recommend">(
    "recommended"
  );
  const post = select === "recommended" ? recommendedPosts : recommendPosts;

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
        <div className="text-[#AB3130] flex flex-col items-center justify-center mb-12 w-[320px]">
          <p className="py-12 text-4xl font-semibold">향수 추천 상담소</p>
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <button
              className={`${
                select === "recommended" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("recommended");
              }}
            >
              추천 받아요!
            </button>
            <button
              className={`${
                select === "recommend" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 w-full justify-center items-center border rounded-full px-6 py-3 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("recommend");
              }}
            >
              추천해요!
            </button>
          </div>
        </div>
      </section>
      <section className="w-[90%] max-w-5xl font-[pretendard] mx-auto grow py-8">
        <PostSection posts={post} />
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

// 게시글 섹션 컴포넌트 데모
const PostSection = ({ posts }: { posts: Post[] }) => {
  return (
    <section className="mb-14 text-[#66191F]">
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-[#AB3130] py-4"
          >
            <div className="flex items-center gap-4">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt="post image"
                  className="object-cover h-24 w-30 rounded-xl"
                />
              ) : (
                <div className="h-24 bg-gray-300 w-30 rounded-xl"></div>
              )}
              <div className="flex flex-col gap-4">
                <h3 className="text-[#AB3130] font-semibold text-lg mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm">
                  <img
                    src={post.profileImage || "/profile.png"}
                    alt="프로필"
                    className="object-cover w-6 h-6 rounded-full"
                  />
                  <span className="ml-2">{post.author}</span>
                </div>
              </div>
            </div>
            <span className="text-sm">{post.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
